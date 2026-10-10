# AI-search visibility — run 5 (10 October 2026)

Follows runs 1–4 (`docs/seo/2026-09-23`, `2026-09-24`, `2026-09-28`, `2026-10-04`). It uses the same question set and wording.

## Method and limits

| Setting | Value |
|---|---|
| Browser | The built-in browser pane, **signed in to nothing**. This fixes run 4's personalisation flaw. |
| Perplexity | Logged out, which allows **one** answer before "Sign up and repeat your request". Q1 was answered. Q6 hit the wall. Cookies were not cleared to get round it. |
| Google (AI Overviews) | **Not tested.** The "unusual traffic" robot check appeared; it was not answered. |
| Bing (Copilot answer box + web results) | Tested logged out, no challenge. Seven queries in all: Q1, Q6, Q12, Q19 and Q21, plus a branded search and a domain search. ChatGPT search and Copilot ground on Bing, so Bing is the proxy for both. |
| ChatGPT, Claude, Gemini | Not tested (no account created or used). |
| Search Console Generative AI report | Read in the owner's signed-in Chrome: last 28 days to 6 Oct. Read-only. |

## Observed

| # | Question | Platform | PGAK inline? | PGAK in sources / results? | Who was cited |
|---|---|---|---|---|---|
| Q1 | Can I add AI analytics to existing CCTV cameras in India without replacing them? | Perplexity (logged out) | No | No — absent from all 10 | cocompanion, kabatone, electronicsforu, vizo361 (`/cctv-to-ai-upgrade`), yuverse, indo.ai (LinkedIn ×2), davantis, renbotics (openPR), LinkedIn |
| Q1 | same | Bing | No | No (top 10) | vianix (summary lead: "Edgebox"), indo.ai ×2, trassir, agrex, incoresoft, lumana, memoface, triya, electronicsforu |
| Q6 | How much does AI video analytics cost per camera in India? | Bing | No | No (top 10) | Summary: indo.ai, vizo361. Results: cocompanion, askthemama ×2, innovaindustries, vizo361 `/pricing`, indo.ai, agrex, studiomatrx |
| Q12 | Can CCTV detect someone entering a restricted zone in a plant? | Bing | No | No | visionify (summary lead), analyza, iFactory, thedisruptlabs, viso.ai, imagevision, smipltech, viact, ripik, vianix |
| Q19 | What does an ANPR camera need at a factory gate…? | Bing | No | No | hifocus (summary), indo.ai, sunsiya, phoenixsurveillance, parkyou ×2, studiomatrx, arcisai, vizo361 ×2 |
| Q21 | How accurate is number plate recognition on Indian plates? | Bing | No | No | Summary: "over 99% … 95–99%" from IJCA. Results: academic papers, agrex, carmencloud |
| Branded | "PGAK AI CCTV Ludhiana" | Bing | — | **pgak.co.in not in the top 8 organic results** | Local panel: "PGAK Innovations Private limited · Software development · 1789 Gill Road · 077173 03858". Results: Facebook, **IndiaMART "AI CCTV Monitoring Software at ₹8,500/piece"**, tender sites, Instagram, LinkedIn |
| Domain | `"pgak.co.in"` and `site:pgak.co.in` | Bing | — | **No pgak.co.in page returned** | LinkedIn posts, job listings. `site:` returned unrelated Windows help pages |

**On Perplexity, Q1 has now been absent four runs in a row.** The 5 Oct changes to `/insights/add-ai-to-existing-cctv-cameras` (brand names in the title area, the Hikvision/CP Plus/Dahua section) and the new supplier-comparison page are **not yet indexed by Google**: both were among the 15 indexing requests on 5 Oct. So this run cannot judge them yet.

## The finding that matters most: Bing does not have the site

Even an exact article title plus "PGAK" returns no pgak.co.in page on Bing. The local panel exists, built from Bing Places data with the 077173 number, and so do LinkedIn, Facebook and IndiaMART. The website itself is effectively absent.

Nothing on the site blocks Bing:
- `robots.txt` allows all agents (except CCBot and Bytespider);
- a Bingbot user agent gets 200;
- the apex domain 308-redirects to www;
- the IndexNow key file is published.

The most likely explanation is Bing's treatment of the domain after the old WordPress compromise: about 4,000 spam URLs, now answering 410. Only **Bing Webmaster Tools** can confirm that. Bing matters disproportionately for AI visibility, because ChatGPT search and Copilot retrieve through it.

## Search Console — Generative AI features, last 28 days (to 6 Oct)

**1.26K impressions, 95 pages** (run 4 read 1,450 over 30 Jun–29 Sep, a different window).

| Page | AI-feature impressions |
|---|---|
| /insights/attendance-records-law-india | 130 |
| /insights/cctv-storage-how-many-days | 97 |
| / | 92 |
| /insights/ai-cctv-price-in-india-what-it-should-cost | 66 |
| /insights/aadhaar-based-attendance-and-aebas-explained | 50 |
| /insights/employee-refuses-biometric-consent | 50 |
| /insights/attendance-data-retention-what-to-delete | 43 |
| /insights/camera-resolution-vs-distance | 36 |
| /ai-intruder-detection | 32 |
| /insights/can-a-photo-fool-face-attendance | 30 |

**Four of the top seven are the legal/privacy articles** that the 8 Oct legal review found to contain errors (`docs/pgak-growth-implementation-log/agent-reports/B081-B090.md`):
- DPDP duties presented as already in force; they commence May 2027;
- the repealed Factories Act cited as current;
- AEBAS authentication methods described wrongly.

Google's AI features are surfacing PGAK's least accurate pages most. This raises the urgency of the lawyer review of B083, B086, B082 and B089, whose corrected drafts exist. `/pricing` has dropped out of the top ten (it had 82 in run 4's window).

## Score (indicative, Bing-weighted; not comparable to run 4's signed-in Perplexity)

| Dimension | Score | Basis |
|---|---|---|
| Presence | 0.5/10 | Absent on all 6 unbranded queries; absent from Bing even when branded |
| Accuracy | n/a → 4/10 | Where Google's AI features do show PGAK, 4 of the top 7 pages carry legal errors |
| Sentiment | 6/10 | Nothing negative found; nothing positive either |
| Position | 1/10 | Not in any answer box |
| Completeness | 2/10 | The Bing local panel says "Software development" with the other phone number |
| Consistency | 1/10 | Perplexity cited PGAK for ANPR in run 4; Bing never does |

**Composite ≈ 24/100.** It is lower than run 4 mainly because Bing is now measured and has nothing. Read it as a change of instrument, not a collapse.

## Action plan (priority order)

| # | Action | Who | Impact |
|---|---|---|---|
| 1 | **Bing Webmaster Tools.** Sign in, add the site (importing from Search Console is quickest), and check Site Explorer, URL Inspection and any "blocked / spam" notice for `www.pgak.co.in`. Submit `https://www.pgak.co.in/sitemap.xml`. If there is a penalty notice, request reconsideration, citing the 410s on the old spam paths. | Owner (account) | **High.** It gates ChatGPT search and Copilot |
| 2 | **Lawyer review and promotion of the corrected legal drafts** (B083, B086, B082, B089 first, by AI-feature impressions) | Owner + lawyer | **High.** These are the pages Google's AI features show most, and they are wrong |
| 3 | **Bing Places:** align the category and phone with Google Business Profile once decided (`07-local-and-offer-drafts.md`) | Owner | Medium |
| 4 | **After release and after step 1:** run `node scripts/indexnow.mjs` once with the changed priority URLs (not the whole sitemap). Then re-run this check on Bing in 7–14 days. | Claude (after approval) | Medium |
| 5 | **Retrofit and cost questions (Q1, Q6):** the winners are titled as the question and name brands or a figure. The 5 Oct refresh does this for Q1 but is not indexed yet. The B001 price refresh draft adds dated, verified supplier prices. Promote B001 and B002 after review. | Owner review | Medium–High |
| 6 | **IndiaMART "₹8,500/piece" listing:** confirm it is PGAK's and still current. It is a public price that contradicts "no published price" on the site. Either the site acknowledges it or the listing is corrected. | Owner | Medium (consistency) |

## Content to create or promote

- [ ] Promote the B001 price refresh: dated supplier table, itemised scenarios. Targets Q6.
- [ ] Promote the B002 retrofit compatibility checklist. Targets Q1, Q4.
- [ ] Promote the B041 + B050 ANPR conditions and accuracy-testing pair. Targets Q19, Q21. The Q21 answer box quotes "99%" from an academic paper; PGAK's "how to measure it yourself" angle is the honest counter.
- [ ] Promote the B021 intrusion boundary rules and walk test. Targets Q12.

## Re-run (next: after release plus Bing Webmaster Tools)

Use the built-in browser, signed out. Perplexity gives one answer per session, so rotate one question per run. Run all 25 questions on Bing. Do not answer challenges. Read the Search Console Generative AI report by URL.
