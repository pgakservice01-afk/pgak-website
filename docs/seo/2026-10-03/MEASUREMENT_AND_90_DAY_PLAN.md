# Measurement and 90-day plan — 2026-10-03

Baseline, event definitions, owners, milestones, and the status of everything touched
this week in the four states the brief requires. No ranking or lead outcome is promised
by any date. Samples under a few hundred impressions are reported, not concluded from.

## 1. Baseline (finalised data, Search Console, `sc-domain:pgak.co.in`, all countries/devices)

| Window | Impressions | Clicks | CTR | Avg position | Source |
|---|---|---|---|---|---|
| 3–30 Sep 2026 (28 d) | 7,462 | 110 | 1.474% | 7.94 | handoff, re-read 2026-10-02 as 7.51K / 113 / 1.5% / 7.9 |
| 6 Aug–2 Sep 2026 (prior 28 d) | 923 | 49 | 5.309% | 10.14 | handoff |
| 90 d to 26 Sep | 7,910 | 175 | 2.2% | 8.2 | read 2026-10-01 |
| **Money pages, 28 d** | **634** | **10** | **1.6%** | **7.3** | read 2026-10-03 (regex: the six `buyerDecision` pages + pricing, free-audit, contact) |
| **Money pages, 90 d** | **1,030** | **14** | 1.4% | 7.9 | read 2026-10-01 |

Read of the baseline: impressions ×8 period on period with position *improving*; the CTR
fall is query mix, not decay. 71% of money-page clicks in the 90-day window fell in its
last 28 days — commercial visibility is accelerating faster than the site's.

Page-level anchors to re-read at each milestone (28 d, 3–30 Sep):
`/insights/cctv-storage-how-many-days` 1,743 / 2 / 0.115% / 8.18 ·
`/insights/ai-cctv-price-in-india-what-it-should-cost` 316 / 4 / 1.27% / 8.00 ·
`/pricing` 145 / 2 / 1.38% / 5.79 · `/ai-intruder-detection` 115 / 2 / 1.74% / 8.56 ·
`/insights/add-ai-to-existing-cctv-cameras` 67 / 1 / 1.49% / 6.00 ·
`/ai-cctv-noida` 84 / 6 / 7.14% / 8.81 · homepage 671 impressions / 83 clicks (90 d), 70 of them on the query `pgak`.

## 2. Core Web Vitals — NOT MEASURED

Attempted 2026-10-03 through the PageSpeed Insights API, mobile, for `/` and
`/insights/cctv-storage-how-many-days`. Both calls returned
`Quota exceeded … 'Queries per day'` — the keyless public quota is shared and was
already spent. No figure is reported, lab or field. A local Lighthouse run was
deliberately not substituted: a laptop lab number is not comparable to field p75 and the
19 September review already holds one (performance 98, LCP 2.1 s, lab).

To measure: retry after the daily quota resets, or create a free PageSpeed API key in
the owner's Google Cloud project and pass `&key=`. Field data (CrUX p75) appears only
if the origin clears the traffic threshold; if it does not, that is the finding.

## 3. Event definitions (what is actually instrumented today)

All fire from `lib/lead-client.ts`; names are exact. No contact details, free text or
camera credentials are in any payload — `lead_ref` is a random per-form id.

| Event | Fires when | Counts as |
|---|---|---|
| `form_submit_attempt` | once per form instance, before the response is known | an attempt |
| `lead_delivery_failed` | once per ref when a submission reached us and did not land (`reason` = network / not_delivered) | a loss to investigate |
| `form_submit` | the server confirmed `received` or `delivered` | an accepted enquiry |
| `demo_request` / `pricing_request` / `assessment_request` | with `form_submit`, by form | enquiry type |
| `generate_lead` (GA4 key event) | with `form_submit`, deduplicated by `lead_ref` | **the only conversion** |
| phone / WhatsApp clicks | `data-cta` on each link | interaction, **not** a lead |
| `ai_referral` | once per session when an assistant sent the visit | attribution |

**Qualified enquiry** is not an analytics event. It is a row in *PGAK — Master Leads*
with an owner, a reachable prospect, a premises or project, a relevant requirement and
an agreed follow-up. Test, spam, recruitment and vendor rows are excluded by status.
Until the register receives rows (see §5, BLOCKED), this cannot be counted.

## 4. Weekly scorecard (read every Monday from finalised data)

| Metric | Source | Baseline |
|---|---|---|
| Non-brand impressions / clicks | GSC, query filter *does not contain* `pgak` | derive at first read |
| Money-page impressions / clicks / CTR | GSC page regex (§1) | 634 / 10 / 1.6% (28 d) |
| Priority-page CTR | GSC, the six pages in §1 | as listed |
| Defined query-set visibility | GSC, the buyer queries in `KEYWORD_TO_PAGE_MAP` once it exists; until then the 25 fixed AI-visibility questions | run 2 (24 Sep) |
| **Generative AI features impressions** | GSC → Performance → Generative AI (`/performance/search-analytics/ai`); impressions only, subset of Web | **1,450 (30 Jun–29 Sep), 99 pages** — run 4, 4 Oct |
| Form acceptance / delivery | GA4: `form_submit` ÷ `form_submit_attempt`; `lead_delivery_failed` count | not yet read |
| Register delivery | `GET /api/leads` → `register`, `envNames` | **false** |
| Qualified enquiries, meetings, proposals, pipeline, response time | master sheet + ERP | **owner**; sheet empty |

## 5. Status of everything touched this week

| Item | State | Evidence |
|---|---|---|
| Client dropped `company` / `requirement` / `contactTime` | **FIXED AND VERIFIED** | production chunk `3702-95db27f…` carries all three; #69 |
| Stale, unrun lead-client test suite | **FIXED AND VERIFIED** | 8/8, wired into `npm test` (151) |
| Register sheet + both internal emails | **BLOCKED — owner** | `envNames` shows `LEAD_REGISTER_*` absent in any case; build confirmed from `pgak-website` → `www.pgak.co.in` |
| Durable intake store | **BLOCKED — owner** | `durableIntake:false` |
| Manual actions / security issues | **VERIFIED CLEAN** | Google: no issues detected (2 Oct) |
| Legacy spam URLs | **FIXED AND VERIFIED** | 410 behind 308→www; legit legacy 301s to real pages |
| Sitemap duplicates | **FIXED AND VERIFIED** | live 196 entries / 196 unique |
| Demonstrations into public register + evidence column | **FIXED AND VERIFIED** | 4 `limited pilot` rows live |
| Hot-work clip inside the proof gate | **FIXED AND VERIFIED** | `PROJECTS`, proof tests 13/13 |
| "< 3 s" as a pilot target (10 sites) | **FIXED AND VERIFIED** | 0 unqualified live |
| ANPR authorship wording | **FIXED AND VERIFIED** (fact C still **owner**) | deployed in #71 |
| Storage + add-AI articles: tools, example, CTA | **FIXED AND VERIFIED** | links live |
| Cost guide: range qualified; "no hardware charges" removed | **FIXED AND VERIFIED** | #71 |
| `/pricing` title, `/ai-intruder-detection` description | **FIXED AND VERIFIED** | live |
| Hero H1 category-led | **FIXED AND VERIFIED** | live; mobile screenshot clean |
| Insights hub labels; dead `SearchAction`; checklist scoping | **FIXED AND VERIFIED** | live checks |
| Feature count 20→derived (24) | **FIXED AND VERIFIED** | `/features` renders 24 |
| `DealerFilm.tsx` committed by mistake in #71 | **FIXED** | untracked in #72; local file preserved |
| Build gate not enforced on #73 (local ENOSPC) | **process error, disclosed** | gate re-proven on `main af876cd`: 214 pages |
| Keyword-to-page map with volumes | **BLOCKED** | no authorised Trends / Planner / Ahrefs source; nothing invented |
| GA4 funnel verification | **NOT VERIFIED** | not attempted this session |
| End-to-end TEST enquiry | **PLANNED** | acceptance test once the register is live |
| Thin solution pages (`hospital-security` 49% unique, 3 others) | **PLANNED — owner facts** | needs conditions PGAK will stand behind |
| VMS page / deployment-mode pages | **PLANNED — owner facts E, F** | nothing on file describes them |
| Bing Places wrong phone / address | **BLOCKED — owner** | unverified since 24 Sep |
| GSC Generative AI report | **PLANNED** | open manually; the link would not navigate in automation |
| Core Web Vitals (lab and field) | **NOT VERIFIED** | PSI keyless quota exhausted 2026-10-03; retry with a key |

## 6. Milestones

**7 days (by 10 Oct).** Owner: register variables saved to `pgak-website` → Production
(search "REGISTER" in the project's variables; if present there, they are in another
project) and a redeploy; then the acceptance test is run and recorded in
`P0_FIX_AND_TEST_LOG.md` — URL, time, lead id, server outcome, sheet row, each inbox
separately, ERP record, analytics event. Owner: answers to C, E, F. Open the Generative
AI report once.

**28 days (first finalised post-change window, ~6 Oct–3 Nov, readable ~6 Nov).** Re-read
every §1 anchor. Questions, not targets: did money-page impressions and CTR move; did
`/insights/cctv-storage-how-many-days` clicks move off 1–2; did `/pricing` CTR move off
1.3–2.1%; did non-brand homepage CTR move with the category H1. Read `form_submit` ÷
`form_submit_attempt` and `lead_delivery_failed` for the first time.

**60 days.** AI-visibility run 4 — with Vercel log access, from `ai-crawl` data rather
than sampling; otherwise the 25-question sample, same wording, logged out. First
qualified-enquiry count from the sheet, by landing page.

**90 days.** Full comparison against the 3–30 Sep baseline and the 634 / 10 / 1.6%
money-page baseline. Decide the thin-page content programme on evidence, not on the
plan.

## 7. What is not promised
No position, impression, click or lead figure by any date. A 28-day window on a page
with 100 impressions cannot distinguish a change from noise, and will be reported as
such.
