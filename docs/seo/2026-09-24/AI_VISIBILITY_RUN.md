# AI-search visibility — run 2 of the fixed question set

Re-run of the method in `docs/seo/2026-09-23/AI_VISIBILITY_BASELINE.md`, same wording, one day later. Read that file first; this one only records what changed and what it implies.

## Method and its limits

| Setting | Value |
|---|---|
| Date | 2026-09-24 |
| Mode | Consumer web UI, **logged out**, default model, web-grounded |
| Questions | 3 of the fixed 25 — a **sample, not a survey** |
| Platforms tested | Perplexity (Q1, Q19), Bing (Q6) |
| Platforms **not** tested | ChatGPT, Claude, Gemini — each requires signing in, and no account was created or used. Google AI Overviews — the search page served a CAPTCHA, which was not answered. All four are **not tested**, never "absent". |

Two of the three questions (Q1, Q19) are the ones sampled on 23 September, so they are directly comparable. Perplexity returned 7 sources today against roughly 15 on 23 September, so run-to-run variance is large and **neither change below is a trend**.

## What was observed

| # | Question (unbranded) | Platform | PGAK cited? | Who was cited |
|---|---|---|---|---|
| Q1 | Can I add AI analytics to existing CCTV cameras in India without replacing them? | Perplexity | **No** — absent from all 7 sources | kabatone, incoresoft, fortixai, **indo.ai (×2)**, **vizo361.ai**, ifactoryapp, lumana |
| Q19 | What does an ANPR camera need at a factory gate to read plates reliably in India? | Perplexity | **Yes — lead inline citation** (`pgak.co +3`) | pgak.co first |
| Q6 | How much does AI video analytics cost per camera in India? | Bing | **No** — absent from 6 sources | **indo.ai**, **vizo361.ai** |

### Against 23 September

- **Q1: source-listed (last of ~15) → absent.** Worse, or variance.
- **Q19: not cited inline (source-listed, last of ~14) → lead inline citation.** Better, or variance.

The baseline's hypothesis was that "answer-shaped, source-quality content is what grounded answers quote". Q19 is the first observation consistent with it. One observation is not confirmation, and the disproof condition the baseline set — citations staying flat after re-crawl — has not had time to run.

## The pattern worth acting on

The same two competitors win both questions PGAK loses: **indo.ai** and **vizo361.ai**. What they publish, from their own result snippets:

- indo.ai — *"How to Add AI Analytics to an Existing CCTV Network in India (Without Replacing Your Cameras)"*: a page titled as the question.
- indo.ai — *"AI CCTV Pricing in India: What It Costs (2026)"*: dated, with "3-year costs, DPDP basics".
- vizo361.ai — *"Works on Hikvision, Dahua, CP Plus. 14-day pilot."*: named camera brands and a stated pilot length.

And the one question PGAK **wins** is the one where PGAK publishes concrete physical conditions: `/anpr-number-plate-recognition` states mounting near plate height, a single defined lane, IR illumination and a fast shutter. Perplexity's answer reproduced exactly those conditions and led with PGAK.

**So the finding is not "PGAK is too honest to be cited."** PGAK is cited precisely where it commits to specifics, and loses where it declines to. The ANPR page already proves the model works on this site.

The gap on Q1 and Q6 is that the specifics exist but are in the wrong place:

- Camera-brand compatibility is already asserted on the site — `lib/locations.ts` (Ludhiana FAQ) says most local units run "Hikvision, CP Plus or Dahua recorders … any of those will hand over an RTSP stream, which is all PGAK needs." That is a compatibility fact PGAK already stands behind, buried in one city page's FAQ rather than on the retrofit page where the question is asked.
- Cost **drivers** are documented in `lib/calc/registry.ts` for `/calculators/cctv-storage` and `/roi-calculator`, with a stated method. `/insights/ai-cctv-price-in-india-what-it-should-cost` draws 259 impressions for 3 clicks and states no worked example.

Neither change requires inventing a figure. Moving an existing assertion to where it is asked, and showing the arithmetic from PGAK's own published method, are both inside the TRUTH RULE.

## Score

Scored per dimension on a three-question sample. The composite is indicative only — Presence and Consistency rest on three and one observations respectively.

| Dimension | Score | Basis |
|---|---|---|
| Presence | 3/10 | cited in 1 of 3 questions |
| Accuracy | 9/10 | where cited, the answer reproduced PGAK's stated conditions correctly |
| Sentiment | 8/10 | neutral-to-positive; no negative framing observed |
| Position | 8/10 | lead citation when present (1 observation) |
| Completeness | 7/10 | the ANPR answer used PGAK's conditions but not its limits |
| Consistency | 3/10 | absent on 2 of 3; only 2 of 6 platforms testable without an account |

**Composite ≈ 63/100**, load-bearing weakness in Presence and Consistency.

## Action plan

| # | Action | Impact | Status |
|---|---|---|---|
| 1 | Clear the duplicate cluster — 19 URLs are "Duplicate without user-selected canonical", validation FAILED. A page Google has folded into another cannot be cited by anything that grounds on the index. | High | branch `feat/ai-citability` — 410 words of shared boilerplate removed, overlap 481→323 shingles. Not merged. |
| 2 | Put camera-brand compatibility on `/video-analytics-software` and the retrofit content, not only in a city FAQ. Restating an existing assertion, not a new claim. | High | not started |
| 3 | Give the pricing article the shape competitors win with: the cost drivers already in `lib/calc/registry.ts`, plus a worked example computed by PGAK's own calculator engine and labelled as the reader's inputs. | High | not started — needs owner sign-off under CLAIMS_REGISTER |
| 4 | Replicate the ANPR page's pattern — concrete physical conditions — on retrofit and attendance. | Medium | not started |
| 5 | Correct the Bing Places listing: it shows phone 077173 03858 and "1789, Gill Road" against the site's +91 62839 93600 and BK Towers, 2480/2. Copilot and ChatGPT Search ground on Bing. | Medium | owner action |
| 6 | Merge `fix/lead-register-recovery` and set the two Vercel register variables. Unrelated to citation, but an AI-sourced enquiry currently cannot be recorded. | High | owner action |

## How this gets measured from now on

Shipped 2026-09-23 and live: a GA4 `ai_referral` event fires once per session when an assistant sent the visit; the lead register labels those enquiries `AI assistant: <name>`; and `middleware.ts` writes one `ai-crawl operator=… path=…` line per AI bot fetch, distinguishing answer-time fetchers (OAI-SearchBot, PerplexityBot, Claude-User) from index crawlers.

None of that has produced data yet. Next run should read it rather than relying on manual sampling alone.

## Re-run instructions

Same 25 questions, same wording, logged out, consumer UI. Record per question: platform, whether PGAK is cited inline, whether it is merely source-listed, its position, and every competitor cited. Do not answer a CAPTCHA and do not sign in to reach a platform — mark it **not tested** instead.
