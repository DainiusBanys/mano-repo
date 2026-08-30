import sqlite3
import unittest

from history_boundary import (
    CLEAN_HISTORY_ENV,
    HistoryBoundaryError,
    ensure_scans_are_clean,
    get_clean_history_scan_id,
    resolve_clean_history_start_id,
)


class HistoryBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.conn = sqlite3.connect(":memory:")
        self.conn.execute(
            "CREATE TABLE scan_history (id INTEGER PRIMARY KEY, scan_id TEXT)"
        )
        self.conn.executemany(
            "INSERT INTO scan_history (id, scan_id) VALUES (?, ?)",
            [(1, "dirty"), (2, "dirty"), (3, "clean"), (4, "clean"), (5, "recheck")],
        )

    def tearDown(self):
        self.conn.close()

    def test_configuration_is_required(self):
        with self.assertRaises(HistoryBoundaryError):
            get_clean_history_scan_id({})

    def test_configuration_returns_clean_scan_id(self):
        self.assertEqual(
            get_clean_history_scan_id({CLEAN_HISTORY_ENV: " clean "}),
            "clean",
        )

    def test_boundary_resolves_to_first_row_of_clean_scan(self):
        self.assertEqual(resolve_clean_history_start_id(self.conn, "clean"), 3)

    def test_unknown_boundary_fails_closed(self):
        with self.assertRaises(HistoryBoundaryError):
            resolve_clean_history_start_id(self.conn, "missing")

    def test_scan_before_boundary_is_rejected(self):
        with self.assertRaises(HistoryBoundaryError):
            ensure_scans_are_clean(self.conn, ("dirty", "recheck"), 3)

    def test_scans_from_boundary_onward_are_allowed(self):
        ensure_scans_are_clean(self.conn, ("clean", "recheck"), 3)


if __name__ == "__main__":
    unittest.main()
