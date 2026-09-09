"""Command-line entry point for Etsy Velocity AI workflows."""

from __future__ import annotations

import argparse
import asyncio
import json
from datetime import date
from pathlib import Path

import pandas as pd

from broad_scanner import PERSISTENCE_COLUMNS, persistence_comparison, write_snapshot


def load_seeds(path, limit=None, segment=None):
    seeds = pd.read_csv(path)
    required = {"seed_id", "macro_segment", "query", "product_type", "personalization_type", "occasion", "ip_risk_hint", "enabled", "notes"}
    missing = required - set(seeds.columns)
    if missing:
        raise ValueError(f"Seed registry missing columns: {sorted(missing)}")
    enabled = seeds["enabled"].astype(str).str.lower().isin({"1", "true", "yes", "y"})
    seeds = seeds[enabled]
    if segment:
        seeds = seeds[seeds["macro_segment"].str.casefold().eq(segment.casefold())]
    if limit is not None:
        seeds = seeds.head(limit)
    if seeds.empty:
        raise ValueError("No enabled seeds match the requested filters")
    if seeds["seed_id"].duplicated().any() or seeds["query"].duplicated().any():
        raise ValueError("Enabled seed_id and query values must be unique")
    return seeds.reset_index(drop=True)


def cmd_broad_scan(args):
    from broad_collection import collect_broad_listings
    seeds = load_seeds(args.seeds, args.limit_seeds, args.segment)
    snapshot_date = args.snapshot_date or date.today().isoformat()
    target = Path(args.output) / snapshot_date
    if target.exists():
        raise FileExistsError(f"Snapshot already exists and will not be overwritten: {target}")
    listings = asyncio.run(collect_broad_listings(seeds, args.target_per_seed, args.cdp_url))
    if listings.empty:
        raise RuntimeError("Broad scan collected no valid listings; no snapshot was created")
    snapshot = write_snapshot(args.output, snapshot_date, seeds, listings, args.deep_scan_top_n, source="live Etsy pilot")
    ranked = pd.read_csv(snapshot / "broad_ranked.csv")
    if args.min_confidence is not None:
        eligible = ranked[ranked["ConfidenceScore"] >= args.min_confidence]
        print(f"Snapshot: {snapshot}\nCandidates above minimum confidence: {len(eligible)}/{len(ranked)}")
    else:
        print(f"Snapshot: {snapshot}")


def cmd_broad_recheck(args):
    previous_path, current_path = Path(args.previous_snapshot), Path(args.current_snapshot)
    previous = pd.read_csv(previous_path / "niche_aggregates.csv")
    current = pd.read_csv(current_path / "niche_aggregates.csv")
    previous_meta = json.loads((previous_path / "scan_metadata.json").read_text(encoding="utf-8"))
    current_meta = json.loads((current_path / "scan_metadata.json").read_text(encoding="utf-8"))
    output = current_path.parent / "comparisons" / f"{previous_path.name}_to_{current_path.name}"
    output.mkdir(parents=True, exist_ok=False)
    comparison = persistence_comparison(previous, current, previous_meta["snapshot_date"], current_meta["snapshot_date"])
    comparison.to_csv(output / "broad_persistence_comparison.csv", index=False)
    print(output / "broad_persistence_comparison.csv")


def parser():
    root = argparse.ArgumentParser(prog="python -m velocity")
    commands = root.add_subparsers(dest="command", required=True)
    scan = commands.add_parser("broad-scan")
    scan.add_argument("--seeds", default="config/broad_seeds.csv")
    scan.add_argument("--output", default="broad_snapshots")
    scan.add_argument("--limit-seeds", type=int)
    scan.add_argument("--segment")
    scan.add_argument("--min-confidence", type=float)
    scan.add_argument("--deep-scan-top-n", type=int, default=15)
    scan.add_argument("--snapshot-date")
    scan.add_argument("--target-per-seed", type=int, default=10)
    scan.add_argument("--cdp-url", default="http://localhost:9222")
    scan.set_defaults(func=cmd_broad_scan)
    recheck = commands.add_parser("broad-recheck")
    recheck.add_argument("--previous-snapshot", required=True)
    recheck.add_argument("--current-snapshot", required=True)
    recheck.set_defaults(func=cmd_broad_recheck)
    return root


def main():
    args = parser().parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
