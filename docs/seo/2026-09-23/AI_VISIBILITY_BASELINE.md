# AI-search visibility baseline — 23 September 2026

Purpose: a repeatable, honest baseline for whether PGAK is **cited** in AI answers, separate from clicks, leads and organic positions. Citations are not traffic; traffic is not leads.

## Method (repeat monthly, same wording)

| Setting | Value |
|---|---|
| Date | 2026-09-23 |
| Country / language | India / English (browser located in Ludhiana, Punjab) |
| Mode | Consumer web UI, logged out, default model, web-grounded |
| Sample size | 2 of the 25 questions below — this is a **sample, not a survey** |
| Platforms sampled | Perplexity (web) |
| Platforms **not** tested today | ChatGPT Search, Google AI Overviews/AI Mode (as a logged-in product), Gemini, Copilot/Bing — marked **not tested**, never assumed |

Record per run: date, platform, model/mode, exact question, whether pgak.co.in is cited inline, whether it is merely source-listed, which competitors are cited, and any referral or enquiry that follows.

## What was observed today

| # | Question (unbranded) | Platform | PGAK cited inline? | Source-listed? | Notes |
|---|---|---|---|---|---|
| 1 | "Can I add AI analytics to existing CCTV cameras in India without replacing them?" | Perplexity | **No** | **Yes** (last of ~15) | Answer cited IntelliSee, IndoAI, AskTheMama. Answer structure: retrofit layer table, "when it will work" compatibility conditions. |
| 2 | "What does an ANPR camera need at a factory gate to read number plates reliably in India?" | Perplexity | **No** | **Yes** (last of ~14) | Answer cited Stellarview, eSSL, spec PDFs. Competitors publish detection-rate and speed figures. |

**Two findings that matter**

1. **PGAK is indexed and retrieved, but not quoted.** In both samples the page was in the retrieval set and absent from the answer. Cited sources answered the question *in the body* with conditions, tables and specifications; PGAK's pages carried the offer.
2. **The index lags the site.** Perplexity showed PGAK's pre-22-September titles, so its stored copy predates PRs #27/#28. Any re-test before re-crawling measures old pages.

Also relevant (Google, 22–23 Sep, IN/en, sampled): an **AI Overview appears for "ai video analytics cctv price india"** and answers with per-camera ranges, citing competitors. PGAK publishes no number and no cost structure, so it cannot be used for that answer.

## The change this drives

`lib/buyerDecision.ts` + `BuyerDecisionPack` put the deciding facts into crawlable HTML on six commercial pages: a self-contained opening answer, what is and is not supported, what the site must provide, scope inclusions/exclusions, what moves the price, what the quote should list, how to judge a pilot, and what happens after enquiring.

**Hypothesis:** answer-shaped, source-quality content is what grounded answers quote, so pages that state conditions and limitations get cited more often than pages that state benefits.
**How we will judge it:** re-run these 25 questions monthly; count inline citations and source-listings separately; watch GSC/Bing AI-report metrics when access exists; count AI-referral sessions and any enquiry with an AI referrer in the lead register.
**What would disprove it:** citations stay flat after the pages are re-crawled (check `If-Modified-Since`/index dates before concluding anything).

No promise is made that schema, `llms.txt` or crawler access produce citations.

## Crawler access — facts, not spoofing

`https://www.pgak.co.in/robots.txt` (fetched 2026-09-23) allows all public pages to every agent via `User-agent: *` (`Disallow` limited to `/api/`, `/admin/`, `/private/`, and filter/sort parameters), and blocks only `CCBot` and `Bytespider`. **Googlebot, Bingbot, OAI-SearchBot and PerplexityBot are therefore already allowed — no rule change is needed, and adding duplicate `Allow` lines would change nothing.**

- Not verified today: whether any CDN/WAF layer challenges those agents in practice. User-agent spoofing would not prove it; the evidence is server logs or each platform's own fetch tool. **Access blocked** until logs or Bing Webmaster Tools are available.
- Training-crawler consent (GPTBot, Google-Extended) is **unchanged and is an owner decision**, not a ranking lever. Search crawling and training consent are kept separate.
- `llms.txt` exists and reads accurately (compatibility conditions, no accuracy guarantee, scenarios labelled illustrative). Keep it factual; it guarantees nothing.

## The fixed question set (25, unbranded — never mention PGAK)

Retrofit / compatibility
1. Can I add AI analytics to existing CCTV cameras in India without replacing them?
2. What does AI video analytics need from my DVR or NVR?
3. Does AI CCTV work if my internet goes down?
4. Do I need new cameras for AI detection, or will my old ones work?
5. What is an edge AI box for CCTV and do I need one?

Cost
6. How much does AI video analytics cost per camera in India?
7. What should a CCTV installation quotation include?
8. Is AI CCTV billed monthly or as a one-time licence in India?
9. What makes AI CCTV cost more on one site than another?

Factory / industrial
10. How do factories stop stock leaving the gate on the wrong vehicle?
11. What is the best way to do attendance at a factory gate without a queue?
12. Can CCTV detect someone entering a restricted zone in a plant?

Warehouse
13. How do warehouses cut shrinkage at the loading bay with cameras?
14. Which cameras suit a warehouse aisle?
15. How can I monitor several godowns from one screen?

Perimeter / intrusion
16. How do I stop false alarms from animals on my CCTV motion alerts?
17. What is a virtual fence on a CCTV camera?
18. Do CCTV intrusion alerts work at night?

ANPR / vehicles
19. What does an ANPR camera need at a factory gate to read number plates reliably in India?
20. Can ANPR open a boom barrier automatically?
21. How accurate is number plate recognition on Indian plates?

Compliance / buying process
22. Are my existing CCTV cameras illegal in India after the 2026 rule?
23. What questions should I ask a CCTV installation company before signing?
24. How long does an AI CCTV deployment take?
25. How do I run a pilot of AI video analytics before buying?

Rules for every run: never include "PGAK" in the question; label manual observations as samples; do not report an untested platform as checked; do not treat an API answer as the consumer product's answer.
