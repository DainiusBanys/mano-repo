"""Broad personalized-apparel discovery, scoring and persistence analysis."""

from __future__ import annotations

import json
import math
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from statistics import median

import pandas as pd


RANKED_COLUMNS = [
    "rank", "macro_segment", "query", "sample_size", "paired_listing_count",
    "unique_shop_count", "positive_shop_pct", "positive_listing_pct",
    "median_positive_velocity_30d", "top_shop_share", "top_3_shop_share",
    "median_price", "MarketSignalScore", "EntryOpportunityScore",
    "PersistenceScore", "ConfidenceScore", "BroadOpportunityScore",
    "interval_count", "persistence_status", "ip_risk", "flags", "verdict",
]

PERSISTENCE_COLUMNS = [
    "query", "previous_scan_date", "current_scan_date",
    "previous_positive_shop_pct", "current_positive_shop_pct",
    "previous_top_shop_share", "current_top_shop_share",
    "previous_market_score", "current_market_score", "SignalRetention",
    "PositiveShopBreadthRetention", "ConcentrationStability",
    "PersistenceScore", "persistence_status",
]

IP_TERMS = {
    "HIGH": ("disney", "marvel", "star wars", "pokemon", "barbie", "harry potter", "jurassic", "mario", "nintendo", "nba", "nfl"),
    "MEDIUM": ("team logo", "character", "superhero", "princess", "sports team"),
}


def clamp(value, low=0.0, high=100.0):
    return max(low, min(high, float(value)))


def available_weighted_score(components):
    available = [(float(value), weight) for value, weight in components if value is not None and not pd.isna(value)]
    if not available:
        return None
    return sum(value * weight for value, weight in available) / sum(weight for _, weight in available)


def positive_metrics(listings: pd.DataFrame):
    """Aggregate only valid paired velocity observations; missing remains missing."""
    if "velocity_30d" not in listings or listings["velocity_30d"].notna().sum() == 0:
        return {
            "paired_listing_count": 0, "positive_listing_count": None,
            "positive_listing_pct": None, "positive_shop_count": None,
            "positive_shop_pct": None, "total_positive_velocity_30d": None,
            "median_velocity_30d": None, "median_positive_velocity_30d": None,
            "top_shop_share": None, "top_3_shop_share": None,
            "active_listing_breadth": None,
        }
    paired = listings[listings["velocity_30d"].notna()].copy()
    paired["positive_velocity"] = paired["velocity_30d"].clip(lower=0)
    positive = paired[paired["velocity_30d"] > 0]
    known_shop = paired[paired["shop_name"].fillna("").astype(str).str.strip().ne("")]
    shop_velocity = known_shop.groupby("shop_name")["positive_velocity"].sum()
    positive_shops = shop_velocity[shop_velocity > 0]
    total = float(positive["velocity_30d"].sum())
    total_shops = int(known_shop["shop_name"].nunique())
    return {
        "paired_listing_count": int(len(paired)),
        "positive_listing_count": int(len(positive)),
        "positive_listing_pct": len(positive) / len(paired),
        "positive_shop_count": int(len(positive_shops)),
        "positive_shop_pct": len(positive_shops) / total_shops if total_shops else None,
        "total_positive_velocity_30d": total,
        "median_velocity_30d": float(paired["velocity_30d"].median()),
        "median_positive_velocity_30d": float(positive["velocity_30d"].median()) if not positive.empty else None,
        "top_shop_share": float(positive_shops.max() / total) if total > 0 else None,
        "top_3_shop_share": float(positive_shops.nlargest(3).sum() / total) if total > 0 else None,
        "active_listing_breadth": len(positive) / len(paired),
    }


def confidence_score(sample_size, paired_count, unique_shops, positive_shops, elapsed_days, interval_count):
    """Score evidence coverage; absent history lowers confidence rather than becoming zero demand."""
    usable = min(sample_size / 12, 1)
    paired = min(paired_count / 8, 1) if paired_count else 0.25
    shops = min(unique_shops / 8, 1)
    breadth = min(positive_shops / 5, 1) if positive_shops is not None else 0.25
    elapsed = min(elapsed_days / 14, 1) if elapsed_days is not None else 0.25
    depth = min(interval_count / 3, 1) if interval_count else 0.20
    return clamp(100 * (0.25 * usable + 0.25 * paired + 0.15 * shops + 0.15 * breadth + 0.10 * elapsed + 0.10 * depth))


def price_fit_score(median_price):
    if median_price is None or pd.isna(median_price) or median_price <= 0:
        return None
    if 18 <= median_price <= 40:
        return 100.0
    if 12 <= median_price < 18 or 40 < median_price <= 55:
        return 70.0
    return 35.0


def infer_ip_risk(seed_hint, titles):
    hint = str(seed_hint or "LOW").upper()
    joined = " ".join(str(title).lower() for title in titles)
    high_hits = [term for term in IP_TERMS["HIGH"] if term in joined]
    medium_hits = [term for term in IP_TERMS["MEDIUM"] if term in joined]
    if hint == "HIGH" or high_hits:
        return "HIGH", "Detected trademark/franchise terms: " + ", ".join(high_hits or ["seed hint"])
    if hint == "MEDIUM" or medium_hits:
        return "MEDIUM", "Potential branded-content contamination: " + ", ".join(medium_hits or ["seed hint"])
    return "LOW", "Generic personalized-apparel intent"


def market_signal_score(metrics):
    demand = None
    if metrics.get("positive_shop_pct") is not None and metrics.get("positive_listing_pct") is not None:
        demand = 50 * (metrics["positive_shop_pct"] + metrics["positive_listing_pct"])
    velocity = None
    if metrics.get("median_positive_velocity_30d") is not None:
        velocity = 100 * (1 - math.exp(-metrics["median_positive_velocity_30d"] / 30))
    active_shops = metrics.get("positive_shop_count")
    active_component = min(active_shops / 8, 1) * 100 if active_shops is not None else min(metrics["unique_shop_count"] / 10, 1) * 100
    concentration = (1 - metrics["top_shop_share"]) * 100 if metrics.get("top_shop_share") is not None else None
    newer = metrics.get("newer_listing_success_rate")
    newer_component = newer * 100 if newer is not None else None
    score = available_weighted_score([
        (demand, 0.30), (velocity, 0.20), (active_component, 0.15),
        (concentration, 0.15), (newer_component, 0.10),
        (price_fit_score(metrics.get("median_price")), 0.10),
    ])
    if score is None:
        return None
    if metrics.get("top_shop_share") is not None:
        if metrics["top_shop_share"] > 0.70:
            score *= 0.35
        elif metrics["top_shop_share"] > 0.50:
            score *= 0.65
    if metrics.get("positive_shop_count") is not None and metrics["positive_shop_count"] < 3:
        score *= 0.60
    if metrics["sample_size"] < 8:
        score *= 0.70
    return clamp(score)


def entry_opportunity_score(metrics):
    concentration = (1 - metrics["top_shop_share"]) * 100 if metrics.get("top_shop_share") is not None else min(metrics["unique_shop_count"] / 10, 1) * 100
    newer = metrics.get("newer_listing_success_rate")
    score = available_weighted_score([
        (concentration, 0.25),
        (newer * 100 if newer is not None else None, 0.20),
        (metrics.get("personalization_fit_score"), 0.15),
        (price_fit_score(metrics.get("median_price")), 0.15),
        (metrics.get("production_fit_score"), 0.10),
        ({"LOW": 100, "MEDIUM": 55, "HIGH": 0}[metrics["ip_risk"]], 0.15),
    ])
    if score is None:
        return None
    if metrics["ip_risk"] == "HIGH":
        score *= 0.25
    if metrics["sample_size"] < 8:
        score *= 0.70
    return clamp(score)


def signal_retention(previous_signal, current_signal):
    if previous_signal is None or current_signal is None:
        return None, None
    denominator = max(float(previous_signal), 5.0)
    raw = float(current_signal) / denominator
    return raw, min(raw, 2.0)


def positive_shop_breadth_retention(previous_pct, current_pct):
    if previous_pct is None or current_pct is None:
        return None
    return current_pct / max(previous_pct, 0.05)


def concentration_stability(previous_share, current_share):
    if previous_share is None or current_share is None:
        return None, None
    delta = current_share - previous_share
    return delta, clamp(100 * (1 - max(delta, 0) / 0.5))


def rank_stability(previous_rank, current_rank, niche_count):
    if previous_rank is None or current_rank is None:
        return None
    return clamp(100 * (1 - abs(current_rank - previous_rank) / max(niche_count - 1, 1)))


def _has_matched_interval_evidence(row):
    paired_count = row.get("paired_listing_count")
    positive_shop_pct = row.get("positive_shop_pct")
    return pd.notna(paired_count) and paired_count > 0 and pd.notna(positive_shop_pct)


def persistence_metrics(intervals, rank_score=None):
    valid = [row for row in intervals if _has_matched_interval_evidence(row)]
    if len(valid) < 2:
        return {
            "interval_count": max(1, len(intervals)), "valid_interval_count": len(valid),
            "PersistenceScore": None, "SignalRetention": None,
            "SignalRetentionCapped": None, "PositiveShopBreadthRetention": None,
            "concentration_delta": None, "ConcentrationStability": None,
            "RankStability": rank_score, "persistence_status": "UNVALIDATED",
        }
    previous, current = valid[-2], valid[-1]
    previous_distributed = previous["total_positive_velocity_30d"] * (1 - (previous.get("top_shop_share") or 0)) * previous["positive_shop_pct"]
    current_distributed = current["total_positive_velocity_30d"] * (1 - (current.get("top_shop_share") or 0)) * current["positive_shop_pct"]
    retention_raw, retention_capped = signal_retention(previous_distributed, current_distributed)
    breadth_retention = positive_shop_breadth_retention(previous["positive_shop_pct"], current["positive_shop_pct"])
    concentration_delta, concentration_score = concentration_stability(previous.get("top_shop_share"), current.get("top_shop_share"))
    healthy = sum(row["positive_shop_pct"] >= 0.25 and (row.get("positive_shop_count") or 0) >= 3 for row in valid) / len(valid) * 100
    breadth_score = clamp((breadth_retention or 0) * 100)
    velocity_stability = clamp(100 * (1 - min(abs(1 - (retention_capped or 0)), 1)))
    stability = available_weighted_score([(velocity_stability, 0.6), (rank_score, 0.4)])
    score = available_weighted_score([(healthy, 0.35), (breadth_score, 0.30), (concentration_score, 0.20), (stability, 0.15)])
    collapsed = retention_raw is not None and retention_raw <= 0.10 and breadth_retention is not None and breadth_retention <= 0.40
    volatile = retention_raw is not None and (retention_raw < 0.50 or retention_raw > 1.50 or (concentration_delta or 0) > 0.20)
    status = "COLLAPSED" if collapsed else "PERSISTENT" if score is not None and score >= 65 and not volatile else "VOLATILE" if volatile else "INCONCLUSIVE"
    return {
        "interval_count": len(intervals), "valid_interval_count": len(valid),
        "PersistenceScore": score, "SignalRetention": retention_raw,
        "SignalRetentionCapped": retention_capped,
        "PositiveShopBreadthRetention": breadth_retention,
        "concentration_delta": concentration_delta,
        "ConcentrationStability": concentration_score,
        "RankStability": rank_score, "persistence_status": status,
    }


def risk_flags(metrics):
    flags = []
    if metrics["sample_size"] < 8: flags.append("LOW_SAMPLE")
    if metrics["unique_shop_count"] < 5: flags.append("LOW_SHOP_BREADTH")
    if metrics.get("top_shop_share") is not None and metrics["top_shop_share"] > 0.50: flags.append("HIGH_CONCENTRATION")
    if metrics.get("top_shop_share") is not None and metrics["top_shop_share"] > 0.70: flags.append("SUSPECT_VIRAL_SHOP")
    if metrics.get("positive_shop_count") is not None and metrics["positive_shop_count"] < 3: flags.append("LOW_POSITIVE_BREADTH")
    if metrics["ip_risk"] == "HIGH": flags.append("HIGH_IP_RISK")
    if price_fit_score(metrics.get("median_price")) is not None and price_fit_score(metrics["median_price"]) < 50: flags.append("POOR_PRICE_FIT")
    if metrics.get("elapsed_days") is not None and metrics["elapsed_days"] < 7: flags.append("SHORT_INTERVAL")
    if metrics.get("persistence_status") in {"UNVALIDATED", "INCONCLUSIVE"}: flags.append("INSUFFICIENT_HISTORY")
    if metrics.get("persistence_status") == "VOLATILE": flags.append("VOLATILE_SIGNAL")
    if metrics.get("persistence_status") == "COLLAPSED": flags.append("COLLAPSED_SIGNAL")
    return flags


def select_verdict(metrics):
    if metrics["ip_risk"] == "HIGH": return "REJECT"
    if metrics.get("persistence_status") == "COLLAPSED": return "REJECT"
    if metrics["sample_size"] < 8 or metrics["unique_shop_count"] < 5: return "RECHECK"
    if metrics.get("persistence_status") == "PERSISTENT" and metrics.get("valid_interval_count", 0) >= 2 and (metrics.get("positive_shop_count") or 0) >= 3 and (metrics.get("top_shop_share") or 0) <= 0.50 and metrics["ConfidenceScore"] >= 60 and metrics["BroadOpportunityScore"] >= 60:
        return "VALIDATED_DEEP_SCAN"
    if metrics.get("persistence_status") == "UNVALIDATED" and metrics["BroadOpportunityScore"] >= 55 and metrics["ip_risk"] != "HIGH":
        return "DEEP_SCAN_RESEARCH"
    if metrics.get("persistence_status") in {"VOLATILE", "INCONCLUSIVE", "UNVALIDATED"}: return "RECHECK"
    return "WATCH"


def score_seed(seed, listings, intervals=None, rank_score=None):
    intervals = intervals or []
    observed = listings[listings.get("listing_status", "OBSERVED") != "DISAPPEARED"] if "listing_status" in listings else listings
    base = positive_metrics(observed)
    prices = observed.loc[observed["price"].gt(0), "price"] if "price" in observed else pd.Series(dtype=float)
    ip_risk, reason = infer_ip_risk(seed.get("ip_risk_hint"), observed.get("title", pd.Series(dtype=str)))
    metrics = {
        **base, "macro_segment": seed["macro_segment"], "query": seed["query"],
        "sample_size": int(len(observed)), "unique_shop_count": int(observed.get("shop_name", pd.Series(dtype=str)).dropna().nunique()),
        "median_price": float(prices.median()) if not prices.empty else None,
        "price_p25": float(prices.quantile(.25)) if not prices.empty else None,
        "price_p75": float(prices.quantile(.75)) if not prices.empty else None,
        "newer_listing_success_rate": None, "personalization_fit_score": float(seed.get("personalization_fit_score", 85)),
        "production_fit_score": float(seed.get("production_fit_score", 80)), "ip_risk": ip_risk,
        "ip_risk_reason": reason, "elapsed_days": intervals[-1].get("elapsed_days") if intervals else None,
    }
    persistence = persistence_metrics(intervals, rank_score)
    metrics.update(persistence)
    metrics["MarketSignalScore"] = market_signal_score(metrics)
    metrics["EntryOpportunityScore"] = entry_opportunity_score(metrics)
    metrics["ConfidenceScore"] = confidence_score(metrics["sample_size"], metrics["paired_listing_count"], metrics["unique_shop_count"], metrics["positive_shop_count"], metrics["elapsed_days"], metrics["interval_count"])
    if metrics["PersistenceScore"] is None:
        raw_score = 0.57 * metrics["MarketSignalScore"] + 0.43 * metrics["EntryOpportunityScore"]
    else:
        raw_score = 0.40 * metrics["MarketSignalScore"] + 0.30 * metrics["EntryOpportunityScore"] + 0.30 * metrics["PersistenceScore"]
    metrics["raw_score"] = raw_score
    metrics["BroadOpportunityScore"] = raw_score * (0.65 + 0.35 * metrics["ConfidenceScore"] / 100)
    metrics["flags"] = ";".join(risk_flags(metrics))
    metrics["verdict"] = select_verdict(metrics)
    return metrics


def build_interval(previous, current, previous_date, current_date):
    keys = ["query", "listing_id"]
    paired = previous.merge(current, on=keys, how="outer", suffixes=("_previous", "_current"), indicator=True)
    paired["listing_status"] = paired["_merge"].map({"left_only": "DISAPPEARED", "right_only": "NEW", "both": "PERSISTENT"})
    paired["review_change_raw"] = (paired["review_count_current"] - paired["review_count_previous"]).where(paired["_merge"].eq("both"))
    elapsed_days = (pd.Timestamp(current_date) - pd.Timestamp(previous_date)).total_seconds() / 86400
    paired["elapsed_days"] = elapsed_days
    paired["velocity_30d"] = (paired["review_change_raw"] / elapsed_days * 30).where(paired["_merge"].eq("both") & (elapsed_days > 0))
    for column in ("shop_name", "title", "price", "rank", "macro_segment"):
        paired[column] = paired.get(f"{column}_current").combine_first(paired.get(f"{column}_previous"))
    return paired


def interval_summary(query, interval_frame):
    metrics = positive_metrics(interval_frame[interval_frame["query"].eq(query)])
    metrics["query"] = query
    metrics["elapsed_days"] = float(interval_frame["elapsed_days"].iloc[0]) if not interval_frame.empty else None
    return metrics


def _seed_records(seeds):
    records = seeds.to_dict("records") if isinstance(seeds, pd.DataFrame) else list(seeds)
    for record in records:
        record["personalization_fit_score"] = 90 if str(record.get("personalization_type", "")).lower() not in {"", "none"} else 65
        product = str(record.get("product_type", "")).lower()
        record["production_fit_score"] = 90 if "t-shirt" in product or "shirt" in product else 75
    return records


def analyze_snapshot(seeds, current_listings, scan_date, previous_snapshot=None):
    """Analyze one scan and optionally carry forward interval history."""
    current = current_listings.copy(deep=True)
    current["listing_id"] = current["listing_id"].astype(str)
    current["scan_date"] = scan_date
    prior_intervals = pd.DataFrame()
    previous_ranked = pd.DataFrame()
    if previous_snapshot:
        previous_snapshot = Path(previous_snapshot)
        previous = pd.read_csv(previous_snapshot / "raw_listings.csv", dtype={"listing_id": str})
        metadata = json.loads((previous_snapshot / "scan_metadata.json").read_text(encoding="utf-8"))
        normalized = build_interval(previous, current, metadata["snapshot_date"], scan_date)
        interval_rows = [interval_summary(query, normalized) for query in current["query"].drop_duplicates()]
        latest_intervals = pd.DataFrame(interval_rows)
        history_path = previous_snapshot / "interval_metrics.csv"
        if history_path.exists():
            prior_intervals = pd.read_csv(history_path)
        latest_intervals["previous_scan_date"] = metadata["snapshot_date"]
        latest_intervals["current_scan_date"] = scan_date
        interval_history = pd.concat([prior_intervals, latest_intervals], ignore_index=True)
        ranked_path = previous_snapshot / "broad_ranked.csv"
        if ranked_path.exists(): previous_ranked = pd.read_csv(ranked_path)
    else:
        normalized = current.copy(deep=True)
        normalized["listing_status"] = "NEW"
        normalized["review_change_raw"] = pd.NA
        normalized["elapsed_days"] = pd.NA
        normalized["velocity_30d"] = pd.NA
        interval_history = pd.DataFrame(columns=["query", "elapsed_days"])

    records = []
    for seed in _seed_records(seeds):
        query = seed["query"]
        current_query = normalized[(normalized["query"].eq(query)) & normalized["listing_status"].ne("DISAPPEARED")]
        history = interval_history[interval_history["query"].eq(query)].to_dict("records") if not interval_history.empty else []
        previous_rank = None
        if not previous_ranked.empty and query in set(previous_ranked["query"]):
            previous_rank = int(previous_ranked.loc[previous_ranked["query"].eq(query), "rank"].iloc[0])
        records.append(score_seed(seed, current_query, history, rank_score=None if previous_rank is None else 100.0))
    aggregates = pd.DataFrame(records)
    aggregates["rank"] = aggregates["BroadOpportunityScore"].rank(method="min", ascending=False).astype(int)
    aggregates = aggregates.sort_values(["rank", "query"]).reset_index(drop=True)
    return normalized, interval_history, aggregates


def persistence_comparison(previous_aggregates, current_aggregates, previous_date, current_date):
    previous = previous_aggregates.set_index("query")
    current = current_aggregates.set_index("query")
    rows = []
    for query in sorted(set(previous.index) & set(current.index)):
        p, c = previous.loc[query], current.loc[query]
        prev_distributed = None if pd.isna(p.get("total_positive_velocity_30d")) else p["total_positive_velocity_30d"] * (1 - (p.get("top_shop_share") or 0)) * (p.get("positive_shop_pct") or 0)
        curr_distributed = None if pd.isna(c.get("total_positive_velocity_30d")) else c["total_positive_velocity_30d"] * (1 - (c.get("top_shop_share") or 0)) * (c.get("positive_shop_pct") or 0)
        retention, _ = signal_retention(prev_distributed, curr_distributed)
        _, concentration_score = concentration_stability(None if pd.isna(p.get("top_shop_share")) else p.get("top_shop_share"), None if pd.isna(c.get("top_shop_share")) else c.get("top_shop_share"))
        rows.append({
            "query": query, "previous_scan_date": previous_date, "current_scan_date": current_date,
            "previous_positive_shop_pct": p.get("positive_shop_pct"), "current_positive_shop_pct": c.get("positive_shop_pct"),
            "previous_top_shop_share": p.get("top_shop_share"), "current_top_shop_share": c.get("top_shop_share"),
            "previous_market_score": p.get("MarketSignalScore"), "current_market_score": c.get("MarketSignalScore"),
            "SignalRetention": retention,
            "PositiveShopBreadthRetention": positive_shop_breadth_retention(None if pd.isna(p.get("positive_shop_pct")) else p.get("positive_shop_pct"), None if pd.isna(c.get("positive_shop_pct")) else c.get("positive_shop_pct")),
            "ConcentrationStability": concentration_score, "PersistenceScore": c.get("PersistenceScore"),
            "persistence_status": c.get("persistence_status"),
        })
    return pd.DataFrame(rows, columns=PERSISTENCE_COLUMNS)


def write_summary(path, ranked, metadata):
    def section(title, frame):
        lines.extend(["", f"## {title}", ""])
        if frame.empty:
            lines.append("None.")
            return
        for row in frame.head(8).itertuples():
            why = []
            if row.unique_shop_count >= 8: why.append("broad seller participation")
            if row.ip_risk == "LOW": why.append("low IP risk")
            if pd.notna(row.top_shop_share) and row.top_shop_share <= .50: why.append("distributed positive velocity")
            if row.persistence_status == "PERSISTENT": why.append("persistent across intervals")
            if not why: why.append("current structural signal requires validation")
            lines.append(f"- **{row.query}** — Market {row.MarketSignalScore:.1f}, Entry {row.EntryOpportunityScore:.1f}, Persistence {'n.a.' if pd.isna(row.PersistenceScore) else f'{row.PersistenceScore:.1f}'}, Confidence {row.ConfidenceScore:.1f}, Final {row.BroadOpportunityScore:.1f}. " + "; ".join(why) + ".")

    lines = [
        "# Broad Velocity Scanner v1", "",
        f"Snapshot: `{metadata['snapshot_date']}`. Seeds scanned: {metadata['seed_count']}. Listings saved: {metadata['listing_count']}.", "",
        "T0 and other single-interval results are discovery signals only. Normalized 30-day velocity is an extrapolated comparison measure, not a literal monthly forecast.",
    ]
    section("Top current market signals", ranked.sort_values("MarketSignalScore", ascending=False))
    section("Top entry opportunities", ranked.sort_values("EntryOpportunityScore", ascending=False))
    section("Persistent candidates", ranked[ranked["persistence_status"].eq("PERSISTENT")])
    section("Unvalidated one-interval candidates", ranked[ranked["persistence_status"].eq("UNVALIDATED")])
    section("Volatile/collapsed candidates", ranked[ranked["persistence_status"].isin(["VOLATILE", "COLLAPSED"])])
    section("Viral-shop anomalies", ranked[ranked["flags"].str.contains("SUSPECT_VIRAL_SHOP", na=False)])
    section("High-IP candidates", ranked[ranked["ip_risk"].eq("HIGH")])
    section("Candidates requiring recheck", ranked[ranked["verdict"].eq("RECHECK")])
    lines += ["", "## Implication for next scan", "", "Repeat the same enabled seed registry after at least 7 days. Do not classify any T0 candidate as VALIDATED_DEEP_SCAN or recommend product creation from this snapshot alone."]
    Path(path).write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_snapshot(output_root, snapshot_date, seeds, raw_listings, deep_scan_top_n=15, source="live"):
    """Create a complete snapshot once and fail if that date already exists."""
    output_root = Path(output_root)
    target = output_root / snapshot_date
    if target.exists():
        raise FileExistsError(f"Snapshot already exists and will not be overwritten: {target}")
    previous_candidates = sorted([p for p in output_root.glob("20??-??-??") if p.is_dir() and p.name < snapshot_date])
    previous_snapshot = previous_candidates[-1] if previous_candidates else None
    normalized, interval_history, aggregates = analyze_snapshot(seeds, raw_listings, snapshot_date, previous_snapshot)
    pending = output_root / f".pending-{snapshot_date}-{datetime.now(UTC).strftime('%H%M%S')}"
    pending.mkdir(parents=True, exist_ok=False)
    try:
        raw_listings.to_csv(pending / "raw_listings.csv", index=False)
        normalized.to_csv(pending / "normalized_listings.csv", index=False)
        interval_history.to_csv(pending / "interval_metrics.csv", index=False)
        aggregates.to_csv(pending / "niche_aggregates.csv", index=False)
        ranked = aggregates[RANKED_COLUMNS].copy()
        ranked.to_csv(pending / "broad_ranked.csv", index=False)
        ranked.head(20).to_csv(pending / "broad_top20.csv", index=False)
        ranked[ranked["verdict"].isin(["RECHECK", "DEEP_SCAN_RESEARCH"])].to_csv(pending / "broad_recheck.csv", index=False)
        ranked[ranked["verdict"].eq("REJECT")].to_csv(pending / "broad_rejected.csv", index=False)
        queue = ranked[ranked["verdict"].isin(["DEEP_SCAN_RESEARCH", "VALIDATED_DEEP_SCAN"])].head(deep_scan_top_n).copy()
        queue["deep_scan_level"] = queue["verdict"].map({"DEEP_SCAN_RESEARCH": "RESEARCH_ONLY", "VALIDATED_DEEP_SCAN": "VALIDATED"})
        queue[["query", "macro_segment", "BroadOpportunityScore", "MarketSignalScore", "EntryOpportunityScore", "PersistenceScore", "ConfidenceScore", "persistence_status", "deep_scan_level"]].to_csv(pending / "deep_scan_queue.csv", index=False)
        metadata = {
            "snapshot_date": snapshot_date, "created_at": datetime.now(UTC).isoformat(),
            "seed_count": int(len(seeds)), "listing_count": int(len(raw_listings)),
            "previous_snapshot": str(previous_snapshot) if previous_snapshot else None,
            "source": source, "immutable": True,
        }
        (pending / "scan_metadata.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")
        if previous_snapshot:
            previous_ranked = pd.read_csv(previous_snapshot / "niche_aggregates.csv")
            persistence_comparison(previous_ranked, aggregates, previous_snapshot.name, snapshot_date).to_csv(pending / "broad_persistence_comparison.csv", index=False)
        else:
            pd.DataFrame(columns=PERSISTENCE_COLUMNS).to_csv(pending / "broad_persistence_comparison.csv", index=False)
        write_summary(pending / "broad_summary.md", ranked, metadata)
        pending.rename(target)
    except Exception:
        # Leave a clearly marked pending directory for audit/recovery.
        raise
    return target
