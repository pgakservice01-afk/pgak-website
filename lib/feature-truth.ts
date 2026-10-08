/**
 * One record per capability, joining every place the site describes it:
 *
 *   FEATURE_REGISTRY (18 offered solutions, supply mode) · EXPLORER_FEATURES /
 *   FEATURE_GUIDES (24 educational guides) · CAPABILITIES (6 capability pages)
 *   · CAPABILITY_REGISTER (evidence state) · PROJECTS (approved PGAK media)
 *   · SCENARIOS (31 calculator scenarios)
 *
 * The scenario list is the spine because it already covers every id and alias
 * (enforced by lib/calc/scenarios.test.ts). Availability comes ONLY from the
 * capability register, and evidence ONLY from approved proof projects — so a
 * guide about a manufacturer's technology can never read as PGAK proof.
 *
 * docs/pgak-growth-implementation-log/02-claim-evidence-matrix.md is generated
 * from this file (`npm run docs:claims`).
 */
import { SCENARIOS, type ScenarioId } from "./calc/scenarios.ts";
import { FEATURE_REGISTRY, type SupplyMode } from "./featureRegistry.ts";
import { EXPLORER_FEATURES } from "./feature-explorer.ts";
import { CAPABILITIES } from "./capabilities.ts";
import { CAPABILITY_REGISTER, type CapabilityState } from "./b2b/claims.ts";
import { PROJECTS } from "./proof/projects.ts";

export type Availability = CapabilityState | "educational";

export type EvidenceItem = {
  projectId: string;
  type: "video" | "photographs";
  source: string;
  conditions: string;
  limits: string;
};

export type FeatureTruth = {
  scenarioId: ScenarioId;
  name: string;
  canonicalRoute: string;
  /** Every other route that discusses the same capability. */
  alsoAt: string[];
  /** Registry, guide, capability-page and register ids. */
  ids: string[];
  supply: SupplyMode | "confirmed per site";
  availability: Availability;
  evidence: EvidenceItem[];
  allowedClaim: string;
  notAllowed: string;
};

const ALLOWED: Record<Availability, string> = {
  available: "PGAK supplies this for the defined configuration on record.",
  "limited pilot":
    "PGAK has demonstrated this under the stated conditions; link the recording and repeat its conditions and limits.",
  planned: "On the roadmap; not purchasable today.",
  unverified: "Can be evaluated on a customer's site; no PGAK performance is established.",
  educational:
    "An industry capability PGAK can supply or integrate subject to a site assessment; the guide explains it, it does not evidence it.",
};

const NOT_ALLOWED =
  "Accuracy, read or detection rates, latency, uptime, savings, customer results, or 'works with any camera'.";

function supplyFor(ids: string[]): FeatureTruth["supply"] {
  const f = FEATURE_REGISTRY.find((r) => ids.includes(r.id));
  return f ? f.supply : "confirmed per site";
}

function availabilityFor(ids: string[]): { state: Availability; projectIds: string[] } {
  const rows = CAPABILITY_REGISTER.filter((r) => ids.includes(r.id));
  const rank: Availability[] = ["available", "limited pilot", "planned", "unverified"];
  const best = rank.find((s) => rows.some((r) => r.state === s));
  return {
    state: best ?? "educational",
    projectIds: rows.flatMap((r) => (r.evidence ? [r.evidence.projectId] : [])),
  };
}

export const FEATURE_TRUTH: FeatureTruth[] = SCENARIOS.map((s) => {
  const ids = s.covers;
  const { state, projectIds } = availabilityFor(ids);
  const evidence: EvidenceItem[] = PROJECTS.filter((p) => projectIds.includes(p.id)).map((p) => ({
    projectId: p.id,
    type: p.media.kind === "video" ? "video" : "photographs",
    source: p.media.src,
    conditions: p.conditions,
    limits: p.limits,
  }));
  const alsoAt = new Set<string>();
  for (const id of ids) {
    const reg = FEATURE_REGISTRY.find((r) => r.id === id);
    if (reg) alsoAt.add(reg.route);
    if (EXPLORER_FEATURES.some((e) => e.slug === id)) alsoAt.add(`/features/guides/${id}`);
    if (CAPABILITIES.some((c) => c.slug === id)) alsoAt.add(`/features/${id}`);
    const row = CAPABILITY_REGISTER.find((r) => r.id === id);
    if (row) alsoAt.add(row.href);
  }
  alsoAt.delete(s.hostPath);
  return {
    scenarioId: s.id,
    name: s.feature,
    canonicalRoute: s.hostPath,
    alsoAt: [...alsoAt].sort(),
    ids,
    supply: supplyFor(ids),
    availability: state,
    evidence,
    allowedClaim: ALLOWED[state],
    notAllowed: NOT_ALLOWED,
  };
});

/** Counts for copy, derived — never typed into a page by hand. */
export const COUNTS = {
  offeredSolutions: FEATURE_REGISTRY.length,
  educationalGuides: EXPLORER_FEATURES.length,
  capabilityPages: CAPABILITIES.length,
  calculatorScenarios: SCENARIOS.length,
  publishedRecordings: PROJECTS.length,
};
