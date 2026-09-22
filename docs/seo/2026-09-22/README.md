# PGAK delta audit — 22 September 2026

Scope: www.pgak.co.in, repository `pgakservice01-afk/pgak-website`.
Baseline: `main` @ `0881ce5` (clean tree; production matched it). Work branch: `seo/delta-audit-2026-09-22`.
Earlier documents in `docs/seo/` and `docs/redesign/` are treated as **historical**; every `VERIFIED_CURRENT` item below was reproduced today.

Companion files: [TOOL_ACCESS.md](TOOL_ACCESS.md) · [URL_INVENTORY.csv](URL_INVENTORY.csv) · [COVERAGE_REGISTRY.csv](COVERAGE_REGISTRY.csv) · [CLAIMS_REGISTER.md](CLAIMS_REGISTER.md) · [evidence/](evidence/)

## 1. Executive summary

- **The site is technically clean.** Today's sitemap holds 167 URLs: 80 insights, 20 feature guides, 18 city pages, 7 feature pages, 5 illustrative scenarios, 5 attendance-industry pages and 32 core/solution pages. Every one returns 200 with a self-referencing canonical and no noindex. Titles, H1s and descriptions are all unique, no internal links are broken and no images lack alt text.
- **The main risks are claim accuracy and lead-path honesty, not crawlability.** This branch fixes three verified defects:
  - false "nearby" cities,
  - absolute "no hardware" claims that contradict the site's own edge-device description,
  - a form that forced new-site buyers with zero cameras to pick a false camera count.
  It also fixes one accessibility failure.
- **The top open item is an owner decision.** Ten Punjab city pages say a *partner* installs, while `/cctv-installation-company` says *our own teams* install in the same cities. One of them is wrong in public.
- **Measurement is mostly blocked.** No PGAK Search Console, GA4, Keyword Planner, backlink data or Semrush API units were available. Nothing in this report is a traffic, ranking, volume or indexing figure.

## 2. Verified current state (technical)

| Check | Result | Class |
|---|---|---|
| Sitemap URLs / status | 167 / all 200 (local prod build of baseline) | VERIFIED_CURRENT |
| Canonicals | all self-referencing, absolute `https://www.pgak.co.in/...`; `?utm_source=` variant canonicalises to clean URL (live) | VERIFIED_CURRENT |
| `http://pgak.co.in/` | 200 after **2** redirects (http→https→www) | VERIFIED_CURRENT (P2, Vercel domain config) |
| `https://pgak.co.in/x`, `http://www…/x`, trailing slash | 1 redirect each to canonical | VERIFIED_CURRENT |
| Uppercase path `/Pricing`, unknown path, `/ai-cctv-delhi` | 404 | VERIFIED_CURRENT (correct) |
| `/cctv-buying-checklist` | 200, deliberately `noindex` and out of the sitemap (documented in the page source) | VERIFIED_CURRENT — intentional, **not a defect** |
| Sitemap `lastModified` | only real dates (insights, scenarios); no fabricated daily dates | VERIFIED_CURRENT |
| Analytics in live HTML | one GA4 loader, `G-6EMP9HSR2F`; **no GTM container**; Meta Pixel deferred | VERIFIED_CURRENT (source/HTML). GA4 enhanced-measurement form events: ACCESS_BLOCKED |
| Analytics payloads | `lib/analytics.ts` sends page path + form name; no name/phone/email fields | VERIFIED_CURRENT (source) |
| Structured data | parses on all pages; no AggregateRating/Review; LocalBusiness only with the Ludhiana address | VERIFIED_CURRENT (parse). Rich Results Test: NOT ATTEMPTED |
| Long titles (> 65 chars) | 5 insight posts (67–77 chars) | VERIFIED_CURRENT (P2) |

### Lab performance — Lighthouse 12 mobile, 3 runs, median [range]

| Page | Local build (this branch, analytics off) | Production (baseline, analytics on) |
|---|---|---|
| `/` | perf 96, LCP 2.70 s [2.69–2.71], CLS 0 | perf 89, LCP 2.12 s [2.06–2.14], CLS 0, TBT 302 ms |
| `/ai-cctv-mumbai` | perf 99, LCP 2.19 s, CLS 0 | perf 85, LCP 2.38 s, CLS 0, TBT 410 ms |
| `/video-analytics-software` | perf 99, LCP 2.19 s, CLS 0 | perf 90, LCP 1.98 s [1.97–3.69], TBT 346 ms |
| `/free-audit` | perf 98 [81–99], LCP 2.29 s, CLS 0 | perf 87, LCP 2.18 s, TBT 376 ms |

These are lab numbers from one Mac, not field Core Web Vitals. TBT is not INP. The two columns are **not a before/after**, because production loads GA4, Meta Pixel and Vercel Analytics and the local build does not. The historical 4.8 s production LCP was **not reproduced** today; the median production LCP was 1.98–2.38 s. CrUX field data was not fetched.

## 3. Issue register

| ID | P | Finding | Class | Evidence | Remedy | Status |
|---|---|---|---|---|---|---|
| I-1 | P0 | Mumbai page listed Delhi NCR and Bengaluru under "Also serving near Mumbai" (>800 km). Bengaluru and Coimbatore listed Mumbai the same way. The Mumbai link block was built by substring matching. | VERIFIED_CURRENT | `lib/locations.ts` `nearby`, `LocationPage.tsx` | Added `geo` references and `otherCities`. "Nearby" is limited to ≤ 250 km straight-line and unit-tested; other markets appear under an "Other cities" label; links resolve by exact name or alias. | **Fixed** (8903919) |
| I-2 | P0 | "No new hardware" / "no hardware to buy" / "nothing physical is installed" contradicted the site's own on-site edge-device description. The Hindi form footer said "no new hardware" where the English did not. | VERIFIED_CURRENT | CLAIMS_REGISTER C1 | Shared qualified wording in `lib/offer.ts`, applied in 8 places (EN + HI) | **Fixed** (91e20a0) |
| I-3 | P0 | A buyer with zero cameras had to choose a false camera band in both enquiry forms, even though the site offers turnkey installation. | VERIFIED_CURRENT | `CAMERA_OPTIONS` | Added "None yet — planning a new site" (EN/HI), accepted server-side and shown verbatim in the sales email; test added | **Fixed** (2da2240) |
| I-4 | P0 | Delivery model conflict: city pages say a partner installs in 10 Punjab cities; `/cctv-installation-company` says "our own teams" install there and shows the stat "11 cities". | VERIFIED_CURRENT | CLAIMS_REGISTER C2 | Owner states the true model; then correct one page | **OWNER_EVIDENCE_REQUIRED** |
| I-5 | P1 | Audit "worth ₹15,995", 48-hour report, 1-working-hour callback, "live within a day", "150–250 employees per gate camera": none has substantiation on file | OWNER_EVIDENCE_REQUIRED | C5–C8 | Confirm or qualify; wording is centralised in `lib/audit.ts` / `CALLBACK_PROMISE` | Open |
| I-6 | P1 | STQC/ER article states legal dates without a linked official source | OWNER_EVIDENCE_REQUIRED | C9 | Add the official MeitY/STQC citation and get it reviewed | Open |
| I-7 | P1 | "Case studies" section/breadcrumb name on pages that are labelled illustrative | VERIFIED_CURRENT | C10 | Rename the visible label to "Use-case scenarios" (URLs unchanged) if the owner agrees | Open (owner choice) |
| I-8 | P1 | After a new-site lead is submitted, the confirmation copy still talks about auditing "cameras you already own" | VERIFIED_CURRENT | QuickLead/DealerForm `done*` copy | Branch the confirmation text on the new-site value, once turnkey scope (C14) is confirmed | Open |
| I-9 | P1 | No PGAK Search Console, GA4, Keyword Planner or backlink access, so the keyword map cannot be scored and cannibalisation cannot be tested | ACCESS_BLOCKED | TOOL_ACCESS | Grant access; then re-run the keyword map | Blocked |
| I-10 | P2 | City-page in-text contact link relied on colour alone (1.23:1 against surrounding text) | VERIFIED_CURRENT | Lighthouse a11y 96 | Link underlined | **Fixed** (944fe0a) |
| I-11 | P2 | `http://pgak.co.in` takes two redirect hops | VERIFIED_CURRENT | curl | Vercel: redirect the apex straight to `https://www` | Open (hosting setting) |
| I-12 | P2 | 5 insight titles are 67–77 characters | VERIFIED_CURRENT | URL_INVENTORY | Shorten in the post front-matter when next edited | Open |
| I-13 | P2 | Spot AI reference footage: labelled, but usage rights not on file | OWNER_EVIDENCE_REQUIRED | C12 | Record the licence or replace with original PGAK footage | Open |
| I-14 | — | GA4 + GTM overlap (historical) | HISTORICAL → resolved in live HTML | §2 | Confirm the container is unpublished in the GTM account | Needs account view |

## 4. Changes in this branch

| Commit | What | Tests |
|---|---|---|
| 8903919 | Only genuine neighbours are "nearby"; exact-name city resolver with aliases; "Other cities" label | new `lib/locations.test.ts` (6 tests: Mumbai case, ≤ 250 km, aliases, no self/duplicates) |
| 91e20a0 | `lib/offer.ts` qualified hardware statement (EN/HI), applied in 8 places | typecheck, build |
| 2da2240 | "None yet — planning a new site" camera option + shared label helper | `lib/leads.test.ts` new-site case |
| 944fe0a | Underline in-text contact link on city pages | Lighthouse |

Preserved: every URL, canonical, redirect, sitemap entry, form field, honeypot, attribution and analytics call. No page was deleted, noindexed or migrated. Nothing was pushed to `main`.

Commands run (all exit 0): `npm run typecheck`, `npm test` (middleware 13, leads 27, locations 6), `npm run test:lead-client`, `npm run test:analytics`, `npm run build`.

**Rollback:** production is untouched until this branch is merged. After a merge, `git revert <merge-commit>` and push to `main`; Vercel redeploys the previous state.

## 5. 90-day operating backlog (a plan, not a forecast)

**Days 0–30: measurement and truth**
1. Grant access to PGAK's Search Console and GA4. Export 28 and 90 days of queries and pages; segment brand vs non-brand.
2. Resolve I-4 and C3–C8. Fill in `operational_verification` in COVERAGE_REGISTRY for all 18 cities.
3. In GA4, confirm one owner for page views and `generate_lead`, check enhanced-measurement form events, and confirm the GTM container is retired.
4. Define lead qualification rules and CRM stages (qualified, demo/site survey, proposal, won). Build the dashboard fields listed in the brief.

**Days 31–60: existing pages first**
5. Using GSC data, improve the city and money pages that already get impressions. Don't add new URLs.
6. Build the new-site/turnkey journey properly once C14 scope is confirmed: confirmation copy and a scope section on `/cctv-installation-company`.
7. Replace unsubstantiated numbers with evidenced ones or qualified wording. Add real case studies only with permission and measured results.

**Days 61–90: expand only where evidence exists**
8. Add city or category pages only where delivery is verified, there is demand in GSC or Keyword Planner, and original local detail exists. Otherwise use `/areas-we-serve`.
9. Outreach, limited to a small, researched list of trade associations and integrator/manufacturer listings, drafted for owner approval. Nothing sent.

## 6. Owner handoff

- **What changed:** 4 small commits (above), plus this audit folder.
- **Preserved:** all public URLs, design, forms, tracking, spam controls, redirects and metadata.
- **Needs your decision or evidence:** I-4 (who installs in Punjab), C5–C9 and C12–C14 in CLAIMS_REGISTER.
- **Needs access:** PGAK Search Console property, GA4 viewer, Keyword Planner, GBP manager, Semrush API units or another backlink tool.
- **Production approval: still pending.** The branch has a pull request with a Vercel preview. Merging it to `main` is what publishes to www.pgak.co.in.

## 7. Status

| Item | Status |
|---|---|
| Baseline, branch, repo inventory | completed |
| Technical crawl, URL inventory, variants/404 | completed · tested |
| Nearby-city fix, hardware wording, new-site option, a11y link | completed · tested (unit + build + render check) |
| Lighthouse lab runs (local + production) | completed (lab only) |
| Claims register, coverage registry | completed (verification columns need owner evidence) |
| Delivery-model conflict (I-4), SLAs/values, STQC citation | needs owner evidence |
| GSC / GA4 / GTM account / Keyword Planner / GBP / backlinks / Semrush | blocked |
| Google Trends, PageSpeed/CrUX field data, Rich Results Test | not attempted |
| Keyword map scoring and cannibalisation analysis | blocked (no query data) |
| Outreach drafts | not attempted |
| Production deploy | not done; awaiting approval |
| Historical: 141-page crawl, 20 guides, GA4/GTM overlap, 4.8 s LCP | historical; only today's numbers are used above |
