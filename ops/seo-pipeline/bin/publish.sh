#!/bin/bash
# Publish gate + push for today's new posts. Pushing to main = Vercel production deploy.
#   bash ops/seo-pipeline/bin/publish.sh slug1 [slug2 slug3]
#   bash ops/seo-pipeline/bin/publish.sh --dry-run slug1 [...]
# Allowed changes: content/insights/<slug>.md and public/insights/covers/<slug>.webp for the
# given slugs, plus deletion of used photos in ops/seo-pipeline/library/images/.
# Prints PUBLISH_OK sha=<sha> | PUBLISH_DRYRUN_OK | PUBLISH_FAIL:<reason>
main() {
  set -u
  PD="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
  REPO="$(cd "$PD/../.." && pwd)"
  DRY=0; if [ "${1:-}" = "--dry-run" ]; then DRY=1; shift; fi
  SLUGS=("$@")
  fail() { echo "PUBLISH_FAIL:$1"; exit 1; }
  [ ${#SLUGS[@]} -gt 0 ] || fail "no slugs given"
  cd "$REPO" || fail "repo missing"
  [ "$(git rev-parse --abbrev-ref HEAD)" = "main" ] || fail "checkout is not on main"

  # 1. scope
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    st="${line:0:2}"; f="${line:3}"
    ok=0
    for s in "${SLUGS[@]}"; do
      [ "$f" = "content/insights/$s.md" ] && ok=1
      [ "$f" = "public/insights/covers/$s.webp" ] && ok=1
    done
    if [[ "$f" =~ ^ops/seo-pipeline/library/images/[a-z0-9-]+\.webp$ ]] && [[ "$st" == *D* ]]; then ok=1; fi
    [ $ok = 1 ] || fail "unexpected change outside today's posts: '$line' (revert it; the pipeline only publishes posts)"
  done < <(git status --porcelain --untracked-files=all)
  for s in "${SLUGS[@]}"; do
    [ -f "content/insights/$s.md" ] && [ -f "public/insights/covers/$s.webp" ] || fail "$s is missing its .md or cover .webp"
  done

  # 2. research record (compulsory), then the per-post gate
  node "$PD/bin/research.mjs" check "${SLUGS[@]}" || fail "research not done or not recorded (RUNBOOK step 2)"
  for s in "${SLUGS[@]}"; do
    OTHERS=$(printf "%s\n" "${SLUGS[@]}" | grep -vx "$s" | paste -sd, -)
    node "$PD/bin/check_post.mjs" "$s" --others "$OTHERS" || fail "check_post failed for $s"
  done

  # 3. production build must pass and emit each article
  echo "building (npm run build)..."
  npm run build >"$PD/.state/build.log" 2>&1 || { tail -30 "$PD/.state/build.log"; fail "next build failed"; }
  for s in "${SLUGS[@]}"; do
    [ -f ".next/server/app/insights/$s.html" ] || fail "build did not emit /insights/$s"
  done
  echo "build OK"
  if [ $DRY = 1 ]; then echo "PUBLISH_DRYRUN_OK"; exit 0; fi

  # 4. one commit per post, then one for used library photos
  for s in "${SLUGS[@]}"; do
    TITLE=$(node --input-type=module -e "import {matter} from '$PD/bin/lib.mjs'; import {readFileSync} from 'node:fs'; process.stdout.write(String(matter(readFileSync('content/insights/$s.md','utf8')).data.title))")
    git add -- "content/insights/$s.md" "public/insights/covers/$s.webp"
    git -c user.name="PGAK SEO Pipeline (Claude)" -c user.email="pgak.service01@gmail.com" \
      commit --quiet -m "Insight: $TITLE" -m "Daily SEO pipeline (cloud). Files: content/insights/$s.md, public/insights/covers/$s.webp" || fail "commit failed for $s"
  done
  if [ -n "$(git status --porcelain -- ops/seo-pipeline/library/images)" ]; then
    git add -A -- ops/seo-pipeline/library/images
    git -c user.name="PGAK SEO Pipeline (Claude)" -c user.email="pgak.service01@gmail.com" \
      commit --quiet -m "Cover library: remove photos used today" || fail "library commit failed"
  fi

  # 5. push (rebase onto anything pushed meanwhile)
  for i in 1 2 3; do
    if git push --quiet origin HEAD:main 2>"$PD/.state/push.err"; then
      echo "PUBLISH_OK sha=$(git rev-parse HEAD)"; exit 0
    fi
    echo "push attempt $i rejected: $(head -2 "$PD/.state/push.err" | tr '\n' ' ')"
    git pull --quiet --rebase origin main || { git rebase --abort 2>/dev/null; fail "rebase conflict with newer origin/main"; }
    for s in "${SLUGS[@]}"; do
      N=$(git log --format=%H --diff-filter=A -- "content/insights/$s.md" | wc -l | tr -d ' ')
      [ "$N" = "1" ] || fail "after rebase $s was added more than once (duplicate slug from another publisher)"
    done
    sleep 5
  done
  fail "push rejected 3 times"
}
main "$@"
