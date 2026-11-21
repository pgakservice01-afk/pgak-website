#!/usr/bin/env python3
"""Summarise a tech_audit.sh output folder into one compact JSON (used in the daily email)."""
import glob
import json
import os
import sys
from collections import Counter

d = sys.argv[1]


def load(name):
    p = os.path.join(d, name)
    try:
        return json.load(open(p))
    except Exception:  # noqa: BLE001
        return None


crawl = load("crawl.json") or []
links = load("links.json") or {}
ok = [r for r in crawl if "error" not in r]
titles = Counter(r.get("title", "").strip() for r in ok)
summary = {
    "pages_crawled": len(crawl),
    "fetch_errors": [{"url": r["url"], "error": r["error"][:120]} for r in crawl if "error" in r],
    "non_200": [r["url"] for r in ok if r.get("status") != 200],
    "double_brand_titles": [r["url"] for r in ok if r.get("title", "").count("| PGAK") > 1],
    "long_titles_over_65": [r["url"] for r in ok if len(r.get("title", "")) > 65],
    "duplicate_titles": [t for t, n in titles.items() if n > 1 and t],
    "missing_description": [r["url"] for r in ok if not r.get("description") or not r["description"][0].strip()],
    "long_description_over_160": [r["url"] for r in ok if r.get("description") and len(r["description"][0]) > 160],
    "h1_not_exactly_one": [r["url"] for r in ok if len(r.get("h1", [])) != 1],
    "invalid_json_ld": [r["url"] for r in ok if any(isinstance(s, dict) and s.get("invalid") for s in r.get("schemas", []))],
    "broken_internal_links": links.get("broken_links", []),
    "noncanonical": links.get("noncanonical", []),
    "noindex_in_sitemap": links.get("noindex_in_sitemap", []),
    "pages_with_img_missing_alt": links.get("missing_alt", []),
    "lighthouse_mobile": {},
}
for f in sorted(glob.glob(os.path.join(d, "lh-*.json"))):
    name = os.path.basename(f)[3:-5]
    try:
        lh = json.load(open(f))
        a = lh["audits"]
        summary["lighthouse_mobile"][name] = {
            "url": lh.get("finalDisplayedUrl") or lh.get("finalUrl"),
            **{k: round((v.get("score") or 0) * 100) for k, v in lh["categories"].items()},
            "LCP": a["largest-contentful-paint"]["displayValue"],
            "CLS": a["cumulative-layout-shift"]["displayValue"],
            "TBT": a["total-blocking-time"]["displayValue"],
        }
    except Exception as e:  # noqa: BLE001
        summary["lighthouse_mobile"][name] = {"error": str(e)[:120]}
summary["issue_counts"] = {k: len(v) for k, v in summary.items() if isinstance(v, list)}
print(json.dumps(summary, indent=1))
