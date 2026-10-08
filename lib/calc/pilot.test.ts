import { test } from "node:test";
import assert from "node:assert/strict";

import { overall, parseDelays, percentile, scoreRow, verdicts, type Criteria } from "./pilot.ts";

/** Run with:  npm run test:pilot */

const row = (o: Partial<Parameters<typeof scoreRow>[0]> = {}) =>
  scoreRow({ label: "Day", eligible: 40, trueAlerts: 36, falseAlerts: 4, hours: 168, delaysSeconds: [5, 8, 12, 20, 9], ...o });

const C: Criteria = { minPrecision: 0.8, minRecall: 0.85, maxFalsePer24h: 2, maxP90DelaySeconds: 30 };

test("worked example: precision, recall, false alerts per day, delays", () => {
  const r = row();
  assert.equal(r.precision.value, 0.9); // 36 / (36 + 4)
  assert.equal(r.recall.value, 0.9); // 36 / 40
  assert.equal(r.missed, 4);
  assert.equal(r.falsePer24h.value, 0.571); // 4 / 168 h × 24
  assert.equal(r.medianDelay.value, 9);
  assert.equal(r.p90Delay.value, 20);
  assert.equal(r.smallSample, false);
  assert.equal(overall([r], C), "pass");
});

test("zero denominators are 'not measured', never 0% or 100%", () => {
  const r = row({ eligible: 0, trueAlerts: 0, falseAlerts: 0, hours: 0, delaysSeconds: [] });
  assert.equal(r.precision.value, null);
  assert.equal(r.recall.value, null);
  assert.equal(r.falsePer24h.value, null);
  assert.equal(verdicts(r, C).recall, "not measured");
  assert.equal(overall([r], C), "incomplete");
});

test("an untested night makes the pilot incomplete, not passed", () => {
  const day = row();
  const night = row({ label: "Night", eligible: 0, trueAlerts: 0, falseAlerts: 0, hours: 0, delaysSeconds: [] });
  assert.equal(overall([day, night], C), "incomplete");
});

test("one failed criterion fails the pilot", () => {
  const r = row({ falseAlerts: 30 }); // 30 / 168 × 24 ≈ 4.3 per day
  assert.equal(verdicts(r, C).falsePer24h, "fail");
  assert.equal(overall([r], C), "fail");
});

test("criteria left blank are 'no criterion', not passes", () => {
  const r = row();
  const v = verdicts(r, { minPrecision: null, minRecall: null, maxFalsePer24h: null, maxP90DelaySeconds: null });
  assert.deepEqual(Object.values(v), ["no criterion", "no criterion", "no criterion", "no criterion"]);
});

test("impossible inputs are reported, not silently fixed", () => {
  const r = row({ trueAlerts: 50 });
  assert.ok(r.errors.some((e) => /cannot exceed/.test(e)));
  assert.equal(overall([r], C), "incomplete");
  const neg = row({ falseAlerts: -1 });
  assert.ok(neg.errors.length > 0);
  assert.ok(row({ delaysSeconds: parseDelays("5, x") }).errors.length > 0);
});

test("small samples are flagged", () => {
  assert.equal(row({ eligible: 12, trueAlerts: 10 }).smallSample, true);
});

test("percentile is nearest-rank", () => {
  assert.equal(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 90), 9);
  assert.equal(percentile([], 50), null);
  assert.deepEqual(parseDelays("12, 30 45;7"), [12, 30, 45, 7]);
});
