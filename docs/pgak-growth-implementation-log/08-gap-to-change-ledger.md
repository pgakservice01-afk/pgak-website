# Gap-to-change ledger: the 10 October brief

**Branch:** `growth/offer-homepage-2026-10-10`, based on `main` at `cbb6c1c`.

**Not deployed.** Merging is the release, and it needs the owner's explicit approval.

## The five states

Each row uses exactly one of these five states. A passing build is not "verified in production". A deploy is not "commercially measured".

| State | Meaning |
|---|---|
| **Fact** | Verified fact, with its source and date |
| **Hypothesis** | Believed, not yet tested |
| **Local** | Implemented locally and tested on the branch |
| **Prod** | Verified in production after an approved release |
| **Measured** | Commercially measured over a full comparison period |

## A. What the audit said vs what was found on 10 Oct

| Audit statement | Rechecked | State | Action |
|---|---|---|---|
| "/book-demo says approved public demo media is unavailable" | Production already lists the four recordings and links to them (released in PR #86, 8 Oct) | Fact | None |
| "/our-story contains stale proof and similarity-ceiling language" | Already corrected in PR #86. Live text: "Every clip says where and when it was recorded" | Fact | None |
| "/evidence is the correct evidence route, not /resources/evidence" | **The reverse.** `/evidence` returned 404 in production; the page is at `/resources/evidence` | Fact | `/evidence` now redirects (308) to `/resources/evidence`, so the brief's URL works too |
| "The storage article already links to the calculator; do not call it an orphan" | Confirmed | Fact | The calculator is now embedded in the article as well |
| "Lead metadata: ERP enabled, notifications enabled, durable intake false, register false" | Matches `/api/leads` health on 8 Oct | Fact | No change. Delivery proof still needs an authorised controlled test (`01-lead-states.md` §7) |
| "Two `form_submit_attempt` vs seven submissions" | The attempt event was first shipped in `3089a86` on 24 Sep; the seven `generate_lead` cover 9 Sep–6 Oct | Hypothesis (strong) | See `11-lead-reconciliation-and-ga4.md` |
| "Mobile Lighthouse 83, LCP 3.9 s" | No field data; the keyless PSI quota is exhausted | Fact (lab only) | Re-measure the preview with an API key or next day (`05-performance.md`) |

## B. Brief deliverables

| # | Deliverable | What changed | Where | Tested | State | Still unproven |
|---|---|---|---|---|---|---|
| 1 | Gap-to-change ledger | This file | — | — | Local | — |
| 2 | Canonical route/component map | New | `09-route-component-map.md` | — | Local | — |
| 3 | Ten-brand adaptation matrix | New, with a hypothesis per brand | `10-benchmark-adaptation.md` | — | Local | Every hypothesis |
| 4 | Homepage in the brief's order | The hero is now "Make your existing CCTV more useful to your business", with CTAs "Check my cameras" and "See PGAK demonstrations". The ten sections follow in the brief's order. The FAQ carries FAQPage schema that matches the visible text. | `app/page.tsx`, `components/home/BuyerPath.tsx`, `ValueEstimator.tsx` | Browser check of section order; overflow at 375 px; the C09 example gives 41.67 h; the form POST carries `calculator_id: "C09"` | Local | Whether more assessments follow (needs a full comparison period) |
| 5 | Proof vs illustration separation | `lib/visuals.ts` is a separate registry and can never feed `lib/proof/projects.ts`. Six workflow diagrams are HTML lists, readable and stacking on a phone. | `lib/visuals.ts`, `components/visuals/WorkflowDiagram.tsx`, `components/calc/FeatureScenario.tsx` | System flow on the homepage; each task diagram renders above its calculator (C01, C09, C14, C24, C28, C29); no overflow | Local | **The three AI illustrations are blocked.** Their files and `Image_Manifest.json` are not on this machine; they are registered as blocked and nothing renders them. |
| 5b | Demo library | `/resources/evidence` gets a task filter (PPE, counting, gate, safety). Each card adds "What to watch", "What it shows", a calculator link and the next step. Annotations are keyed to the published proof records and add no claims. | `lib/proof/demo-guide.ts`, `components/tools/DemoTaskFilter.tsx` | The filter hides and shows correctly; anchors resolve; no overflow | Local | Engagement with it |
| 5c | One proof narrative | `/trust/videos` and `/trust/photos` were unlinked, noindex "coming soon" pages whose metadata described face-recognition clips that do not exist. Both now redirect to the evidence page. | `next.config.mjs` | Spam-path test 13/13 pass | Local | — |
| 6a | Compatibility check: three verdicts | "Known tested" needs an exact make + model + use case in a dated matrix. The matrix is **empty**, so every model gets "Needs verification" until PGAK records a test. Any blocker gives "Not suitable as it stands". The make/model field stays in the browser and is never sent. | `lib/compat-matrix.ts`, `lib/compat.ts` | 9 tests | Local | The owner or engineering must add tested models |
| 6b | Scope builder | Inputs: site type, tasks, camera band, sites, retention, support. Output: a printable summary of what the quote must itemise and what stays unknown. No price is shown. | `components/tools/ScopeBuilder.tsx`, `/resources/scope-worksheet` | Browser check; the ANPR wording is derived from the evidence type | Local | — |
| 6c | Pilot scorecard | Already on main (8 Oct). An unmeasured condition makes the result "incomplete", never a pass. | `components/tools/PilotScorecard.tsx` | `test:pilot` | Prod | Targets need product-owner approval |
| 6d | Guided demo | Covered by the demo library: each recording is paired with plain-language "what to watch" notes | — | — | Local | **Partial.** A raw/explained toggle needs un-annotated originals. Only annotated exports were supplied, and none were invented. |
| 7 | Calculators: unit and source per input | Every input now has a source: my estimate, records, pilot, written quote or worked example. The source appears in the CSV, and a note under the result says which kind of figures it rests on. Units were already shown. | `components/calc/FeatureScenarioTool.tsx` | Browser: the example sets "worked example"; switching all to records changes the note | Local | — |
| 7b | Cash-payback worked example | 120,000 capex, 12,000 avoidable, 4,000 recurring gives 8,000 net, 15-month payback and −20% first-year ROI | `lib/calc/scenarios.test.ts` | Pass (140/140) | Local | — |
| 7c | Base / conservative / upside | **Not built.** The brief allows it only with transparent, editable assumptions. A second and third input set per scenario would need agreed ranges, which are a product decision. | — | — | Hypothesis | Owner to decide if wanted |
| 8 | 100 assignments | Unchanged from 8 Oct | `04-article-ledger.md` | — | Local / Prod as listed | Lawyer review of legal drafts |
| 9 | Lead-state and analytics contract | Unchanged from 8 Oct. The calculator id now persists for the visit (`pgak-context` in sessionStorage, id only). | `lib/attribution.ts` | Browser POST shows `calculator_id` | Local | ERP receipt in production |
| 10 | Mobile evidence and tests | See the release notes | `RELEASE-2026-10-10.md` | Gate run before push | Local | — |
| 11 | Sales follow-up process | Qualification, owner, response target and escalation; four draft templates | `12-sales-handoff.md` | — | Local (draft) | **A named owner and a feasible response time, from the owner** |
| 12 | Preview, rollback, dependencies | — | `RELEASE-2026-10-10.md` | — | Local | — |
| — | Storage article first | The calculator is embedded after the text; the canonical URL is unchanged. The B011 meta rewrite was **not** applied: it describes worked examples that exist only in the unreviewed draft. | `app/insights/[slug]/page.tsx` | Browser check at 720 px and 375 px | Local | CTR change after indexing |
| — | Allowable cost per lead and paid plan | Formula and a draft only. No campaign, budget or account change. | `13-acquisition-economics.md` | — | Hypothesis | Contribution and win rate, from the owner |

## C. Blocked on the owner (one line each)

1. **Named sales owner and response time** for genuine enquiries (`12-sales-handoff.md` §2).
2. **CRM/ERP readback for the seven `generate_lead` events** (`11-lead-reconciliation-and-ga4.md` §1).
3. **The three illustration files and `Image_Manifest.json`.**
4. **Tested camera models** for the compatibility matrix: make, model, firmware, use case and date.
5. **Approved unit rates**, before any numeric price example.
6. **Contribution per won project and win rate**, before any ad budget.
7. Carried from 8 Oct: Bing Webmaster Tools, lawyer review, the IndiaMART ₹8,500 listing, and the phone number on Maps.
