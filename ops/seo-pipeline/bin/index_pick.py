#!/usr/bin/env python3
"""Today's 10 URLs for IndexNow (stateless, so it works in a fresh cloud run).

    python3 ops/seo-pipeline/bin/index_pick.py 10 --new https://www.pgak.co.in/insights/a,https://...

New posts first, then a daily rotating window over every live article, so each
article is re-submitted roughly every two weeks without any stored state.
"""
import datetime as dt
import json
import sys
from pathlib import Path

PD = Path(__file__).resolve().parents[1]
CFG = json.load(open(PD / "config.json"))
inv = json.loads((PD / ".state" / "inventory.json").read_text())
n = int(sys.argv[1]) if len(sys.argv) > 1 else CFG["index_urls_per_day"]
new = []
if "--new" in sys.argv:
    new = [u for u in sys.argv[sys.argv.index("--new") + 1].split(",") if u]
origin = CFG["site_origin"]
articles = sorted(origin + p for p in inv["sitemap_paths"] if p.startswith("/insights/") and p.count("/") == 2)
articles = [u for u in articles if u not in new]
today = dt.datetime.now(dt.timezone(dt.timedelta(hours=5, minutes=30))).date()
k = max(0, n - len(new))
if articles and k:
    start = (today.toordinal() * k) % len(articles)
    window = (articles[start:] + articles[:start])[:k]
else:
    window = []
print("\n".join((new + window)[:n]))
