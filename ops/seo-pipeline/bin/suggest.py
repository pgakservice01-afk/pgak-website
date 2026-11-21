#!/usr/bin/env python3
"""Real-phrasing research from search autocomplete (what AnswerThePublic is built on).

    python3 bin/suggest.py "ai cctv" "cctv for warehouse" ...

For every seed it asks Google autocomplete (India) and Bing autosuggest for the
seed itself plus question / comparison / cost modifiers, and prints JSON:
    {seed: {"google": [...], "bing": [...], "questions": [...], "errors": [...]}}
Network failures are recorded per source, never raised, so a run can always
continue and report exactly which source was unavailable.
"""
import json
import sys
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"}
PREFIXES = ["how", "what", "why", "can", "is", "which", "does"]
SUFFIXES = ["", " for", " vs", " cost", " price in india", " near me", " without"]
QWORDS = ("how", "what", "why", "can", "is", "which", "does", "do", "should", "where", "when", "will", "are")


def get(url, timeout=12):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")


def google(q):
    u = "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=in&q=" + urllib.parse.quote(q)
    data = json.loads(get(u))
    return [s for s in data[1] if isinstance(s, str)]


def bing(q):
    u = "https://api.bing.com/qsonhs.aspx?type=cb&mkt=en-IN&q=" + urllib.parse.quote(q)
    data = json.loads(get(u))
    out = []
    for block in data.get("AS", {}).get("Results", []):
        for s in block.get("Suggests", []):
            if s.get("Txt"):
                out.append(s["Txt"])
    return out


def main(seeds):
    result = {}
    for seed in seeds:
        seed = seed.strip()
        if not seed:
            continue
        g, b, errors = [], [], []
        queries = [seed + s for s in SUFFIXES] + [p + " " + seed for p in PREFIXES]
        for q in queries:
            try:
                g += google(q)
            except Exception as e:  # noqa: BLE001 - record and continue
                errors.append(f"google '{q}': {e}")
            time.sleep(0.25)
        for q in [seed, "how " + seed, seed + " for"]:
            try:
                b += bing(q)
            except Exception as e:  # noqa: BLE001
                errors.append(f"bing '{q}': {e}")
            time.sleep(0.25)
        dedup = lambda xs: list(dict.fromkeys(x.strip().lower() for x in xs if x.strip()))
        g, b = dedup(g), dedup(b)
        # keep only suggestions that still contain a meaningful word of the seed
        key = [w for w in seed.lower().split() if len(w) > 2]
        rel = lambda s: any(w in s for w in key)
        g = [s for s in g if rel(s)]
        b = [s for s in b if rel(s)]
        questions = [s for s in dict.fromkeys(g + b) if s.split(" ")[0] in QWORDS]
        result[seed] = {"google": g, "bing": b, "questions": questions, "errors": errors[:5], "error_count": len(errors)}
    print(json.dumps(result, indent=1, ensure_ascii=False))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1:])
