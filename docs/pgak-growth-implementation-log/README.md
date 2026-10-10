# PGAK growth implementation log — 8 October 2026

**Branch:** `growth/recovery-2026-10-08`, worktree `../pgak-growth`.

**Draft PR:** https://github.com/pgakservice01-afk/pgak-website/pull/86

**Baseline:** `main` at `654cbee`. **Nothing is deployed to production.** Merging is the release, and it needs the owner's explicit approval (§8).

| File | What it holds |
|---|---|
| `01-lead-states.md` | Lead states, delivery paths, event contract, attribution, CRM stages, reporting schema, environment variables, controlled test |
| `02-claim-evidence-matrix.md` | Generated: every capability with its route, supply mode, availability, evidence and what may be said |
| `03-feature-calculator-coverage.md` | Generated: the 31 calculator scenarios, formulas, worked examples and host pages |
| `04-article-ledger.md` | Generated: B001–B100 decisions, status and checker results |
| `05-performance.md` | Image weight before and after; lab measurement plan and results |
| `06-indexing-and-urls.md` | Search Console state, the seven old duplicates, the crawl, the URL map, post-release indexing requests |
| `07-local-and-offer-drafts.md` | Google Business Profile corrections, local information, pilot-offer draft (all for approval) |
| `08-gap-to-change-ledger.md` | **10 Oct brief:** every deliverable with what changed, tests, state (fact / hypothesis / local / prod / measured) and what remains |
| `09-route-component-map.md` | Buyer intent → canonical route → tool → proof → next step; component jobs; visuals metadata |
| `10-benchmark-adaptation.md` | Ten-brand adaptation matrix (W01–W10) with a hypothesis each; India shortlist |
| `11-lead-reconciliation-and-ga4.md` | Worksheet for the seven `generate_lead` events; the 2-vs-7 attempt gap; "(not set)" landing pages |
| `12-sales-handoff.md` | Lead stages, owner and response target, qualification and rejection reasons, four draft follow-up templates |
| `13-acquisition-economics.md` | Allowable cost per qualified lead; paid-search draft (not authorised) |
| `RELEASE-2026-10-10.md` | Release notes, checks, dependencies and rollback for the 10 Oct branch |
| `article-briefs.tsv`, `WRITER_GUIDE.md`, `agent-reports/` | The brief, the binding writing rules, each batch's report |
| `crawl/` | Production crawl, 8 Oct (preview crawl to add) |

Regenerate: `npm run docs:claims` (02, 03) · `node scripts/check-drafts.mjs` (04) · `node scripts/seo-crawl.mjs <base> <out.tsv>`.

---

## Phase 1 — Leads

- **Changed:**
  - `lib/lead-outbox.ts` and its tests are new.
  - `app/api/leads/route.ts`: `after()` delivery, plus `outboxWorker` in the health check.
  - `app/api/lead-outbox/route.ts`.
  - `.github/workflows/lead-outbox.yml`: inert until a secret is set.
  - `lib/lead-client.ts`: `lead_accepted` with `delivery_state`, plus registry ids.
  - `lib/attribution.ts`, `lib/leads.ts`, `lib/leadRegister.ts`: `feature_id` and `calculator_id`.
  - `components/home/AssessmentForm.tsx`: progressive disclosure.
  - `components/sections/QuickLead.tsx`: ids.
- **Why:**
  - The durable intake stored leads but nothing delivered them until a scheduler ran.
  - The homepage form showed nine fields: 114 views and 39 starts produced 7 submits (10 Sep–7 Oct, GA4 event counts, not a cohort).
  - Leads could not say which feature or calculator produced them.
- **Tests:** `test:outbox` (12), `test:lead-client` (10, including honeypot-200 and queued vs delivered).
- **Evidence:** production `/api/leads` reports `erp: true`, `notify: true`, `register: false`, `durableIntake: false` — configuration only. Not reconciled with the ERP.
- **Not changed:** QuickLead's city and camera fields stay compulsory. That was the owner's request of 28 Sep, and the brief prefers phone-first, so it is listed in §7 for the owner to decide.
- **Remaining:** register variables, the intake database, the outbox secret, and the controlled end-to-end test (`01-lead-states.md` §7–8).

## Phase 2 — Offer, features, evidence

- **Changed:**
  - `/resources/evidence` renders the four approved recordings from `lib/proof/projects.ts`.
  - `/book-demo`, `/our-story`, the ANPR intro, the homepage proof heading, `PROOF_NOTICE` and the B2B solution template are corrected.
  - "Limited pilot" is redefined.
  - The PPE evidence link is fixed.
  - Counts are derived (24, not "20"); case-study cards and the Ludhiana link are labelled scenarios.
  - Absolute "no new hardware", "live in a day" and "nothing to install" claims are replaced.
  - Unevidenced timing, accuracy, camera-health and outcome claims are softened on capability and solution pages (`agent-reports/claims-correction.md`).
  - New `lib/feature-truth.ts` and `components/sections/ScopeAndEvidence.tsx`, the latter on money pages.
  - `/pricing` gets itemised example scopes, and its form text now matches the form.
- **Tests:** `test:truth` (4), `test:proof` (13).
- **Remaining:** the owner's product and pricing facts (§7).

## Phase 3 — Indexing and performance

- **Search Console:** no manual actions or security issues. The seven old duplicates were all crawled 4–11 Sep without our canonical, and Google clustered them with unrelated domains. A live test today is clean. Likely cause: a generic edge response at crawl time. Owner to check the Vercel Firewall (`06` §3).
- **Crawl:** all 197 sitemap URLs return 200, self-canonical, one H1. The weak point was internal links: most calculators and seven guides had one inlink each.
- **Changed:**
  - A footer Capabilities column.
  - `/insights` as six cards plus ten topic clusters, with JSON-LD descriptions trimmed.
  - Images: logos at 128 px, posters at 960 px, a 1280 w hero; 1,013 KiB down to 326 KiB.
  - The ANPR image dimensions are fixed.
- **Remaining:** a lab comparison on the preview (`05-performance.md`), and indexing requests after release (`06` §6).

## Phase 4 — 31 calculator scenarios

- **New:**
  - `lib/calc/scenarios.ts`: C01–C31, validation, finance, overlap.
  - `components/calc/FeatureScenario*.tsx`: blank start, labelled worked example, print, share-link and CSV.
- **Embedded on:** the 24 guides, capability pages, ANPR, remote monitoring and `/platform/capabilities`; indexed on `/calculators`. No new URLs.
- **Tests:** `test:scenarios` (139):
  - every worked example;
  - zero volume, missing, NaN and negative inputs;
  - bounds;
  - finance (realisation 0, payback and ROI "not applicable");
  - overlap groups;
  - registry, guide, capability, claim and alias coverage.
- **Also fixed:** the eight shared standalone calculators (SimpleCalc) now start blank, with "Load worked example" (commit c6701bc). The storage, bandwidth, TCO and ROI tools keep sizing defaults or blanks: they report capacity or cost, not a saving.

## Phase 5 — 100 article assignments

- **Status:** see `04-article-ledger.md` for exact counts.
- **Location:** drafts are in `content/insights/_drafts/` and are shown only on preview and dev, with a banner and noindex. Two briefs are merged (B080, B098) and one re-scoped (B100).
- **Fixes along the way:** writers removed many unevidenced claims from the 52 refreshed live articles, and corrected factual errors, for example "RCA" → BNC, "8MP doubles density" → ×1.43, and labour-code status.
- **Ready to publish now: 0.** None has a named reviewer.
- **To promote a draft:** after review, move `_drafts/<slug>.md` up one level, delete `draft: true`, add the cross-links listed in each batch report, run `node scripts/check-drafts.mjs`, and recheck any dated third-party fact.

## Phase 6 — Tools and measurement

- **New:**
  - `/platform/compatibility` self-check (`lib/compat.ts`, 6 tests).
  - `/resources/evaluation-method` pilot scorecard (`lib/calc/pilot.ts`, 8 tests).
  - `/resources/scope-worksheet` (new, in the sitemap).
  - Calculator CSV export.
  - GA4 events `calculator_result`, `calculator_share`, `calculator_export` and `compatibility_check_complete`.
- **Measurement design:** `01-lead-states.md` §4–6.
- **Remaining:** GA4 custom definitions, and a DebugView check during the controlled test.

---

## 7. Decisions and access needed (owner)

0. **Urgent: eight live legal and privacy articles contain errors now.** See `agent-reports/B081-B090.md`.
   - **DPDP:** the articles present DPDP duties as already in force; they commence in May 2027.
   - **Repealed law:** they name the repealed Factories Act as the current source of registers.
   - **Evidence law:** they never name the Bharatiya Sakshya Adhiniyam.
   - **AEBAS:** they describe its authentication methods wrongly.

   Corrected drafts exist (B081–B087, B089). The fastest safe path is a lawyer's review of those drafts, then promotion. If that will take weeks, decide whether to add a dated "under legal review" note. Unpublishing would lose traffic: `attendance-records-law-india` alone had 464 impressions in 28 days. I have not edited the live legal text myself, because rewriting legal statements needs the review it lacks.
1. **Bing Webmaster Tools (new, 10 Oct):** Bing returns no pgak.co.in page, even for a branded or exact-title search. ChatGPT search and Copilot retrieve through Bing. Add the site, check for a spam or blocked notice, and submit the sitemap. See `docs/seo/2026-10-10/AI_VISIBILITY_RUN.md`.
1. **Vercel** (signed in as `pgakservice01-afk`):
   - Set `LEAD_REGISTER_URL` and `LEAD_REGISTER_SECRET`.
   - Check Firewall, bot protection and attack-challenge history for 4–11 Sep.
   - Decide whether to use durable intake, which needs a private database (§`01` 7).
2. **ERP access** to reconcile the 7 GA4 `generate_lead` events from 10 Sep–7 Oct, and to add the CRM fields and stages.
3. **Pricing basis:** "billed per camera per month" still appears in several places (`claims-correction.md`). Confirm it or retract it. Also confirm "feasibility check and quote are free".
4. **Product facts:**
   - ANPR: native or licensed module.
   - The supply mode for each capability (B005).
   - Phone-based face enrolment.
   - Automatic camera discovery.
   - Offline alert behaviour.
   - Camera-health alerting.
   - "Ninety-plus camera" accounts.
5. **Local facts:**
   - The Gill Road office and PGAK's own installation team, as stated on `/ai-cctv-ludhiana`.
   - Which phone number to publish (62839 93600 or 077173 03858).
   - Google Business Profile ownership and category (`07`).
6. **Form:** keep QuickLead's compulsory city and camera fields (28 Sep decision), or switch to phone-first as the brief recommends.
7. **Pilot offer:** decide the terms and economics (`07` §C).
8. **Reviewers:**
   - a named PGAK engineer for 73+ drafts;
   - a named lawyer for the legal/privacy drafts;
   - a fire-safety professional for B054.
9. **Remaining unsourced or outcome-leaning items:**
   - titles and H1s ("Catches Theft", "Spot It Before the Theft");
   - `/cctv-buying-checklist` is about attendance systems;
   - live attendance articles that cite superseded law until the B083 and B089 drafts are promoted.

## 8. Release checklist (when approved)

1. Reread this README and the PR diff. Run the gate: `npx tsc --noEmit && npm run lint && npm test && npm run build`.
2. Merge PR #86 into `main`. Vercel builds production.
3. Verify on production:
   - `/`, `/anpr-number-plate-recognition`, `/features/guides/ppe-detection#scenario-C14`, `/calculators`, `/resources/evidence`, `/resources/scope-worksheet`, `/platform/compatibility`, `/pricing` and `/insights` render;
   - static assets return 200 (the new `-128h.webp` and `-960.webp` files);
   - `GET /api/leads` returns 200 with the expected flags;
   - the footer shows the Capabilities column;
   - no page shows "Draft — not published";
   - the sitemap has 198 URLs.
4. Re-run `node scripts/seo-crawl.mjs https://www.pgak.co.in crawl/production-after.tsv` and compare.
5. Run the controlled lead test, only with explicit approval and named recipients (`01` §8). Delivery is proven only by reading back the ERP row and the Telegram message.
6. Request indexing (`06` §6), at most 15 a day, confirming each dialog.
7. After 7 and 28 days: the GSC pages report, query CTR on the refreshed URLs (matched windows), and GA4 `lead_accepted` by `delivery_state` and `feature_id`.

## Rollback

- **Whole release:** `git revert -m 1 <merge-commit>` on `main` and push. Vercel redeploys the previous state. No database or URL migrations need undoing.
- **Selective rollback:** revert the individual commits listed in PR #86 (each phase is its own commit).
- **The image change is reversible by references:** the original files are kept.
- **Drafts:** nothing to roll back; production never reads them.
- **Workflow:** delete `.github/workflows/lead-outbox.yml`, or leave `LEAD_OUTBOX_SECRET` unset.

## Known limitations

- **Lead delivery:** not proven end to end, and production cannot be tested without approval.
- **Calculators:** scenarios use the visitor's assumptions. PGAK has no measured effectiveness figures, and the pages say so.
- **Evidence:** four demonstrations of limited scope. No customer result, accuracy figure or testimonial is published.
- **Demand:** most article topics are hypotheses until fresh GSC and Keyword Planner checks (India plus served districts). The historical keyword CSV is not fresh volume.
- **Lab and field performance:** lab numbers come from PageSpeed against comparable URLs. Field Core Web Vitals are a later, separate check: Search Console currently shows no data.
- **Legal content:** checked against official texts on 8 Oct 2026, but unreviewed by a lawyer. Punjab rules under the labour codes are unverified.
- **Shared tree:** the main checkout's `.claude/launch.json` was given a `pgak-growth` preview entry for this session's dev server. It is reverted at the end of the session.
