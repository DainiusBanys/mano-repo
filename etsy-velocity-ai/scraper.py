import asyncio
import json
import re
import sqlite3
import uuid
import random
import logging
from datetime import datetime, UTC
from playwright.async_api import async_playwright

# --- CONFIG ---
DB = "velocity.db"
MODE = "RECHECK"  # "DISCOVER" or "RECHECK"
SCAN_ID = f"{datetime.now(UTC).isoformat()}_{uuid.uuid4().hex[:6]}"
TARGET_PER_NICHE = 15
MAX_KEYWORDS = 15      
MIN_REVIEWS = 5      
MAX_REVIEWS = 1500   

TRADEMARK_RISK = ['disney', 'marvel', 'star wars', 'bluey', 'pokemon', 'nintendo', 'barbie', 'harry potter', 'paw patrol']

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger(__name__)


def shop_name_from_href(href):
    match = re.search(r"/shop/([^/?#]+)", href or "", re.IGNORECASE)
    return match.group(1) if match else None

def init_db():
    conn = sqlite3.connect(DB)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS scan_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT, scan_id TEXT, niche TEXT, url TEXT, 
        listing_id TEXT, title TEXT, price REAL, review_count INTEGER, rank INTEGER, 
        timestamp TEXT, saturation_count INTEGER, risk_score INTEGER DEFAULT 0,
        shop_name TEXT
    )""")
    existing_columns = {
        row[1] for row in conn.execute("PRAGMA table_info(scan_history)").fetchall()
    }
    if "risk_score" not in existing_columns:
        conn.execute("ALTER TABLE scan_history ADD COLUMN risk_score INTEGER DEFAULT 0")
    if "shop_name" not in existing_columns:
        conn.execute("ALTER TABLE scan_history ADD COLUMN shop_name TEXT")
    conn.commit()
    return conn

# ---------- NAVIGATION MODULES ----------

async def handle_popups(page):
    try:
        btn = page.locator('button[data-gdpr-single-choice-accept="true"], button:has-text("Accept")').first
        if await btn.count() > 0: 
            await asyncio.sleep(random.uniform(1.0, 2.0)) 
            await btn.click(timeout=3000)
    except: pass

async def human_scroll(page, depth_multiplier=1):
    scrolls = random.randint(3, 6) * depth_multiplier
    for _ in range(scrolls):
        await page.mouse.wheel(0, random.randint(300, 800))
        await asyncio.sleep(random.uniform(1.5, 3.0))
    await page.mouse.wheel(0, -random.randint(500, 1000))
    await asyncio.sleep(random.uniform(1.0, 2.0))

# ---------- THE DOM-RIPPER EXTRACTOR ----------

async def extract_item_data(page):
    title = "Unknown"
    price = 0.0
    reviews = 0
    shop_name = None
    has_listing_review_section = False

    # 1. Force a strict wait for the EXACT class you identified
    try:
        await page.wait_for_selector(".wt-text-body-smaller.wt-sem-text-tertiary", state="attached", timeout=3000)
    except: pass # Proceed anyway if it times out

    # 2. Title
    try:
        title_loc = page.locator("h1").first
        title_raw = await title_loc.text_content()
        if title_raw: title = title_raw.strip()
    except: pass

    # 3. Price
    try:
        price_loc = page.locator('div[data-buy-box-region="price"] p.wt-text-title-03, .lc-price').first
        if await price_loc.count() > 0:
            p_text = await price_loc.text_content()
            if p_text:
                m = re.search(r'(\d+\.\d{2})|(\d+)', p_text.replace(',', '.'))
                if m: price = float(m.group(0))
    except: pass

    # 4. Reviews - listing-specific CSS and review section only
    try:
        review_section = page.locator("#reviews")
        has_listing_review_section = await review_section.count() > 0
        locators = page.locator('.wt-text-body-smaller.wt-sem-text-tertiary, #reviews')
        count = await locators.count()
        
        for i in range(count):
            # text_content() grabs raw text directly from the HTML tree, bypassing CSS hiding
            text = await locators.nth(i).text_content() 
            if not text: continue
            
            clean = text.replace('\n', '').replace('\r', '').strip()
            
            # Ultra-forgiving Regex: Matches English, Lithuanian, and isolated numbers in parentheses
            m = re.search(r'\(?\s*([\d][\d,.]*[kK]?)\s*\)?\s*(?:review|atsiliepim|įvertinim)', clean, re.IGNORECASE)
            
            # Absolute Fallback: If it's the exact class, just pull the digits inside the parentheses
            if not m:
                m = re.search(r'\(\s*([\d,.]+[kK]?)\s*[^)]*\)', clean)

            if m:
                val_str = m.group(1).lower().replace(',', '')
                val = int(float(val_str.replace('k', '')) * 1000) if 'k' in val_str else int(val_str)
                # Cap it at 3000 to avoid shop-total pollution
                if 0 < val < 3000:
                    reviews = val
                    break
    except: pass

    # 5. Structured-data fallback is valid only when this listing has a review section.
    if reviews == 0 and has_listing_review_section:
        try:
            scripts = await page.locator('script[type="application/ld+json"]').all_text_contents()
            for script in scripts:
                data = json.loads(script)
                items = data if isinstance(data, list) else [data]
                for item in items:
                    rating = item.get("aggregateRating", {}) if isinstance(item, dict) else {}
                    count = rating.get("reviewCount")
                    if count is not None and int(count) > 0:
                        reviews = int(count)
                        break
                if reviews > 0:
                    break
        except: pass

    # 6. Shop name from Etsy's canonical /shop/<name> link.
    try:
        shop_links = page.locator('a[href*="/shop/"]')
        for i in range(await shop_links.count()):
            href = await shop_links.nth(i).get_attribute("href")
            shop_name = shop_name_from_href(href)
            if shop_name:
                break
    except: pass

    return {"reviews": reviews, "price": price, "title": title, "shop_name": shop_name}

async def get_saturation_count(page):
    try:
        return await page.evaluate("""() => {
            const container = document.querySelector('[data-result-info]');
            if (container) {
                const matches = container.innerText.match(/[\\d,.]+/g);
                if (matches) {
                    const nums = matches.map(m => parseInt(m.replace(/[,.]/g, '')));
                    return Math.max(...nums);
                }
            }
            return 0;
        }""")
    except: return 0

# ---------- MAIN ENGINE ----------

def get_latest_scan_rows(conn):
    scan_ids = conn.execute(
        """SELECT scan_id
           FROM scan_history
           WHERE scan_id != ?
           GROUP BY scan_id
           ORDER BY MAX(id) DESC""",
        (SCAN_ID,),
    ).fetchall()
    if not scan_ids:
        return None, []

    def load_rows(scan_id):
        return conn.execute("""
            SELECT niche, url, listing_id, rank, saturation_count
            FROM scan_history
            WHERE scan_id = ?
            ORDER BY niche, rank, id
        """, (scan_id,)).fetchall()

    latest_scan_id = scan_ids[0][0]
    latest_rows = load_rows(latest_scan_id)
    expected_niches = {row[0] for row in latest_rows}

    previous_scan_id = latest_scan_id
    rows = latest_rows
    for (candidate_scan_id,) in scan_ids:
        candidate_rows = load_rows(candidate_scan_id)
        niche_counts = {}
        for row in candidate_rows:
            niche_counts[row[0]] = niche_counts.get(row[0], 0) + 1

        if all(niche_counts.get(niche, 0) >= TARGET_PER_NICHE for niche in expected_niches):
            previous_scan_id = candidate_scan_id
            rows = candidate_rows
            break

    selected = []
    niche_counts = {}
    for row in rows:
        niche = row[0]
        if niche not in expected_niches:
            continue
        niche_counts[niche] = niche_counts.get(niche, 0)
        if niche_counts[niche] >= TARGET_PER_NICHE:
            continue
        selected.append(row)
        niche_counts[niche] += 1

    return previous_scan_id, selected


async def recheck_latest_scan(context, conn):
    previous_scan_id, rows = get_latest_scan_rows(conn)
    if not rows:
        log.warning("No previous scan results found to recheck.")
        return

    log.info(f"RECHECK: {len(rows)} listings from scan {previous_scan_id}")

    for i, (niche, url, listing_id, rank, saturation_count) in enumerate(rows, 1):
        item_page = None
        try:
            item_page = await context.new_page()
            try:
                await item_page.goto(url, wait_until="domcontentloaded", timeout=45000)
            except: pass

            await asyncio.sleep(random.uniform(2.0, 4.0))
            await handle_popups(item_page)
            await human_scroll(item_page, depth_multiplier=1)

            d = await extract_item_data(item_page)
            if d['reviews'] == 0:
                log.warning(f"   {i}/{len(rows)} | {listing_id} | 0 reviews - measurement not saved")
                continue

            risk = 1 if any(brand in d['title'].lower() for brand in TRADEMARK_RISK) else 0

            conn.execute("""
                INSERT INTO scan_history (scan_id, niche, url, listing_id, title, price, review_count, rank, timestamp, saturation_count, risk_score, shop_name)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
            """, (SCAN_ID, niche, url, listing_id, d['title'][:100], d['price'], d['reviews'], rank,
                  datetime.now(UTC).isoformat(), saturation_count, risk, d['shop_name']))
            conn.commit()
            log.info(f"   {i}/{len(rows)} | {listing_id} | {d['reviews']} reviews")
        except Exception as e:
            log.error(f"   Recheck {listing_id} Error: {e}")
        finally:
            if item_page:
                await item_page.close()
                await asyncio.sleep(random.uniform(1.0, 2.0))


async def run():
    conn = init_db()
    keywords = [
        "personalized gamer birthday shirt",
        "personalized dinosaur birthday shirt",
        "personalized construction birthday shirt",
        "personalized space birthday shirt",
        "personalized race car birthday shirt",
        "personalized monster truck birthday shirt",
        "personalized train birthday shirt",
        "personalized farm birthday shirt",
        "personalized fishing birthday shirt",
        "personalized soccer birthday shirt",
        "personalized basketball birthday shirt",
        "personalized robot birthday shirt",
        "personalized camping birthday shirt",
        "personalized animal birthday shirt",
    ]
    seen_ids = set()

    async with async_playwright() as p:
        try:
            browser = await p.chromium.connect_over_cdp("http://localhost:9222")
            context = browser.contexts[0]
        except Exception as e:
            log.error(f"❌ Connection Error. Is Chrome running on 9222? {e}")
            conn.close()
            return

        if MODE == "RECHECK":
            await recheck_latest_scan(context, conn)
            conn.close()
            log.info("RECHECK complete.")
            return
        if MODE != "DISCOVER":
            conn.close()
            raise ValueError('MODE must be "DISCOVER" or "RECHECK"')

        for niche in keywords:
            log.info(f"\n🌟 STROLLING THROUGH: {niche}")
            page = await context.new_page()
            try:
                await page.goto("https://www.etsy.com", wait_until="domcontentloaded", timeout=60000)
                await asyncio.sleep(random.uniform(2.0, 4.0))
                await handle_popups(page)
                
                search_box = page.locator("input[data-id='search-query']")
                await search_box.click()
                await asyncio.sleep(random.uniform(0.5, 1.5))
                
                await search_box.type(niche, delay=random.randint(150, 350))
                await asyncio.sleep(random.uniform(1.0, 2.0))
                await page.keyboard.press("Enter")
                
                await page.wait_for_selector("a[href*='/listing/']", timeout=30000)
                await asyncio.sleep(random.uniform(3.0, 5.0))
                
                await human_scroll(page, depth_multiplier=1)
                
                n_total = await get_saturation_count(page)
                
                links = await page.locator("a[href*='/listing/']").all()
                urls = []
                for link in links:
                    href = await link.get_attribute("href")
                    if href: urls.append(href.split('?')[0])
                
                urls = list(dict.fromkeys(urls))
                log.info(f"🔎 Comp: {n_total} | Listings Found: {len(urls)}")

                saved = 0
                for i, url in enumerate(urls, 1):
                    if saved >= TARGET_PER_NICHE: break
                    l_id = (re.search(r'/listing/(\d+)', url) or re.search(r'(\d+)', url)).group(1)
                    if l_id in seen_ids: continue
                    
                    item_page = None
                    try:
                        item_page = await context.new_page()
                        
                        try:
                            await item_page.goto(url, wait_until="domcontentloaded", timeout=45000)
                        except: pass 
                            
                        await asyncio.sleep(random.uniform(2.0, 4.0)) 
                        await handle_popups(item_page)
                        
                        await human_scroll(item_page, depth_multiplier=1)
                        
                        d = await extract_item_data(item_page)

                        if d['reviews'] >= MIN_REVIEWS and d['reviews'] <= MAX_REVIEWS:
                            risk = 1 if any(brand in d['title'].lower() for brand in TRADEMARK_RISK) else 0
                            seen_ids.add(l_id); saved += 1
                            conn.execute("""
                                INSERT INTO scan_history (scan_id, niche, url, listing_id, title, price, review_count, rank, timestamp, saturation_count, risk_score, shop_name) 
                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
                            """, (SCAN_ID, niche, url, l_id, d['title'][:100], d['price'], d['reviews'], i, datetime.now(UTC).isoformat(), n_total, risk, d['shop_name']))
                            conn.commit()
                            log.info(f"   [{'⚠️ RISK' if risk else '✅ SAFE'}] {saved}/{TARGET_PER_NICHE} | {d['reviews']} rev | ${d['price']}")
                        else:
                            log.info(f"   ⏩ Skip Rank {i}: {d['reviews']} reviews (Out of range)")
                            
                    except Exception as e: log.error(f"   ❌ Rank {i} Error: {e}")
                    finally:
                        if item_page: 
                            await item_page.close()
                            await asyncio.sleep(random.uniform(1.0, 2.0))
            finally: await page.close()

    conn.close(); log.info("🏁 All tasks complete.")

if __name__ == "__main__":
    asyncio.run(run())
