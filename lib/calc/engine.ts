/**
 * PGAK calculator engine — pure functions, no React, no I/O.
 *
 * MODELLING CONTRACT (the rules the UI may not break)
 * 1. Unknown is not zero. An unknown cost is `null` and makes ROI incomplete;
 *    only a value the visitor actually entered counts as zero.
 * 2. Four kinds of benefit, never added together by accident:
 *      cash         — an expense that stops being paid
 *      contribution — incremental margin from more sales (a scenario)
 *      capacity     — staff hours released; NOT cash unless a mechanism is
 *                     stated (someone is not replaced, overtime stops, …)
 *      scenario     — modelled loss reduction, only as good as its assumption
 *    Only `cash` enters net cash flow. `capacity` carries a value for sizing
 *    the prize, and is reported separately.
 * 3. Every benefit and cost has an id. Aggregation de-duplicates by id, so the
 *    same hour, loss, subscription or watt cannot be counted twice.
 * 4. No PGAK price is defaulted anywhere. The visitor types the figure they
 *    were quoted, or marks it unknown.
 * 5. Adverse results are results. Nothing here hides a negative outcome.
 *
 * Formula version travels with every result and every saved report, so a
 * number a customer shows us later can be reproduced.
 */

export const FORMULA_VERSION = "1.0.0";

export type BenefitKind = "cash" | "contribution" | "capacity" | "scenario";

export type Benefit = {
  /** Stable id — duplicates are ignored, never summed twice. */
  id: string;
  label: string;
  /** Per month, in rupees. */
  amountPerMonth: number;
  kind: BenefitKind;
  /** Required for `capacity` to be treated as cash; free text from the user. */
  cashMechanism?: string;
};

export type CostItem = {
  id: string;
  label: string;
  /** Rupees. `null` = the visitor does not know it yet. */
  amount: number | null;
  /** "once" = upfront; "monthly" = recurring operating cost. */
  cadence: "once" | "monthly";
};

export type CaseInput = {
  benefits: Benefit[];
  costs: CostItem[];
  horizonMonths: number;
};

export type CaseResult = {
  formulaVersion: string;
  horizonMonths: number;
  /** Sum of `cash` benefits per month (capacity excluded unless justified). */
  monthlyCashBenefit: number;
  monthlyOperatingCost: number;
  /** monthlyCashBenefit − monthlyOperatingCost. May be negative. */
  monthlyNetCash: number;
  upfront: number;
  /** Cumulative position at the end of each month, starting at −upfront. */
  cumulative: number[];
  /** 1-based month the cumulative position first reaches ≥ 0, else null. */
  paybackMonth: number | null;
  horizonBenefits: number;
  horizonCosts: number;
  horizonNetBenefit: number;
  /** 100 × net ÷ total cost. null when cost is unknown or zero. */
  roiPercent: number | null;
  /** benefits ÷ cost. null when cost is unknown or zero. */
  benefitCostRatio: number | null;
  /** Reported beside the money, never inside it. */
  capacityHoursValuePerMonth: number;
  contributionPerMonth: number;
  scenarioPerMonth: number;
  flags: {
    costUnknown: boolean;
    noUpfrontInvestment: boolean;
    paybackNotReached: boolean;
    negativeAtHorizon: boolean;
    noBenefitsSelected: boolean;
  };
};

const byId = <T extends { id: string }>(items: T[]): T[] => {
  const seen = new Set<string>();
  return items.filter((i) => (seen.has(i.id) ? false : (seen.add(i.id), true)));
};

const round2 = (n: number) => Math.round(n * 100) / 100;

/** A capacity benefit counts as cash only when a mechanism is stated. */
export function countsAsCash(b: Benefit): boolean {
  if (b.kind === "cash") return true;
  if (b.kind === "capacity") return Boolean(b.cashMechanism && b.cashMechanism.trim());
  return false;
}

export function computeCase(input: CaseInput): CaseResult {
  const horizonMonths = Math.max(1, Math.round(input.horizonMonths));
  const benefits = byId(input.benefits);
  const costs = byId(input.costs);

  const sum = (ns: number[]) => ns.reduce((a, b) => a + b, 0);

  const monthlyCashBenefit = sum(
    benefits.filter(countsAsCash).map((b) => b.amountPerMonth)
  );
  const capacityHoursValuePerMonth = sum(
    benefits.filter((b) => b.kind === "capacity" && !countsAsCash(b)).map((b) => b.amountPerMonth)
  );
  const contributionPerMonth = sum(
    benefits.filter((b) => b.kind === "contribution").map((b) => b.amountPerMonth)
  );
  const scenarioPerMonth = sum(
    benefits.filter((b) => b.kind === "scenario").map((b) => b.amountPerMonth)
  );

  const monthlyCosts = costs.filter((c) => c.cadence === "monthly");
  const upfrontCosts = costs.filter((c) => c.cadence === "once");
  const costUnknown = costs.some((c) => c.amount === null);

  const monthlyOperatingCost = sum(monthlyCosts.map((c) => c.amount ?? 0));
  const upfront = sum(upfrontCosts.map((c) => c.amount ?? 0));

  const monthlyNetCash = monthlyCashBenefit - monthlyOperatingCost;

  const cumulative = Array.from({ length: horizonMonths }, (_, i) =>
    round2(-upfront + monthlyNetCash * (i + 1))
  );
  const paybackIndex = cumulative.findIndex((v) => v >= 0);

  const horizonBenefits = round2(monthlyCashBenefit * horizonMonths);
  const horizonCosts = round2(upfront + monthlyOperatingCost * horizonMonths);
  const horizonNetBenefit = round2(horizonBenefits - horizonCosts);

  // ROI is only meaningful against a known, non-zero cost.
  const costUsable = !costUnknown && horizonCosts > 0;
  const roiPercent = costUsable
    ? round2((100 * horizonNetBenefit) / horizonCosts)
    : null;
  const benefitCostRatio = costUsable
    ? round2(horizonBenefits / horizonCosts)
    : null;

  return {
    formulaVersion: FORMULA_VERSION,
    horizonMonths,
    monthlyCashBenefit: round2(monthlyCashBenefit),
    monthlyOperatingCost: round2(monthlyOperatingCost),
    monthlyNetCash: round2(monthlyNetCash),
    upfront: round2(upfront),
    cumulative,
    paybackMonth: paybackIndex === -1 ? null : paybackIndex + 1,
    horizonBenefits,
    horizonCosts,
    horizonNetBenefit,
    roiPercent,
    benefitCostRatio,
    capacityHoursValuePerMonth: round2(capacityHoursValuePerMonth),
    contributionPerMonth: round2(contributionPerMonth),
    scenarioPerMonth: round2(scenarioPerMonth),
    flags: {
      costUnknown,
      noUpfrontInvestment: upfront === 0,
      paybackNotReached: paybackIndex === -1,
      negativeAtHorizon: horizonNetBenefit < 0,
      noBenefitsSelected: benefits.length === 0,
    },
  };
}

/**
 * Affordability, not a price: the most you could spend and still break even
 * over the horizon, given the cash benefits you believe in.
 */
export function breakEvenBudget(
  monthlyCashBenefit: number,
  monthlyOperatingCost: number,
  horizonMonths: number
): number {
  return round2(
    Math.max(0, (monthlyCashBenefit - monthlyOperatingCost) * Math.max(1, horizonMonths))
  );
}

// ── Storage ──────────────────────────────────────────────────────────────────

export type StorageInput = {
  cameras: number;
  /** Measured or quoted recorded bitrate, per camera, in Mbps. */
  bitrateMbps: number;
  hoursPerDay: number;
  days: number;
  /** Fraction of a disk usable for recording, e.g. 0.8. 1 = no reserve. */
  usableFraction: number;
  /** Optional RAID overhead factor, kept separate from the reserve. */
  raidOverheadFactor?: number;
};

export type StorageResult = {
  formulaVersion: string;
  /** Recorded footage only, decimal TB (1 TB = 1000 GB). */
  recordedTB: number;
  recordedGB: number;
  /** recordedTB ÷ usableFraction — what to buy before RAID. */
  nominalTB: number;
  /** nominalTB × raidOverheadFactor, when one is given. */
  withRaidTB: number | null;
  perCameraPerDayGB: number;
};

export function computeStorage(i: StorageInput): StorageResult {
  const usable = i.usableFraction > 0 && i.usableFraction <= 1 ? i.usableFraction : 1;
  const bitsPerSecond = i.cameras * i.bitrateMbps * 1_000_000;
  const seconds = i.hoursPerDay * 3600 * i.days;
  const bytes = (bitsPerSecond * seconds) / 8;
  const recordedGB = bytes / 1_000_000_000;
  const recordedTB = recordedGB / 1000;
  const nominalTB = recordedTB / usable;
  const perCameraPerDayGB =
    i.cameras > 0 ? recordedGB / i.cameras / Math.max(1, i.days) : 0;
  return {
    formulaVersion: FORMULA_VERSION,
    recordedGB: round2(recordedGB),
    recordedTB: Math.round(recordedTB * 1000) / 1000,
    nominalTB: Math.round(nominalTB * 1000) / 1000,
    withRaidTB: i.raidOverheadFactor
      ? Math.round(nominalTB * i.raidOverheadFactor * 1000) / 1000
      : null,
    perCameraPerDayGB: round2(perCameraPerDayGB),
  };
}

// ── Bandwidth and transfer ───────────────────────────────────────────────────

export type BandwidthInput = {
  simultaneousStreams: number;
  bitrateMbps: number;
  /** Headroom for link sizing only, e.g. 0.3 for 30%. Never applied to data. */
  headroomFraction: number;
  hoursPerDay: number;
  days: number;
  /** Tariff the visitor was quoted, per GB. null = unknown. */
  tariffPerGB: number | null;
};

export type BandwidthResult = {
  formulaVersion: string;
  /** Actual traffic, used for both the link and the transferred data. */
  requiredMbps: number;
  /** Link size to buy, including headroom. */
  recommendedLinkMbps: number;
  transferredGB: number;
  transferCost: number | null;
  costUnknown: boolean;
};

export function computeBandwidth(i: BandwidthInput): BandwidthResult {
  const requiredMbps = i.simultaneousStreams * i.bitrateMbps;
  const headroom = Math.max(0, i.headroomFraction);
  const recommendedLinkMbps = requiredMbps * (1 + headroom);
  // Data transferred follows real traffic — the headroom is spare capacity,
  // not bytes, so applying it here would overstate every cloud bill.
  const seconds = i.hoursPerDay * 3600 * i.days;
  const transferredGB = (requiredMbps * 1_000_000 * seconds) / 8 / 1_000_000_000;
  const costUnknown = i.tariffPerGB === null;
  return {
    formulaVersion: FORMULA_VERSION,
    requiredMbps: round2(requiredMbps),
    recommendedLinkMbps: round2(recommendedLinkMbps),
    transferredGB: round2(transferredGB),
    transferCost: costUnknown ? null : round2(transferredGB * (i.tariffPerGB as number)),
    costUnknown,
  };
}

// ── Time released (investigations, admin, alarms) ────────────────────────────

export type TimeInput = {
  eventsPerMonth: number;
  minutesBefore: number;
  minutesAfter: number;
  /** Fully-loaded hourly cost. null = unknown. */
  hourlyCost: number | null;
  /** Stated mechanism by which released time becomes cash. Empty = none. */
  cashMechanism?: string;
};

export type TimeResult = {
  formulaVersion: string;
  hoursPerMonth: number;
  capacityValuePerMonth: number | null;
  /** Only when a mechanism was stated. Otherwise null — not zero, not cash. */
  cashSavingPerMonth: number | null;
  costUnknown: boolean;
};

export function computeTimeReleased(i: TimeInput): TimeResult {
  const delta = Math.max(0, i.minutesBefore - i.minutesAfter);
  const hoursPerMonth = (i.eventsPerMonth * delta) / 60;
  const costUnknown = i.hourlyCost === null;
  const capacityValuePerMonth = costUnknown
    ? null
    : round2(hoursPerMonth * (i.hourlyCost as number));
  const hasMechanism = Boolean(i.cashMechanism && i.cashMechanism.trim());
  return {
    formulaVersion: FORMULA_VERSION,
    hoursPerMonth: round2(hoursPerMonth),
    capacityValuePerMonth,
    cashSavingPerMonth: hasMechanism ? capacityValuePerMonth : null,
    costUnknown,
  };
}

// ── Retrofit vs replacement (like-for-like TCO) ──────────────────────────────

export type TcoOption = {
  id: string;
  label: string;
  upfront: number | null;
  monthlyOperating: number | null;
  /** Mid-life replacements expected inside the horizon. */
  replacementCost: number | null;
  /** Value recoverable at the end, if the visitor can actually realise it. */
  residualValue: number | null;
};

export type TcoResult = {
  formulaVersion: string;
  horizonMonths: number;
  options: {
    id: string;
    label: string;
    total: number | null;
    unknownFields: string[];
  }[];
  /** null when any compared option has an unknown, or when totals are equal. */
  cheaperOptionId: string | null;
  difference: number | null;
  equal: boolean;
  anyUnknown: boolean;
};

export function computeTco(options: TcoOption[], horizonMonths: number): TcoResult {
  const months = Math.max(1, Math.round(horizonMonths));
  const rows = options.map((o) => {
    const unknownFields = (
      [
        ["upfront", o.upfront],
        ["monthlyOperating", o.monthlyOperating],
        ["replacementCost", o.replacementCost],
        ["residualValue", o.residualValue],
      ] as const
    )
      .filter(([, v]) => v === null)
      .map(([k]) => k);
    const total =
      unknownFields.length > 0
        ? null
        : round2(
            (o.upfront as number) +
              (o.monthlyOperating as number) * months +
              (o.replacementCost as number) -
              (o.residualValue as number)
          );
    return { id: o.id, label: o.label, total, unknownFields };
  });

  const anyUnknown = rows.some((r) => r.total === null);
  const totals = rows.map((r) => r.total).filter((t): t is number => t !== null);
  const equal = totals.length > 1 && totals.every((t) => t === totals[0]);
  let cheaperOptionId: string | null = null;
  let difference: number | null = null;
  if (!anyUnknown && rows.length > 1 && !equal) {
    const sorted = [...rows].sort((a, b) => (a.total as number) - (b.total as number));
    cheaperOptionId = sorted[0].id;
    difference = round2((sorted[1].total as number) - (sorted[0].total as number));
  }

  return {
    formulaVersion: FORMULA_VERSION,
    horizonMonths: months,
    options: rows,
    cheaperOptionId,
    difference,
    equal,
    anyUnknown,
  };
}

// ── Electricity ──────────────────────────────────────────────────────────────

export type PowerInput = {
  /** Watts drawn by the whole system, for context. */
  systemWatts: number | null;
  /** Watts this project ADDS — the only figure that belongs in a project case. */
  incrementalWatts: number | null;
  hoursPerDay: number;
  days: number;
  tariffPerKWh: number | null;
};

export type PowerResult = {
  formulaVersion: string;
  systemKWh: number | null;
  incrementalKWh: number | null;
  systemCost: number | null;
  incrementalCost: number | null;
  costUnknown: boolean;
};

export function computePower(i: PowerInput): PowerResult {
  const hours = i.hoursPerDay * i.days;
  const kwh = (w: number | null) => (w === null ? null : round2((w * hours) / 1000));
  const systemKWh = kwh(i.systemWatts);
  const incrementalKWh = kwh(i.incrementalWatts);
  const costUnknown = i.tariffPerKWh === null;
  const cost = (k: number | null) =>
    k === null || costUnknown ? null : round2(k * (i.tariffPerKWh as number));
  return {
    formulaVersion: FORMULA_VERSION,
    systemKWh,
    incrementalKWh,
    systemCost: cost(systemKWh),
    incrementalCost: cost(incrementalKWh),
    costUnknown,
  };
}

// ── Formatting ───────────────────────────────────────────────────────────────

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (n: number): string => INR.format(Math.round(n));

/** "12.96 TB", "1,234 GB" — units are always visible next to a number. */
export const formatNumber = (n: number, digits = 2): string =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: digits }).format(n);

/** Percentage points are not percentages: kept explicit at the call site. */
export const formatPercent = (n: number, digits = 2): string =>
  `${formatNumber(n, digits)}%`;
