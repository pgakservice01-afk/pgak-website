# Page changelog — 2026-10-03

Exact URLs, before → after, why, and the commit. Everything listed as live was verified
on production after its deploy, not inferred from a build.

| URL | Before | After | Why | Commit |
|---|---|---|---|---|
| `POST /api/leads` (client body) | `company`, `requirement`, `contactTime` collected by the homepage form, never sent | Sent; reach the ERP as the first three lines of the message | The prospect's free-text requirement was discarded in the browser | `a92a6b9` (#69) |
| `GET /api/leads` | booleans only | + `envNames` (LEAD_*/ERP_* names, case-insensitive, never values) + `builtBy` | Two fresh builds after the register variables were "set" still answered `urlSet:false`; this proved they are absent from this project's Production runtime in any case | `2a169ce` (#71), `8a7a681` (#72) |
| `/platform/capabilities` | 6 rows, all `unverified`, no evidence column | + PPE, dock count, ANPR, hot-work as `limited pilot`, each linking its proof; **Evidence on file** column; reviewed date 2026-10-03 | The register and the proof did not overlap; a buyer saw only unverified rows | `2a169ce` (#71) |
| `/industrial-cctv` (proof) | hot-work clip outside the `lib/proof` approval gate | In `PROJECTS` with approval record | Gate coverage | `2a169ce` (#71) |
| `/anpr-number-plate-recognition` | "PGAK's recognition is tuned for Indian plate formats" | "The plate recognition PGAK deploys is configured for Indian plate formats" | Registry records ANPR as a licensed module; wording now true either way | `2a169ce` (#71) |
| 10 sites: `lib/capabilities.ts` ×4, `lib/solutions.ts` tiles ×4, ChatBot, HardwareGrid, scrolly Overlay | "under three seconds" / "< 3s" as fact | Same figure as a **pilot acceptance target** | No measurement on file; `/platform/deployment` already says the pilot tests it | `2a169ce` (#71) |
| `/pricing` | title "A quote built around your site" | "AI CCTV pricing — a quote built around your site" | Title did not name its subject (audit, Phase 5 §3) | `2a169ce` (#71) |
| `/ai-intruder-detection` | description "Evaluate whether a configured camera view can identify…" | "Intrusion alerts from the cameras you already own: a snapshot, camera name and timestamp on your phone…" | Read like an evaluation form | `2a169ce` (#71) |
| `/insights/cctv-storage-how-many-days` | 69 lines, **zero** links to any tool or enquiry page; CTA → `#dealer` | 10.8 × Mbps rule with a worked example and visible assumptions; links to `/resources/storage-bandwidth` and `/calculators/cctv-storage`; CTA → `/free-audit` | Highest-impression page on the site (1,449–1,743 / 90 d) converting at 0.1% | `2a169ce` (#71) |
| `/insights/ai-cctv-price-in-india-what-it-should-cost` | "₹500–₹8,000" stated as market fact; "no hardware… charges" | "…that we have seen"; "no licence or per-feature charges; processing hardware confirmed and quoted before you commit" | Unsourced range; hardware line contradicted claims-register C1 | `2a169ce` (#71) |
| `/features` | "Explore 20 capabilities" (array: 24) | Derived from the array | `featureRegistry.ts` says nothing is hardcoded | `78b406e` (#70) |
| `sitemap.xml` | 206 entries, 196 URLs, 10 exact duplicates (`/platform/*`, `/resources/*`, `/partners`) | One URL, once | Audit P2 housekeeping | this PR |
| `/insights` hub | "deployment stories from real sites", "Case studies", "What actually changed on real sites", "Read the deployment →" | "worked scenarios", "Use-case scenarios", "Illustrative: the figures are modelled…", "Read the scenario →" | Contradicted `/insights/case-studies` and `lib/caseStudies.ts`, which say illustrative and modelled (audit P1) | this PR |
| WebSite JSON-LD (all pages) | `SearchAction` → `/insights?q=` | removed | `/insights` ignores `?q=`; the action declared a search that does not exist | this PR |
| `/insights/add-ai-to-existing-cctv-cameras` | 106 lines, no commercial links; CTA → `/#dealer` | links to `/platform/compatibility` and `/video-analytics-software`; CTA → `/free-audit` | Audit Phase 5 §5 | this PR |
| `/` (hero H1) | "Ai Alerto" | "AI video analytics software for your existing CCTV"; tagline "Ai Alerto — your cameras, finally paying attention." | Non-brand searchers landed on a heading that named nothing; audit P1 / brief Phase 4 | this PR |
| 16 non-attendance solution pages | "or use the CCTV buying checklist" → a 12-question **attendance** checklist | link removed; attendance pages keep it as "attendance system buying checklist" | Audit P2: link did not match its content | this PR |

## Not changed, deliberately
- No VMS page; no deployment-mode claims (nothing on file describes them).
- No feature promoted to `available`; a single clip is not a defined configuration.
- `/contact` title and description — low CTR there is navigational traffic choosing the homepage sitelink, not a snippet problem.
- `/ai-cctv-noida` — best CTR on the site (7.1%); left alone pending query-level data.

## Rollback
Each row is one commit on `main`; `git revert <sha>` restores the prior copy. Vercel keeps every deployment; promote the previous one from the dashboard for an instant rollback without a commit.
