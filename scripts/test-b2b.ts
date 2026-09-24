import { test } from "node:test";
import assert from "node:assert/strict";
import { economics, storageEstimate } from "../lib/b2b/calculators.ts";
import { readinessChecklist, projectBrief } from "../lib/b2b/readiness.ts";
import {
  cleanDetails,
  authorisedWorker,
  receiptToken,
  tokenHash,
} from "../lib/lead-intake.ts";
const base = {
  monthlyCost: 100,
  setupCost: 500,
  cashSavings: 150,
  hoursSaved: 10,
  hourlyValue: 200,
};
test("cash excludes productivity, correct net, payback and year one", () => {
  const r = economics(base);
  assert.ok("known" in r && r.known);
  assert.equal(r.monthlyCash, 50);
  assert.equal(r.productivity, 2000);
  assert.equal(r.yearOneCash, 100);
  assert.equal(r.paybackMonths, 10);
});
test("unknown price never creates an economic claim", () => {
  assert.deepEqual(economics({ ...base, monthlyCost: null }), {
    known: false,
    productivity: 2000,
  });
});
test("negative, infinite and NaN inputs rejected", () => {
  for (const n of [-1, Infinity, NaN])
    assert.ok("error" in economics({ ...base, cashSavings: n }));
});
test("zero and non-economic cases honestly say not justified", () => {
  for (const cashSavings of [0, 50, 100]) {
    const r = economics({ ...base, cashSavings });
    assert.ok("known" in r && r.known);
    assert.equal(r.justified, false);
    assert.equal(r.paybackMonths, null);
  }
});
test("explicit zero price is valid and setup is counted", () => {
  const r = economics({ ...base, monthlyCost: 0 });
  assert.ok("known" in r && r.known);
  assert.equal(r.yearOneCash, 1300);
});
test("continuous recording uses bits to bytes and decimal terabytes", () => {
  assert.deepEqual(storageEstimate(8, 2, 30), {
    bandwidthMbps: 16,
    decimalTB: 5.184,
  });
  assert.equal(storageEstimate(-1, 2, 30), null);
  assert.equal(storageEstimate(1.5, 2, 30), null);
  assert.deepEqual(storageEstimate(0, 2, 30), {
    bandwidthMbps: 0,
    decimalTB: 0,
  });
});
test("assessment has useful ungated defaults and never invents a score", () => {
  const i = { site: "Not sure", cameras: "Not sure", problem: "Not sure" };
  assert.ok(readinessChecklist(i).length >= 4);
  assert.match(projectBrief(i), /Not yet verified/);
  assert.doesNotMatch(projectBrief(i), /\d+%/);
});
test("attendance and multi-site checks reflect distinct responsibilities", () => {
  const checks = readinessChecklist({
    site: "Multiple sites",
    cameras: "50+",
    problem: "Attendance exceptions",
  }).join(" ");
  assert.match(checks, /enrolment/);
  assert.match(checks, /each site's/);
});
test("optional details reject credential URLs and allow limited text only", () => {
  assert.equal(cleanDetails({ equipment: "rtsp://admin:secret@camera" }), null);
  assert.equal(cleanDetails({ equipment: "password secret" }), null);
  assert.deepEqual(cleanDetails({ company: " Synthetic QA ", ignored: "x" }), {
    company: "Synthetic QA",
  });
});
test("outbox auth fails closed and receipt tokens bind ref to contact", () => {
  delete process.env.LEAD_OUTBOX_SECRET;
  assert.equal(authorisedWorker(null), false);
  process.env.LEAD_OUTBOX_SECRET = "test-only";
  assert.equal(authorisedWorker("Bearer test-only"), true);
  assert.equal(authorisedWorker("Bearer wrong"), false);
  process.env.LEAD_INTAKE_SERVICE_KEY = "synthetic-key";
  assert.notEqual(
    receiptToken("reference", "9876501234"),
    receiptToken("reference", "9876501235"),
  );
  assert.equal(tokenHash(receiptToken("reference", "9876501234")).length, 64);
  delete process.env.LEAD_INTAKE_SERVICE_KEY;
  delete process.env.LEAD_OUTBOX_SECRET;
});
