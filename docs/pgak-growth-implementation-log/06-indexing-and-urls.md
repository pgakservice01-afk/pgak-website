# Indexing, crawl and URL changes

Checked 8 October 2026: read-only Search Console in the owner's signed-in Chrome, plus a scripted crawl of the production sitemap.

## 1. Account state

- **Manual actions:** none detected.
- **Security issues:** none detected.
- **Core Web Vitals:** no field data (mobile or desktop).
- **Enhancements:** 38 valid Breadcrumbs, and **2 valid "Review snippets"**. The current site emits no Review or AggregateRating markup: a code search finds none, and the 197-URL crawl found no Review type. So the two items are most likely historical crawls of legacy or old pages. The owner can open the report to see the two URLs; nothing needs to change in code.
- **Pages report (all known URLs):** 113 indexed, 4,275 not indexed. Most of the not-indexed are legacy spam, as diagnosed in `docs/seo/2026-10-05/INDEXING_DIAGNOSIS.md`.

## 2. Earlier requests: reconciled, not repeated

On 5 October, 15 URLs got a confirmed "Indexing requested", listed in `INDEXING_DIAGNOSIS.md` §3. None were re-requested today. After this branch is released, request indexing **only** for priority URLs whose content materially changed (§5), no more than ~10–15 a day, each confirmed by the dialog.

## 3. The seven "Duplicate without user-selected canonical" URLs

| URL | Last crawl | User-declared canonical at crawl | Google-selected canonical |
|---|---|---|---|
| /insights/dvr-vs-nvr-which-do-you-have | 11 Sep 2026, 1:42 PM | None | https://www.747live.bet/ (betting site) |
| /insights/face-recognition-low-light-gate | 11 Sep, 1:39 PM | None | https://www.747live.bet/ |
| /insights/ip-vs-analogue-cameras-india | 11 Sep, 1:37 PM | None | https://www.747live.bet/ |
| /insights/multi-location-attendance-management | 8 Sep, 2:42 PM | None | https://www.afpintegra.pe/iniciar-sesion (Peruvian pension login) |
| /ai-cctv-batala | 4 Sep, 12:51 PM | None | https://www.axismf.com/…/axis-retirement-fund-conservative-plan/rc-dg/direct |
| /ai-cctv-bathinda | 4 Sep, 12:39 PM | None | same axismf.com URL |
| /ai-cctv-patiala | 4 Sep, 12:37 PM | None | same axismf.com URL |

**Live test today** (`/insights/dvr-vs-nvr-which-do-you-have`, "Test live URL", read-only):
- URL is available to Google;
- page can be indexed;
- user-declared canonical is the page itself.

The production crawl (§4) shows all seven return 200 with a self-canonical.

**What the evidence says:**
- Self-canonicals have been in the code since 1 August (`pageMeta`, commit 283ebaf), so on those dates Googlebot was **not** receiving PGAK's rendered page.
- It got something without our head tags, in short windows (15 minutes on 4 Sep, minutes on 11 Sep).
- Google then clustered it with pages on unrelated domains.
- That is the signature of a **generic page served instead of the site**: for example a hosting-edge bot challenge, a firewall or rate-limit interstitial, or a platform error page. Such pages are byte-identical across many websites, so Google treats them as duplicates of each other.
- The middleware cannot produce this: it only returns empty 410s for legacy spam paths, which would show as "Not found".
- DNS for `pgak.co.in` and `www` resolves only to Vercel today, through Cloudflare and Google resolvers alike.
- **Not proven:** the September response itself cannot be retrieved.

**Actions:**
1. **Owner (signed in to Vercel as `pgakservice01-afk`), read-only first:** Project → Firewall. Check whether Attack Challenge Mode, Bot Protection, a managed ruleset or a rate-limit rule was enabled on or around 4–11 Sep. Check that verified bots (Googlebot) are allowed, and look in the firewall log for challenged Googlebot requests. Leave verified bots unchallenged.
2. **No canonical or redirect change is needed.** These are useful, distinct pages. Consolidating them would destroy content to fix a crawl-time problem.
3. **After release:** request indexing for these seven. Four have refreshed drafts (B012, B013, B038, B046) to promote first.
4. Re-inspect in 7–10 days. Success = "URL is on Google", or a Google-selected canonical equal to the URL.

## 4. Production crawl (`scripts/seo-crawl.mjs`)

`crawl/production-2026-10-08.tsv`: all 197 sitemap URLs returned **200**, with a **self-canonical**, **no noindex** and **exactly one H1**. HTTP→HTTPS and apex→www redirect with a 308 to the exact www URL; there is no catch-all homepage redirect. The legacy spam paths return 410 + `X-Robots-Tag: noindex` from the middleware.

**Internal links were the weak point:**

| Page | Internal inlinks (production) |
|---|---|
| 10 of 11 calculators | 1 (only /calculators) |
| 7 feature guides (abandoned-object, onvif, privacy-masking, smoke-flame, sound, tailgating, weapon) | 1 |
| /remote-cctv-monitoring | 1 |
| /anpr-number-plate-recognition | 9 |
| /industrial-cctv | 9 |
| /video-analytics-software | 10 |

**This branch adds, all server-rendered:**
- **Footer "Capabilities" column** on every page: ANPR, industrial CCTV, face attendance, remote viewing, calculators, recorded demonstrations.
- **Scenario hosts and standalone calculators:** each of the 31 scenarios links its standalone calculator. The /calculators hub links every scenario host with its `#scenario-Cxx` anchor.
- **Cross-guide links:** guide pages whose scenario lives elsewhere link to it.
- **/insights:** every article sits as a plain link under one of ten topic clusters.
- **Money pages:** links to the compatibility check, scope worksheet, evaluation method and evidence page.

Re-run the crawl against the preview and production after release to record the after state.

## 5. URL migration map

| Change | Old | New | Redirect |
|---|---|---|---|
| New page | — | /resources/scope-worksheet | — (in sitemap) |
| New articles (on promotion only) | — | /insights/<slug> for 46 new briefs | — |
| Brief B100 re-scoped | (proposed) /insights/factory-owner-cctv-buying-checklist | /insights/factory-cctv-handover-checklist | none needed — never published |
| B080 merged | (proposed) /insights/camera-health-monitoring-requirements | content folded into /insights/cctv-camera-offline-how-to-know | none — never published |
| B098 merged | (proposed) /insights/ai-cctv-support-sla-checklist | content folded into /insights/cctv-amc-what-should-it-include | none — never published |
| Refreshes | 52 existing URLs | same URLs | none |

No live URL is removed, renamed or redirected by this branch.

## 6. Priority indexing requests after release (≤15/day, confirm each)

**Day 1:**
1. /anpr-number-plate-recognition
2. /industrial-cctv
3. /factory-security
4. /face-recognition-attendance-system
5. /video-analytics-software
6. /pricing
7. /resources/evidence
8. /calculators
9. /platform/compatibility
10. /resources/evaluation-method
11. /resources/scope-worksheet
12. /ai-cctv-ludhiana
13. /features/guides/ppe-detection
14. /book-demo
15. /insights

**Day 2:** the seven old duplicates in §3, plus the promoted storage, price and AMC refreshes.

**Day 3 onwards:** promoted drafts in ledger priority order (P1 first).
