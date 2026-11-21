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

  # The site's Vercel firewall refuses some cloud requests at random (403, x-vercel-mitigated: deny),
  # so try a few times; if it stays blocked, build the site and use the sitemap from the build.
  CODE=000
  for i in 1 2 3 4; do
    CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 https://www.pgak.co.in/sitemap.xml)
    [ "$CODE" = "200" ] && break
    sleep 8
  done
  if [ "$CODE" = "200" ]; then
    echo "SITE_REACHABLE=1"
  else
    echo "SITE_REACHABLE=0 (live sitemap answered HTTP $CODE from the cloud: the site's firewall; using the sitemap from a fresh build)"
    if [ "$CODE" = "000" ]; then echo "SITE_HINT: HTTP 000 = no connection; check the routine's cloud environment network access"; fi
    npm run build >"$PD/.state/build.log" 2>&1 || { tail -25 "$PD/.state/build.log"; fail "npm run build failed (needed for the sitemap; see ops/seo-pipeline/.state/build.log)"; }
    [ -s "$REPO/.next/server/app/sitemap.xml.body" ] || fail "the build produced no sitemap"
  fi

  node "$PD/bin/inventory.mjs" || fail "inventory failed"
  N=$(node -e 'const i=require(process.argv[1]);process.stdout.write(String(i.sitemap_count||0))' "$PD/.state/inventory.json")
  [ "$N" -gt 0 ] 2>/dev/null || fail "no sitemap URLs (live or built), so internal links cannot be checked"
  node "$PD/bin/pick_cover.mjs" --keywords "" | grep -E "LIBRARY_(REMAINING|LOW)"
  echo "PREFLIGHT_OK $TODAY"
}
main "$@"
