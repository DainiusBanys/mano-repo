import tempfile
import unittest
from pathlib import Path

import pandas as pd

from broad_scanner import (
    concentration_stability,
    confidence_score,
    entry_opportunity_score,
    market_signal_score,
    persistence_metrics,
    positive_metrics,
    positive_shop_breadth_retention,
    rank_stability,
    score_seed,
    select_verdict,
    signal_retention,
    write_snapshot,
)


def listing_fixture(shop_velocities, sample_size=None, ip_title="Generic custom shirt"):
    rows = []
    index = 1
    for shop, velocities in shop_velocities.items():
        for velocity in velocities:
            rows.append({
                "query": "test query", "listing_id": str(index), "shop_name": shop,
                "velocity_30d": velocity, "price": 24.0, "title": ip_title,
                "review_count": 10, "rank": index, "listing_status": "PERSISTENT",
            })
            index += 1
    while sample_size and len(rows) < sample_size:
        rows.append({
            "query": "test query", "listing_id": str(index), "shop_name": f"Flat{index}",
            "velocity_30d": 0.0, "price": 24.0, "title": ip_title,
            "review_count": 10, "rank": index, "listing_status": "PERSISTENT",
        })
        index += 1
    return pd.DataFrame(rows)


def seed(ip="LOW"):
    return {
        "seed_id": "S1", "macro_segment": "Test", "query": "test query",
        "product_type": "T-shirt", "personalization_type": "name",
        "occasion": "test", "ip_risk_hint": ip,
        "personalization_fit_score": 90, "production_fit_score": 90,
    }


class BroadMetricTests(unittest.TestCase):
    def test_concentration_shop_breadth_and_positive_shop_pct(self):
        result = positive_metrics(listing_fixture({"A": [80], "B": [10], "C": [10]}, 8))
        self.assertAlmostEqual(result["top_shop_share"], 0.8)
        self.assertEqual(result["positive_shop_count"], 3)
        self.assertAlmostEqual(result["positive_shop_pct"], 3 / 8)

    def test_missing_history_remains_missing(self):
        frame = listing_fixture({"A": [1]}, 8)
        frame["velocity_30d"] = pd.NA
        result = positive_metrics(frame)
        self.assertIsNone(result["positive_shop_pct"])
        self.assertIsNone(result["median_positive_velocity_30d"])

    def test_confidence_penalizes_short_interval(self):
        short = confidence_score(12, 12, 8, 5, 4, 2)
        long = confidence_score(12, 12, 8, 5, 14, 2)
        self.assertLess(short, long)

    def test_viral_shop_ranks_below_distributed_growth(self):
        viral = positive_metrics(listing_fixture({"A": [80], "B": [5], "C": [5]}, 10))
        broad = positive_metrics(listing_fixture({"A": [10], "B": [10], "C": [10], "D": [10], "E": [10]}, 10))
        for metrics in (viral, broad):
            metrics.update({"sample_size": 10, "unique_shop_count": 10, "median_price": 24, "newer_listing_success_rate": None})
        self.assertLess(market_signal_score(viral), market_signal_score(broad))

    def test_high_ip_penalty(self):
        base = {"sample_size": 10, "unique_shop_count": 8, "top_shop_share": .2, "median_price": 24,
                "newer_listing_success_rate": None, "personalization_fit_score": 90, "production_fit_score": 90}
        low = entry_opportunity_score({**base, "ip_risk": "LOW"})
        high = entry_opportunity_score({**base, "ip_risk": "HIGH"})
        self.assertLess(high, low / 2)

    def test_rank_stability(self):
        self.assertEqual(rank_stability(2, 2, 10), 100)
        self.assertLess(rank_stability(2, 8, 10), 50)


class PersistenceTests(unittest.TestCase):
    def healthy(self, total=50, breadth=.6, share=.25):
        return {"paired_listing_count": 5, "positive_shop_pct": breadth, "positive_shop_count": 5,
                "total_positive_velocity_30d": total, "top_shop_share": share, "elapsed_days": 8}

    def test_signal_and_breadth_retention(self):
        raw, capped = signal_retention(50, 40)
        self.assertAlmostEqual(raw, .8)
        self.assertAlmostEqual(capped, .8)
        self.assertAlmostEqual(positive_shop_breadth_retention(.7, .35), .5)

    def test_concentration_stability(self):
        delta, score = concentration_stability(.25, .50)
        self.assertAlmostEqual(delta, .25)
        self.assertEqual(score, 50)

    def test_one_interval_is_unvalidated_and_score_missing(self):
        result = persistence_metrics([self.healthy()])
        self.assertEqual(result["persistence_status"], "UNVALIDATED")
        self.assertIsNone(result["PersistenceScore"])

    def test_none_interval_metric_is_invalid(self):
        missing = self.healthy()
        missing["positive_shop_pct"] = None
        result = persistence_metrics([missing, self.healthy()])
        self.assertEqual(result["valid_interval_count"], 1)
        self.assertIsNone(result["PersistenceScore"])

    def test_nan_interval_metric_is_invalid(self):
        missing = self.healthy()
        missing["positive_shop_pct"] = float("nan")
        result = persistence_metrics([missing, self.healthy()])
        self.assertEqual(result["valid_interval_count"], 1)
        self.assertIsNone(result["PersistenceScore"])

    def test_zero_matched_listings_do_not_increment_valid_count(self):
        zero_matches = self.healthy(total=0, breadth=0, share=None)
        zero_matches["paired_listing_count"] = 0
        result = persistence_metrics([zero_matches])
        self.assertEqual(result["valid_interval_count"], 0)

    def test_zero_match_t0_t1_cannot_receive_t2_persistence_score(self):
        zero_matches = self.healthy(total=0, breadth=0, share=None)
        zero_matches["paired_listing_count"] = 0
        result = persistence_metrics([zero_matches, self.healthy()], 100)
        self.assertEqual(result["valid_interval_count"], 1)
        self.assertEqual(result["persistence_status"], "UNVALIDATED")
        self.assertIsNone(result["PersistenceScore"])

    def test_valid_numeric_intervals_still_score(self):
        result = persistence_metrics([self.healthy(45, .6, .25), self.healthy(48, .58, .24)], 95)
        self.assertEqual(result["valid_interval_count"], 2)
        self.assertIsNotNone(result["PersistenceScore"])

    def test_strong_then_zero_collapses(self):
        result = persistence_metrics([self.healthy(), self.healthy(total=0, breadth=0, share=None)])
        self.assertEqual(result["persistence_status"], "COLLAPSED")

    def test_persistent_moderate_growth_across_three_intervals(self):
        result = persistence_metrics([self.healthy(45, .6, .25), self.healthy(48, .58, .24), self.healthy(46, .57, .23)], 95)
        self.assertEqual(result["persistence_status"], "PERSISTENT")
        self.assertGreaterEqual(result["PersistenceScore"], 65)

    def test_rising_concentration_is_volatile(self):
        result = persistence_metrics([self.healthy(50, .6, .2), self.healthy(55, .6, .75)])
        self.assertEqual(result["persistence_status"], "VOLATILE")


class VerdictAndRegressionTests(unittest.TestCase):
    def test_tiny_sample_is_not_deep_scan(self):
        scored = score_seed(seed(), listing_fixture({"A": [10], "B": [10]}, 4), [
            {"paired_listing_count": 2, "positive_shop_pct": .5, "positive_shop_count": 2, "total_positive_velocity_30d": 20, "top_shop_share": .5, "elapsed_days": 14}
        ])
        self.assertEqual(scored["verdict"], "RECHECK")

    def test_high_growth_high_ip_is_rejected(self):
        scored = score_seed(seed("HIGH"), listing_fixture({"A": [20], "B": [20], "C": [20]}, 10, "Jurassic shirt"), [])
        self.assertEqual(scored["verdict"], "REJECT")

    def test_weak_market_with_many_listings_not_validated(self):
        scored = score_seed(seed(), listing_fixture({f"S{i}": [0] for i in range(10)}), [
            {"paired_listing_count": 10, "positive_shop_pct": 0, "positive_shop_count": 0, "total_positive_velocity_30d": 0, "top_shop_share": None, "elapsed_days": 14}
        ])
        self.assertNotEqual(scored["verdict"], "VALIDATED_DEEP_SCAN")

    def test_gamer_dinosaur_monster_patterns_not_validated(self):
        viral = score_seed(seed(), listing_fixture({"A": [80], "B": [5]}, 10), [])
        dinosaur = score_seed(seed("HIGH"), listing_fixture({"A": [80], "B": [5]}, 10, "Jurassic"), [])
        collapsed = persistence_metrics([
            {"paired_listing_count": 10, "positive_shop_pct": .7, "positive_shop_count": 7, "total_positive_velocity_30d": 80, "top_shop_share": .25, "elapsed_days": 14},
            {"paired_listing_count": 10, "positive_shop_pct": 0, "positive_shop_count": 0, "total_positive_velocity_30d": 0, "top_shop_share": None, "elapsed_days": 14},
        ])
        self.assertNotEqual(viral["verdict"], "VALIDATED_DEEP_SCAN")
        self.assertEqual(dinosaur["verdict"], "REJECT")
        self.assertEqual(collapsed["persistence_status"], "COLLAPSED")

    def test_snapshot_is_immutable(self):
        seeds = pd.DataFrame([seed()])
        raw = listing_fixture({"A": [1], "B": [0]}, 8)
        raw["macro_segment"] = "Test"
        with tempfile.TemporaryDirectory() as tmp:
            write_snapshot(tmp, "2026-09-08", seeds, raw, 10, source="test")
            with self.assertRaises(FileExistsError):
                write_snapshot(tmp, "2026-09-08", seeds, raw, 10, source="test")


if __name__ == "__main__":
    unittest.main()
