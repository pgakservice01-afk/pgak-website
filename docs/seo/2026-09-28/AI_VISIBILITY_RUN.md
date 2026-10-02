# AI-search visibility — run 3

Follows `docs/seo/2026-09-23/AI_VISIBILITY_BASELINE.md` and `../2026-09-24/AI_VISIBILITY_RUN.md`.
Read those first. This run could **not** repeat the question sample, so it does the
measurement work those runs deferred instead.

## Method and its limits

| Setting | Value |
|---|---|
| Date | 2026-09-28 |
| Questions sampled | **None — 0 of 25** |
| Perplexity / Bing | **Not tested.** Both were blocked by browser site permissions in this session. Not "absent", not "declined to cite" — not tested. |
| ChatGPT / Claude / Gemini / AI Overviews | **Not tested** — unchanged reason: each needs an account, and none was created or used. |
| What was measured instead | On-site AI-readiness, and the live duplication that action #1 was opened against. |

No citation counts appear below, because none were observed. The 24 Sep composite of
≈63/100 therefore **stands unchanged** — it is not re-scored on zero new observations.

## Action #1 is still live, and still measurable

The 24 Sep plan ranked the duplicate cluster High. Branch `feat/ai-citability` holds the
fix — one commit, "Stop repeating 410 words of the journey chooser onto every solution
page". Four days on:

- **no pull request was ever opened** for it;
- it is **1 commit ahead of main and 78 behind**, so it no longer applies cleanly to
  today's tree.

That is why the action stalled. It did not fail review; it was never proposed.

### The duplication, measured live today

Four solution pages fetched from production, tags stripped, 8-word shingles:

| Page pair | Shared shingles |
|---|---|
| `cctv-installation-company` ↔ `industrial-cctv` | **544** |
| `cctv-installation-company` ↔ `factory-security` | 221 |
| `factory-security` ↔ `industrial-cctv` | 221 |
| the other three pairs | 148–150 |
| shared by **all four** | 148 (≈155 words — site chrome) |

The 24 Sep note records "overlap 481→323" without naming which pair it measured, so
**544 is a separate measurement, not evidence of a regression.** It is only evidence
that the problem is still there.

### What the worst pair actually repeats — and why almost none of it should go

The 544 decomposes into five passages over 20 words. **An earlier draft of this file
called ~427 of those words "the real target". That was wrong, and is corrected here.**
Every one of the five is deliberate:

| Passage | Source | Verdict |
|---|---|---|
| 320 words — "Who you are dealing with" | `components/sections/WhoIsPgak.tsx` | **Keep.** Carries legal name, incorporation year, registered office, CIN and named directors — facts checkable against the MCA record — and sits directly above the lead form because security is bought on trust. The 24 Sep commit reached the same conclusion and kept it deliberately. |
| 114 words — enquiry form | `SolutionPage.tsx` | Keep. Functional. |
| 107 words — "What to check before deployment" | `SolutionPage.tsx` | **Keep.** Real pre-purchase buyer guidance, and it already varies one of its four rows by `s.group`. |
| 63 words — header/nav | layout | Keep. |
| 38 words — free-audit CTA | `SolutionPage.tsx` | Keep. |

So the duplication is **not** accidental boilerplate, and cutting it would remove trust
signals and buyer guidance to chase a similarity metric. The 410-word JourneyChooser
that run 2 correctly identified was the accidental kind — and it is already gone.

## The ratio is the real finding

Shared furniture is only a problem in proportion to what is *not* shared. Measured over
all 17 pages that render the solution template, as the share of each page's 8-word
shingles that appear on no other solution page:

| Page | Words | Unique % |
|---|---|---|
| `anpr-number-plate-recognition` | 2,125 | **71.7%** |
| `industrial-cctv` | 2,103 | **71.2%** |
| `residential-security` | 1,906 | 68.4% |
| `commercial-cctv` | 1,798 | 65.8% |
| `biometric-attendance` | 1,731 | 64.9% |
| `remote-cctv-monitoring` | 1,704 | 64.1% |
| `cctv-installation-company` | 1,653 | 61.4% |
| *(six attendance / perimeter pages)* | 1,399–1,478 | 55.8–58.0% |
| `school-security` | 1,275 | 52.4% |
| `retail-shop-security` | 1,274 | 52.4% |
| `ai-cctv-for-offices` | 1,294 | 51.7% |
| `hospital-security` | 1,249 | **49.3%** |

**The two most distinctive pages are the two that carry proof blocks.** And
`/anpr-number-plate-recognition` — top of this table — is the single page observed
winning a lead inline citation on Perplexity in run 2, on the strength of the concrete
physical conditions it publishes.

That is a correlation across two observations, not a demonstrated cause. It is
nonetheless the same direction the run-2 hypothesis predicted, and it points the work
somewhere different from where run 2 pointed it: **the lever is adding specifics to thin
pages, not removing furniture from thick ones.** `hospital-security` is half template.

Writing that content is not a mechanical change — under the TRUTH RULE each page needs
conditions PGAK will actually stand behind, which requires the owner. The ranked list
above is the queue.

## On-site AI readiness — verified, and strong

| Signal | State |
|---|---|
| `/llms.txt` | **200, 34,774 bytes**, generated from the same data files as the sitemap, under the TRUTH RULE |
| `robots.txt` | `*` allowed; CCBot and Bytespider disallowed; OAI-SearchBot and PerplexityBot noted as permitted |
| Schema | Organization, Service, Product, FAQPage, SoftwareApplication, WebSite, Person, Offer, PostalAddress, Place + others |
| `ai-crawl` logging | present in `middleware.ts:43` |

This half of the problem is in better shape than most sites ever get. The weakness is
not that assistants cannot read the site.

## What could not be read

`middleware.ts` writes `ai-crawl operator=… path=…` to **Vercel runtime logs**. The
24 Sep run asked that run 3 read that data rather than sample manually. It could not
be read here: no `vercel` CLI is installed and no log access is configured. Five days
of AI-bot fetch data exists and is currently unreadable from this environment.
This is the highest-value unblock for run 4.

## Recommended order

| # | Action | Why |
|---|---|---|
| 1 | **Give `hospital-security`, `ai-cctv-for-offices`, `retail-shop-security` and `school-security` page-specific specifics** | Each is ~half template. Needs owner-supplied facts; cannot be written mechanically. |
| 2 | Install/authorise `vercel` CLI, or export logs | Five days of `ai-crawl` data is collected and unreadable from here. Turns run 4 into measurement. |
| 3 | Owner: correct the Bing Places listing | Unchanged since 24 Sep. ChatGPT Search and Copilot ground on Bing. |
| 4 | ~~Merge `feat/ai-citability`~~ | **Closed as superseded.** Its target, JourneyChooser, was already removed from every page by the b2b redesign (`d37d7b9`), leaving the component orphaned. Deleted in this change along with `FeatureChooser`. |

## Note

`/industrial-cctv` gained ~230 words of unique proof copy on 2026-09-27 (PR #66, the
hot-work detection clip). That is the correct direction for citability — it is the one
page in the worst-duplicated pair, and it now carries content no other page has.
Whether it changes citation is untested and should not be assumed.
