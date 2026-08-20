import unittest

import pandas as pd

from momentum_metrics import add_v2_scores, calculate_acceleration, calculate_breadth
from scraper import shop_name_from_href


class AccelerationTests(unittest.TestCase):
    def test_acceleration_increases(self):
        acceleration, ratio = calculate_acceleration(5, 10)
        self.assertEqual(acceleration, 5)
        self.assertAlmostEqual(ratio, 11 / 6)

    def test_acceleration_decreases(self):
        acceleration, ratio = calculate_acceleration(10, 5)
        self.assertEqual(acceleration, -5)
        self.assertAlmostEqual(ratio, 6 / 11)

    def test_ratio_handles_zero_previous_velocity(self):
        acceleration, ratio = calculate_acceleration(0, 5)
        self.assertEqual(acceleration, 5)
        self.assertEqual(ratio, 6)

    def test_missing_period_stays_missing(self):
        self.assertEqual(calculate_acceleration(None, 5), (None, None))


class BreadthTests(unittest.TestCase):
    def test_positive_shop_ratio(self):
        result = calculate_breadth(
            [
                {"shop_name": "Shop A", "current_velocity": 10},
                {"shop_name": "Shop B", "current_velocity": 5},
                {"shop_name": "Shop C", "current_velocity": 0},
                {"shop_name": "Shop D", "current_velocity": -1},
            ]
        )
        self.assertEqual(result["breadth_total_shops"], 4)
        self.assertEqual(result["breadth_positive_shops"], 2)
        self.assertEqual(result["breadth_positive_ratio"], 0.5)

    def test_breadth_activity_is_missing_without_velocity_history(self):
        result = calculate_breadth(
            [{"shop_name": "Shop A", "current_velocity": None}]
        )
        self.assertEqual(result["breadth_total_shops"], 1)
        self.assertIsNone(result["breadth_positive_shops"])
        self.assertIsNone(result["breadth_positive_ratio"])


class OpportunityV2Tests(unittest.TestCase):
    def test_distributed_momentum_beats_one_viral_shop(self):
        summary = pd.DataFrame(
            [
                {
                    "keyword": "viral",
                    "median_review_velocity_30d": 100,
                    "median_acceleration": 0,
                    "positive_shop_ratio": 0.25,
                },
                {
                    "keyword": "distributed",
                    "median_review_velocity_30d": 12,
                    "median_acceleration": 0,
                    "positive_shop_ratio": 1.0,
                },
            ]
        )
        scored = add_v2_scores(summary).set_index("keyword")
        self.assertGreater(
            scored.loc["distributed", "opportunity_score_v2"],
            scored.loc["viral", "opportunity_score_v2"],
        )


class ShopExtractionTests(unittest.TestCase):
    def test_shop_name_from_canonical_href(self):
        self.assertEqual(
            shop_name_from_href("https://www.etsy.com/shop/ExampleShop?ref=l2-about-shopname"),
            "ExampleShop",
        )


if __name__ == "__main__":
    unittest.main()
