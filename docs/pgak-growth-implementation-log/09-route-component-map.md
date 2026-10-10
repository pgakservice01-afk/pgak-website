# Canonical route and component map (10 Oct 2026)

**Rule:** map buyer intent to the existing canonical route before adding a page. No new URL was added on this branch. Two redirects were added, and every changed page keeps its canonical.

## Buyer intent → canonical route → tool → proof → next step

| Intent | Canonical route | Tool on or next to it | Proof item | Next step |
|---|---|---|---|---|
| Add AI to existing CCTV | `/` and `/video-analytics-software` | Compatibility check (`/platform/compatibility#check`), estimator on `/` | All four demonstrations | Assessment form `/#assessment` |
| Will my cameras work? | `/platform/compatibility` | `CompatibilityCheck`: three verdicts, empty tested matrix | — | Assessment |
| What will it cost? | `/pricing` | Scope builder and worksheet `/resources/scope-worksheet` | — | Assessment |
| Retrofit vs replace | `/calculators/retrofit-vs-replacement` | Retrofit calculator (TCO, buyer inputs) | — | Compatibility check |
| Gate / ANPR | `/anpr-number-plate-recognition` | C09 scenario `#scenario-C09`, `/calculators/anpr-gate-time` | ANPR mounting photographs (not a read-rate study) | `/free-audit` |
| Intrusion / perimeter | `/ai-intruder-detection`, `/features/intrusion-alerts` | C07 scenario | No recording yet | Assessment |
| Loading-bay counting | `/platform/capabilities` | C29 scenario | Dock sack count | Compatibility check |
| PPE | `/features/guides/ppe-detection` | C14 scenario | PPE glove detection | `/free-audit` |
| Hot work / safety review | `/platform/capabilities` | C30 scenario | Hot-work test setup (not a customer site) | `/free-audit` |
| Attendance administration | `/features/attendance-automation`, `/face-recognition-attendance-system` | C28, `/calculators/attendance-admin-time` | No recording | Checklist QuickLead |
| Footage retention | `/insights/cctv-storage-how-many-days` | **StorageCalc embedded** (`#calculator`); `/calculators/cctv-storage` remains the tool's own page | — | Free camera audit block |
| See it working | `/resources/evidence` | Task filter (`DemoTaskFilter`) | All four, from `lib/proof/projects.ts` | Per card |
| Evaluate before buying | `/resources/evaluation-method` | `PilotScorecard` | — | Assessment |
| Dealers / installers | `/partners` | `PartnerApply` | — | Partner form |
| Local service | `/ai-cctv-ludhiana` and the city pages | — | — | Assessment |

## Redirects added on this branch

| From | To | Why |
|---|---|---|
| `/evidence` | `/resources/evidence` (308) | It returned 404, and the brief and outside references use it |
| `/trust/videos`, `/trust/photos` | `/resources/evidence` (308) | Unlinked noindex placeholders whose metadata described clips that do not exist |

## Components, by job

| Job | Component | Data source | Never |
|---|---|---|---|
| Show proof | Evidence page cards; homepage `RealWork` | `lib/proof/projects.ts` → `publishedProjects()` | Renders an unpublished or unconsented record |
| Annotate proof | `lib/proof/demo-guide.ts` | Keyed to a project id; renders only if that project is published | Adds a date, a metric or a claim |
| Explain a concept | `WorkflowDiagram` | `lib/visuals.ts` `DIAGRAMS`, `SYSTEM_FLOW` | Feeds the proof registry; renders without its "Diagram" caption |
| Concept art | — (blocked) | `lib/visuals.ts` `ILLUSTRATIONS` | Renders before its files and manifest exist |
| Capability status | `ScopeAndEvidence` | `lib/feature-truth.ts` | Says "available" without evidence |
| Estimate value | `FeatureScenarioTool`, `ValueEstimator` | `lib/calc/scenarios.ts` (C01–C31) | Hides a default best case; treats hours as cash |
| Check fit | `CompatibilityCheck` | `lib/compat.ts`, `lib/compat-matrix.ts` | Asks for a password, IP or stream URL; says "compatible" for an untested model |
| Scope a quote | `ScopeBuilder` | `TASK_DEFS` plus `FEATURE_TRUTH` | Shows a price |
| Capture a lead | `AssessmentForm`, `QuickLead` | `lib/lead-client.ts` → `/api/leads` | Puts personal data in GA4 or a URL |

## Visuals metadata

| Id | Role | Status | Caption shown | Provenance |
|---|---|---|---|---|
| system-flow | Diagram | Ready | Yes | Drawn by PGAK, 10 Oct 2026. Not a screenshot or result |
| reuse-workflow | Diagram | Ready | Yes | Same |
| incident-workflow | Diagram | Ready | Yes | Same |
| gate-workflow | Diagram | Ready | Yes | Same |
| warehouse-workflow | Diagram | Ready | Yes | Same |
| attendance-workflow | Diagram | Ready | Yes | Same |
| ppe-workflow | Diagram | Ready | Yes | Same |
| camera-reuse | Illustration | **Blocked: file not supplied** | — | AI-generated concept, per the brief |
| incident-review | Illustration | **Blocked** | — | Same |
| vehicle-log | Illustration | **Blocked** | — | Same |

**Where the diagrams render:** the homepage uses `SYSTEM_FLOW` in "How it works". Each of the six task diagrams renders above the calculator it puts numbers on: `FeatureScenario` looks up the diagram by `calculatorId`. So the gate diagram sits on the ANPR page above C09, PPE above C14, and so on. They carry no CTA there, because the calculator is the next step.
