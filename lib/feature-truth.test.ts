import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { COUNTS, FEATURE_TRUTH } from "./feature-truth.ts";

/** Run with:  npm run test:truth */

const routeExists = (p: string) => {
  const dir = p === "/" ? "app" : `app${p}`;
  if (fs.existsSync(`${dir}/page.tsx`)) return true;
  if (p.startsWith("/features/guides/")) return fs.existsSync("app/features/guides/[slug]/page.tsx");
  if (/^\/features\/[^/]+$/.test(p)) return fs.existsSync("app/features/[capability]/page.tsx");
  return false;
};

test("every capability has a canonical route that exists", () => {
  for (const t of FEATURE_TRUTH) {
    assert.ok(routeExists(t.canonicalRoute), `${t.scenarioId} ${t.canonicalRoute}`);
    for (const r of t.alsoAt) assert.ok(routeExists(r), `${t.scenarioId} alsoAt ${r}`);
  }
});

test("evidence exists only where the register attaches an approved project", () => {
  for (const t of FEATURE_TRUTH) {
    if (t.evidence.length) assert.equal(t.availability, "limited pilot", t.scenarioId);
    if (t.availability === "educational" || t.availability === "unverified")
      assert.equal(t.evidence.length, 0, t.scenarioId);
  }
  const withEvidence = FEATURE_TRUTH.filter((t) => t.evidence.length).map((t) => t.scenarioId).sort();
  // Glove/PPE, sack count, ANPR photographs, hot work.
  assert.deepEqual(withEvidence, ["C09", "C14", "C29", "C30"]);
});

test("ANPR evidence is photographs, never presented as video or a read rate", () => {
  const anpr = FEATURE_TRUTH.find((t) => t.scenarioId === "C09")!;
  assert.equal(anpr.evidence[0].type, "photographs");
  assert.match(anpr.evidence[0].limits, /accuracy/);
});

test("counts are derived and distinguish offered solutions from guides", () => {
  assert.equal(COUNTS.offeredSolutions, 18);
  assert.equal(COUNTS.educationalGuides, 24);
  assert.equal(COUNTS.calculatorScenarios, 31);
  assert.notEqual(COUNTS.offeredSolutions, COUNTS.educationalGuides);
});
