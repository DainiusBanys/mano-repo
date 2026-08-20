"""Explainable V2 momentum metrics built from existing review history."""

from __future__ import annotations

from statistics import median

import pandas as pd


STRONG_VELOCITY_THRESHOLD = 3.0
WINDOW_DAYS = 30


def calculate_acceleration(previous_velocity, current_velocity):
    """Return raw and relative acceleration; preserve missing history as None."""
    if previous_velocity is None or current_velocity is None:
        return None, None
    acceleration = current_velocity - previous_velocity
    denominator = previous_velocity + 1
    ratio = None if denominator == 0 else (current_velocity + 1) / denominator
    return acceleration, ratio


def calculate_breadth(records, strong_threshold=STRONG_VELOCITY_THRESHOLD):
    """Aggregate listing velocities into independent-shop breadth metrics."""
    shop_velocities = {}
    for record in records:
        shop = record.get("shop_name")
        velocity = record.get("current_velocity")
        if not shop:
            continue
        shop_velocities.setdefault(shop, [])
        if velocity is not None:
            shop_velocities[shop].append(float(velocity))

    total_shops = len(shop_velocities)
    if total_shops == 0:
        return {
            "breadth_total_shops": 0,
            "breadth_positive_shops": None,
            "breadth_positive_ratio": None,
            "breadth_strong_shops": None,
        }

    if not any(values for values in shop_velocities.values()):
        return {
            "breadth_total_shops": total_shops,
            "breadth_positive_shops": None,
            "breadth_positive_ratio": None,
            "breadth_strong_shops": None,
        }

    positive = sum(any(value > 0 for value in values) for values in shop_velocities.values())
    strong = sum(
        any(value >= strong_threshold for value in values)
        for values in shop_velocities.values()
    )
    return {
        "breadth_total_shops": total_shops,
        "breadth_positive_shops": positive,
        "breadth_positive_ratio": positive / total_shops,
        "breadth_strong_shops": strong,
    }


def _window_velocity(group, start, end):
    window = group[(group["timestamp"] >= start) & (group["timestamp"] <= end)]
    window = window.sort_values("timestamp").drop_duplicates("timestamp", keep="last")
    if len(window) < 2:
        return None
    first = window.iloc[0]
    last = window.iloc[-1]
    elapsed_days = (last["timestamp"] - first["timestamp"]).total_seconds() / 86400
    if elapsed_days <= 0:
        return None
    return (float(last["review_count"]) - float(first["review_count"])) / elapsed_days * WINDOW_DAYS


def build_listing_momentum(history):
    """Calculate current/previous 30-day rates for each niche-listing pair."""
    if history.empty:
        return pd.DataFrame()

    frame = history.copy()
    frame["timestamp"] = pd.to_datetime(frame["timestamp"], utc=True, errors="coerce")
    frame = frame.dropna(subset=["timestamp", "listing_id", "niche", "review_count"])
    output = []

    for (niche, listing_id), group in frame.groupby(["niche", "listing_id"], sort=False):
        group = group.sort_values("timestamp")
        anchor = group["timestamp"].max()
        current_start = anchor - pd.Timedelta(days=WINDOW_DAYS)
        previous_start = anchor - pd.Timedelta(days=WINDOW_DAYS * 2)
        current = _window_velocity(group, current_start, anchor)
        previous = _window_velocity(group, previous_start, current_start)
        acceleration, ratio = calculate_acceleration(previous, current)
        latest = group.iloc[-1]
        shop_name = latest.get("shop_name")
        if pd.isna(shop_name) or not str(shop_name).strip():
            known = group["shop_name"].dropna() if "shop_name" in group else pd.Series(dtype=object)
            shop_name = known.iloc[-1] if not known.empty else None
        output.append(
            {
                "niche": niche,
                "listing_id": str(listing_id),
                "shop_name": shop_name,
                "current_velocity": current,
                "previous_velocity": previous,
                "review_acceleration": acceleration,
                "acceleration_ratio": ratio,
            }
        )
    return pd.DataFrame(output)


def _optional_sum(values):
    clean = [float(value) for value in values if pd.notna(value)]
    return sum(clean) if clean else None


def _optional_median(values):
    clean = [float(value) for value in values if pd.notna(value)]
    return median(clean) if clean else None


def _normalise(values):
    """Min-max normalise available values to 0..100; a tie is neutral 50."""
    clean = [float(value) for value in values if pd.notna(value)]
    if not clean:
        return [None] * len(values)
    low, high = min(clean), max(clean)
    if high == low:
        return [50.0 if pd.notna(value) else None for value in values]
    return [
        (float(value) - low) / (high - low) * 100 if pd.notna(value) else None
        for value in values
    ]


def add_v2_scores(summary):
    """Add explainable components and a breadth-capped Opportunity Score V2."""
    if summary.empty:
        return summary.copy()
    result = summary.copy()
    result["velocity_component"] = _normalise(result["median_review_velocity_30d"])
    result["acceleration_component"] = _normalise(result["median_acceleration"])
    result["breadth_component"] = result["positive_shop_ratio"].apply(
        lambda value: float(value) * 100 if pd.notna(value) else None
    )

    scores = []
    for _, row in result.iterrows():
        velocity = row["velocity_component"]
        breadth = row["breadth_component"]
        if pd.isna(velocity) or pd.isna(breadth):
            scores.append(None)
            continue
        acceleration = row["acceleration_component"]
        # Missing 60-day history is neutral in V2; the raw acceleration remains None.
        acceleration = 50.0 if pd.isna(acceleration) else float(acceleration)
        base = 0.50 * float(velocity) + 0.25 * acceleration + 0.25 * float(breadth)
        # A narrow one-shop signal is capped even if its velocity is very large.
        breadth_guard = 0.25 + 0.75 * float(row["positive_shop_ratio"])
        scores.append(base * breadth_guard)
    result["opportunity_score_v2"] = scores
    return result


def build_keyword_momentum(history, v1_by_niche=None, strong_threshold=STRONG_VELOCITY_THRESHOLD):
    """Return one keyword-level row with raw signals and V1/V2 scores."""
    listings = build_listing_momentum(history)
    if listings.empty:
        return pd.DataFrame()
    v1_by_niche = v1_by_niche or {}
    rows = []

    for niche, group in listings.groupby("niche", sort=False):
        records = group.to_dict("records")
        breadth = calculate_breadth(records, strong_threshold)
        known_acceleration = group[group["review_acceleration"].notna()]
        accelerating = known_acceleration[known_acceleration["review_acceleration"] > 0]
        acceleration_available = not known_acceleration.empty
        known_shop_listings = int(group["shop_name"].notna().sum())
        rows.append(
            {
                "keyword": niche,
                "listings_count": group["listing_id"].nunique(),
                "shops_count": breadth["breadth_total_shops"],
                "shop_data_coverage": known_shop_listings / group["listing_id"].nunique(),
                "total_review_velocity_30d": _optional_sum(group["current_velocity"]),
                "median_review_velocity_30d": _optional_median(group["current_velocity"]),
                "total_previous_velocity_30d": _optional_sum(group["previous_velocity"]),
                "median_previous_velocity_30d": _optional_median(group["previous_velocity"]),
                "positive_velocity_shops": breadth["breadth_positive_shops"],
                "positive_shop_ratio": breadth["breadth_positive_ratio"],
                "strong_velocity_shops": breadth["breadth_strong_shops"],
                "median_acceleration": _optional_median(group["review_acceleration"]),
                "median_acceleration_ratio": _optional_median(group["acceleration_ratio"]),
                "accelerating_listings_count": int(len(accelerating)) if acceleration_available else None,
                "accelerating_shop_count": (
                    int(accelerating["shop_name"].dropna().nunique())
                    if acceleration_available else None
                ),
                "opportunity_score_v1": v1_by_niche.get(niche),
            }
        )
    return add_v2_scores(pd.DataFrame(rows))
