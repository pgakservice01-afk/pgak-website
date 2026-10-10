/**
 * Pilot acceptance scorecard — the arithmetic behind /resources/evaluation-method.
 * Pure, no I/O (`npm run test:pilot`).
 *
 * The buyer writes the acceptance criteria BEFORE the test, then enters what a
 * manual ground-truth log recorded. Nothing here comes from PGAK: there is no
 * default threshold and no default result. A zero denominator is "not
 * measured", never 0% or 100%.
 */

export type ConditionRow = {
  label: string;
  /** Eligible events in the manual ground-truth log. */
  eligible: number;
  /** Alerts that matched an eligible event (one per event). */
  trueAlerts: number;
  /** Alerts where no eligible event occurred. */
  falseAlerts: number;
  /** Hours of observation for this condition. */
  hours: number;
  /** Event-to-receipt delays in seconds, from synchronised clocks. */
  delaysSeconds: number[];
};

export type Criteria = {
  minPrecision: number | null; // 0–1
  minRecall: number | null; // 0–1
  maxFalsePer24h: number | null;
  maxP90DelaySeconds: number | null;
};

export type Measure = { value: number | null; note?: string };

export type RowResult = {
  label: string;
  missed: number;
  precision: Measure;
  recall: Measure;
  falsePer24h: Measure;
  medianDelay: Measure;
  p90Delay: Measure;
  errors: string[];
  smallSample: boolean;
};

export type Verdict = "pass" | "fail" | "not measured" | "no criterion";

const NOT = (note: string): Measure => ({ value: null, note });

/** Nearest-rank percentile; deterministic and easy to check by hand. */
export function percentile(xs: number[], p: number): number | null {
  if (xs.length === 0) return null;
  const s = [...xs].sort((a, b) => a - b);
  const rank = Math.max(1, Math.ceil((p / 100) * s.length));
  return s[rank - 1];
}

export function scoreRow(r: ConditionRow): RowResult {
  const errors: string[] = [];
  for (const [k, v] of [
    ["eligible events", r.eligible],
    ["true alerts", r.trueAlerts],
    ["false alerts", r.falseAlerts],
    ["hours", r.hours],
  ] as const) {
    if (!Number.isFinite(v) || v < 0) errors.push(`${k} must be zero or more`);
  }
  if (r.trueAlerts > r.eligible)
    errors.push("true alerts cannot exceed eligible events — count one alert per real event");
  if (r.delaysSeconds.some((d) => !Number.isFinite(d) || d < 0))
    errors.push("delays must be zero or more seconds");

  const all = r.trueAlerts + r.falseAlerts;
  const r3 = (n: number) => Math.round(n * 1000) / 1000;
  const bad = errors.length > 0;
  return {
    label: r.label,
    missed: bad ? 0 : r.eligible - r.trueAlerts,
    precision: bad ? NOT("fix inputs") : all === 0 ? NOT("no alerts raised") : { value: r3(r.trueAlerts / all) },
    recall: bad ? NOT("fix inputs") : r.eligible === 0 ? NOT("no eligible events logged") : { value: r3(r.trueAlerts / r.eligible) },
    falsePer24h: bad ? NOT("fix inputs") : r.hours === 0 ? NOT("no observation hours") : { value: r3((r.falseAlerts / r.hours) * 24) },
    medianDelay: r.delaysSeconds.length ? { value: percentile(r.delaysSeconds, 50) } : NOT("no delays recorded"),
    p90Delay: r.delaysSeconds.length ? { value: percentile(r.delaysSeconds, 90) } : NOT("no delays recorded"),
    errors,
    // Below 20 real events a single miss moves recall by five points or more.
    smallSample: r.eligible > 0 && r.eligible < 20,
  };
}

function judge(m: Measure, limit: number | null, higherIsBetter: boolean): Verdict {
  if (limit === null) return "no criterion";
  if (m.value === null) return "not measured";
  return higherIsBetter ? (m.value >= limit ? "pass" : "fail") : m.value <= limit ? "pass" : "fail";
}

export function verdicts(row: RowResult, c: Criteria) {
  return {
    precision: judge(row.precision, c.minPrecision, true),
    recall: judge(row.recall, c.minRecall, true),
    falsePer24h: judge(row.falsePer24h, c.maxFalsePer24h, false),
    p90Delay: judge(row.p90Delay, c.maxP90DelaySeconds, false),
  };
}

/**
 * The whole pilot passes only if every condition was measured and passed
 * every criterion the buyer set. One unmeasured condition means "incomplete",
 * not "pass" — a night that was never tested has not been passed.
 */
export function overall(rows: RowResult[], c: Criteria): "pass" | "fail" | "incomplete" {
  let incomplete = false;
  for (const r of rows) {
    if (r.errors.length) return "incomplete";
    for (const v of Object.values(verdicts(r, c))) {
      if (v === "fail") return "fail";
      if (v === "not measured") incomplete = true;
    }
  }
  return incomplete || rows.length === 0 ? "incomplete" : "pass";
}

/** "12, 30,45" → [12, 30, 45]; anything unparseable becomes NaN so it is reported. */
export function parseDelays(text: string): number[] {
  return text
    .split(/[\s,;]+/)
    .filter(Boolean)
    .map((t) => Number(t));
}
