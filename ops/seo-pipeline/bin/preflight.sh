#!/bin/bash
# Start-of-run checks for the cloud routine. Run from anywhere:
#   bash ops/seo-pipeline/bin/preflight.sh
# Prints PREFLIGHT_OK | PREFLIGHT_SUNDAY | PREFLIGHT_FAIL:<reason>
main() {
  set -u
  PD="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
  REPO="$(cd "$PD/../.." && pwd)"
  mkdir -p "$PD/.state/tmp"
  TODAY=$(TZ=Asia/Kolkata date +%F); DOW=$(TZ=Asia/Kolkata date +%u)
  fail() { echo "PREFLIGHT_FAIL:$1"; exit 1; }

  if [ "$DOW" = "7" ]; then echo "PREFLIGHT_SUNDAY: no run on Sundays (IST $TODAY)"; exit 10; fi
  command -v node >/dev/null || fail "node not found"

  cd "$REPO" || fail "repo dir missing"
  git fetch --quiet origin --prune || fail "git fetch failed (GitHub access for this routine?)"
  git checkout --quiet -B main origin/main || fail "checkout main failed"
  git reset --quiet --hard origin/main || fail "reset failed"
  git ls-remote --exit-code origin refs/heads/main >/dev/null || fail "cannot reach origin main"

  LOCKHASH=$( (sha1sum package-lock.json 2>/dev/null || shasum package-lock.json) | cut -d' ' -f1)
  if [ ! -d node_modules ] || [ "$(cat "$PD/.state/lockhash" 2>/dev/null)" != "$LOCKHASH" ]; then
    echo "installing dependencies (npm ci)..."
    npm ci --no-audit --no-fund --loglevel=error >"$PD/.state/npm-ci.log" 2>&1 || { tail -20 "$PD/.state/npm-ci.log"; fail "npm ci failed"; }
    echo "$LOCKHASH" > "$PD/.state/lockhash"
  fi

  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 https://www.pgak.co.in/sitemap.xml)
  [ "$CODE" = "200" ] || fail "live sitemap returned HTTP $CODE (is www.pgak.co.in allowed in the cloud environment's network settings?)"

  node "$PD/bin/inventory.mjs" || fail "inventory failed"
  node "$PD/bin/pick_cover.mjs" --keywords "" | grep -E "LIBRARY_(REMAINING|LOW)"
  echo "PREFLIGHT_OK $TODAY"
}
main "$@"
