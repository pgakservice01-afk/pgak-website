# District coverage system — audit and Phase 1

Branch `feat/district-coverage-system`. Nothing here is deployed.

This is the audit the brief asks for before editing, the working code built on top of it, and one consolidated owner-action list. Figures are observed, dated and attributed; where something is unknown it says unknown rather than estimating.

---

## 1. What the repository actually is today

Checked on `main` at `f202bfc`, 2026-09-23.

| | Observed |
|---|---|
| Location pages | **18**, each `app/ai-cctv-{slug}/page.tsx` rendering the shared `components/solutions/LocationPage` from `lib/locations.ts` |
| Of those, in Punjab | 11 |
| With a physical office (`hasOffice: true`) | **1** (Ludhiana) |
| Solution pages | 13 (`lib/solutions.ts`) |
| Capability pages | 6 (`lib/capabilities.ts`) |
| Insights articles | 80 |
| Live calculators | 11 |
| Sitemap URLs (live, 2026-09-23) | **178**, all returning 200 to Googlebot |
| Open PRs | **#25 only** — draft, "not ready", untouched by this work |

Canonicals are handled centrally and correctly: `pageMeta()` in `lib/seo.ts` sets `alternates: { canonical: url }` on every page. Lead delivery (`app/api/leads/route.ts`, `lib/leads.ts`, `lib/leadRegister.ts`), ERP relay, the private Master Leads register, notification fallback, Unicode/signature handling, analytics deduplication and the `410 Gone` spam middleware are all intact and untouched.

Two incidental findings, neither acted on:

- `public/insights/covers/` holds **36 tracked `.webp` files that nothing references**. All 80 articles point at `/insights/category/*.webp` in their frontmatter, and no tracked code mentions `/insights/covers/`. So they are shipped and deployed but unused — dead weight from the cover-image work in PRs #36/#37, **not** broken production images. Left in place; worth a decision, but not mine to delete.
- Google reports "Referring page: None detected" for sitemap-discovered articles. Checked against the built HTML rather than assumed: the two examples have **6 and 8 inbound internal links**. The `getRelatedInsights` ring works; that GSC field is just how sitemap-discovered URLs display.

---

## 2. The finding that shapes this whole project

**Search Console, 2026-09-23: 19 URLs are "Duplicate without user-selected canonical", validation FAILED.**

They are real pages, not spam. Ten read directly:

```
/factory-security                              Sep 17
/multi-site-cctv-monitoring                    Sep 17
/ai-surveillance-system                        Sep 17
/industrial-cctv                               Sep 17
/insights/dvr-vs-nvr-which-do-you-have         Sep 11
/insights/face-recognition-low-light-gate      Sep 11
/insights/ip-vs-analogue-cameras-india         Sep 11
/insights/multi-location-attendance-management Sep  8
/ai-cctv-batala                                Sep  4
/ai-cctv-khanna                                Sep  4
```

Every one of them already declares a self-canonical. **Google is ignoring the declared canonical and clustering them anyway**, which it does on content similarity, not markup. Validation has already been attempted and **failed**.

`lib/locations.ts` records the same lesson independently: measured 2026-09-04, any two city pages shared **~53% of their ten-word phrases**, and Google had clustered `/ai-cctv-jalandhar` as a duplicate with no canonical of its own.

**So the location template is already at its similarity ceiling at 18 pages, and 2 of those 18 are already flagged.** Generating several hundred district pages from the same template would multiply a defect Google has already refused to clear. The brief's own instruction applies: *"investigate systemic problems before multiplying them."*

This is not a reason to abandon national coverage. It is the reason the readiness gate exists and is built to be hard to pass.

---

## 3. Source access — tested, not assumed

| Source | Result |
|---|---|
| `lgdirectory.gov.in` state/UT selector | **Works.** 36 states/UTs with official LGD codes, no CAPTCHA. Authoritative and complete (28 states + 8 UTs). |
| `lgdirectory.gov.in` district view | **Blocked by CAPTCHA.** `globalviewdistrictforcitizen.do` requires `paramStateCode` **and** `captchaAnswer`. Not bypassed — solving or evading a CAPTCHA is out of bounds, and it would breach the site's own terms. |
| `data.gov.in` LGD districts resource | Page loads; the **API requires an owner API key**. |
| `igod.gov.in/districts` | **Works.** 748 district names + official district websites, paginated via `GET /districts/list_more/{start}/{limit}`, followed to exhaustion over 16 requests. |

### Why igod cannot be the district master

It is an official NIC source and the brief names it — but it is a directory of district **websites**, not the administrative register. Measured against the snapshot:

- **748** districts listed, against roughly 790 that exist. igod lists districts that *have a website*, so it is structurally incomplete.
- It carries **no LGD district code**, **no effective dates**, and **no state field**.
- Only **162 of 748** district websites encode a state in the domain (`banswara.rajasthan.gov.in`). The other **586 are `{district}.nic.in`-style** and carry no state signal at all.

Inferring the parent state for those 586 would mean matching names loosely — exactly what the brief forbids, and unsafe in practice: Aurangabad is a district in both Bihar and Maharashtra, Bilaspur in both Chhattisgarh and Himachal Pradesh, Hamirpur in both Himachal Pradesh and Uttar Pradesh.

**Consequence: the `/areas-we-serve/{state}/{district}` hierarchy cannot be built honestly until the LGD master arrives.** That is a data blocker, not a design choice, and it is the single thing gating the rest of the build.

---

## 4. What is built and working

All on `feat/district-coverage-system`. `npm test` — **103 tests across 7 suites, all passing**; `npm run typecheck` and `npm run build` clean.

| Path | What it does |
|---|---|
| `scripts/geo/fetch-sources.mjs` | Fetches LGD states + the full igod district list; writes a dated raw snapshot with publisher, licence, retrieval time, per-source checksum and counts. **Refuses to write a partial snapshot** — if igod paging is not exhausted it throws rather than saving. `--check` re-fetches and diffs without writing. |
| `data/geo/snapshots/2026-09-23-geo-sources.json` | The snapshot. `stateSource: "lgd-authoritative"`, `districtSource: "igod-crosscheck"` — the file states its own authority level. |
| `scripts/geo/build-states.mjs` | Generates the typed state registry from the snapshot. Idempotent (verified byte-identical on re-run); refuses to run against a non-authoritative snapshot. |
| `lib/geo/states.generated.ts` | 36 states/UTs keyed by LGD code, with source lineage in the header. |
| `lib/geo/registry.ts` | Record types, the five publication states, per-service delivery modes, the readiness gate, legacy city-page mapping, coverage totals. |
| `lib/geo/registry.test.ts` | 13 tests, wired into `npm test` via `npm run test:geo`. |

### The readiness gate

`readinessOf()` returns `indexable-page-ready` only when **all** of these hold: an LGD district code **from the master source**, a verified parent state, at least one service with a delivery mode better than `unknown` **and** evidence for it, local buying evidence with a source, and explicit human approval. Anything short lands in `research-needed`, `availability-check`, `unavailable` or `legacy-mapped`, each carrying the exact gaps.

The tests that matter most are the ones asserting the gate stays **shut** — a false positive here publishes a thin page onto a site that already has 19 duplicate-flagged URLs. In particular: a `igod-crosscheck` record can never publish however complete it looks, and identically named districts in different states stay separate.

### Legacy mapping

12 of the 18 existing city pages are mapped so no district record can grow a rival URL. **Six are deliberately left unmapped** because they are not district-shaped, and each needs a documented decision once the master lands:

- `/ai-cctv-delhi-ncr` — multi-state region, not a district
- `/ai-cctv-chandigarh-mohali` — spans a UT and a Punjab district
- `/ai-cctv-noida` — city inside Gautam Buddha Nagar district
- `/ai-cctv-mandi-gobindgarh` — town inside Fatehgarh Sahib district
- `/ai-cctv-khanna` — town inside Ludhiana district *(already duplicate-flagged)*
- `/ai-cctv-batala` — town inside Gurdaspur district *(already duplicate-flagged)*

---

## 5. Current coverage, stated honestly

| Denominator | Count |
|---|---|
| States/UTs verified from the authoritative source | **36 of 36** |
| Districts with a verified LGD identity | **0** — blocked on the master export |
| Districts named by a cross-check source | 748 |
| Districts with a verified parent state | 162 at best, by domain inference, **none accepted** into the registry |
| Districts passing the readiness gate | **0** |
| Existing city pages mapped | 12 of 18 |
| Published district pages | **0** |

Directory coverage, serviceable coverage, published-page coverage and observed search visibility are four different denominators and are not merged anywhere.

---

## 6. Owner actions — consolidated

Everything below is blocked on access I do not have and must not obtain by other means. **(1) is the one that unblocks the most.**

1. **LGD district master.** Either a `data.gov.in` API key for the LGD districts resource, or a manual LGD export (the CAPTCHA is trivial for a human — pick "All States" and download). Either file drops into `data/geo/` and unblocks district identity, the state hierarchy, all routing and the coverage report. **Without this, no district page can be published.**
2. **Google Ads / Keyword Planner access**, if per-district volume figures are wanted. I will not create, log into or spend on an ads account. Search Console I already have, but it holds only 196 queries total with almost no district-level data, so it cannot substitute.
3. **Serviceability sign-off per service.** Which of the six services PGAK delivers by own team, by verified partner, remotely, on assessment, or not at all — and outside Ludhiana, what the evidence is. This is a business fact I cannot derive from the codebase.
4. **Decisions on the six non-district legacy pages** listed in §4.
5. **A view on the 19 duplicate-flagged URLs** before scaling. My recommendation: differentiate or consolidate those first. Adding district pages while validation is failing adds pages to a cluster Google is already collapsing.

## 7. What I would do next, in order

1. Ingest the LGD master, reconcile it against the 748 igod names, and produce the full per-district coverage report with named gaps.
2. Consolidate or differentiate the 19 duplicate-flagged URLs, and confirm validation passes.
3. Build `/areas-we-serve/{state}` as a real crawlable directory over the 36 verified states — useful immediately, and it does not depend on district identity.
4. Only then, a first review batch of district pages, sized by how many genuinely pass the gate rather than by a target number.

No page, route or sitemap entry has been added in this phase. The one visible change to the live site would be none.
