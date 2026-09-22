# Tool access and evidence ledger — 22 September 2026

Branch `seo/delta-audit-2026-09-22`, baseline commit `0881ce5` (main, identical to production at the time).
"Result" records what actually happened today; nothing below is inferred from older documents.

| Tool | Property / scope | Permission | Action | Result | Evidence | Limitation / next access needed |
|---|---|---|---|---|---|---|
| GitHub (`gh`, account ankur817) | pgakservice01-afk/pgak-website | push, no admin | clone, branch, commits, PR | OK | this branch | Repo settings/transfer need the pgakservice01-afk owner |
| Local production build (`next build` + `next start`, Next 15.5.24, Node 24.14.1) | localhost:3100 | local | build, crawl, Lighthouse | OK | `evidence/crawl-local-baseline.json`, `evidence/lighthouse/` | Local build disables analytics by design |
| Repo crawler `scripts/seo-crawl.py` + `check-crawl-links.py` | 167 sitemap URLs | local | crawl + link check | 167 × 200, 0 broken links, 0 duplicate titles/H1/descriptions, 0 non-self canonicals, 0 missing alt | `evidence/crawl-local-baseline.json`, `URL_INVENTORY.csv` | Crawls sitemap URLs only; orphan discovery is via internal links in the same run |
| curl | www.pgak.co.in (production) | public | redirect/variant/404 checks, live tag check | see README §2 | README | — |
| Lighthouse 12 (npx, headless Chrome) | local build + production | public/local | 4 templates × 3 mobile runs each, both targets | medians + ranges saved | `evidence/lighthouse/SUMMARY.txt` + `raw-reports.tar.gz` (24 JSON reports) | Lab only. Not field CWV. Production vs local TBT not like-for-like (analytics). |
| Claude in Chrome | www.pgak.co.in | user's browser | render check, console errors | homepage renders, 0 console errors | — | GitHub repo settings page: "You don't have access to repository options" |
| Semrush MCP | pgak.co.in | subscription present | organic_research | **Blocked — no API units** ("additional API units are required", see https://www.semrush.com/mcp-access) | — | More Semrush API units |
| Google Search Console | PGAK domain property | not connected in this session | — | **ACCESS_BLOCKED** (per brief, the connected GSC exposed Secured Engineers only) | — | Add PGAK domain property access for the connected account, or supply 28/90-day exports |
| Google Analytics 4 | G-6EMP9HSR2F (the only ID in live HTML) | not connected | — | **ACCESS_BLOCKED** | live HTML check | Viewer access to the property; Tag Assistant session |
| Google Tag Manager | GTM-MKZWLS7J (historical) | — | live HTML check | Container **not** loaded on production today; only direct gtag for G-6EMP9HSR2F | README §2 | Account view to confirm container is retired/unpublished |
| Google Keyword Planner | — | not connected | — | **ACCESS_BLOCKED** | — | Ads account access or a user export |
| Google Trends | — | not attempted | — | **NOT ATTEMPTED** (no authorised API; manual UI export needed) | — | Owner-run exports per the brief's anchor-term method |
| PageSpeed Insights / CrUX | — | not attempted | — | **NOT ATTEMPTED** — field data unknown | — | PSI API key or manual run |
| Rich Results Test / Schema validator | — | not attempted | — | **NOT ATTEMPTED**; crawler parsed JSON-LD without errors | `URL_INVENTORY.csv` (schema_types) | Manual validation of 1 page per template |
| Google Business Profile | — | not connected | — | **ACCESS_BLOCKED**; `lib/reviews.ts` holds no reviews | — | GBP manager access |
| Ahrefs / backlink platform | — | per brief: "Insufficient plan" | — | **ACCESS_BLOCKED** | — | Plan with backlink API |
| Bing Webmaster / IndexNow | — | not connected | — | not attempted; `scripts/indexnow.mjs` exists | — | BWT access; IndexNow key is already configured in the repo script |
