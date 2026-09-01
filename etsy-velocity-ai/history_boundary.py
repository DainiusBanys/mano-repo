"""Resolve the first trustworthy scan without changing the SQLite schema."""

from __future__ import annotations

import os


CLEAN_HISTORY_ENV = "VELOCITY_CLEAN_SCAN_ID"


class HistoryBoundaryError(ValueError):
    """Raised when clean-history analysis cannot be safely started."""


def get_clean_history_scan_id(environ=None):
    """Return the configured clean DISCOVER scan ID or fail closed."""
    environ = os.environ if environ is None else environ
    scan_id = environ.get(CLEAN_HISTORY_ENV, "").strip()
    if not scan_id:
        raise HistoryBoundaryError(
            f"Set {CLEAN_HISTORY_ENV} to the clean DISCOVER scan_id before analysis."
        )
    return scan_id


def resolve_clean_history_start_id(conn, scan_id):
    """Return the first row ID of the clean scan, preserving older rows for audit."""
    row = conn.execute(
        "SELECT MIN(id) FROM scan_history WHERE scan_id = ?",
        (scan_id,),
    ).fetchone()
    start_id = row[0] if row else None
    if start_id is None:
        raise HistoryBoundaryError(f"Clean DISCOVER scan_id not found: {scan_id}")
    return int(start_id)


def load_clean_recheck_cohort(conn, environ=None):
    """Load the original clean DISCOVER cohort for every RECHECK."""
    scan_id = get_clean_history_scan_id(environ)
    resolve_clean_history_start_id(conn, scan_id)
    rows = conn.execute(
        """
        WITH baseline_rows AS (
            SELECT id, niche, url, listing_id, rank, saturation_count,
                   ROW_NUMBER() OVER (
                       PARTITION BY niche, listing_id
                       ORDER BY id
                   ) AS cohort_row
            FROM scan_history
            WHERE scan_id = ?
        )
        SELECT niche, url, listing_id, rank, saturation_count
        FROM baseline_rows
        WHERE cohort_row = 1
        ORDER BY niche, rank, id
        """,
        (scan_id,),
    ).fetchall()
    return scan_id, rows


def ensure_scans_are_clean(conn, scan_ids, start_id):
    """Reject explicitly selected scans that begin before the clean boundary."""
    for scan_id in scan_ids:
        row = conn.execute(
            "SELECT MIN(id) FROM scan_history WHERE scan_id = ?",
            (scan_id,),
        ).fetchone()
        scan_start_id = row[0] if row else None
        if scan_start_id is None:
            raise HistoryBoundaryError(f"Scan ID not found: {scan_id}")
        if int(scan_start_id) < start_id:
            raise HistoryBoundaryError(
                f"Scan {scan_id} is older than the clean history boundary."
            )
