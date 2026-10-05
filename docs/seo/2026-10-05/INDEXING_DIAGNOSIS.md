# Indexing diagnosis — why money pages had zero impressions (2026-10-05)

Read from Search Console → Indexing → Pages and URL Inspection, live (not affected by the
performance-data freeze at 29 Sep). Read-only except the indexing requests listed in §4.

## 1. The numbers

**Indexed: 113. Not indexed: 4,317.** The sitemap (submitted 1 Oct, last read **4 Oct**,
success) lists **196** pages — so Google knows every page; roughly 80 of them are not indexed.

| Reason | Pages | What they are |
|---|---|---|
| Not found (404) | 2,584 | Old WordPress spam/legacy — correct |
| Crawled – currently not indexed | 1,336 | Same residue (not fully audited) |
| Excluded by `noindex` | 174 | **All** old apex-host spam, crawled May 2026; **zero** real `www` pages — correct |
| Server error (5xx) | 94 | **All** old apex host, crawled Apr–Jun 2026; zero real pages — will clear on recrawl |
| **Discovered – currently not indexed** | **50** | **All 50 are real pages, never crawled once** (last crawl N/A) |
| Alternate page with proper canonical | 37 | Expected |
| **Duplicate without user-selected canonical** | **19** | **13 real pages** + 6 legacy `?p=`/feed URLs; validation previously **failed** |
| Page with redirect | 19 | Expected (e.g. `/ai-surveillance-system` → `/video-analytics-software`, intentional, `next.config.mjs`) |
| 403 / Google chose different canonical | 2 / 2 | Not investigated |

Core Web Vitals: **"No data"** on mobile and desktop — field data below Google's threshold.
That closes the "Core Web Vitals NOT MEASURED" item: there is nothing to measure yet.

## 2. Never crawled — 50 real pages

`/free-audit` (the primary enquiry page), `/anpr-number-plate-recognition`, `/book-demo`,
`/brochure`, `/privacy`, `/terms`; **all 20** `/features/guides/*`; 24 insights including
`/insights/anpr-number-plate-recognition-when-it-works` (the page Perplexity cites first),
`/insights/what-is-video-analytics-software`, `people-counting-footfall-cctv`,
`cctv-footage-legal-evidence-india`, `cctv-total-cost-of-ownership-5-years`,
`housing-society-gate-management`, `textile-unit-security-attendance`,
`what-to-check-before-buying-attendance-system`, and the rest of the sector pieces.

This explains the zero-impression money pages: `/anpr-number-plate-recognition` and
`/free-audit` have never been fetched by Google at all.

## 3. Folded as duplicates — 13 real pages (last crawled 4–17 Sep)

`/factory-security`, `/industrial-cctv`, `/multi-site-cctv-monitoring`, `/ai-surveillance-system`
(now a deliberate redirect), city pages `/ai-cctv-batala`, `-khanna`, `-bathinda`, `-patiala`,
`-jalandhar`, and four insights (`dvr-vs-nvr-which-do-you-have`,
`face-recognition-low-light-gate`, `ip-vs-analogue-cameras-india`,
`multi-location-attendance-management`).

All were judged on versions that have since changed. Live, each declares itself canonical.
`/industrial-cctv` has since been indexed ("URL is on Google") — the duplicate report was the
17 Sep crawl, before the hot-work proof made it one of the two most distinctive pages on the
site.

## 4. Indexing requested today — 15, each confirmed by Google's "Indexing requested" dialog

| # | URL | State before |
|---|---|---|
| 1 | `/free-audit` | never crawled |
| 2 | `/anpr-number-plate-recognition` | never crawled |
| 3 | `/insights/anpr-number-plate-recognition-when-it-works` | never crawled |
| 4 | `/insights/what-is-video-analytics-software` | never crawled |
| 5 | `/book-demo` | never crawled |
| 6 | `/insights/compare-ai-video-analytics-suppliers-india` | new (5 Oct) |
| 7 | `/industrial-cctv` | indexed; changed since crawl |
| 8 | `/factory-security` | duplicate (stale verdict) |
| 9 | `/insights/add-ai-to-existing-cctv-cameras` | indexed; retitled 5 Oct |
| 10 | `/ai-cctv-ludhiana` | indexed; retitled 5 Oct |
| 11 | `/insights/ai-cctv-price-in-india-what-it-should-cost` | indexed; new section 5 Oct |
| 12 | `/features/guides/ppe-detection` | never crawled; backed by a recorded demo |
| 13 | `/multi-site-cctv-monitoring` | duplicate |
| 14 | `/ai-cctv-khanna` | duplicate |
| 15 | `/ai-cctv-jalandhar` | duplicate |

A request puts a URL in a priority crawl queue; it does not guarantee indexing.

## 5. The queue for the next days (≈10–15 per day)

1. City pages: `/ai-cctv-patiala`, `/ai-cctv-bathinda`, `/ai-cctv-batala`
2. Insights: `people-counting-footfall-cctv`, `cctv-total-cost-of-ownership-5-years`,
   `cctv-footage-legal-evidence-india`, `what-to-check-before-buying-attendance-system`,
   `textile-unit-security-attendance`, `housing-society-gate-management`, `dvr-vs-nvr-which-do-you-have`,
   `ip-vs-analogue-cameras-india`, `face-recognition-low-light-gate`, `multi-location-attendance-management`
3. Feature guides: `number-plates`, `virtual-perimeter`, `people-counting`, `smoke-flame`, then the rest
4. `/brochure`; `/privacy` and `/terms` last

## 6. Root cause, stated as a hypothesis

Google has spent its attention on this domain's ~4,000 dead spam URLs (2,584 404s, 1,336
crawled-not-indexed) and has not reached real pages it already knows about. The 410s are the
correct signal and will clear this over time; the requests above shortcut it for the pages that
matter. Re-read this report in 7 days: the measure is how many of §2 and §3 move to Indexed.

## 7. How to do this in the UI (the deep link does not work)

`search-console/inspect?…&id=` returns a 404. Use the left-nav **URL inspection** entry, which
focuses the header box; type the URL; Enter; wait ~20 s; **Request indexing**; wait ~40 s for
the live test; close the dialog with **Dismiss** (Escape does not close it — and a click on the
next page then lands on the old dialog).
