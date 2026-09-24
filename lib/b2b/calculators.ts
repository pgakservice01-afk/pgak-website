export type EconomicsInput = {
  monthlyCost: number | null;
  setupCost: number;
  cashSavings: number;
  hoursSaved: number;
  hourlyValue: number;
};
export function economics(v: EconomicsInput) {
  const known = [v.setupCost, v.cashSavings, v.hoursSaved, v.hourlyValue];
  if (
    known.some((n) => !Number.isFinite(n) || n < 0) ||
    (v.monthlyCost !== null &&
      (!Number.isFinite(v.monthlyCost) || v.monthlyCost < 0))
  )
    return { error: "Use finite, non-negative inputs." } as const;
  const productivity = v.hoursSaved * v.hourlyValue;
  if (v.monthlyCost === null) return { productivity, known: false } as const;
  const monthlyCash = v.cashSavings - v.monthlyCost;
  return {
    known: true,
    productivity,
    monthlyCash,
    yearOneCash: monthlyCash * 12 - v.setupCost,
    paybackMonths: monthlyCash > 0 ? v.setupCost / monthlyCash : null,
    justified: monthlyCash * 12 >= v.setupCost && monthlyCash > 0,
  } as const;
}
export function storageEstimate(cameras: number, mbps: number, days: number) {
  if (
    [cameras, mbps, days].some((x) => !Number.isFinite(x) || x < 0) ||
    !Number.isInteger(cameras)
  )
    return null;
  return {
    bandwidthMbps: cameras * mbps,
    decimalTB: (((cameras * mbps * 1e6) / 8) * 86400 * days) / 1e12,
  };
}
