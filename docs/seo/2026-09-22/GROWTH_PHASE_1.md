# PGAK growth phase 1: enquiry journeys and search relevance

Branch `growth/enquiry-journeys-2026-09-22`, stacked on PR #27 (`seo/delta-audit-2026-09-22`). **Nothing is published** until you approve merging.

Goal: more genuine, qualified enquiries, then more relevant organic clicks and non-brand impressions. This document records **no** measured traffic, ranking or lead figures, because none were accessible (see §9). Every demand statement is **provisional**.

Status labels: **Implemented**, **Tested**, **Awaiting access**, **Awaiting factual confirmation**, **Awaiting deployment approval**.

---

## 1. Priority pages and why

Selection criteria, in order:
1. Commercial buying intent.
2. Fit with what the site already says PGAK supplies.
3. Serviceability without a new operational claim.
4. Gaps in the page or enquiry path.
5. Effort.

Existing visibility (Search Console) could not be used; see §9.

| # | Target buyer → buying problem | Search intent (provisional) | Existing URL (kept) | Improvement implemented | Enquiry action | Measurement (once GSC/GA4 access exists) |
|---|---|---|---|---|---|---|
| 1 | Business with a working CCTV estate → "cameras record, nobody watches" | AI video analytics for existing CCTV | `/video-analytics-software` | Title and description name the offer and the next step. New FAQ: "see it on my own cameras first". Related links now point to the capability pages. | Free camera check (upgrade journey) | Non-brand impressions/clicks/CTR for the page; `generate_lead` with `project_type=Upgrade existing CCTV` |
| 2 | New factory/warehouse/office with no cameras → needs a designed system | CCTV installation company / new site | `/cctv-installation-company` | Now the **new-installation home**: project-first hero, new-site deployment checklist, new-install form (`#plan`), FAQs on quote contents and planning CCTV into a new build. Neutral delivery wording is a separate commit (§6). | Site consultation (new journey) | Same, with `project_type=New CCTV installation`; `installation_request` |
| 3 | Plant owner → gate, boundary, shift attendance | Factory security system | `/factory-security` | Title names gate, perimeter and attendance. Description states the offer and a free camera check. Links added to ANPR, factory attendance and installation. | Both journeys (chooser) | Page CTR; leads by journey |
| 4 | Logistics manager → after-hours movement, loading bay, gate | Warehouse CCTV / AI CCTV for warehouses | `/ai-cctv-for-warehouses` | Description rewritten around real events plus the next step. Links to ANPR, multi-site, warehouse attendance and installation. | Both journeys | as above |
| 5 | Large industrial site | Industrial CCTV | `/industrial-cctv` | Description offers both journeys: upgrade existing cameras or plan new. | Both journeys | as above |
| 6 | Site owner → break-ins noticed next morning | AI intruder detection | `/ai-intruder-detection` | Description states what the alert contains and filters, and the next step | Upgrade journey | as above |
| 7 | Long boundary walls, yards | Perimeter / virtual fencing | `/smart-perimeter-protection` | Description qualified ("no trenching or perimeter cabling"). New FAQ separates this page's intent from intruder detection. | Upgrade journey | Watch for query overlap with #6 in GSC |
| 8 | Factory/warehouse gate → vehicle log | ANPR system for factory gate | `/anpr-number-plate-recognition` | Title names factory and warehouse gates. New FAQ: "which ANPR camera suits a factory gate". The ANPR feature page now links here. | Upgrade journey | Page CTR; query/page split vs `/features/vehicle-and-anpr` |
| 9 | Multi-branch owner → one app per site | Multi-site CCTV monitoring | `/multi-site-cctv-monitoring` | Title and description add the next step | Upgrade journey | as above |
| 10 | Offices, shops, clinics | Commercial CCTV | `/commercial-cctv` | Description offers both journeys, trimmed to ≤ 160 characters | Both journeys | as above |

All 10 are **Implemented** and **Tested** (build, crawl, render), and **Awaiting deployment approval**. Every title is ≤ 60 characters and every description ≤ 160, with no duplicates. FAQ structured data is generated from the visible FAQs, so the two always match.

**Not changed on purpose:**
- `/ai-surveillance-system` overlaps #1 in intent. I only fixed its "without replacing hardware" description. Whether it should be merged is a question for GSC data, not a guess.
- Attendance pages are strong commercial pages but weren't on your list, so they're left for phase 2.

### Before / after copy

Full before-copy: [growth-before.json](growth-before.json).

| Page | Before | After |
|---|---|---|
| `/video-analytics-software` title | AI Video Analytics Software for CCTV in India \| PGAK | AI Video Analytics Software for Your Existing CCTV \| PGAK |
| `/video-analytics-software` description | Person and vehicle detection, boundary alerts, face-recognition attendance and camera-health monitoring — on the CCTV you already own. | Person and vehicle alerts, boundary detection, attendance and camera-health checks on compatible CCTV. We check your own feeds first, then quote. |
| `/video-analytics-software` new FAQs | — | Can I see what it would do on my own cameras before buying? |
| `/video-analytics-software` related links | ai-intruder-detection, biometric-attendance, smart-perimeter-protection, retail-shop-security, ai-surveillance-system | ai-intruder-detection, smart-perimeter-protection, anpr-number-plate-recognition, face-recognition-attendance-system, multi-site-cctv-monitoring, ai-surveillance-system |
| `/cctv-installation-company` title | CCTV Installation Company in Punjab & India \| PGAK | CCTV Installation Company — Itemised Quotes \| PGAK |
| `/cctv-installation-company` description | PGAK installs and services CCTV across Punjab directly and India through verified partners — every install ships with AI alerts, not just recording. | New factory, warehouse or office? A designed CCTV system with AI alerts, every line itemised. Availability and timelines are confirmed per project. |
| `/cctv-installation-company` new FAQs | — | What should a CCTV installation quotation include?<br>We are building a new site. When should we plan the CCTV? |
| `/cctv-installation-company` related links | ai-intruder-detection, factory-security, smart-perimeter-protection, video-analytics-software, commercial-cctv | factory-security, ai-cctv-for-warehouses, industrial-cctv, anpr-number-plate-recognition, ai-intruder-detection, commercial-cctv |
| `/factory-security` title | Factory Security System — AI CCTV for Gates & Floors \| PGAK | Factory Security System — Gate, Perimeter, Attendance \| PGAK |
| `/factory-security` description | Gate, perimeter and shop floor on one system: automatic attendance, safety-zone monitoring and intrusion alerts on your existing industrial CCTV. | Intrusion alerts on the boundary, vehicle logging at the gate and face-recognition attendance at shift change — on compatible factory CCTV. Free camera check. |
| `/factory-security` related links | ai-cctv-for-warehouses, smart-perimeter-protection, ai-intruder-detection, video-analytics-software, industrial-cctv | industrial-cctv, ai-intruder-detection, anpr-number-plate-recognition, attendance-system-for-factories, smart-perimeter-protection, cctv-installation-company |
| `/ai-cctv-for-warehouses` title | Warehouse Video Analytics & AI CCTV in India \| PGAK | _unchanged_ |
| `/ai-cctv-for-warehouses` description | AI that watches every aisle, dock and gate on your existing cameras, flagging loitering and after-hours movement in seconds. Cut the shrinkage. | Alerts for after-hours movement in the aisles, loitering at the loading bay and vehicles at the gate — on your existing warehouse CCTV. Free camera check first. |
| `/ai-cctv-for-warehouses` related links | factory-security, ai-intruder-detection, smart-perimeter-protection, video-analytics-software, industrial-cctv | anpr-number-plate-recognition, ai-intruder-detection, multi-site-cctv-monitoring, industrial-cctv, attendance-system-for-warehouses, cctv-installation-company |
| `/industrial-cctv` title | Industrial CCTV for Factories & Warehouses \| PGAK | _unchanged_ |
| `/industrial-cctv` description | Industrial CCTV that watches the fence, the gate and the dispatch bay and raises alerts — built for dust, shift patterns and sites too large to watch. | Upgrade existing industrial cameras with AI alerts, or plan a new installation for a factory or warehouse. Built for dust, shift patterns and large sites. |
| `/ai-intruder-detection` title | AI Intruder Detection on the CCTV You Already Own \| PGAK | _unchanged_ |
| `/ai-intruder-detection` description | Alerts in seconds when someone crosses a line they shouldn't, on the cameras you already own — cats, shadows and headlights filtered out. | A phone alert with a clip when a person crosses a boundary after hours — animals, shadows and headlights filtered. On compatible CCTV; free camera check. |
| `/smart-perimeter-protection` title | Smart Perimeter Protection — Virtual Fencing \| PGAK | _unchanged_ |
| `/smart-perimeter-protection` description | No trenching, no cable: draw virtual boundaries on the cameras you already own and get alerts the moment a person or vehicle crosses. | Virtual fencing on compatible cameras along walls, yards and roof access — no trenching or perimeter cabling. Person and vehicle alerts, optional siren. |
| `/smart-perimeter-protection` new FAQs | — | Is this different from AI intruder detection? |
| `/anpr-number-plate-recognition` title | ANPR System for Gates & Vehicle Logging \| PGAK | ANPR System for Factory & Warehouse Gates \| PGAK |
| `/anpr-number-plate-recognition` description | An ANPR system that logs every vehicle at every gate — plate, type, direction, timestamp and snapshot. Sized per lane, with honest limits on where it works. | Log every vehicle at the gate — plate, type, direction, time and snapshot — searchable later. Sized per lane, with honest limits on where ANPR works. |
| `/anpr-number-plate-recognition` new FAQs | — | Which ANPR camera is best for a factory gate? |
| `/anpr-number-plate-recognition` related links | smart-perimeter-protection, industrial-cctv, factory-security, residential-security, video-analytics-software | factory-security, ai-cctv-for-warehouses, industrial-cctv, smart-perimeter-protection, multi-site-cctv-monitoring, residential-security |
| `/multi-site-cctv-monitoring` title | Multi-Site CCTV Monitoring on One Screen \| PGAK | Multi-Site CCTV Monitoring — Every Branch, One Screen \| PGAK |
| `/multi-site-cctv-monitoring` description | Every branch, plant and godown in one view, with alerts routed to whoever runs each site — instead of one recorder, one app and one password per location. | Every branch, plant and godown in one view, with alerts routed to whoever runs each site — instead of one app and password per location. Free site check. |
| `/commercial-cctv` title | Commercial CCTV Systems for Business Premises \| PGAK | _unchanged_ |
| `/commercial-cctv` description | Commercial CCTV that raises alerts instead of only recording — for offices, shops, schools, clinics and mixed-use premises. Runs on the cameras you already have. | Commercial CCTV that raises alerts instead of only recording — for offices, shops, clinics and mixed-use premises. Upgrade existing cameras or plan new. |

The CCTV installation page's title and description above include the neutral delivery wording. The body changes listed in §6 are a separate commit.

---

## 2. The two customer journeys

| Journey | Entry points | Destination | What the enquiry collects | Status |
|---|---|---|---|---|
| **A. Upgrade my existing CCTV** | Homepage chooser, every non-attendance solution page, city pages, `/free-audit` | Existing audit forms (unchanged delivery path) | Phone (required), camera band (required), segment, name and city (optional). Journey recorded as `Upgrade existing CCTV`. | Implemented · Tested |
| **B. Plan a new CCTV installation** | Homepage chooser and final block, solution-page hero notes and chooser, city "How delivery works", `/free-audit` ("No cameras yet?") | `/cctv-installation-company#plan` (same URL; new form variant) | Phone (required), camera **need** (required; "Not sure yet" allowed), timeline (optional), segment, name and project city (optional). Journey recorded as `New CCTV installation`. | Implemented · Tested |

Design rules followed:
- **New-site buyers never see an audit offer.** Choosing "None yet — new site" in an upgrade form is recorded as a new installation, and the confirmation message switches to "nothing is assumed about cameras you don't have yet".
- **Dealer applications are now separate.** On `/areas-we-serve`, the "Become a dealer" button used to open the customer enquiry form (`#dealer`), so dealer applications were counted as customer leads. It now opens a pre-filled WhatsApp dealer-application message (`data-cta=dealer-application-whatsapp`), outside the lead pipeline. The customer forms carry customer fields only.
- **No minimum project value** was added, and no pop-ups. Call and WhatsApp remain the secondary options on every journey.
- Each chooser card states who it is for, what PGAK supplies, how it is checked, what happens next and the genuine limitation.

### Evidence

Tests used the local production build and a local mock ERP; no real endpoint was reachable (no `.env` present).

| Test | Result |
|---|---|
| API: new-installation lead | `delivered:true`. The ERP message starts `Project: New CCTV installation … Cameras: 16–50 \| Timeline: 1–3 months \| Page: /cctv-installation-company`. ERP columns unchanged (`district,email,message,name,phone,ref,source`). |
| API: existing-camera lead | `delivered:true`, `Project: Upgrade existing CCTV` |
| API: retry with the same ref | Same ref and `Idempotency-Key` both times, so the ERP can collapse the duplicate (ERP-side collapse not verifiable locally) |
| API: tampered project/timeline values | Dropped to blank; lead still accepted |
| API: honeypot filled | Not forwarded (`delivered:false`) |
| UI, 375 px, new-install form | Empty submit shows both field errors. A valid submit shows the new-site confirmation text. dataLayer: `form_submit`, `installation_request` (after fix), **one** `generate_lead` with `project_type` and `lead_ref`. **No phone, name or city in any event.** |
| UI, 375 px, Mumbai page (existing cameras) | Delivery section renders. City only as a placeholder ("e.g. Mumbai", value empty). One `generate_lead`, `project_type: Upgrade existing CCTV`. |
| UI, Ludhiana page, "None yet — new site" in the upgrade form | Recorded as `New CCTV installation`; new-site confirmation shown |
| Unit tests | leads 30, lead-client 7 (2 new journey tests), locations 6, middleware 13, analytics 3, meta queue 4, after-paint 3: all pass. Typecheck passes. Lint: 0 errors, only warnings that already existed. |
| Crawl after changes | Same 167 URLs as baseline, all 200. 0 duplicate titles/descriptions/H1s, 0 broken links, 498 internal link targets. |

Screenshots were taken during testing: mobile new-install form, confirmation, and the homepage journey chooser on desktop. The Vercel preview needs a Vercel login, so review the preview once the PR builds.

---

## 3. Tracking changes and acceptance

| Change | Why | Acceptance |
|---|---|---|
| `generate_lead` now also carries `project_type` and `lead_ref` (the random per-form id already sent to the ERP) | Segment enquiries by journey; let reports count one accepted enquiry once | Tested: fires once per ref, only after the server confirms ERP acceptance (`delivered:true`); no PII |
| New-installation submits fire `installation_request` **instead of** `assessment_request` | The catch-all mislabelled new projects as assessments | Tested: still exactly 3 events per confirmed lead |
| Nothing else | The single GA4 loader, Meta deferral, dedup and delivery semantics are preserved | Existing analytics, meta-queue and after-paint tests pass |

### Intended funnel and where each step is measured

| Step | Signal | Source | Status |
|---|---|---|---|
| Organic landing page | `session_start` + landing page, organic channel | GA4 | Awaiting access |
| Enquiry started | `cta_click` / `data-cta` (secondary) | GA4 | Implemented (existing) |
| **Confirmed enquiry** | `generate_lead` (one per `lead_ref`) | GA4, and the ERP row with the same Ref | Implemented · Tested |
| Contactable lead | Sales reached the person | CRM stage | Awaiting owner (CRM definitions) |
| Qualified lead | Owner-defined rule | CRM | Awaiting factual confirmation |
| Demo / site assessment | Booked or held | CRM | Awaiting owner |
| Proposal → won | Quote sent → PO | CRM | Awaiting owner |

Phone and WhatsApp clicks remain **intent signals**, never leads. In GA4, **only `generate_lead`** should be a key event. `form_submit`, `assessment_request`, `installation_request`, `pricing_request` and `demo_request` must not be key events, or one enquiry would count several times. This can't be checked without GA4 access (Awaiting access).

---

## 4. Search research log (22 Sep 2026)

These are manual observations from one browser located in Ludhiana (Google, `gl=in`, `hl=en`, desktop). They are **not rankings**, and one search is not representative of India.

| Query | What the result page showed | Implication used |
|---|---|---|
| `cctv installation company for factory india` | Local pack of 3 Ludhiana installers (with review counts), then directories (IndiaMART, Justdial) and installer pages. People-also-ask: cost of CCTV installation in India. | Installation intent is local and review-led, so the Google Business Profile matters (§9). The page now answers "what a quote should include". |
| `anpr system for factory gate` | Boom-barrier/ANPR vendors, guides. **PGAK's `/features/vehicle-and-anpr` appeared**, not the ANPR service page. People-also-ask on camera choice and configuration. | Feature page now links to the service page. FAQ added on choosing an ANPR camera for a gate. Watch the query/page split in GSC. |
| `ai video analytics for existing cctv cameras india` | Competitors lead with "live analytics on your own feeds" and "book a demo". PGAK not seen on page 1 in this one search. | Title and FAQ now lead with checking the buyer's own feeds first. |

**Google Trends** (India, past 12 months to 22 Sep 2026, Web Search, all categories; relative 0–100 within this one comparison, **not volumes**):

| Term | Approx. average | Note |
|---|---|---|
| cctv installation | ~28 | Steady |
| video analytics | ~26 | Higher late 2025, then lower |
| intrusion detection | ~28 | Spiky. Probably mixed with the cybersecurity meaning, so it is not evidence of CCTV demand |
| face recognition attendance | ~4 | Low relative interest, which does not mean no buyers |
| anpr camera | ~3 | Same |

Subregion data showed mostly small states and territories at the top; the map failed to render, so no regional conclusion is drawn.

---

## 5. City pages and expansion

**Implemented on all 18 city pages:**
- A "How delivery works in {city}" section. Upgrading existing CCTV starts remotely from recorder streams. A new installation needs on-site work, and availability, delivery arrangements and timelines are confirmed before quotation. It does **not** say who installs.
- A hero link for new sites, plus links to both journeys.
- The enquiry form suggests the city as a placeholder only.

The ≤ 250 km rule (PR #27) controls **labels only**. It implies nothing about installation or support in neighbouring cities.

**Expansion register:** add a market only when **all** of these are true:

| Gate | Evidence required |
|---|---|
| Serviceable | Written confirmation of the delivery mode (own team / named partner / remote-only) and the last operational check |
| Demand | GSC impressions for the city+service, or Keyword Planner data, or recorded enquiries from that city in the CRM |
| Distinct value | Named local industrial areas, buyer types and constraints written from first-hand knowledge, not name substitution |
| Proof | At least one permitted local example or an honest "no local example yet" statement |

| Candidate market | Why it is a candidate | Status |
|---|---|---|
| Existing 18 cities | Already published | First improve these using GSC data (Awaiting access) |
| Additional cities that already send enquiries | Would be evidenced by CRM enquiry cities | Awaiting access (CRM export) |
| Other Punjab/Haryana industrial towns | Close to base | Not proposed until serviceability is confirmed |

No new city pages were created.

---

## 6. Unverified claims: occurrences, evidence needed, truthful alternatives

| Claim | Where it appears | Evidence required | Truthful alternative, ready to apply once you choose |
|---|---|---|---|
| **Who installs in 10 Punjab cities** (partner vs "our own teams") | City pages vs `/cctv-installation-company` | Your statement per city | **Applied as a separate, revertible commit** on `/cctv-installation-company`: "Installation availability, delivery arrangements and timelines are confirmed for your project before quotation." The "11 cities — direct installation" stat becomes "Itemised quoting". **Flagged for your review.** |
| Free audit "worth ₹15,995" | `lib/audit.ts` (one constant) → `/free-audit` hero and price strike-through | A price actually charged or quoted for the audit | "A camera-by-camera readiness report, free." (drop the value), or keep it with a note of what it is based on |
| Report "within 48 hours" | `AUDIT_TURNAROUND_HOURS` → free-audit, DealerForm, QuickLead, FreeAudit, FinalCTA, ChatBot, SolutionPage, insight CTA | Recent turnaround log | "We aim to send your report within 48 hours of receiving stream access" |
| Callback "within one working hour" | `CALLBACK_PROMISE` → forms, pricing, free-audit, ChatBot, FinalCTA | Recent call-back times | "We aim to call back within one working hour (9–7, Mon–Sat)" |
| "Live within a day" | Brochure, Amritsar and Gurugram FAQs, factory FAQ, generated city FAQ | Deployment records | "Once hardware and stream access are ready, setup usually takes about a day; tuning follows over two weeks" |
| Spot AI reference footage | Homepage hero and films (captioned "not a PGAK deployment") | Licence / permission | Keep the captions; replace with original PGAK footage (brief below) |
| STQC / CCTV rule article | `/insights/cctv-new-rule-2026-india-stqc-er-compliance` | Official sources | **Corrected** (see [STQC_SOURCE_CHECK.md](STQC_SOURCE_CHECK.md)): BIS rather than STQC for sale, analog cameras excluded, official S.O. citations, and the Jan 2026 OM labelled "as reported" |
| Illustrative "case studies" | `/insights/case-studies/*` | Customer permission and measured results | Already labelled illustrative. Use the brief below to produce a real one. |

**Demo / case-study brief** (so no evidence has to be invented):
- Record a 60–90 s screen capture of PGAK on one real, permitted camera feed (a PGAK office or a consenting customer): the zone being drawn, an event, the phone alert with clip, and the alert delay shown on screen.
- Note the camera model, resolution, lighting and processing device.
- For a case study, record: the site type, the problem, what was enabled, how it was measured (dates, nuisance vs useful alerts), the result, the limitations, and written permission.

---

## 7. Your short decision list

1. **Punjab delivery model.** Own team or partner, per city? Keep or revert the neutral-wording commit.
2. **Audit value ₹15,995.** Substantiate or drop the value.
3. **48-hour report and one-hour callback.** Keep as promises, or change to "we aim to".
4. **"Live within a day".** Keep or qualify.
5. **Turnkey scope.** Confirm what a new installation includes (survey, cameras, cabling, recording/storage, network, AI setup, commissioning, training, handover, support) and what is optional.
6. **Spot AI footage.** Licence on file? Otherwise plan replacement footage.
7. **Approve deployment** of PR #27, then this PR.

---

## 8. Weekly reporting template

| Metric | Definition | Source | This week | Last week | Note |
|---|---|---|---|---|---|
| Relevant non-brand impressions | GSC impressions, queries excluding "pgak", filtered to CCTV/analytics/security terms | GSC | | | |
| Relevant organic clicks / CTR | Same filter | GSC | | | |
| Unique confirmed enquiries | Count of distinct `lead_ref` on `generate_lead` (organic, and all) | GA4 + ERP Ref | | | Must match ERP rows ± test/spam |
| by journey | `project_type` = Upgrade existing / New installation / blank | GA4 | | | |
| Contactable enquiries | Sales reached the person | CRM | | | Don't mark as poor quality just because sales hasn't called yet |
| Qualified enquiries | Owner-defined rule | CRM | | | |
| Landing-page enquiry conversion rate | Unique confirmed enquiries ÷ organic sessions, per landing page | GA4 | | | Pages with < 50 sessions: report counts, not rates |
| Demos / site assessments | Held | CRM | | | |
| Proposals | Sent | CRM | | | |
| Won business | Count and value | CRM | | | Actual values only |

Segment by service page and by city page where there are enough rows. Exclude test refs (`test-*`), spam, dealer and support enquiries, and duplicates, listing each excluded count.

---

## 9. Access and export checklist (one pass)

Grant access to the account you use with Claude, or send exports. **Never paste passwords or tokens into chat.**

| System | Exact property / account | Permission | What I will pull |
|---|---|---|---|
| Google Search Console | Domain property `pgak.co.in` (or URL-prefix `https://www.pgak.co.in/`) | Restricted user is enough | Performance by query, page, country and device for the last 28 and 90 days plus the prior periods; Page indexing; Sitemaps; Core Web Vitals; Manual actions |
| Google Analytics 4 | Property with measurement ID `G-6EMP9HSR2F` | Viewer, plus Editor only if key events need changing (with separate approval) | Organic landing pages; `generate_lead` by `project_type`, `form_name`, `page_path`; key-event configuration; enhanced-measurement form settings |
| Google Tag Manager | Container `GTM-MKZWLS7J` (historical) | Read | Confirm it's unpublished and not loaded |
| Google Ads / Keyword Planner | PGAK Ads account (no spend needed) | Standard, or export only | India plus Punjab/NCR/Maharashtra/Karnataka volumes for the priority terms, exported as CSV with date |
| Google Business Profile | "PGAK Innovations Pvt. Ltd." listing | Manager | Name, address, phone, categories, service area, reviews, and the website link with UTM |
| CRM / ERP | Lead table | Export only | Last 90 days: Ref, created date, city, page, CTA, stage (contacted/qualified/demo/proposal/won). No phone numbers needed. |
| Semrush (optional) | Existing subscription | More API units | Only if you choose to buy units; not required |

---

## 10. Authority workstream

Details: [OUTREACH_PROSPECTS.md](OUTREACH_PROSPECTS.md). It lists 17 routes, each verified on its live page on 22 Sep 2026, plus 3 unsent drafts.

Suggested order:
1. The free contributed-article routes (Security Today, Logistics Insider).
2. ESAI and your Ludhiana chamber (CICU). Both are paid and need your approval.
3. Partner programmes (for example Milestone) once a real integration test exists.

Nothing has been sent or bought.

---

## 11. 30-day growth backlog

| Wk | Item | Owner | Measurement | Status |
|---|---|---|---|---|
| 1 | Approve and deploy PR #27, then this PR | You | Live pages match the preview; ERP receives `Project:` lines | Awaiting deployment approval |
| 1 | Answer the decision list (§7) | You | Claims register updated | Awaiting factual confirmation |
| 1 | Grant GSC, GA4 and GBP access, and export CRM leads (§9) | You | Access ledger updated | Awaiting access |
| 1 | In GA4, confirm `generate_lead` is the only key event; register `project_type` as a custom dimension | Claude (read) / you (approve change) | GA4 config screenshot | Awaiting access |
| 2 | Baseline report using the §8 template (28 days) | Claude | First filled template | Awaiting access |
| 2 | Re-rank the priority pages by real impressions, CTR and leads; rewrite titles on high-impression, low-CTR pages | Claude | CTR change over the following 28 days (not guaranteed) | Awaiting access |
| 2 | Google Business Profile: categories, service area, website UTM, review request process (real customers only) | You + Claude | GBP calls, website clicks | Awaiting access |
| 3 | Apply your decisions on the audit value, SLAs and "within a day" | Claude | Pages consistent with the claims register | Awaiting factual confirmation |
| 3 | Record the first original demo on a permitted feed; swap it into the homepage films | You (footage) / Claude (page) | Demo-page engagement; enquiries from film pages | Awaiting owner evidence |
| 3 | Pitch 1 contributed technical article (draft ready) | You approve, then send | Published article with an editorial link | Awaiting approval |
| 4 | Improve the 3 city pages with the most impressions using verified local detail | Claude + your local input | City page CTR and enquiries | Awaiting access |
| 4 | Review the new-installation journey: leads by `project_type`, and whether sales can qualify them | You + Claude | Share of new-install leads that are contactable and qualified | Awaiting deployment approval |
