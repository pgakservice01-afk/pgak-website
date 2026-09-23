# Search Console baseline — 23 September 2026

First reading of Google Search Console for this property. `docs/seo/SEO_CHANGES.md` records that GSC access was denied on release day and that no funnel diagnosis was therefore possible; this file replaces that gap with observed figures.

## Provenance and limits

| Setting | Value |
|---|---|
| Property | `sc-domain:pgak.co.in` (Domain property — covers both hosts and both schemes) |
| Report | Performance → Search results, type **Web** |
| Period | 2026-06-21 → 2026-09-20 (the "3 months" preset) |
| Data freshness | "Last update: 4 hours ago" at time of reading |
| Method | Read from the Search Console web UI in the owner's signed-in browser. **Not** a CSV export. |

**What that method costs.** Query and page tables were read from the paginated UI, so the cluster totals below are summed over the **top 100 of 196 queries** and are therefore **lower bounds** — the 96 unread rows can only add impressions, never subtract. Figures are as displayed (Google rounds "6.1K"). Nothing here is modelled, extrapolated or estimated; where a number is a sum it is marked as one.

## Totals

| Metric | 90 days |
|---|---|
| Clicks | 150 |
| Impressions | 6.1K |
| CTR | 2.5% |
| Average position | 8.4 |
| Queries recorded | 196 |
| Pages recorded | 174 |

The daily chart is flat until roughly 10 August and rises steeply through September, with the highest impression days in the final week. The trend is real but the series is short; one month is not a trajectory.

## Finding 1 — clicks are brand, impressions are not

| Query | Clicks | Impressions |
|---|---|---|
| pgak | 63 | 342 |
| www.pgak.co.in | 0 | 140 |
| cctv camera storage capacity in days | 0 | 83 |
| cctv footage storage how many days | 0 | 26 |
| ai cctv camera price in india | 0 | 25 |
| contract attendance | 0 | 24 |
| ai cctv camera for attendance | 0 | 21 |
| aebas id means | 0 | 20 |
| proxy attendance | 0 | 19 |
| late mark | 0 | 18 |

`pgak` alone is **63 of 150 clicks (42%)**. Within the top 100 queries, one non-brand query recorded a single click (`biometric attendance machine`, 1 click / 1 impression, visible in the clicks-sorted view). Every other non-brand query in that set recorded **zero**.

This is not a ranking failure. Average position is 8.4 and these are informational questions — the shape of a site that is retrieved and then answered over.

## Finding 2 — the demand is four question clusters

Sums over the top 100 queries; each is a lower bound.

| Cluster | Impressions (≥) | Clicks | Page that already answers it |
|---|---|---|---|
| CCTV retention — "how many days is footage stored", ~26 phrasings | 304 | 0 | `/insights/cctv-storage-how-many-days` |
| AEBAS / Aadhaar attendance — incl. Hindi (`aebas kya hai`, `एईबास उपस्थिति`) | 109 | 0 | `/insights/aadhaar-based-attendance-and-aebas-explained` |
| Attendance fraud — proxy attendance, proxy punching, late mark, contract attendance | 99 | 0 | `/insights/how-to-stop-proxy-attendance`, `/insights/late-mark-policy-design` |
| AI CCTV price | 47 | 0 | `/insights/ai-cctv-price-in-india-what-it-should-cost` |
| Capability terms — loitering detection, AI intruder detection, video analytics software | 46 | 0 | `/features/loitering-detection`, `/ai-intruder-detection` |

**The content is not missing.** Every cluster has a published article that answers it directly, several of them well: `cctv-storage-how-many-days` opens with a bolded direct answer, uses the questions as its H2s, and carries four FAQ pairs emitted as `FAQPage` JSON-LD. The gap is between being retrieved and being quoted — the same finding `AI_VISIBILITY_BASELINE.md` reached from the Perplexity side, now confirmed from Google's.

## Finding 3 — an assistant's own prompt appears in the query list

One recorded query, verbatim:

> `context: location: united states (not for language). do not include location references in your response. question: if my internet goes down, will ai search still work on recordings later, or does it miss events during the outage?` — 0 clicks, 2 impressions

That is an AI assistant issuing a grounded search on a user's behalf and reaching this site. It is a **single observation, not a measurement** — but it is direct evidence that PGAK pages already enter AI retrieval sets, and it is the strongest argument for counting AI referrals and AI crawls separately from ordinary search. `/insights/does-ai-cctv-work-without-internet` is the page that answers it.

## Finding 4 — top pages, and one historical artefact

| Page | Clicks | Impressions |
|---|---|---|
| `https://www.pgak.co.in/` | 75 | 642 |
| `http://www.pgak.co.in/` | 8 | 284 |
| `/pricing` | 6 | 310 |
| `/ai-cctv-noida` | 6 | 60 |
| `/insights/employee-refuses-biometric-consent` | 4 | 183 |
| `/ai-cctv-bengaluru` | 4 | 148 |
| `/insights/is-ai-cctv-legal-in-india-dpdp-act` | 4 | 99 |
| `/insights/aadhaar-based-attendance-and-aebas-explained` | 3 | **440** |
| `/insights/ai-cctv-price-in-india-what-it-should-cost` | 3 | 259 |
| `/ai-cctv-delhi-ncr` | 3 | 100 |

The AEBAS article draws **440 impressions for 3 clicks (0.7% CTR)** — the single clearest instance of the pattern above.

**The `http://` row is historical, not a live fault.** Verified 2026-09-23 by direct request:

```
http://www.pgak.co.in/   308 → https://www.pgak.co.in/
http://pgak.co.in/       308 → https://pgak.co.in/
https://pgak.co.in/      308 → https://www.pgak.co.in/
https://www.pgak.co.in/  200
```

The redirect chain is correct today. A 90-day window still contains impressions from before it was. Do not "fix" this.

## Finding 5 — indexing

| | Pages |
|---|---|
| Indexed | **120** |
| Not indexed | **4,290** |
| Sitemap URLs submitted (read 2026-09-23, status Success) | 167 |

Roughly **47 real pages in the sitemap are not indexed.**

| Reason | Pages | Validation |
|---|---|---|
| Not found (404) | 2,555 | Not started |
| Crawled – currently not indexed | 1,356 | Not started |
| Excluded by `noindex` tag | 175 | Not started |
| Server error (5xx) | 94 | **Started** |
| Alternate page with proper canonical tag | 40 | Not started |
| Discovered – currently not indexed | 24 | Not started |
| Page with redirect | 21 | Not started |
| Duplicate without user-selected canonical | 19 | **Failed** |
| Duplicate, Google chose different canonical than user | 3 | Not started |
| Blocked due to access forbidden (403) | 2 | Not started |

**Most of this is the WordPress compromise, already being handled.** A sample of the "Crawled – currently not indexed" list is dominated by bare-host `/items/G300147969/`-shaped URLs last crawled 2 June — the fake product catalogue documented in `lib/spamUrls.ts`, answered with `410 Gone` by `middleware.ts`. The 175 `noindex` exclusions are consistent with that same middleware setting `X-Robots-Tag: noindex` on those 410s; only four real pages set `noindex` deliberately (`/live`, `/wall`, `/billing`, `/cctv-buying-checklist`).

**Two real articles are caught in it**, both returning HTTP 200 when checked on 2026-09-23:

- `/insights/onboarding-employee-into-attendance` — last crawled 11 Sep
- `/insights/cctv-amc-what-should-it-include` — last crawled 8 Sep

Nothing is technically wrong with either. Google crawled them and declined to index. **An unindexed page cannot be cited by an AI Overview or by any assistant that grounds on a search index**, which makes this an AI-visibility problem, not only an SEO one.

### The 94 server errors (5xx) — diagnosed, stale, no action

Opened later the same day. This bucket is also the WordPress compromise, and the fault it records no longer exists.

Every URL in it is on the **bare host** and is legacy spam — the `/items/X106085020/` fake catalogue and casino slugs such as `/1win-skacat-prilozenie-bukmekerskoi-kontory2019-2//` (note the double trailing slash) and `/top-oferte-cazino-online-champagne-slot-pentru-cazinou-romania-2026-bonusuri-exclusive/`. **All 94 were last crawled 1 June 2026** — before the `410 Gone` middleware shipped.

Ten samples requested as Googlebot on 2026-09-23, following redirects to the terminal status:

```
https://pgak.co.in/items/X106085020/            308 → www → 410
https://pgak.co.in/1win-skacat-…-kontory2019-2//  308 → www → 410
https://pgak.co.in/items/S94857414/             308 → www → 410
…10 of 10 identical
```

Every one now ends in `410 Gone`, which is exactly what `middleware.ts` and `lib/spamUrls.ts` are built to do. **Validation (started 7 September): 94 pending, 0 failed.** Zero failures means nothing Google has re-checked still errors; the 94 are simply awaiting a re-crawl that Google is in no hurry to schedule for URLs it last touched in June and knows are dead.

Checked for a live fault and found none:

- All **178 sitemap URLs** requested as Googlebot → **every one 200**.
- Middleware edge cases that could plausibly throw — `//`, `/items//`, `/%2e%2e/etc/passwd`, `/insights/%ff%fe`, a 900-character path, `?filter=&sort=`, a trailing slash on a real article — returned 308, 400 or 404. **No 5xx on any path tested.**

**Action: none.** Do not re-click "Validate Fix" — Google states that resubmitting does not change queue position or priority, and restarting would discard 16 days of an already-clean run. Expect the bucket to decay on its own, alongside the 2,555 404s and the 1,356 crawled-not-indexed rows that share the same origin. Treat a *rise* in this number, or any `FAILED` count above zero, as the signal worth acting on.

## What this drives

Changes made today, and the gap in this document each one closes:

| Change | Gap |
|---|---|
| `app/llms.txt/route.ts` replaces the static `public/llms.txt` | The old file listed 20 commercial URLs and **none** of the 80 answer articles — the only pages that address the clusters in Finding 2. Now generated from the same data files as `app/sitemap.ts`: 160 links, all articles, grouped with the highest-demand clusters first. |
| `lib/aiReferrers.ts` + `lib/attribution.ts` → GA4 `ai_referral` event | `AI_VISIBILITY_BASELINE.md` lists "count AI-referral sessions" as a judging criterion with no mechanism. A visit from ChatGPT previously landed in GA4's generic "Referral" bucket. |
| `lib/leadRegister.ts` → source reads `AI assistant: ChatGPT` | Same document lists "any enquiry with an AI referrer in the lead register" as a criterion. The referrer hostname was already stored; it was not labelled. |
| `middleware.ts` → one `ai-crawl operator=… path=…` line per AI bot fetch, plus an `X-AI-Crawler` response header | Same document: *"Not verified today: whether any CDN/WAF layer challenges those agents in practice… the evidence is server logs."* This produces those logs. Distinguishes answer-time fetchers (OAI-SearchBot, PerplexityBot, Claude-User) from index crawlers (GPTBot, ClaudeBot, Google-Extended), because only the first group decides whether a page can be cited today. |

**What none of this promises.** `llms.txt` is a convention, not a ranking factor, and no platform has committed to honouring it. Listing the articles makes them discoverable to an assistant that looks; it does not make them cited. The measurement changes produce evidence, not traffic. Re-read this file against the same GSC period next month before concluding anything.

## Re-run instructions

Same property, same "3 months" preset, same Web search type. Record: totals row; top 10 queries by impressions; the five cluster sums over the top 100 queries; top 10 pages; the full indexing table. Then check, in this order:

1. Did the 94 5xx count rise, or any validation move to FAILED? (A fall needs no action; see the 5xx section.)
2. Are the two held-out articles indexed? (Indexing was requested for both on 2026-09-23.)
3. Did any non-brand cluster record a first click?
4. Did GA4 record any `ai_referral` event, and the lead register any `AI assistant:` source?
5. Do the Vercel logs contain `ai-crawl` lines, and from which operators?
