import streamlit as st
import sqlite3
import pandas as pd
import numpy as np
import random

from momentum_metrics import STRONG_VELOCITY_THRESHOLD, build_keyword_momentum

DB = "velocity.db"
st.set_page_config(page_title="Alpha Engine v4", page_icon="🚜", layout="wide")

def get_db(): return sqlite3.connect(DB)

@st.cache_data(ttl=60)
def load_alpha():
    q = """
    WITH latest AS (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY listing_id ORDER BY timestamp DESC) rn,
               COUNT(*) OVER (PARTITION BY listing_id) as confidence
        FROM scan_history
    ),
    stats AS (
        SELECT niche, AVG(review_count) as n_rev, AVG(price) as n_price, MAX(saturation_count) as n_sat 
        FROM latest WHERE rn = 1 GROUP BY niche
    ),
    pairs AS (
        SELECT a.*, (a.review_count - b.review_count) growth, (JULIANDAY(a.timestamp)-JULIANDAY(b.timestamp)) dt,
               s.n_rev, s.n_price, s.n_sat
        FROM latest a JOIN latest b ON a.listing_id = b.listing_id AND a.rn = 1 AND b.rn = 2
        JOIN stats s ON a.niche = s.niche
    ),
    metrics AS (
        SELECT *, growth / MAX(dt, 0.3) as velocity FROM pairs WHERE growth >= 1 
    ),
    n_vel AS ( SELECT niche, AVG(velocity) as avg_v FROM metrics GROUP BY niche )
    SELECT m.*, nv.avg_v, m.velocity / (nv.avg_v + 0.3) as alpha,
           ABS(m.price - m.n_price) / (m.n_price + 0.1) as p_dev
    FROM metrics m JOIN n_vel nv ON m.niche = nv.niche
    """
    try:
        df = pd.read_sql_query(q, get_db())
        if 'risk_score' not in df.columns: df['risk_score'] = 0
        df['opp_score'] = (df['alpha'] * 40) + (np.log10(df['review_count']+1) * 10) - (np.log10(df['n_sat']+10) * 5) - (df['p_dev'] * 15)
        
        def label(row):
            if row['risk_score'] == 1: return "⚠️ TRADEMARK RISK"
            if row['alpha'] > 3 and row['review_count'] < 100: return "🔥 HOT TREND"
            if row['velocity'] > 0.5 and row['review_count'] > 150: return "⚖️ STABLE WINNER"
            return "🧪 EARLY SIGNAL"
        df['label'] = df.apply(label, axis=1)
        return df.sort_values('opp_score', ascending=False)
    except: return pd.DataFrame()


@st.cache_data(ttl=60)
def load_history():
    conn = get_db()
    try:
        columns = {
            row[1] for row in conn.execute("PRAGMA table_info(scan_history)").fetchall()
        }
        shop_select = "shop_name" if "shop_name" in columns else "NULL AS shop_name"
        return pd.read_sql_query(
            f"""
            SELECT niche, listing_id, review_count, timestamp, {shop_select}
            FROM scan_history
            """,
            conn,
        )
    finally:
        conn.close()

# --- DESIGN FACTORY (High-CTR Strategy) ---
THEME_SCENES = {
    "excavator": "dirt piles, orange traffic cones, construction tools",
    "dino": "prehistoric jungle, volcano, footprints",
    "unicorn": "rainbows, sparkling stars, clouds",
    "space": "planets, rocket smoke, moon surface",
    "shark": "ocean waves, coral reef, bubbles"
}

def generate_prompts(row):
    theme = next((k for k in THEME_SCENES.keys() if k in row['title'].lower()), "kids")
    scene = THEME_SCENES.get(theme, "birthday balloons and confetti")
    age, name = random.randint(2, 6), random.choice(["Leo", "Noah", "Oliver", "Emma", "Ava"])
    
    mj = f"playful colorful cartoon {theme} birthday t-shirt design, scene with {scene}, BIG BOLD number '{age}', child name '{name}', vector style, white background --v 6 --style raw"
    dalle = f"A colorful cartoon illustration for a kids birthday shirt. {theme} with {scene}. Massive number '{age}' and name '{name}' integrated. Centered, white background."
    nano = f"Kids birthday shirt, {theme} cartoon with {scene}, big number '{age}', name '{name}', playful colorful style, bold lines, isolated on white"
    
    return {"mj": mj, "dalle": dalle, "nano": nano, "concept": f"{theme.title()} Age {age} ({name})"}

# --- UI ---
st.title("🚜 Alpha Creative Terminal v4")
df = load_alpha()

st.sidebar.header("Settings")
hide_risk = st.sidebar.toggle("Hide Trademark Risks", value=True)
if not df.empty and hide_risk:
    df = df[df['risk_score'] == 0]

history = load_history()
v1_by_niche = (
    df.groupby("niche")["opp_score"].median().to_dict() if not df.empty else {}
)
momentum = build_keyword_momentum(
    history,
    v1_by_niche=v1_by_niche,
    strong_threshold=STRONG_VELOCITY_THRESHOLD,
)

st.subheader("Keyword Momentum V2")
sort_options = {
    "Opportunity Score V1": "opportunity_score_v1",
    "Opportunity Score V2": "opportunity_score_v2",
    "Review Velocity": "total_review_velocity_30d",
    "Acceleration": "median_acceleration",
    "Market Breadth": "positive_shop_ratio",
}
sort_label = st.selectbox("Sort by", list(sort_options), index=1)

if momentum.empty:
    st.info("Keyword momentum will appear after review history is available.")
else:
    momentum = momentum.sort_values(
        sort_options[sort_label], ascending=False, na_position="last"
    )
    momentum_view = momentum.rename(
        columns={
            "keyword": "Keyword",
            "listings_count": "Listings",
            "shops_count": "Shops",
            "total_review_velocity_30d": "Velocity 30d",
            "median_review_velocity_30d": "Median Velocity 30d",
            "total_previous_velocity_30d": "Previous Velocity 30d",
            "median_acceleration": "Acceleration",
            "median_acceleration_ratio": "Acceleration Ratio",
            "positive_velocity_shops": "Positive Shops",
            "positive_shop_ratio": "Positive Shop %",
            "accelerating_shop_count": "Accelerating Shops",
            "opportunity_score_v1": "Opportunity Score V1",
            "opportunity_score_v2": "Opportunity Score V2",
        }
    )
    momentum_view["Positive Shop %"] = momentum_view["Positive Shop %"] * 100
    visible_columns = [
        "Keyword", "Listings", "Shops", "Velocity 30d", "Median Velocity 30d",
        "Previous Velocity 30d", "Acceleration", "Acceleration Ratio",
        "Positive Shops", "Positive Shop %", "Accelerating Shops",
        "Opportunity Score V1", "Opportunity Score V2",
    ]
    st.dataframe(
        momentum_view[visible_columns],
        use_container_width=True,
        hide_index=True,
        column_config={
            "Positive Shop %": st.column_config.NumberColumn(format="%.1f%%"),
            "Velocity 30d": st.column_config.NumberColumn(format="%.2f"),
            "Median Velocity 30d": st.column_config.NumberColumn(format="%.2f"),
            "Previous Velocity 30d": st.column_config.NumberColumn(format="%.2f"),
            "Acceleration": st.column_config.NumberColumn(format="%.2f"),
            "Acceleration Ratio": st.column_config.NumberColumn(format="%.2f"),
            "Opportunity Score V1": st.column_config.NumberColumn(format="%.1f"),
            "Opportunity Score V2": st.column_config.NumberColumn(format="%.1f"),
        },
    )
    with st.expander("V2 raw components and data coverage"):
        st.dataframe(
            momentum[[
                "keyword", "shop_data_coverage", "strong_velocity_shops",
                "accelerating_listings_count", "velocity_component",
                "acceleration_component", "breadth_component",
            ]],
            use_container_width=True,
            hide_index=True,
        )

if not df.empty:
    top_3 = df[df['review_count'].between(10, 250)].head(3)
    cols = st.columns(3)
    for i, (idx, row) in enumerate(top_3.iterrows()):
        with cols[i]:
            st.success(f"**{row['label']} | {row['niche'].upper()}**")
            st.metric("Alpha", f"{row['alpha']:.1f}x", f"Comp: {int(row['n_sat'])}")
            st.markdown(f"**[{row['title'][:40]}...]({row['url']})**")
    
    st.divider()
    if st.button("🚀 Generate High-CTR Prompts"):
        for _, row in top_3.iterrows():
            p = generate_prompts(row)
            with st.expander(f"💎 Design: {p['concept']}", expanded=True):
                st.write("**🔥 Midjourney V6**"); st.code(p['mj'], language="text")
                st.write("**🎨 DALL·E 3**"); st.code(p['dalle'], language="text")
                st.write("**🍌 Nano Banana 2**"); st.code(p['nano'], language="text")
                
    st.dataframe(df[['label', 'opp_score', 'alpha', 'growth', 'review_count', 'niche', 'url']], use_container_width=True, hide_index=True)
else:
    st.info("📦 Synchronizing... Run the scraper twice to establish growth data.")
