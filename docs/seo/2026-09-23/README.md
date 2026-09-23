# PGAK — 23 September 2026: verified state, buyer-evidence batch, measurement plan

Branch `seo/buyer-evidence-2026-09-23`, cut from `main` @ `ef77c26`. Production is that commit.

Labels used throughout: **Implemented** · **Tested locally** · **Tested on real integration** · **Production verified** · **Access blocked** · **Owner evidence needed** · **Awaiting approval**.

---

## 1. Verified current state (re-checked today, not assumed)

| Fact | Evidence | Label |
|---|---|---|
| `main` = `ef77c26`; PRs **#27 and #28 merged** 22 Sep | `git log`, `gh pr list` | Production verified |
| **PR #29 (lead register) still OPEN** | `gh pr list` | Awaiting approval |
| PR #25 (old B2B draft) still open, untouched | `gh pr list` | — |
| Production `GET /api/leads` → `{"erp":true,"notify":true,"newLeadAlerts":true}` — **no `register` key**, so the sheet/email register is **not live** | live fetch | Production verified |
| **"PGAK — Master Leads" sheet is still empty** — `setupSheet` has not been run, so no Leads tab, no columns, no automation | Drive read of the file returned empty content | Access blocked (owner consent) |
| Sheet ownership/sharing unchanged: owner director@securedengineers.com, Editor mittaladitya18@gmail.com, not public | Drive permissions | Production verified |
| Live crawl: **167 sitemap URLs, all 200**, no duplicate titles/descriptions/H1s, all self-canonical, 0 missing alt, 0 broken links | `scripts/seo-crawl.py` against `https://www.pgak.co.in`, 2026-09-23T07:56Z, saved to `evidence/crawl-prod.json` | Production verified |
| Set of URLs is **identical** to 22 Sep — nothing added or removed | diff of the two crawls | Production verified |
| `/cctv-buying-checklist` remains intentionally noindex and out of the sitemap | crawl + page source | Production verified (unchanged by design) |
| robots.txt already allows Googlebot, Bingbot, OAI-SearchBot, PerplexityBot; blocks CCBot, Bytespider | live fetch | Production verified |
| One GA4 tag (`G-6EMP9HSR2F`), no GTM container | live HTML 22 Sep, unchanged | Production verified |

**Statuses kept separate:** every URL above is *200 and indexable and in the sitemap*. Whether Google has **indexed** or **ranks** them is unknown without Search Console — not inferred.

## 2. Access and results log

| Tool | Exact PGAK property/account | Permission | Period | Settings | Evidence | Finding | Blocker |
|---|---|---|---|---|---|---|---|
| Google Search Console | domain `pgak.co.in` | **none** | — | — | — | — | **Access blocked.** No GSC connector in this session; the connected org's property is securedengineers.com, which must never be substituted |
| Google Analytics 4 | property with `G-6EMP9HSR2F` | **none** | — | — | — | — | **Access blocked** |
| Google Ads / Keyword Planner | PGAK Ads account | **none** | — | — | — | — | **Access blocked**; no volumes invented, no spend |
| Google Trends | — | public UI | 12 months to 22 Sep 2026 | India, Web Search, all categories | `docs/seo/2026-09-22/GROWTH_PHASE_1.md` §4 | Relative interest only: cctv installation ≈28, video analytics ≈26, intrusion detection ≈28 (ambiguous, cyber meaning), face recognition attendance ≈4, anpr camera ≈3 | 5-year view and regional map not usable (map failed to render) |
| Google Search (manual samples) | — | public | 22–23 Sep | IN/en, desktop, browser in Ludhiana | this README §3, `OPPORTUNITY_REGISTER.csv` | AI Overview present for the pricing query, citing competitors; installation queries are local-pack led | Samples, **not rankings** |
| Perplexity | — | public, logged out | 23 Sep | default model, web-grounded | `AI_VISIBILITY_BASELINE.md` | PGAK source-listed, **not cited inline**, on 2/2 questions; its stored titles predate 22 Sep | Sample of 2 |
| Bing Webmaster Tools / Copilot AI report | pgak.co.in | **none** | — | — | — | — | **Access blocked** |
| Google Business Profile | PGAK listing | **none** | — | — | — | — | **Access blocked**; installation intent is local-pack led, so this is the highest-value missing account |
| PageSpeed / CrUX | pgak.co.in | public | 22 Sep | Lighthouse 12 mobile, 3 runs | `docs/seo/2026-09-22/evidence/lighthouse/` | Production medians: LCP 1.98–2.38 s, CLS 0 | Lab only; **CrUX field data not fetched** |
| Semrush | pgak.co.in | subscription, **0 API units** | — | — | — | — | Access blocked (units) |
| Drive / Gmail (Google Workspace) | director@securedengineers.com | connected | — | — | sheet created + shared; alert email delivered 22 Sep | Working | — |
| Vercel | pgak-website project | **none** | — | — | — | — | **Access blocked**: env vars for PR #29 must be set by the owner |
| Merchant Center | — | — | — | — | — | **Not applicable** — PGAK sells quoted services, not product offers | — |

## 3. What changed in this branch

**One batch, six pages.** `lib/buyerDecision.ts` (data) + `components/solutions/BuyerDecisionPack.tsx` (render) answer the buying decision in crawlable HTML on:
`/video-analytics-software`, `/cctv-installation-company`, `/factory-security`, `/ai-cctv-for-warehouses`, `/ai-intruder-detection`, `/anpr-number-plate-recognition`.

Each page now states: a self-contained opening answer · what it does · **what it does not do** · what your site must provide · scope included/excluded · what affects the price · what the written quote should list · how to judge a pilot · what happens after you enquire.

- It **replaces** the older generic "What to check before deployment" block on those six pages (no duplicated content); other pages keep the old block.
- Two FAQs added from observed buying questions: cost per camera (answered as *structure and cost drivers*, never an invented rate) and which cameras suit a warehouse.
- **No** rupee figure, accuracy percentage, SLA or named customer was added. Every statement traces to existing verified site facts (RTSP/ONVIF access, on-site processing unit, per-camera-per-month billing, free assessment, fortnight of tuning, itemised quote, availability confirmed per project).
- Preserved: all URLs, the two journeys, neutral installation wording, city labels, hardware wording, ERP integration, attribution, spam controls, the noindexed checklist, truthful sitemap dates.

**Why these six:** they carry commercial intent, match verified capability, and are exactly the pages that lost the citation contest in §2 because they described benefits rather than conditions.

**Lead-generation hypothesis being tested:** buyers who can see compatibility, exclusions, price drivers and the pilot method enquire with better information and in greater numbers, and answer engines cite pages that state those conditions.
**Measurement:** enquiries per landing page from the register (`project_type` split), assisted by GSC CTR when access exists, plus monthly AI-citation re-runs. **Minimum 4 weeks before judging; do not rewrite these pages again in the meantime.**

### Tests

| Check | Result | Label |
|---|---|---|
| `npx tsc --noEmit`, `next build` | pass | Tested locally |
| Suites: middleware 13, leads 30, locations 6, lead-client 7, analytics 3 | all pass | Tested locally |
| Crawl after change (local prod build) | 167 URLs, all 200, 0 duplicate titles/descriptions/H1s | Tested locally |
| Render check: pack appears on exactly the 6 pages; `/commercial-cctv` keeps the old block | verified | Tested locally |
| Before/after performance | **not claimed** — a local build without analytics is not comparable to production. Re-run Lighthouse on the preview and production under the same conditions after deploy | Awaiting approval |

## 4. Lead capture — actual status

| Step | Status |
|---|---|
| Code (sheet row + both alert emails, per-destination statuses, retry/replay) | Implemented, **Tested locally** (mock ERP + mock of the Apps Script contract), in **PR #29, open** |
| Sheet exists, private, correct sharing | Production verified |
| Apps Script project created, code loaded, `SECRET` + `RECIPIENTS` set, project named | Implemented |
| **Script authorised (`setupSheet`) and deployed as a web app** | **Access blocked — owner consent.** Google's consent window is outside automation; the sheet is still empty, proving it has not run |
| Vercel env (`LEAD_REGISTER_URL`, `LEAD_REGISTER_SECRET`, `LEAD_REPLAY_SECRET`) | **Access blocked — owner** |
| Real end-to-end test through the deployed script | **Not done.** The 22 Sep email was sent manually through Gmail: it proves the message format and that director@ received it — **it does not prove automatic delivery** |
| Aditya's receipt | **Owner evidence needed** — never claimed |

**Two clarifications this handoff owes you**

1. **"Zero cameras" vs "16–50".** They are different fields. Journey B is for a site with **no existing cameras**; the form then asks *how many cameras the site will need*. Test `test-B-newsite-0002` used exactly: `project = New CCTV installation`, `cameras = 16–50` (the **proposed** count), `timeline = 1–3 months`. The *existing* count for that buyer is nil, which is why the upgrade form's "None yet — new site" answer maps to the same journey. Sheet columns are therefore labelled "Camera count" with the requirement column stating which journey it belongs to; if you want two separate columns (existing vs proposed), say so and I will split them before the script is deployed.
2. **An Apps Script web app set to "Anyone" does not make the spreadsheet public.** It exposes one URL that accepts POSTs; the sheet itself stays private to the two accounts. The endpoint writes nothing unless the request carries a valid HMAC signature within a 5-minute window, and the lead id must be present. What remains untested on the real deployment: Google's own quota behaviour (`MailApp.getRemainingDailyQuota()` is read at runtime and the script refuses to half-send), concurrent submissions under `LockService`, and replay against the live script.

**Durability, stated honestly.** Today an undelivered lead survives as: the ERP row (when ERP is up), the Telegram owner alert (`notify:true` in production), and the Vercel function log (~1 hour on Hobby). PR #29 adds the sheet as a fourth, independent copy. If **both** ERP and register fail, the durable artefact is the Telegram alert plus the customer's own WhatsApp fallback — not a queue. A true durable queue needs storage PGAK does not have today (Vercel KV/Upstash or the ERP's own inbox endpoint). **Recommendation, not yet built:** once #29 is live, measure how often both fail; add storage only if it happens.

## 5. Owner actions — one consolidated list

1. **Authorise + deploy the Apps Script** (5 min, your Google account): sheet → Extensions → Apps Script → run `setupSheet` → allow → Deploy → Web app (Execute as Me, Access Anyone) → copy the `/exec` URL. Steps: `docs/integrations/LEAD_REGISTER.md`.
2. **Set the three Vercel env vars** and redeploy; then tell me and I will run the controlled production test.
3. **Grant read access** (one pass): Search Console (`pgak.co.in` domain property), GA4 (`G-6EMP9HSR2F`, Viewer), Google Business Profile (Manager), Google Ads/Keyword Planner (export is enough), Bing Webmaster Tools.
4. **Approve or correct** the open claims: Punjab delivery model (C2), the ₹15,995 audit value, 48-hour and one-hour promises, "live within a day", Spot AI footage rights, turnkey scope.
5. **Decide on publishing price structure.** Competitors and Google's AI Overview answer the pricing question with ranges; PGAK publishes none. A truthful band ("from ₹X per camera per month, quoted per site") would make the pages citable — but only you can approve a number.
6. **Record one original demo** (60–90 s on a permitted feed) — the single biggest proof gap behind every citation loss in §2.
7. **Free disk space on this Mac** (~400 MB left); builds will start failing.

## 6. Backlog

**30 days** — deploy #29 and this batch; production end-to-end lead test; grant access; baseline report from GSC/GA4 + register; GBP review (installation intent is local-pack led).
**60 days** — re-run the 25 AI questions after re-crawl; publish the original demo and a compatibility table; act on real query/CTR data for the six pages; improve the three city pages with the most impressions.
**90 days** — extend the buyer packs to the next 4–6 pages based on measured demand; decide on price-band publication; start the approved outreach (two free article routes first).

No date here promises a ranking change. Each item lists the evidence it needs, and the review dates exist to check evidence, not to declare success.

## 7. Dashboard (spec — **not built**, needs GSC/GA4 + the live register)

One Looker Studio page, three blocks, refreshed weekly:
- **Demand**: non-brand impressions, clicks, CTR by page and query group (GSC), AI-referral sessions (GA4).
- **Capture**: confirmed unique enquiries (distinct lead id), by journey and landing page; lead-delivery failures by destination; time to first contact (register).
- **Outcome**: contactable → qualified → demo/site assessment → proposal → customer (register columns sales owns).
Rules: exclude TEST/spam/duplicate rows; keep dealer and checklist categories separate; "not contacted yet" is never "unqualified"; never add AI-report totals to Web totals; record the timezone (register writes IST) and lead-cohort lag.
