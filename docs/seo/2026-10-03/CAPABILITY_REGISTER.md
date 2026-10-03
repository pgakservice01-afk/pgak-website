# Capability and deployment register — 2026-10-03

Built on, not beside, the existing public register: `lib/b2b/claims.ts` →
`/platform/capabilities` (reviewed 2026-09-19). Everything below was read from the
repository and from production on 2026-10-03. Nothing is promoted here; promotions are
listed as owner decisions with the evidence beside each.

## States used

Per the brief, and mapped to the public register's four states where they exist:

| State here | Meaning | Public register equivalent |
|---|---|---|
| **demonstrated (one scene)** | Owner-approved recording or photograph, conditions and limits stated. Proves the function ran under those conditions; not an accuracy study. | *no equivalent* — `available` is defined as "evidenced for a defined configuration", which a single clip does not establish |
| **available — copy only** | Published as an offered function; no demonstration, test, or configuration record on file | `unverified` |
| limited pilot | Evidenced only in a named pilot | `limited pilot` |
| custom feasibility | Buildable on request; not a product | *none* |
| roadmap | Approved, not purchasable | `planned` |
| unverified | No sufficient record | `unverified` |

## 1. What the repository actually holds

Four overlapping structures describe "features". They disagree and are not linked.

| Structure | Entries | What it is | Has evidence? |
|---|---|---|---|
| `lib/b2b/claims.ts` `CAPABILITY_REGISTER` | 6 | **The public evidence gate.** Rendered at `/platform/capabilities`. All 6 `unverified`. | by design, none yet |
| `lib/featureRegistry.ts` `FEATURE_REGISTRY` | 18 | Supply-mode registry (native / licensed / supplied hardware / integration). Has an `evidence` field. | **field is mis-named** — see §3.1 |
| `lib/feature-explorer.ts` `EXPLORER_FEATURES` | 24 | Marketing explorer cards | no |
| `lib/capabilities.ts` `CAPABILITIES` | 6 | Marketing feature pages (`/features/{slug}`) | no |
| `lib/proof/projects.ts` `PROJECTS` | **3** | **The only demonstrations.** Owner-approved 2026-09-24, each with `conditions` and `limits`, gated by `proof.test.ts`. | **yes — the only yes** |

The three demonstrations and the six registered capabilities **do not overlap at all**.

## 2. The register

Columns: supply (from `FEATURE_REGISTRY`); state; configuration / inputs / outputs as
recorded; hardware; constraints; **evidence actually on file**; commercial availability
as published; recommended public state and who decides.

### 2.1 Demonstrated under stated conditions

| Capability | Supply | Config · inputs · outputs | Constraints (from the record) | Evidence on file | Published as | Recommendation |
|---|---|---|---|---|---|---|
| **PPE — bare-hand / glove check** (F13, explorer `ppe-detection`) | `pgak-software` | Existing overhead line camera, no camera added; box drawn on the hand; confidence shown (0.75, 0.27) | "Gloves are one PPE class"; low-confidence hits are for a supervisor, not auto-action | `/proof/ppe-gloves.mp4`, 14 s, recorded 2025-04-01, approved 2026-09-24 | `/video-analytics-software`, homepage | **Owner decision A:** add to `CAPABILITY_REGISTER` as *demonstrated (one scene)* — requires a 5th state, or `limited pilot` with the clip as the named pilot. Not `available`. |
| **Object line-count at a dock** (no exact explorer slug — nearest `people-counting` is people, this is sacks) | `pgak-software` | One counting line on an existing dock camera; tracking id per object; running total | "Not an inventory system; does not reconcile against a ledger" | `/proof/dock-count.mp4`, 16 s, recorded 2022-12-19, third-party identifiers blurred, approved 2026-09-24 | `/ai-cctv-for-warehouses`, homepage | **Owner decision B:** same as A. Note the recording is **nearly four years old**; state whether the current build still does this. |
| **ANPR — camera fit and gate console** (F03, explorer `number-plates`) | **`licensed-module`** | Camera on existing pillar ~1.5 m, daylight; operator console | "Mounting height, approach angle and lighting decide accuracy far more than the software" | 2 photographs `/proof/anpr-camera-mount.webp` + console, approved 2026-09-24 | `/anpr-number-plate-recognition` — the page observed taking a lead Perplexity citation (24 Sep) | **Owner decision C:** the photos prove a *fitting*, not a *read*. Also see §3.3 — the registry says this is a licensed third-party module while the page presents it as PGAK's. |
| **Hot work beside flammable material** (no explorer slug; custom classes, not `smoke-flame`) | not in `FEATURE_REGISTRY` | Fixed elevated daylight view; two classes boxed in one frame | Limits line published: no permit awareness, no distance, not fire detection | `/proof/hot-work.mp4`, 11 s, burned-in stamp 2025-02-18, **owner states own test setup**; published via #66 on 2026-09-27 | `/industrial-cctv`, labelled "From our own test setup" | **Owner decision D:** it is published but sits in `lib/solutions.ts`, **outside the `lib/proof` gate** that enforces approval records. Either add it to `PROJECTS` with an approval record (draft in §5) or accept that one proof block is ungated. Camera model, distance and confidence are still **pending** in the live caption. |

### 2.2 The six in the public register — all `unverified`, confirmed live today

| id | Capability | Supply (FEATURE_REGISTRY) | Public requirement to promote | Evidence on file | Recommendation |
|---|---|---|---|---|---|
| `intrusion` | Perimeter events | F06 `pgak-software` | Dated demo, approved config, site acceptance test | **none** — and this page carries the "< 3 s" claim (§3.4) | Keep `unverified`. `DEMO_RECORDING_BRIEF.md` already specifies the recording that would promote it. |
| `attendance` | Attendance exceptions | — (not in F01–F18) | Authorised enrolment, retention policy, correction workflow | none | Keep. Note C8 in the claims register ("150–250 employees per gate camera") is a figure with no measurement. |
| `health` | Camera-feed health | F07 `integration` | Disconnect/reconnect tests + verified notification destination | none | Keep. This is the cheapest to evidence — a scripted stream-loss test. |
| `recognition` | Face recognition | F04 `pgak-software` | Permissioned test set, false/missed match counts, human review | none | Keep. |
| `loitering` | Loitering | F10 `pgak-software` | Queue / occlusion / legitimate-worker scenarios | none | Keep. |
| `vms` | Full VMS | — | Recording, search, export, retention, roles, audit, recovery | none; page states "a complete replacement VMS is unverified" | Keep. **Owner decision E:** is there a native VMS, a named integration, or neither? Until answered, no VMS product page (brief Phase 4). |

### 2.3 Remaining registered features — "available — copy only"

Every entry below is published as offered, with supply mode recorded, and **no demonstration,
test, or configuration record on file**. Their `evidence` fields cite copy or vendors (§3.1).

| id | Capability | Supply | What the "evidence" field actually cites |
|---|---|---|---|
| F01 | False-alarm reduction | pgak-software | own copy + own article |
| F02 | Person / vehicle detection | pgak-software | own copy + **Axis** product page |
| F05 | Edge AI processing | pgak-software | `lib/offer.ts` + **i-PRO** |
| F08 | Natural-language search | licensed-module | own copy + **Hikvision AcuSeek** flyer |
| F09 | People counting / occupancy | pgak-software | own copy + own article |
| F11 | Weapon detection | licensed-module | `"OFFER_LEVEL"` + **IQSight** |
| F12 | Fire and smoke | licensed-module | **`lib/feature-explorer.ts` cited twice** |
| F14 | Abandoned / removed objects | licensed-module | `"OFFER_LEVEL"` + IQSight |
| F15 | Queue analytics / heat maps | pgak-software | own copy + Axis |
| F16 | Low-light / colour night | supplied-hardware | own copy + Hikvision ColorVu brochure |
| F17 | Two-way audio | supplied-hardware | `"OFFER_LEVEL"` + Axis speakers |
| F18 | ONVIF / open integration | integration | `"OFFER_LEVEL"` + onvif.org |

Six explorer cards have **no registry entry at all** and so no supply mode on record:
`cross-camera-search`, `event-summaries`, `custom-text-alerts`, `ptz-tracking`,
`tailgating`, `onsite-learning`, `scene-change`, `sound-classification`, `privacy-masking`
(nine, in fact — the explorer's 24 against the registry's 18).

### 2.4 Deployment modes

The brief asks for on-premises / edge / cloud / hybrid / offline. **The site does not
currently claim any of them specifically.** `/platform/deployment` is a responsibilities
and pilot-planning page: inventory feeds, size hardware ("do not assume no additional
hardware"), agree owners, test interruption. It does not state where inference runs,
where recordings reside, what leaves the premises, outage/restart behaviour, or offline
licensing. `lib/offer.ts` and `lib/solutions.ts` describe an **on-site processing
unit**. That is the only deployment statement with any consistency behind it.

| Mode | State | Basis |
|---|---|---|
| On-site processing unit (edge box) | **available — copy only** | consistent across offer/solutions copy; no sizing table, no measured camera capacity |
| Customer's own server | unverified | not described anywhere |
| Cloud | unverified | not described; no data-residency statement |
| Hybrid | unverified | not described |
| Offline / no-internet live analytics | unverified | not described; the brief's warning applies — local ≠ offline, and remote alerts need a path out |
| Uploaded recorded-video analysis | unverified | not described |

**Owner decision F:** which of these are actually sold today. Until answered,
`/platform/deployment` should keep saying what it says and not more.

## 3. Findings

### 3.1 The `evidence` field in `FEATURE_REGISTRY` is not evidence
Of 18 entries: 9 cite PGAK's own copy files, 11 cite a third-party vendor's marketing,
4 cite the literal string `"OFFER_LEVEL"`, and **0 cite `lib/proof/projects.ts`**. A
vendor page proves the category exists; it says nothing about what PGAK delivers. The
field should be renamed (e.g. `references`) or re-pointed at `PROJECTS` ids — otherwise
the word "evidence" in the codebase means two opposite things.

### 3.2 The register and the proof do not overlap
Six registered capabilities, zero demonstrated. Three demonstrations, zero registered.
A buyer reading `/platform/capabilities` sees only unverified rows and never learns a
PPE clip, a count clip and ANPR photographs exist two clicks away.

### 3.3 ANPR is recorded as a licensed third-party module and presented as PGAK's
`F03.supply = "licensed-module"` ("a third-party software capability PGAK licenses and
configures"), citing Axis License Plate Verifier. `/anpr-number-plate-recognition` does
not say so. The registry's own header warns: "Calling a third-party camera capability
'our AI' would be a lie a buyer can check." This is the page that earns PGAK's one
observed AI citation. **Owner decision C** must settle which is true.

### 3.4 "Under three seconds" has no measurement on file
Published in ≥10 places (`lib/capabilities.ts` ×4, `lib/solutions.ts` ×4 as a stat tile
"< 3s", `ChatBot.tsx`, `HardwareGrid.tsx`, scrolly `Overlay.tsx`). Searched `docs/` for
any latency measurement: the only hit is `docs/proof/DEMO_RECORDING_BRIEF.md`, which
*asks* for one ("show the real latency, whatever it is"). Status:
**OWNER_EVIDENCE_REQUIRED**, and it should join `CLAIMS_REGISTER.md` as C15.

### 3.5 Feature count — fixed in this change
`FeatureExplorer.tsx:15` hardcoded "Explore 20 capabilities"; the array has 24, and
`featureRegistry.ts`'s header states "Counts shown anywhere on the site are derived
from this array. Nothing is hardcoded." Now derived. (The header's own "18" vs the
explorer's 24 is a different count of a different thing, and is not a bug.)

### 3.6 One proof block is outside the gate
`proof.test.ts` enforces that nothing publishes without an approval record — for
`PROJECTS`. The hot-work block in `lib/solutions.ts` is not in `PROJECTS`, so the gate
does not see it. Introduced by #66. Owner decision D.

## 4. Owner decisions required

| # | Decision | What changes when answered |
|---|---|---|
| A | Promote PPE to `limited pilot` / new *demonstrated* state in `CAPABILITY_REGISTER`, citing `ppe-assembly-line` | `/platform/capabilities` gains its first non-unverified row |
| B | Same for dock count; confirm the 2022 clip reflects the current build | as A |
| C | ANPR: native or licensed module? | `F03.supply` and/or the ANPR page copy; the page's citability depends on the specifics staying |
| D | Register hot-work in `PROJECTS` with an approval record (draft §5) | gate coverage; the live caption's pending fields |
| E | VMS: native, integration, or neither | whether a VMS page exists at all |
| F | Which deployment modes are sold today | `/platform/deployment` content; any cloud/offline page |
| G | "< 3 s": measure it per `DEMO_RECORDING_BRIEF.md`, or remove the figure from 10+ places | C15 |

## 5. Draft `PROJECTS` entry for the hot-work clip (not committed — needs the owner's approval record)

```ts
{
  id: "hot-work-flammable",
  title: "Hot work flagged beside flammable storage",
  category: "Process plant — PGAK test setup",
  place: "",
  scope: "Two detection classes on one fixed elevated camera",
  description: "<as published on /industrial-cctv>",
  conditions: "Burned-in 2025-02-18 15:24:40, Camera 01, daylight. Camera model, distance and confidence: PENDING owner.",
  limits: "<as published>",
  media: { kind: "video", src: "/proof/hot-work.mp4", poster: "/proof/hot-work-poster.webp", durationSeconds: 11 },
  alt: "<as published>",
  href: "/industrial-cctv",
  approval: OWNER_PUBLISHED("/industrial-cctv"),   // approvedOn must be the owner's date, not mine
}
```

## 6. Custom-demand backlog

The brief asks for one. **No enquiry data is available to populate it**: the register
sheet has received nothing since 23 Sep (`register: false`, still true today) and the
ERP was not accessed. Template only — rows are added from real enquiries, not invented:

| Use case | Site type | Cameras | Deployment asked for | Budget (if volunteered) | Urgency | Feasibility | Source enquiry | Date |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

## 7. What this register does not claim

No feature is declared unavailable. "Copy only" means no record on file, exactly as
the public page defines `unverified`. No accuracy, latency or capacity figure is
asserted anywhere above. Trends and Keyword Planner remain unavailable; nothing here
is demand evidence.
