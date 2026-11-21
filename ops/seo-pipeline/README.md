# PGAK daily SEO pipeline (cloud)

Operational tooling for the daily blog/SEO routine. **Not part of the website**: Next.js only serves `app/` and `public/`, and nothing here is imported by the site.

A Claude Code cloud routine ("PGAK daily SEO pipeline", Mon–Sat 10:15 IST) checks out this repo and follows `RUNBOOK.md`:
research → up to 3 new posts (topped up to 3 a day, counting anyone's posts) → cover from the Codex photo library →
strict gate + production build → push to `main` → verify the live page → IndexNow for 10 URLs → technical SEO check → brief email report.

| Path | What |
|---|---|
| `RUNBOOK.md` | the procedure the routine follows |
| `config.json` | site, email, posts per day, categories |
| `bin/preflight.sh` | Sunday guard, sync to `origin/main`, `npm ci`, inventory + today's quota |
| `bin/inventory.mjs` | live posts, drafts, live URLs; `--check-topic` duplicate check |
| `bin/suggest.py` | Google + Bing autocomplete questions |
| `bin/pick_cover.mjs` | best unused photo from `library/` for an article |
| `bin/fit_image.mjs` | brands a photo into a 1600×900 WebP cover |
| `bin/make_cover.mjs` | code-drawn branded cover (fallback) |
| `bin/check_post.mjs` | publish gate (frontmatter, links, FAQ visibility, claims, sources, duplicates, image) |
| `bin/publish.sh` | scope check, gate, `npm run build`, commits, push |
| `bin/verify_live.py` | Vercel status + live page checks |
| `bin/index_pick.py` | today's 10 IndexNow URLs |
| `bin/tech_audit.sh` | crawl, broken links, Lighthouse |
| `library/` | pre-generated Codex photos (`manifest.json` = scene + tags). A photo is deleted once used. |

Top up the photo library from the owner's Mac (Codex runs inside the ChatGPT app there), then commit the new WebP files and manifest entries.
