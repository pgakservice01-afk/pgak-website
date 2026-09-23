import { test } from "node:test";
import assert from "node:assert/strict";

import {
  FORMULA_VERSION,
  computeAdminTime,
  computeAnprGate,
  computeFalseAlarms,
  computeRetailContribution,
  computeShrinkage,
  computeTravel,
  breakEvenBudget,
  computeBandwidth,
  computeCase,
  computePower,
  computeStorage,
  computeTco,
  computeTimeReleased,
  formatINR,
  formatNumber,
  type Benefit,
  type CostItem,
} from "./engine.ts";

/**
 * Run with:  npm run test:calc
 *
 * The three fixtures at the top are the owner's reference cases. The rest
 * guard the modelling contract: unknown is not zero, capacity is not cash,
 * adverse results stay visible, and nothing is counted twice.
 */

const cash = (id: string, amountPerMonth: number): Benefit => ({
  id,
  label: id,
  amountPerMonth,
  kind: "cash",
});
const cost = (id: string, amount: number | null, cadence: CostItem["cadence"]): CostItem => ({
  id,
  label: id,
  amount,
  cadence,
});

// ── Reference fixtures ───────────────────────────────────────────────────────

test("FIXTURE ROI: ₹30,000 upfront, ₹10,000 benefit, ₹4,000 opex over 12 months", () => {
  const r = computeCase({
    benefits: [cash("benefit", 10_000)],
    costs: [cost("upfront", 30_000, "once"), cost("opex", 4_000, "monthly")],
    horizonMonths: 12,
  });
  assert.equal(r.horizonNetBenefit, 42_000);
  assert.equal(r.roiPercent, 53.85); // 100 × 42000 / 78000 = 53.846…
  assert.ok(Math.abs((100 * 42_000) / 78_000 - 53.846) < 0.001);
  assert.equal(r.paybackMonth, 5);
  assert.equal(r.monthlyNetCash, 6_000);
  assert.equal(r.horizonCosts, 78_000);
  assert.equal(r.benefitCostRatio, 1.54);
  assert.equal(r.cumulative[3], -6_000); // month 4 still behind
  assert.equal(r.cumulative[4], 0); // month 5 exactly break-even
  assert.equal(r.flags.paybackNotReached, false);
});

test("FIXTURE storage: 16 cameras × 2 Mbps × 24 h × 30 days = 10.368 TB", () => {
  const r = computeStorage({
    cameras: 16,
    bitrateMbps: 2,
    hoursPerDay: 24,
    days: 30,
    usableFraction: 1,
  });
  assert.equal(r.recordedTB, 10.368);
  const at80 = computeStorage({
    cameras: 16,
    bitrateMbps: 2,
    hoursPerDay: 24,
    days: 30,
    usableFraction: 0.8,
  });
  assert.equal(at80.recordedTB, 10.368);
  assert.equal(at80.nominalTB, 12.96); // before any RAID overhead
  assert.equal(at80.withRaidTB, null);
  const withRaid = computeStorage({
    cameras: 16,
    bitrateMbps: 2,
    hoursPerDay: 24,
    days: 30,
    usableFraction: 0.8,
    raidOverheadFactor: 1.25,
  });
  assert.equal(withRaid.withRaidTB, 16.2); // modelled separately, never merged
});

test("FIXTURE time: 20 investigations, 90 → 30 minutes = 20 hours, ₹10,000 capacity", () => {
  const r = computeTimeReleased({
    eventsPerMonth: 20,
    minutesBefore: 90,
    minutesAfter: 30,
    hourlyCost: 500,
  });
  assert.equal(r.hoursPerMonth, 20);
  assert.equal(r.capacityValuePerMonth, 10_000);
  // The headline rule: released time is NOT cash without a mechanism.
  assert.equal(r.cashSavingPerMonth, null);
  const withMechanism = computeTimeReleased({
    eventsPerMonth: 20,
    minutesBefore: 90,
    minutesAfter: 30,
    hourlyCost: 500,
    cashMechanism: "One night-shift contract not renewed",
  });
  assert.equal(withMechanism.cashSavingPerMonth, 10_000);
});

// ── Modelling contract ───────────────────────────────────────────────────────

test("unknown cost is not zero: ROI stays incomplete", () => {
  const r = computeCase({
    benefits: [cash("b", 10_000)],
    costs: [cost("subscription", null, "monthly")],
    horizonMonths: 12,
  });
  assert.equal(r.flags.costUnknown, true);
  assert.equal(r.roiPercent, null);
  assert.equal(r.benefitCostRatio, null);
});

test("zero cost does not divide by zero, and no upfront is stated as such", () => {
  const r = computeCase({
    benefits: [cash("b", 5_000)],
    costs: [cost("opex", 0, "monthly")],
    horizonMonths: 12,
  });
  assert.equal(r.roiPercent, null); // total cost 0 → ratio undefined, not ∞
  assert.equal(r.flags.noUpfrontInvestment, true);
  assert.equal(r.paybackMonth, 1); // already ahead, but see the flag above
});

test("adverse case: negative result is returned, not suppressed", () => {
  const r = computeCase({
    benefits: [cash("b", 2_000)],
    costs: [cost("upfront", 50_000, "once"), cost("opex", 4_000, "monthly")],
    horizonMonths: 12,
  });
  assert.equal(r.monthlyNetCash, -2_000);
  assert.equal(r.flags.negativeAtHorizon, true);
  assert.equal(r.flags.paybackNotReached, true);
  assert.equal(r.paybackMonth, null);
  assert.ok(r.roiPercent !== null && r.roiPercent < 0);
  assert.equal(r.cumulative.length, 12);
  assert.ok(r.cumulative.every((v) => v < 0)); // chart data still present
});

test("capacity and contribution never enter net cash", () => {
  const r = computeCase({
    benefits: [
      cash("guard", 10_000),
      { id: "hours", label: "hours", amountPerMonth: 9_000, kind: "capacity" },
      { id: "sales", label: "sales", amountPerMonth: 20_000, kind: "contribution" },
      { id: "loss", label: "loss", amountPerMonth: 15_000, kind: "scenario" },
    ],
    costs: [cost("opex", 4_000, "monthly")],
    horizonMonths: 12,
  });
  assert.equal(r.monthlyCashBenefit, 10_000);
  assert.equal(r.monthlyNetCash, 6_000);
  assert.equal(r.capacityHoursValuePerMonth, 9_000);
  assert.equal(r.contributionPerMonth, 20_000);
  assert.equal(r.scenarioPerMonth, 15_000);
});

test("duplicate ids are counted once, on both sides", () => {
  const r = computeCase({
    benefits: [cash("guard", 10_000), cash("guard", 10_000)],
    costs: [cost("opex", 4_000, "monthly"), cost("opex", 4_000, "monthly")],
    horizonMonths: 6,
  });
  assert.equal(r.monthlyCashBenefit, 10_000);
  assert.equal(r.monthlyOperatingCost, 4_000);
});

test("break-even budget is affordability over the horizon, never negative", () => {
  assert.equal(breakEvenBudget(10_000, 4_000, 12), 72_000);
  assert.equal(breakEvenBudget(1_000, 4_000, 12), 0);
});

test("no benefits selected is flagged rather than shown as a win", () => {
  const r = computeCase({ benefits: [], costs: [cost("opex", 1_000, "monthly")], horizonMonths: 12 });
  assert.equal(r.flags.noBenefitsSelected, true);
  assert.equal(r.monthlyNetCash, -1_000);
});

// ── Bandwidth, TCO, power, formatting ────────────────────────────────────────

test("bandwidth: headroom sizes the link, never the transferred data", () => {
  const r = computeBandwidth({
    simultaneousStreams: 8,
    bitrateMbps: 2,
    headroomFraction: 0.3,
    hoursPerDay: 24,
    days: 30,
    tariffPerGB: 5,
  });
  assert.equal(r.requiredMbps, 16);
  assert.equal(r.recommendedLinkMbps, 20.8);
  // 16 Mbps × 2,592,000 s ÷ 8 ÷ 1e9 = 5184 GB — headroom excluded.
  assert.equal(r.transferredGB, 5_184);
  assert.equal(r.transferCost, 25_920);
  const unknown = computeBandwidth({
    simultaneousStreams: 8,
    bitrateMbps: 2,
    headroomFraction: 0.3,
    hoursPerDay: 24,
    days: 30,
    tariffPerGB: null,
  });
  assert.equal(unknown.transferCost, null);
  assert.equal(unknown.costUnknown, true);
});

test("TCO: equal options declare a tie; an unknown blocks the comparison", () => {
  const base = { upfront: 100_000, monthlyOperating: 2_000, replacementCost: 0, residualValue: 0 };
  const equal = computeTco(
    [
      { id: "retrofit", label: "Retrofit", ...base },
      { id: "replace", label: "Replace", ...base },
    ],
    36
  );
  assert.equal(equal.equal, true);
  assert.equal(equal.cheaperOptionId, null);

  const unknown = computeTco(
    [
      { id: "retrofit", label: "Retrofit", ...base },
      { id: "replace", label: "Replace", ...base, upfront: null },
    ],
    36
  );
  assert.equal(unknown.anyUnknown, true);
  assert.equal(unknown.cheaperOptionId, null);
  assert.deepEqual(unknown.options[1].unknownFields, ["upfront"]);

  // Retrofit does not automatically win: a cheap replacement can beat it.
  const replaceWins = computeTco(
    [
      { id: "retrofit", label: "Retrofit", upfront: 500_000, monthlyOperating: 9_000, replacementCost: 0, residualValue: 0 },
      { id: "replace", label: "Replace", upfront: 300_000, monthlyOperating: 2_000, replacementCost: 50_000, residualValue: 20_000 },
    ],
    36
  );
  assert.equal(replaceWins.cheaperOptionId, "replace");
  // retrofit 500,000 + 9,000×36 = 824,000 | replace 300,000 + 72,000 + 50,000 − 20,000 = 402,000
  assert.equal(replaceWins.difference, 422_000);
});

test("power: incremental watts are separate from whole-system watts", () => {
  const r = computePower({
    systemWatts: 400,
    incrementalWatts: 60,
    hoursPerDay: 24,
    days: 30,
    tariffPerKWh: 8,
  });
  assert.equal(r.systemKWh, 288);
  assert.equal(r.incrementalKWh, 43.2);
  assert.equal(r.incrementalCost, 345.6);
  assert.equal(r.systemCost, 2_304);
  const noTariff = computePower({
    systemWatts: 400,
    incrementalWatts: 60,
    hoursPerDay: 24,
    days: 30,
    tariffPerKWh: null,
  });
  assert.equal(noTariff.incrementalCost, null);
});

test("large inputs and Indian formatting", () => {
  const r = computeCase({
    benefits: [cash("b", 12_500_000)],
    costs: [cost("upfront", 50_000_000, "once"), cost("opex", 2_500_000, "monthly")],
    horizonMonths: 60,
  });
  assert.equal(r.horizonBenefits, 750_000_000);
  assert.equal(formatINR(12_50_000), "₹12,50,000");
  assert.equal(formatNumber(10.368, 3), "10.368");
});

test("invalid percentages are clamped rather than silently inverted", () => {
  const over = computeStorage({
    cameras: 4,
    bitrateMbps: 2,
    hoursPerDay: 24,
    days: 1,
    usableFraction: 1.5, // nonsense: treated as 100%
  });
  assert.equal(over.nominalTB, over.recordedTB);
  const negativeDelta = computeTimeReleased({
    eventsPerMonth: 10,
    minutesBefore: 20,
    minutesAfter: 45, // slower after: no negative "saving"
    hourlyCost: 500,
  });
  assert.equal(negativeDelta.hoursPerMonth, 0);
});

test("every result carries the formula version", () => {
  assert.equal(FORMULA_VERSION, "1.0.0");
  assert.equal(computeCase({ benefits: [], costs: [], horizonMonths: 12 }).formulaVersion, "1.0.0");
  assert.equal(
    computeStorage({ cameras: 1, bitrateMbps: 1, hoursPerDay: 1, days: 1, usableFraction: 1 })
      .formulaVersion,
    "1.0.0"
  );
});

// ── Batch 2 models ───────────────────────────────────────────────────────────

test("shrinkage: no default recovery rate, unknown loss blocks the answer", () => {
  const r = computeShrinkage({ documentedLossPerMonth: 200_000, eligibleSharePercent: 50, improvementPercent: 20 });
  assert.equal(r.eligibleLoss, 100_000);
  assert.equal(r.scenarioBenefit, 20_000);
  const unknown = computeShrinkage({ documentedLossPerMonth: null, eligibleSharePercent: 50, improvementPercent: 20 });
  assert.equal(unknown.scenarioBenefit, null);
  // A nonsense percentage is clamped, not inverted.
  const silly = computeShrinkage({ documentedLossPerMonth: 100, eligibleSharePercent: 400, improvementPercent: -20 });
  assert.equal(silly.eligibleLoss, 100);
  assert.equal(silly.scenarioBenefit, 0);
});

test("attendance admin: hours released and payment correction stay separate", () => {
  const r = computeAdminTime({ hoursBefore: 30, hoursAfter: 8, hourlyCost: 400, verifiedPaymentCorrection: 5_000 });
  assert.equal(r.hoursReleased, 22);
  assert.equal(r.capacityValue, 8_800);
  assert.equal(r.paymentCorrection, 5_000);
  const slower = computeAdminTime({ hoursBefore: 5, hoursAfter: 9, hourlyCost: 400, verifiedPaymentCorrection: null });
  assert.equal(slower.hoursReleased, 0);
  assert.equal(slower.paymentCorrection, null);
});

test("false alarms: avoided alerts become hours, not money by default", () => {
  const r = computeFalseAlarms({ alertsPerDayBefore: 40, alertsPerDayAfter: 6, minutesPerAlert: 3, daysPerMonth: 30, hourlyCost: 300 });
  assert.equal(r.alertsAvoided, 1_020);
  assert.equal(r.hoursPerMonth, 51);
  assert.equal(r.capacityValue, 15_300);
  const noCost = computeFalseAlarms({ alertsPerDayBefore: 10, alertsPerDayAfter: 10, minutesPerAlert: 3, daysPerMonth: 30, hourlyCost: null });
  assert.equal(noCost.hoursPerMonth, 0);
  assert.equal(noCost.capacityValue, null);
});

test("travel: expense is cash, hours are capacity", () => {
  const r = computeTravel({ avoidableVisitsPerMonth: 8, expensePerVisit: 1_200, hoursPerVisit: 3, hourlyCost: 500 });
  assert.equal(r.cashPerMonth, 9_600);
  assert.equal(r.hoursPerMonth, 24);
  assert.equal(r.capacityValue, 12_000);
  const unknownExpense = computeTravel({ avoidableVisitsPerMonth: 8, expensePerVisit: null, hoursPerVisit: 3, hourlyCost: null });
  assert.equal(unknownExpense.cashPerMonth, null);
  assert.equal(unknownExpense.capacityValue, null);
});

test("ANPR: drivers' waiting time is not the client's cash without a mechanism", () => {
  const r = computeAnprGate({ vehiclesPerDay: 120, secondsBefore: 90, secondsAfter: 20, daysPerMonth: 26, gateStaffHourlyCost: 250, driverTimeIsBilledToYou: false, driverHourlyCost: 400 });
  assert.equal(r.secondsSavedPerVehicle, 70);
  assert.equal(r.gateHoursPerMonth, 60.67);
  assert.equal(r.gateCapacityValue, 15_167.5);
  assert.equal(r.driverCashValue, null); // not billed to you → not your saving
  const billed = computeAnprGate({ ...{ vehiclesPerDay: 120, secondsBefore: 90, secondsAfter: 20, daysPerMonth: 26, gateStaffHourlyCost: 250 }, driverTimeIsBilledToYou: true, driverHourlyCost: 400 });
  assert.equal(billed.driverCashValue, 24_268);
});

test("retail: percentage POINTS, and an unknown order value blocks the money", () => {
  const r = computeRetailContribution({ visitorsPerMonth: 10_000, conversionChangePercentagePoints: 0.5, averageOrderValue: 1_200, contributionMarginPercent: 40, extraCostsPerMonth: 5_000 });
  assert.equal(r.extraOrders, 50); // 0.5 pp of 10,000 — not 0.5% of a rate
  assert.equal(r.contributionPerMonth, 19_000); // 50 × 1200 × 0.4 − 5000
  const unknown = computeRetailContribution({ visitorsPerMonth: 10_000, conversionChangePercentagePoints: 0.5, averageOrderValue: null, contributionMarginPercent: 40, extraCostsPerMonth: 0 });
  assert.equal(unknown.contributionPerMonth, null);
});
