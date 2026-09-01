import sqlite3
import unittest

from history_boundary import (
    CLEAN_HISTORY_ENV,
    HistoryBoundaryError,
    load_clean_recheck_cohort,
)


class RecheckCohortTests(unittest.TestCase):
    def setUp(self):
        self.conn = sqlite3.connect(":memory:")
        self.conn.execute(
            """
            CREATE TABLE scan_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                scan_id TEXT,
                niche TEXT,
                url TEXT,
                listing_id TEXT,
                rank INTEGER,
                saturation_count INTEGER
            )
            """
        )
        self._insert_scan("older-complete", {"niche-a": 15, "niche-b": 15})
        self._insert_scan("clean-incomplete", {"niche-a": 9, "niche-b": 4})
        self._insert_scan("later-partial-recheck", {"niche-a": 3, "niche-b": 1})

    def tearDown(self):
        self.conn.close()

    def _insert_scan(self, scan_id, niche_counts):
        for niche, count in niche_counts.items():
            for rank in range(1, count + 1):
                listing_id = f"{scan_id}-{niche}-{rank}"
                self.conn.execute(
                    """
                    INSERT INTO scan_history (
                        scan_id, niche, url, listing_id, rank, saturation_count
                    ) VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (
                        scan_id,
                        niche,
                        f"https://example.test/listing/{listing_id}",
                        listing_id,
                        rank,
                        1000 + rank,
                    ),
                )
        self.conn.commit()

    def _load(self, scan_id="clean-incomplete"):
        return load_clean_recheck_cohort(
            self.conn,
            {CLEAN_HISTORY_ENV: scan_id},
        )

    def test_incomplete_clean_baseline_is_selected(self):
        scan_id, rows = self._load()
        counts = {}
        for niche, *_ in rows:
            counts[niche] = counts.get(niche, 0) + 1

        self.assertEqual(scan_id, "clean-incomplete")
        self.assertEqual(counts, {"niche-a": 9, "niche-b": 4})

    def test_older_complete_scan_is_not_selected(self):
        scan_id, rows = self._load()

        self.assertEqual(scan_id, "clean-incomplete")
        self.assertEqual(len(rows), 13)
        self.assertTrue(all("older-complete" not in row[2] for row in rows))

    def test_later_partial_recheck_does_not_replace_baseline(self):
        scan_id, rows = self._load()

        self.assertEqual(scan_id, "clean-incomplete")
        self.assertEqual(len(rows), 13)
        self.assertTrue(all("later-partial-recheck" not in row[2] for row in rows))

    def test_missing_environment_variable_fails_clearly(self):
        with self.assertRaisesRegex(HistoryBoundaryError, CLEAN_HISTORY_ENV):
            load_clean_recheck_cohort(self.conn, {})

    def test_unknown_clean_scan_id_fails_clearly(self):
        with self.assertRaisesRegex(HistoryBoundaryError, "not found"):
            self._load("unknown-scan")

    def test_all_baseline_rows_and_fields_are_returned_without_duplicates(self):
        _, rows = self._load()
        keys = [(row[0], row[2]) for row in rows]

        self.assertEqual(len(rows), 13)
        self.assertEqual(len(keys), len(set(keys)))
        self.assertTrue(all(row[1].startswith("https://") for row in rows))
        self.assertEqual({row[3] for row in rows if row[0] == "niche-b"}, {1, 2, 3, 4})
        self.assertTrue(all(row[4] is not None for row in rows))


if __name__ == "__main__":
    unittest.main()
