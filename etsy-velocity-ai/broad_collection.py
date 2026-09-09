"""Live Etsy collection for Broad Scanner snapshots."""

from __future__ import annotations

import asyncio
import random
import re
from datetime import UTC, datetime
from urllib.parse import quote_plus

import pandas as pd
from playwright.async_api import async_playwright

from scraper import extract_item_data, get_saturation_count, handle_popups, human_scroll


async def collect_broad_listings(seeds, target_per_seed=10, cdp_url="http://localhost:9222"):
    rows = []
    async with async_playwright() as playwright:
        try:
            browser = await playwright.chromium.connect_over_cdp(cdp_url)
            context = browser.contexts[0]
        except Exception as exc:
            raise RuntimeError(f"Cannot connect to Chrome at {cdp_url}. Start the existing Etsy Chrome profile first.") from exc

        reusable_pages = [
            page for page in context.pages
            if page.url.startswith("https://www.etsy.com/") and not page.url.startswith("blob:")
        ]
        work_page = reusable_pages[0] if reusable_pages else await context.new_page()
        owns_work_page = not reusable_pages
        try:
            for seed_number, seed in enumerate(seeds.to_dict("records"), 1):
                query = seed["query"]
                print(f"BROAD {seed_number}/{len(seeds)} | {query}", flush=True)
                await work_page.goto(
                    f"https://www.etsy.com/search?q={quote_plus(query)}",
                    wait_until="domcontentloaded",
                    timeout=60000,
                )
                await asyncio.sleep(random.uniform(1.5, 2.5))
                await handle_popups(work_page)
                body_text = await work_page.locator("body").inner_text(timeout=10000)
                if "Verification Required" in body_text or "secure your access" in body_text:
                    raise RuntimeError(
                        "Etsy verification is required in the Chrome profile. "
                        "Complete it manually, then rerun the unchanged snapshot date."
                    )
                await work_page.wait_for_selector("a[href*='/listing/']", timeout=30000)
                await asyncio.sleep(random.uniform(2.0, 3.0))
                await human_scroll(work_page)
                saturation = await get_saturation_count(work_page)
                hrefs = await work_page.locator("a[href*='/listing/']").evaluate_all("els => els.map(e => e.href)")
                urls = list(dict.fromkeys(href.split("?")[0] for href in hrefs if "/listing/" in href))
                saved = 0
                seen_query_ids = set()
                for result_rank, url in enumerate(urls, 1):
                    if saved >= target_per_seed:
                        break
                    match = re.search(r"/listing/(\d+)", url)
                    if not match or match.group(1) in seen_query_ids:
                        continue
                    listing_id = match.group(1)
                    try:
                        await work_page.goto(url, wait_until="domcontentloaded", timeout=45000)
                    except Exception:
                        pass
                    await asyncio.sleep(random.uniform(1.5, 2.5))
                    await handle_popups(work_page)
                    await human_scroll(work_page)
                    data = await extract_item_data(work_page)
                    if data["reviews"] <= 0:
                        print(f"  skip {listing_id}: invalid/zero reviews", flush=True)
                        continue
                    seen_query_ids.add(listing_id)
                    saved += 1
                    rows.append({
                        "seed_id": seed["seed_id"], "macro_segment": seed["macro_segment"],
                        "query": query, "product_type": seed["product_type"],
                        "personalization_type": seed["personalization_type"], "occasion": seed["occasion"],
                        "listing_id": listing_id, "url": url, "title": data["title"],
                        "price": data["price"], "review_count": data["reviews"],
                        "rank": result_rank, "shop_name": data["shop_name"],
                        "saturation_count": saturation, "collected_at": datetime.now(UTC).isoformat(),
                    })
                    print(f"  saved {saved}/{target_per_seed} | {listing_id} | {data['reviews']} reviews", flush=True)
                    await asyncio.sleep(random.uniform(0.8, 1.5))
        finally:
            if owns_work_page:
                await work_page.close()
    return pd.DataFrame(rows)
