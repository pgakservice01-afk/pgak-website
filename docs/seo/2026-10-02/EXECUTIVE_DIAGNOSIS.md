# Executive diagnosis — 2026-10-02

Every figure here was read today from production or from Search Console
(`sc-domain:pgak.co.in`). Where something was not verified, it says so.

## The one-line answer

PGAK's search visibility is **growing**, the site is **not penalised or compromised**,
and the commercial pages are **not where the traffic is**. The binding constraint is not
rankings — it is that for the last nine days every enquiry has been invisible to the
master sheet and to both internal inboxes.

## Confirmed baseline

The handoff figures were re-read today and are **accurate, not stale**:

| Window | Impressions | Clicks | CTR | Avg position |
|---|---|---|---|---|
| 2–29 Sep (28d) | 7,510 | 113 | 1.50% | 7.92 |
| *verified today* | **7.51K** | **113** | **1.5%** | **7.9** |
| 5 Aug–1 Sep (prior 28d) | 890 | 47 | 5.28% | 10.74 |

Impressions grew **8.4×** period on period while clicks grew 2.4×. CTR fell from 5.28%
to 1.50%. **That is a changing query mix, not a decline** — the site went from being
seen on a few brand-adjacent queries to being seen on thousands of informational ones
that Google answers in place. Average position *improved* (10.74 → 7.92) at the same
time. Treating the CTR drop as a regression would be the wrong diagnosis.

## Where the money actually is — and is not

90-day page data, money pages defined by the repo's own `lib/buyerDecision.ts` (six
commercial pages) plus the conversion set:

| | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| **Money pages** | **14** | **1.03K** | 1.4% | 7.9 |
| Whole site | 175 | 7.91K | 2.2% | 8.2 |

Money pages take **8% of clicks**. The homepage alone takes 83, of which 70 come from
the single branded query `pgak`.

| Page | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| `/pricing` | 7 | 333 | 2.1% | 5.8 |
| `/cctv-installation-company` | 3 | 104 | 2.9% | 6.2 |
| `/ai-intruder-detection` | 2 | 246 | **0.8%** | 11.1 |
| `/contact` | 1 | 252 | **0.4%** | 5.0 |
| `/ai-cctv-for-warehouses` | 1 | 65 | 1.5% | 13.1 |
| `/video-analytics-software` | 0 | 26 | 0% | 25.3 |
| `/industrial-cctv` | 0 | 7 | 0% | 9.3 |
| `/factory-security` | — | **0** | — | — |
| `/anpr-number-plate-recognition` | — | **0** | — | — |
| `/free-audit` | — | **0** | — | — |

Three money pages have **zero impressions in 90 days**. `/anpr-number-plate-recognition`
is one of them — yet it is the single page observed taking a lead inline citation on
Perplexity (24 Sep run). It earns from an answer engine while earning nothing from
Google.

The largest impression pools on the whole property are zero-click question pages:
`insights/cctv-storage-how-many-days` draws **1,449 impressions for 1 click** (0.1%),
`insights/aadhaar-based-attendance-and-aebas-explained` 618 for 3.

## Findings, by consequence

| # | Finding | Evidence | Confidence | Business consequence |
|---|---|---|---|---|
| 1 | Master sheet and both internal emails have not received a single enquiry since 23 Sep | `GET /api/leads` → `register:false`, `urlSet:false`, `secretSet:false`, `env:production` | **Certain** | Enquiries arrive at the ERP with no sheet row, no email, no owner, no follow-up SLA. Revenue leaks at the slowest possible point to notice. |
| 2 | No durable intake store | `durableIntake:false` | **Certain** | The ERP is a single point of failure. An ERP outage loses the lead outright. |
| 3 | Not penalised, not compromised | Manual actions: *No issues detected*. Security issues: *No issues detected* | **Certain** | Rules out the most expensive hypothesis. No disavow or cleanup project is warranted. |
| 4 | Residual spam already handled correctly | 410 Gone on spam, 301 to real pages for legitimate legacy URLs, 0 spam in a 206-URL sitemap | **Certain** | Needs recrawl time, not work. |
| 5 | Commercial pages carry 8% of clicks | 14 of 175 clicks over 90d | **Certain** | Growth so far is informational and branded. The commercial funnel is barely fed. |
| 6 | CTR fall is query-mix, not decay | Position improved 10.74 → 7.92 across the same periods | **High** | Do not "fix" titles against a metric that is moving for structural reasons. |
| 7 | Distinctiveness correlates with citation | The two most unique solution pages (ANPR 71.7%, industrial-cctv 71.2%) are the two with proof blocks; ANPR is the one observed cited | **Low — 2 observations** | Points work toward adding specifics to thin pages. Not yet a demonstrated cause. |

## What is blocked, and on whom

| Blocker | Blocks | Owner |
|---|---|---|
| Vercel Production env vars `LEAD_REGISTER_URL`, `LEAD_REGISTER_SECRET` + redeploy | Finding 1 — the whole sheet/email path | Owner |
| Vercel log access (no CLI/token here) | Reading `LEAD_REGISTER_SKIPPED` and `ai-crawl` lines | Owner |
| GA4 property access not exercised this session | Funnel reconstruction, event dedup audit | Not attempted today |
| Google Business Profile / Bing Webmaster status | Local visibility; the 24 Sep note that Bing Places shows a wrong phone and address is **still unverified** | Owner |

## Recommended order

1. **Set the two Vercel variables and redeploy.** Nothing else in this document changes
   revenue as directly, and it is minutes of work. Then run one TEST submission as the
   acceptance test and confirm the row, both inboxes, the ERP record and the analytics
   event.
2. **Configure a durable intake store** so the ERP stops being a single point of failure.
3. **`/ai-intruder-detection`** — 246 impressions at 0.8% CTR is the largest wasted
   commercial impression pool on the site. Diagnose the title/snippet against the actual
   result layout before rewriting.
4. **The three zero-impression money pages** need to exist in the index at all before
   any CTR work on them means anything.
5. Thin solution pages (`hospital-security` 49.3% unique, and the three near it) need
   owner-supplied specifics. Cannot be written without facts PGAK will stand behind.

## Deliberately not done

- No end-to-end lead submission (see `P0_FIX_AND_TEST_LOG.md` for why).
- No keyword volumes, difficulty scores or competitor backlink counts are quoted —
  no authorised Ahrefs/Semrush session was used this session.
- No claim that any change here will improve a ranking.
