import { test } from "node:test";
import assert from "node:assert/strict";

import {
  SCENARIOS,
  combine,
  finance,
  runScenario,
  scenarioById,
  scenarioForFeature,
  validate,
  type ScenarioId,
} from "./scenarios.ts";
import { FEATURE_REGISTRY } from "../featureRegistry.ts";
import { FEATURE_GUIDES } from "../feature-guides.ts";
import { EXPLORER_FEATURES } from "../feature-explorer.ts";
import { CAPABILITIES } from "../capabilities.ts";
import { CAPABILITY_REGISTER } from "../b2b/claims.ts";

/** Run with:  npm run test:scenarios */

const close = (a: number | undefined, b: number | undefined, eps = 0.001) =>
  a !== undefined && b !== undefined && Math.abs(a - b) <= eps;

test("there are exactly 31 scenarios, C01 to C31, each once", () => {
  const ids = SCENARIOS.map((s) => s.id);
  assert.equal(ids.length, 31);
  assert.equal(new Set(ids).size, 31);
  for (let i = 1; i <= 31; i += 1) assert.ok(ids.includes(`C${String(i).padStart(2, "0")}` as ScenarioId));
});

for (const s of SCENARIOS) {
  test(`${s.id} ${s.feature}: the worked example reproduces the published result`, () => {
    const v = validate(s.inputs, s.example.inputs);
    assert.ok(v.ok, `example inputs must validate: ${JSON.stringify(v)}`);
    const out = runScenario(s.id, s.example.inputs);
    for (const [k, expected] of Object.entries(s.example.expect))
      assert.ok(
        close(out[k as keyof typeof out], expected as number),
        `${s.id}.${k}: got ${out[k as keyof typeof out]}, expected ${expected}`,
      );
    // Every input the example uses is a declared input, and vice versa.
    assert.deepEqual(Object.keys(s.example.inputs).sort(), s.inputs.map((i) => i.key).sort());
  });

  test(`${s.id}: zero volume is legitimate and never produces a positive benefit`, () => {
    const zeroed = Object.fromEntries(s.inputs.map((i) => [i.key, i.unit === "months" ? 1 : 0]));
    const v = validate(s.inputs, zeroed);
    assert.ok(v.ok, "a typed 0 is a real 0");
    const out = runScenario(s.id, (v as { values: Record<string, number> }).values);
    for (const n of Object.values(out)) assert.ok((n as number) <= 0.000001 && Number.isFinite(n as number));
  });

  test(`${s.id}: missing, NaN and negative inputs are errors, not zeros`, () => {
    const first = s.inputs.find((i) => !i.allowNegative)!;
    const base = { ...s.example.inputs } as Record<string, number>;
    for (const bad of [undefined, "", "abc", Number.NaN, -1]) {
      const v = validate(s.inputs, { ...base, [first.key]: bad as never });
      assert.equal(v.ok, false, `${first.key}=${String(bad)}`);
      assert.ok((v as { errors: Record<string, string> }).errors[first.key]);
    }
  });

  test(`${s.id}: carries guardrails, a proof status and a host page`, () => {
    assert.ok(s.guardrails.length > 0);
    assert.ok(s.proofStatus.length > 20);
    assert.match(s.hostPath, /^\//);
  });
}

test("fractions are bounded 0–100% and day/hour units are bounded", () => {
  const c26 = scenarioById("C26")!;
  const v = validate(c26.inputs, { ...c26.example.inputs, reduction: 1.2 });
  assert.equal(v.ok, false);
  const c09 = scenarioById("C09")!;
  assert.equal(validate(c09.inputs, { ...c09.example.inputs, days: 32 }).ok, false);
  const c19 = scenarioById("C19")!;
  assert.equal(validate(c19.inputs, { ...c19.example.inputs, hoursPerNight: 25 }).ok, false);
  const c05 = scenarioById("C05")!;
  assert.equal(validate(c05.inputs, { ...c05.example.inputs, months: 0 }).ok, false);
});

test("a worse 'after' value gives a visible negative benefit", () => {
  const out = runScenario("C07", { events: 200, old: 1, pilot: 4, verification: 0 });
  assert.equal(out.hoursPerMonth, -10);
});

test("only declared signed fields accept negatives", () => {
  const c24 = scenarioById("C24")!;
  const v = validate(c24.inputs, { ...c24.example.inputs, extraMonthly: -500 });
  assert.ok(v.ok);
});

test("finance: realisation defaults to zero, so hours alone are not cash", () => {
  const f = finance({
    hoursPerMonth: 8,
    loadedHourlyCost: 300,
    realisation: 0,
    modelCashPerMonth: 0,
    evidencedCashDelta: 0,
    recurringCost: 0,
    setupCapital: 10000,
  });
  assert.equal(f.hoursValueAtFullRealisation, 2400);
  assert.equal(f.monthlyCashEquivalent, 0);
  assert.equal(f.paybackMonths, null);
  assert.match(f.paybackNote!, /Not applicable/);
  assert.equal(f.firstYearNet, -10000);
  assert.equal(f.firstYearRoi, -1);
});

test("finance: the published formulas, worked through", () => {
  // 8 h × ₹300 × 0.5 + ₹1,000 evidenced = ₹2,200; net of ₹200 = ₹2,000/month.
  const f = finance({
    hoursPerMonth: 8,
    loadedHourlyCost: 300,
    realisation: 0.5,
    modelCashPerMonth: 0,
    evidencedCashDelta: 1000,
    recurringCost: 200,
    setupCapital: 12000,
  });
  assert.equal(f.monthlyCashEquivalent, 2200);
  assert.equal(f.monthlyNet, 2000);
  assert.equal(f.firstYearNet, 12000);
  assert.equal(f.paybackMonths, 6);
  assert.equal(f.firstYearRoi, 1);
});

test("finance: zero setup capital makes ROI not applicable, not infinite", () => {
  const f = finance({
    hoursPerMonth: 0,
    loadedHourlyCost: null,
    realisation: 0,
    modelCashPerMonth: 6000,
    evidencedCashDelta: 0,
    recurringCost: 0,
    setupCapital: 0,
  });
  assert.equal(f.firstYearRoi, null);
  assert.match(f.roiNote!, /Not applicable/);
  assert.equal(f.paybackMonths, 0);
});

test("finance: unknown costs leave net, payback and ROI incomplete", () => {
  const f = finance({
    hoursPerMonth: 5,
    loadedHourlyCost: 200,
    realisation: 1,
    modelCashPerMonth: 0,
    evidencedCashDelta: 0,
    recurringCost: null,
    setupCapital: null,
  });
  assert.equal(f.monthlyCashEquivalent, 1000);
  assert.equal(f.monthlyNet, null);
  assert.equal(f.paybackMonths, null);
  assert.equal(f.firstYearRoi, null);
  assert.equal(f.incomplete.length, 2);
});

test("finance: realisation without an hourly cost is incomplete, not zero", () => {
  const f = finance({
    hoursPerMonth: 5,
    loadedHourlyCost: null,
    realisation: 0.5,
    modelCashPerMonth: 0,
    evidencedCashDelta: 0,
    recurringCost: 0,
    setupCapital: 0,
  });
  assert.equal(f.monthlyCashEquivalent, null);
  assert.ok(f.incomplete.some((m) => /hourly cost/.test(m)));
});

test("overlap: alert-review savings are counted once unless confirmed separate", () => {
  const sel = [
    { id: "C06" as const, hoursPerMonth: 4 },
    { id: "C07" as const, hoursPerMonth: 8 },
    { id: "C26" as const, hoursPerMonth: 8 },
    { id: "C28" as const, hoursPerMonth: 15.333 },
  ];
  const once = combine(sel);
  assert.equal(once.hoursPerMonth, 23.333);
  assert.equal(once.excluded.length, 2);
  const separate = combine(sel, ["alert-review"]);
  assert.equal(separate.hoursPerMonth, 35.333);
});

test("overlap: camera-check savings from C16 and C31 are not summed by default", () => {
  const out = combine([
    { id: "C16", hoursPerMonth: 3.333 },
    { id: "C31", hoursPerMonth: 4.933 },
  ]);
  assert.equal(out.hoursPerMonth, 4.933);
});

test("the alert-review group holds every scenario the brief names", () => {
  for (const id of ["C04", "C06", "C07", "C08", "C15", "C17", "C22", "C26"])
    assert.equal(scenarioById(id)!.overlapGroup, "alert-review", id);
});

test("coverage: every registry feature, guide, capability page and claim has a scenario", () => {
  const missing: string[] = [];
  const check = (id: string) => {
    if (!scenarioForFeature(id)) missing.push(id);
  };
  FEATURE_REGISTRY.forEach((f) => check(f.id));
  Object.keys(FEATURE_GUIDES).forEach(check);
  EXPLORER_FEATURES.forEach((f) => check(f.slug));
  CAPABILITIES.forEach((c) => check(c.slug));
  CAPABILITY_REGISTER.forEach((c) => check(c.id));
  // Aliases the brief calls out by name.
  ["queue", "heat-map", "heatmap", "abandoned", "removed-object", "camera-health", "sack-counting"].forEach(check);
  assert.deepEqual(missing, []);
});

test("coverage: each registry feature maps to the scenario the brief assigns", () => {
  const expected: Record<string, ScenarioId> = {
    F01: "C26", F02: "C06", F03: "C09", F04: "C25", F05: "C05", F06: "C07",
    F07: "C27", F08: "C01", F09: "C11", F10: "C08", F11: "C21", F12: "C20",
    F13: "C14", F14: "C22", F15: "C12", F16: "C19", F17: "C23", F18: "C24",
  };
  for (const [f, c] of Object.entries(expected)) assert.equal(scenarioForFeature(f)?.id, c, f);
});

test("safety and people scenarios carry their specific guardrails", () => {
  for (const id of ["C14", "C20", "C21", "C30"])
    assert.ok(scenarioById(id)!.guardrails.some((g) => /does not value injuries/.test(g)), id);
  for (const id of ["C13", "C18", "C25", "C28"])
    assert.ok(scenarioById(id)!.guardrails.some((g) => /automated punishment/.test(g)), id);
  assert.ok(scenarioById("C19")!.guardrails.some((g) => /Do not reduce lighting/.test(g)));
});
