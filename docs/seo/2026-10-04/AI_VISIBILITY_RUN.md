# AI-search visibility — run 4

Follows `docs/seo/2026-09-23/AI_VISIBILITY_BASELINE.md`, `../2026-09-24/AI_VISIBILITY_RUN.md`
(run 2) and `../2026-09-28/AI_VISIBILITY_RUN.md` (run 3, no sample). Same 25 questions, same
wording. Read those first; this records what changed and what it implies.

## Method and its limits — read before the numbers

| Setting | Value |
|---|---|
| Date | 2026-10-04 (IST afternoon) |
| Questions sampled | **4 of 25**: Q1, Q6, Q19 (comparable to runs 1–2) and Q12 |
| Perplexity | Consumer web UI, default model, web-grounded — **but signed in to the owner's account.** The method requires logged out. The session was not changed (never sign the owner out). The Q1 answer addressed "your MEPF, industrial EPC, fire-safety and warehouse client base", so **answers were personalised to the account**. Treat this run as a different instrument from runs 1–2, not a continuation of their series. |
| Bing | **Not tested.** Both Bing queries returned "Please solve the challenge below to continue". The challenge was not answered. Not "absent". |
| ChatGPT, Claude, Gemini, Google AI Overviews | **Not tested** — each needs an account; none was created or used. |
| Index freshness | Perplexity's source list showed PGAK's **current** titles for the ANPR pages, so for those the index is fresh. Not checked for other pages. |
| New this run | Search Console's **Generative AI features** report was read for the first time. Its documented metric is impressions; it reports no clicks or position, and its impressions are a subset of Web impressions, not additive. |

## What was observed

| # | Question (unbranded) | Platform | PGAK inline? | Source-listed? | Who was cited |
|---|---|---|---|---|---|
| Q1 | Can I add AI analytics to existing CCTV cameras in India without replacing them? | Perplexity | **No** | **No** — absent from all 10 | indo.ai ×2 (one page titled as the question), velozity, agrex ×2, askthemama ×2, yuverse, vizo361 ("Works on Hikvision, Dahua, CP Plus. 14-day pilot"), LinkedIn |
| Q6 | How much does AI video analytics cost per camera in India? | Perplexity | **No** | **No** — absent from all 10 | agrex ×2, vizo361 ×2, asmag, nextgenerpai, askthemama ×2 (one is "a neutral, dated comparison of AI video-analytics companies for Indian factories"), slinai, LinkedIn |
| Q12 | Can CCTV detect someone entering a restricted zone in a plant? | Perplexity | **No** | **No** — absent from all 10 | viact, surveily ("on your existing CCTV… zones set per camera. No facial recognition"), yafe, ifactoryapp, axxonsoft, atlas ("honest limits"), ripik, ohzsecurity, LinkedIn ×2 |
| Q19 | What does an ANPR camera need at a factory gate to read number plates reliably in India? | Perplexity | **Yes — inline on the opening paragraph and again on the closing one** | **Yes — 3 of 10** (#1 "Number plate recognition: when it works and when it does not", #2 the factory-gate ANPR page, #6 the vehicle-recognition feature page) | resurgenix, vizo361, studiomatrx, GeM tender PDF, hifocus, siriusstar, phoenixsurveillance |
| Q6 | (same) | Bing | not tested | not tested | — |

### Against runs 1 and 2 (with the personalisation caveat)
- **Q1: absent → absent → absent.** Three runs. Not variance.
- **Q6: absent → absent → absent** (Bing in run 2, Perplexity here). Three runs.
- **Q19: source-listed last → lead inline → lead inline twice + 3 of 10 sources.** Strengthening. The cited page titles include "when it works and when it does not" and "honest limits on where ANPR works" — the limits framing is what gets lifted.
- Q12: first observation; absent.

## Search Console — Generative AI features, 30 Jun–29 Sep 2026

**1,450 impressions across 99 pages.** Near zero until late August, then a ramp through
September peaking around 80 a day mid-month. Top ten:

| Page | AI-feature impressions |
|---|---|
| `/` | 185 |
| `/insights/attendance-records-law-india` | 127 |
| **`/pricing`** | **82** |
| `/insights/ai-cctv-price-in-india-what-it-should-cost` | 80 |
| `/insights/cctv-storage-how-many-days` | 80 |
| `/insights/employee-refuses-biometric-consent` | 58 |
| `/insights/aadhaar-based-attendance-and-aebas-explained` | 50 |
| **`/ai-intruder-detection`** | **49** |
| `/insights/attendance-data-retention-what-to-delete` | 44 |
| `/insights/camera-resolution-vs-distance` | 36 |

Two money pages in the top ten. Google says only that the page was shown in an AI feature;
it does not say it was cited, clicked, or how. This is the first non-sampled AI-visibility
number the project has, and it goes into the weekly scorecard from today.

For context the ordinary Web report for the same window now reads 185 clicks / 8.66K
impressions / 2.1% / 8.1 (it was 175 / 7.91K three days earlier as the window moved).

## The pattern, now on four questions

Every page cited for the three lost questions does one of three things in its *title or
first lines*: it is titled as the question (indo.ai on Q1); it names the camera brands and a
pilot length (vizo361); or it publishes a number or a band (every Q6 source). The one
question PGAK wins is the one where its page states physical conditions and limits in the
body. That is run 2's hypothesis holding on a second instrument.

The gap is not capability or crawlability — `llms.txt` is 34.8 KB and current, robots
allows the engines, the register page carries four pilot rows. The gap is that the
retrofit and cost facts PGAK already stands behind are not on pages shaped the way the
engines quote.

## Score

Four questions, one platform, signed in. Indicative only; **not a trend against run 2's
≈63**, because the instrument changed.

| Dimension | Score | Basis |
|---|---|---|
| Presence | 2.5/10 | cited in 1 of 4 |
| Accuracy | 9/10 | where cited, conditions and limits reproduced correctly |
| Sentiment | 8/10 | neutral-to-positive |
| Position | 9/10 | lead inline, opening and closing (1 observation) |
| Completeness | 8/10 | this time the answer carried PGAK's *limits* framing too ("accuracy claims shall apply only to clean, visible plates…"), which run 2 noted it had not |
| Consistency | 2/10 | absent on 3 of 4; 1 of 6 platforms testable |

**Composite ≈ 64/100.** Load-bearing weakness unchanged: Presence and Consistency.

## Action plan — evidence first, no volumes invented

| # | Action | Evidence | Impact |
|---|---|---|---|
| 1 | **Retrofit page shaped as Q1.** Put the compatibility facts PGAK already asserts (Ludhiana FAQ: Hikvision / CP Plus / Dahua recorders hand over RTSP) into the title and first lines of `/insights/add-ai-to-existing-cctv-cameras` or `/video-analytics-software`, with brand names in the body. | Three straight losses; the winners are titled as the question and name brands. Run 2 action #2, still not done. | High |
| 2 | **Cost page that states what the engines quote.** Publish the cost *drivers* from `lib/calc/registry.ts` and a worked example computed by PGAK's own calculator, labelled as the reader's inputs. The guide already says "₹500–₹8,000 in proposals we have seen"; the engines quote pages that break a band down. | Three straight losses; `/pricing` already earns 82 AI-feature impressions without being cited. Run 2 action #3. Needs owner sign-off under `CLAIMS_REGISTER.md`. | High |
| 3 | **A dated, neutral comparison page** of AI video-analytics suppliers for Indian factories, built from each supplier's own published claims (the brief's Phase 2 permits exactly this). | A page of that exact description is cited on Q6. PGAK has none. | Medium |
| 4 | **Intruder page: state the entry-vs-unauthorised-entry limit and the zone/schedule specifics** in the body. | Q12 winners' snippets read "on your existing CCTV, zones per camera, no facial recognition, honest limits". The register's own promotion requirement for `intrusion` asks for the same. | Medium |
| 5 | **Scorecard:** add the Generative AI report's impressions as a weekly line (URL below). | First non-sampled measure available. | — |
| 6 | Owner, unchanged: Bing Places listing; Vercel register variables. | Copilot and ChatGPT Search ground on Bing; the register has been dark since 23 Sep. | High |

## Re-run instructions (amended)

Same 25 questions, same wording. **Open a private window first** so Perplexity is logged
out and un-personalised; record whether it was. Record per question: platform, inline
citation, source-listing with position, every competitor. Do not answer a CAPTCHA or
bot challenge — mark the platform not tested. Read the Generative AI report at
`https://search.google.com/search-console/performance/search-analytics/ai?resource_id=sc-domain%3Apgak.co.in`
(the banner's "Open report" does not navigate under automation; go to the URL).
