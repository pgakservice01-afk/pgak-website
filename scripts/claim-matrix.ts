/**
 * Writes docs/pgak-growth-implementation-log/02-claim-evidence-matrix.md and
 * 03-feature-calculator-coverage.md from lib/feature-truth.ts and
 * lib/calc/scenarios.ts. Run:  npm run docs:claims
 */
import { writeFileSync } from "node:fs";
import { COUNTS, FEATURE_TRUTH } from "../lib/feature-truth.ts";
import { SCENARIOS } from "../lib/calc/scenarios.ts";

const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
const date = new Date().toISOString().slice(0, 10);

const claims = [
  `# Claim / evidence matrix`,
  ``,
  `Generated ${date} from \`lib/feature-truth.ts\` — do not edit by hand.`,
  ``,
  `Counts: ${COUNTS.offeredSolutions} offered solutions (registry) · ${COUNTS.educationalGuides} educational guides · ${COUNTS.capabilityPages} capability pages · ${COUNTS.calculatorScenarios} calculator scenarios · ${COUNTS.publishedRecordings} approved PGAK recordings.`,
  ``,
  `| Scenario | Capability | Canonical route | Supply | Availability | Evidence | What may be said | Also discussed at |`,
  `|---|---|---|---|---|---|---|---|`,
  ...FEATURE_TRUTH.map((t) =>
    `| ${t.scenarioId} | ${esc(t.name)} | ${t.canonicalRoute} | ${t.supply} | ${t.availability} | ${
      t.evidence.length ? t.evidence.map((e) => `${e.type}: ${e.source} — ${esc(e.limits)}`).join("<br>") : "none"
    } | ${esc(t.allowedClaim)} | ${t.alsoAt.join("<br>") || "—"} |`,
  ),
  ``,
  `Never claimed for any row: ${FEATURE_TRUTH[0].notAllowed}`,
  ``,
];
writeFileSync("docs/pgak-growth-implementation-log/02-claim-evidence-matrix.md", claims.join("\n"));

const cov = [
  `# Feature → calculator coverage (31 scenarios)`,
  ``,
  `Generated ${date} from \`lib/calc/scenarios.ts\`. Every registry feature, guide, capability page, claim-register row and named alias maps to one scenario — enforced by \`npm run test:scenarios\` (139 tests, including each worked example).`,
  ``,
  `| ID | Feature | Embedded on | Kind | Overlap group | Formula | Worked example → result | Existing standalone tool | Covers ids |`,
  `|---|---|---|---|---|---|---|---|---|`,
  ...SCENARIOS.map((s) =>
    `| ${s.id} | ${esc(s.feature)} | ${s.hostPath}#scenario-${s.id} | ${s.kind} | ${s.overlapGroup} | ${esc(s.formula)} | ${esc(s.example.summary)} → ${Object.entries(s.example.expect).map(([k, v]) => `${k} ${v}`).join(", ")} | ${s.existingCalculator ?? "—"} | ${s.covers.join(", ")} |`,
  ),
  ``,
];
writeFileSync("docs/pgak-growth-implementation-log/03-feature-calculator-coverage.md", cov.join("\n"));
console.log("wrote 02 and 03");
