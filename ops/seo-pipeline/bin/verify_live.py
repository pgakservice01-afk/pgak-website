#!/usr/bin/env python3
"""Prove a post is really published: Vercel deploy succeeded AND the public page is right.

    python3 bin/verify_live.py --sha <full sha> --slugs a,b,c
    python3 bin/verify_live.py --slugs a,b      # skip the deploy-status part

States reported per post (only the last one reached is claimed):
  committed -> deploy_pending -> deploy_succeeded -> public_url_verified
Exit 0 only if every post reaches public_url_verified.
"""
import argparse
import json
import re
import subprocess
import sys
import time
import urllib.request

from pathlib import Path
PD = Path(__file__).resolve().parents[1]
REPO = PD.parents[1]
CFG = json.load(open(PD / "config.json"))
ORIGIN = CFG["site_origin"]
UA = {"User-Agent": "PGAK-SEO-Pipeline/1.0", "Cache-Control": "no-cache"}


def http(url, timeout=30):
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.headers.get("content-type", ""), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, "", ""
    except Exception as e:  # noqa: BLE001
        return 0, "", str(e)


def deploy_state(sha, max_wait=1200):
    url = f"https://api.github.com/repos/{CFG['github_repo']}/commits/{sha}/status"
    t0 = time.time()
    last = "unknown"
    while time.time() - t0 < max_wait:
        code, _, body = http(url)
        if code == 200:
            st = [s for s in json.loads(body).get("statuses", []) if s.get("context", "").lower().startswith("vercel")]
            if st:
                last = st[0]["state"]
                if last in ("success", "failure", "error"):
                    return last, st[0].get("target_url", "")
        time.sleep(30)
    return f"timeout({last})", ""


def frontmatter(slug):
    node = (
        f"import {{matter}} from '{PD}/bin/lib.mjs';"
        "import {readFileSync} from 'node:fs';"
        f"const d=matter(readFileSync('{REPO}/content/insights/{slug}.md','utf8')).data;"
        "process.stdout.write(JSON.stringify({metaTitle:d.metaTitle||d.title,metaDescription:d.metaDescription||'',faqs:(d.faqs||[]).length}))"
    )
    return json.loads(subprocess.check_output(["node", "--input-type=module", "-e", node]))


def check_page(slug, fm, max_wait=900):
    url = f"{ORIGIN}/insights/{slug}"
    t0 = time.time()
    code = 0
    while time.time() - t0 < max_wait:
        code, _, html = http(url)
        if code == 200:
            break
        time.sleep(30)
    problems = []
    if code != 200:
        return {"url": url, "verified": False, "problems": [f"HTTP {code} after {max_wait // 60} min"]}
    title = re.search(r"<title>([^<]*)</title>", html)
    want = f"{fm['metaTitle']} | PGAK"
    if not title or title.group(1).replace("&amp;", "&").replace("&#x27;", "'").replace("&quot;", '"') != want:
        problems.append(f"title is {title.group(1) if title else None!r}, expected {want!r}")
    if f'<link rel="canonical" href="{url}"' not in html:
        problems.append("canonical tag missing or wrong")
    if '"BlogPosting"' not in html and '"Article"' not in html:
        problems.append("Article/BlogPosting JSON-LD missing")
    if fm["faqs"] and '"FAQPage"' not in html:
        problems.append("FAQPage JSON-LD missing")
    if f"/insights/covers/{slug}.webp" not in html:
        problems.append("cover image not referenced on the page")
    icode, ctype, _ = http(f"{ORIGIN}/insights/covers/{slug}.webp")
    if icode != 200 or "image" not in ctype:
        problems.append(f"cover image URL returns {icode} {ctype}")
    scode, _, sm = http(f"{ORIGIN}/sitemap.xml")
    if scode != 200 or f"<loc>{url}</loc>" not in sm:
        problems.append("URL not in sitemap.xml")
    return {"url": url, "verified": not problems, "problems": problems}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sha")
    ap.add_argument("--slugs", required=True)
    a = ap.parse_args()
    slugs = [s for s in a.slugs.split(",") if s]
    out = {"deploy": None, "posts": []}
    if a.sha:
        state, target = deploy_state(a.sha)
        out["deploy"] = {"sha": a.sha[:7], "vercel_state": state, "target_url": target}
        print(f"Vercel deploy for {a.sha[:7]}: {state} {target}")
        if state in ("failure", "error"):
            for s in slugs:
                out["posts"].append({"slug": s, "state": "committed (deploy FAILED)", "verified": False})
            print(json.dumps(out, indent=1))
            sys.exit(1)
    for s in slugs:
        r = check_page(s, frontmatter(s))
        r["slug"] = s
        r["state"] = "public_url_verified" if r["verified"] else ("deploy_succeeded" if out["deploy"] and out["deploy"]["vercel_state"] == "success" else "deploy_pending")
        out["posts"].append(r)
        print(f"{s}: {r['state']}" + ("" if r["verified"] else f" -> {r['problems']}"))
    print(json.dumps(out, indent=1))
    sys.exit(0 if all(p.get("verified") for p in out["posts"]) else 1)


if __name__ == "__main__":
    main()
