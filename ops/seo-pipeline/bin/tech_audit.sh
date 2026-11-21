#!/bin/bash
# Read-only technical SEO check: full sitemap crawl + broken links + Lighthouse (mobile).
#   bash ops/seo-pipeline/bin/tech_audit.sh [newest-post-path]
main() {
  set -u
  PD="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
  REPO="$(cd "$PD/../.." && pwd)"
  NEWEST=${1:-/insights}
  OUT="$PD/.state/audit"; mkdir -p "$OUT"
  python3 "$REPO/scripts/seo-crawl.py" https://www.pgak.co.in "$OUT/crawl.json" > "$OUT/crawl-summary.json" 2>"$OUT/crawl.err" || echo "crawl failed: $(tail -2 "$OUT/crawl.err")"
  if [ -s "$OUT/crawl.json" ]; then
    python3 "$REPO/scripts/check-crawl-links.py" "$OUT/crawl.json" https://www.pgak.co.in > "$OUT/links.json" 2>"$OUT/links.err" || echo "link check failed: $(tail -2 "$OUT/links.err")"
  fi
  export CHROME_PATH="${CHROME_PATH:-/usr/bin/google-chrome}"
  for pair in "home:/" "insights:/insights" "newest:$NEWEST"; do
    NAME=${pair%%:*}; PTH=${pair#*:}
    npx -y lighthouse@12 "https://www.pgak.co.in$PTH" --quiet --form-factor=mobile \
      --only-categories=performance,seo,best-practices,accessibility \
      --output=json --output-path="$OUT/lh-$NAME.json" --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage" >/dev/null 2>"$OUT/lh-$NAME.err" \
      || echo "lighthouse $NAME failed: $(tail -1 "$OUT/lh-$NAME.err")"
  done
  python3 "$PD/bin/audit_summary.py" "$OUT"
}
main "$@"
