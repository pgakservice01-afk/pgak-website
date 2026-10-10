# Ten-brand adaptation matrix and India shortlist (10 Oct 2026)

**Adapt the mechanism, not the claim.** The ten records come from the 10 Oct brief. They are selected global platforms, not a market-share top ten, and not ten independent companies.

**Their pages show tactics, not proof of conversion.** No competitor wording, metric, price, logo, trademark or trial term is used on PGAK pages.

**Not rechecked.** Every competitor observation below is the brief's, dated 10 Oct; none was rechecked against the live sites for this file. Recheck before referring to any competitor publicly.

## Matrix

| Id | Brand (brief's source) | Mechanism | PGAK component | State | Hypothesis to measure | Did not copy |
|---|---|---|---|---|---|---|
| W01 | Verkada | Demo-first, a demo next to each outcome | Homepage `RealWork` + demo library with a task filter; each card links to its calculator and next step | Local | Visitors who use the demo library start an assessment more often than other evidence-page visitors (`cta_click` `demo-*-next` → `form_start`) | Replacement economics, trial terms, logos, percentages |
| W02 | Avigilon Alta | How existing hardware joins; explicit routes | `SYSTEM_FLOW` four-step diagram; the compatibility check lists the checks left before a quote | Local | More completed fit checks per homepage visit (`compatibility_check_complete`) | Assuming all cameras work; cloud claims, certifications |
| W03 | Eagle Eye Networks | Public compatibility by type and firmware | `lib/compat-matrix.ts`: dated make/model/firmware/use-case matrix; "Needs verification" is a valid answer | Local (matrix empty) | Fewer unqualified "will my camera work?" calls once the matrix has entries | Their lists as PGAK proof; ONVIF as equivalence |
| W04 | Rhombus | Hardware, licence and term shown separately; defined trial | `PricingScope` (one-time / recurring / optional / quoted separately); scope builder; pilot scorecard | Local | A smaller share of price-only enquiries (needs CRM rejection reasons) | US prices, free shipping, warranty, trial economics |
| W05 | Spot AI | Business-task language; curated sample before contact | Task-based `ProblemSelector`; demo library with "what to watch" | Local (partial: no raw/explained toggle, see ledger 6d) | Demo-library engagement precedes enquiries | Footage upload, autonomous action, AI-agent claims |
| W06 | Genetec | Story format: context, challenge, solution, results | Evidence registry fields (date, conditions, limits); the case-study format needs consent, baseline, method, period, cost and outcome | Prod (registry); no case study yet | Suitable demo requests once a permissioned case exists | Scale claims, named customers, vendor results |
| W07 | Milestone | Device-specific support with version and date | Matrix entries carry firmware and `testedOn`; the verdict note shows the matrix version | Local | As W03 | Device counts; manufacturer tests as PGAK tests |
| W08 | Axis | TCO beyond purchase price | Existing `/calculators/retrofit-vs-replacement` and C05/C24 (TCO kind); sources now recorded per input | Prod + Local | Completed TCO scenarios → scoped proposals | A vendor percentage as PGAK savings |
| W09 | Hikvision | Visual industry and task examples | Six workflow diagrams (gate, warehouse, PPE, attendance, incident, reuse), each with its feature and calculator | Local | Clearer path selection (problem-card click-through) | Model specifications, installation images, results |
| W10 | Scylla | Human workflow after an alarm | Diagram final steps are "Human review", "Operator checks the log", "Supervisor review"; pilot scorecard covers false-positive and false-negative review | Local | Confidence in operation (sales objections log) | Safety guarantees, broad integration claims, automatic adverse decisions |

**On measurement:** at PGAK's traffic (about 600 GA4 sessions in 28 days), none of these hypotheses can be A/B tested to significance. Read them as sequential, dated changes over full comparison periods, alongside sales notes.

## India shortlist (brief's selection by overlap, not market share)

| Provider | Overlap (brief) | Priority | Use |
|---|---|---|---|
| Staqu / JARVIS | Analytics on existing CCTV | First | Retrofit positioning |
| Assert AI | Existing-camera safety and operations | First | Retrofit positioning |
| Intozi / Ikshana | Safety, security, operations | First | Retrofit positioning |
| Awiros | Factories, warehouses, security, traffic | First | Retrofit positioning |
| Detect Technologies / T-Pulse | Industrial safety, PPE | Second | PPE pages |
| Vehant Technologies | ANPR, traffic | Second | ANPR pages |
| Videonetics | VMS, analytics, traffic | Later | — |
| AllGoVision | Security, retail, industrial | Later | — |
| Wobot AI | Process monitoring (retail, restaurants, manufacturing) | Later | — |
| ArcisAI / Adiance | AI cameras, VMS, cloud | Later | — |

**Competitors already observed in search answers.** The 10 Oct AI-visibility run (`docs/seo/2026-10-10/AI_VISIBILITY_RUN.md`) shows the answer boxes PGAK must enter. It found indo.ai, vizo361, vianix, agrex, visionify and arcisai in Bing and Perplexity answers for the retrofit, cost and ANPR questions. Of the shortlist, only ArcisAI appeared there; Staqu, Assert AI, Intozi and Awiros did not.

**Before any comparison page:**
- verify, from each provider's primary pages and dated, the exact product, deployment model, pricing scope and supported hardware;
- make no superiority claims;
- carry no logos;
- do not import their capacity or prices.

**No comparison page is drafted on this branch.** The verification needs live reading of ten sites. It is queued, and a comparison page is not the bottleneck while Bing does not index the site at all.
