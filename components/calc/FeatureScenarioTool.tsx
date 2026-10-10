"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { trackConversion } from "@/lib/analytics";
import { formatINR, formatNumber } from "@/lib/calc/engine";
import {
  SCENARIO_FORMULA_VERSION,
  finance,
  scenarioById,
  validate,
  type InputSpec,
  type ScenarioId,
} from "@/lib/calc/scenarios";

/**
 * The interactive half of a feature scenario. Everything runs in the browser;
 * nothing is sent anywhere unless the visitor chooses to copy a link, and that
 * link carries only the numbers on this form — never contact details.
 *
 * Inputs start empty. An empty field is "not entered", never zero; the worked
 * example is loaded only on request and is labelled as an example.
 */

type Values = Record<string, string>;

const PERCENT = (u: InputSpec["unit"]) => u === "fraction";

const UNIT_LABEL: Record<InputSpec["unit"], string> = {
  "count/month": "per month",
  "count/day": "per day",
  count: "number",
  minutes: "minutes",
  seconds: "seconds",
  "hours/month": "hours per month",
  "hours/day": "hours",
  "days/month": "days",
  months: "months",
  fraction: "%",
  INR: "₹",
  "INR/month": "₹ per month",
  "INR/kWh": "₹ per kWh",
  "INR/hour": "₹ per hour",
  W: "watts",
  "minutes/video-minute": "minutes per video minute",
};

const FINANCE_FIELDS = [
  { key: "hourly", label: "Loaded hourly cost of the staff whose time is released", unit: "₹ per hour", help: "Salary plus benefits and overheads, per working hour. Needed only if you enter a realisation above 0%." },
  { key: "realisation", label: "Realisation: share of released hours that becomes cash", unit: "%", help: "0% unless you can name the mechanism — overtime that stops, a post not refilled, a contract reduced." },
  { key: "evidenced", label: "Other cash change you can evidence (optional)", unit: "₹ per month", help: "Only from your own records. May be negative." },
  { key: "recurring", label: "Recurring incremental cost", unit: "₹ per month", help: "Licences, support, connectivity. Enter 0 if there is none." },
  { key: "setup", label: "One-off setup capital", unit: "₹", help: "Hardware, installation, commissioning. Enter 0 if there is none." },
] as const;

function readShared(id: ScenarioId): Values | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (params.get("scenario") !== id) return null;
  const out: Values = {};
  params.forEach((v, k) => {
    // Numbers only. Anything else in the URL is ignored, so a link cannot
    // smuggle text onto the page.
    if (k !== "scenario" && /^[a-zA-Z]{1,24}$/.test(k) && /^-?\d+(\.\d+)?$/.test(v)) out[k] = v;
  });
  return out;
}

export default function FeatureScenarioTool({ id }: { id: ScenarioId }) {
  const s = scenarioById(id)!;
  const uid = useId();
  const [vals, setVals] = useState<Values>({});
  const [fin, setFin] = useState<Values>({ realisation: "0", evidenced: "0" });
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const shared = readShared(id);
    if (shared) {
      const own: Values = {};
      const f: Values = { realisation: "0", evidenced: "0" };
      for (const [k, v] of Object.entries(shared)) {
        if (s.inputs.some((i) => i.key === k)) own[k] = v;
        else if (FINANCE_FIELDS.some((ff) => ff.key === k)) f[k] = v;
      }
      setVals(own);
      setFin(f);
      setTouched(true);
    }
  }, [id, s.inputs]);

  // Percent fields are typed as 0–100 and passed to the engine as 0–1.
  const toEngine = (spec: InputSpec, v: string | undefined) =>
    v === undefined || v.trim() === "" ? "" : PERCENT(spec.unit) ? String(Number(v) / 100) : v;

  const checked = useMemo(
    () => validate(s.inputs, Object.fromEntries(s.inputs.map((i) => [i.key, toEngine(i, vals[i.key])]))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vals, s.inputs],
  );
  const out = checked.ok ? s.compute(checked.values) : null;

  const num = (v: string | undefined) => (v === undefined || v.trim() === "" ? null : Number(v));
  const finErrors: Record<string, string> = {};
  for (const f of FINANCE_FIELDS) {
    const n = num(fin[f.key]);
    if (n === null) continue;
    if (!Number.isFinite(n)) finErrors[f.key] = "Enter a number.";
    else if (f.key !== "evidenced" && n < 0) finErrors[f.key] = "Cannot be negative.";
    else if (f.key === "realisation" && n > 100) finErrors[f.key] = "Must be between 0% and 100%.";
  }

  const usesFinance = s.kind === "labour" || s.kind === "cash" || s.kind === "energy";
  const hasHours = s.kind === "labour" || s.id === "C27";
  const money =
    out && usesFinance && Object.keys(finErrors).length === 0
      ? finance({
          hoursPerMonth: out.hoursPerMonth ?? 0,
          loadedHourlyCost: num(fin.hourly),
          realisation: (num(fin.realisation) ?? 0) / 100,
          modelCashPerMonth: out.cashPerMonth ?? 0,
          evidencedCashDelta: num(fin.evidenced) ?? 0,
          recurringCost: num(fin.recurring),
          setupCapital: num(fin.setup),
        })
      : null;

  useEffect(() => {
    if (out && touched) {
      trackConversion("calculator_result", { calculator_id: id });
      // Remember which scenario the visitor worked through, so an enquiry
      // later in the visit carries it (lib/attribution.ts). An id, never
      // the numbers or anything personal.
      try {
        sessionStorage.setItem("pgak-context", JSON.stringify({ calculatorId: id }));
      } catch {}
    }
    // Once per valid set of inputs is plenty; the id is not personal data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.ok]);

  function loadExample() {
    const v: Values = {};
    for (const spec of s.inputs) {
      const n = s.example.inputs[spec.key];
      v[spec.key] = PERCENT(spec.unit) ? String(Math.round(n * 10000) / 100) : String(n);
    }
    setVals(v);
    setTouched(true);
  }

  function shareLink() {
    const p = new URLSearchParams({ scenario: id });
    for (const [k, v] of Object.entries(vals)) if (v.trim()) p.set(k, v.trim());
    for (const [k, v] of Object.entries(fin)) if (v.trim()) p.set(k, v.trim());
    const url = `${window.location.origin}${window.location.pathname}?${p.toString()}#scenario-${id}`;
    navigator.clipboard?.writeText(url).then(
      () => setCopied("Link copied. It contains only the numbers above."),
      () => setCopied(url),
    );
    trackConversion("calculator_share", { calculator_id: id });
  }

  function downloadCsv() {
    // Only the numbers on this form and the results; no contact details exist
    // on this page to leak. Generated in the browser — nothing is uploaded.
    const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines: unknown[][] = [
      ["PGAK calculator scenario", `${id} ${s.feature}`],
      ["Formula", s.formula],
      ["Formula version", SCENARIO_FORMULA_VERSION],
      ["Generated", new Date().toISOString().slice(0, 10)],
      [],
      ["Input", "Value", "Unit"],
      ...s.inputs.map((i) => [i.label, vals[i.key] ?? "", UNIT_LABEL[i.unit]]),
      ...FINANCE_FIELDS.map((f) => [f.label, fin[f.key] ?? "", f.unit]),
      [],
      ["Result", "Value"],
      ...Object.entries(out ?? {}).map(([k, v]) => [k, v]),
      ...(money
        ? [
            ["monthlyCashEquivalent", money.monthlyCashEquivalent],
            ["monthlyNet", money.monthlyNet],
            ["firstYearNet", money.firstYearNet],
            ["paybackMonths", money.paybackMonths ?? "not applicable"],
            ["firstYearRoi", money.firstYearRoi ?? "not applicable"],
          ]
        : []),
      [],
      ["Notes", s.guardrails.join(" ")],
      ["Evidence status", s.proofStatus],
      ["Tax", "Amounts entered on one basis; no GST added or removed. Nominal rupees, not discounted."],
    ];
    const blob = new Blob([lines.map((l) => l.map(q).join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `pgak-${id.toLowerCase()}-assumptions.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    trackConversion("calculator_export", { calculator_id: id });
  }

  const hrs = (n: number | null | undefined) =>
    n === null || n === undefined ? "—" : `${formatNumber(n, 2)} hours / month`;
  const inr = (n: number | null | undefined, suffix = " / month") =>
    n === null || n === undefined ? "—" : `${formatINR(n)}${suffix}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <form
        className="card p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-describedby={`${uid}-note`}
      >
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-ghost text-[0.88rem]" onClick={loadExample}>
            Load worked example
          </button>
          <button
            type="button"
            className="btn btn-ghost text-[0.88rem]"
            onClick={() => {
              setVals({});
              setFin({ realisation: "0", evidenced: "0" });
              setCopied("");
            }}
          >
            Clear
          </button>
        </div>
        <p id={`${uid}-note`} className="mt-3 text-[0.85rem] text-ink-soft">
          Fields start empty. A blank is &ldquo;not entered&rdquo;, not zero; type 0 where 0 is true.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {s.inputs.map((spec) => (
            <Field
              key={spec.key}
              id={`${uid}-${spec.key}`}
              label={spec.label}
              unit={UNIT_LABEL[spec.unit]}
              help={spec.help}
              value={vals[spec.key] ?? ""}
              error={touched && !checked.ok ? checked.errors[spec.key] : undefined}
              onChange={(v) => {
                setVals((o) => ({ ...o, [spec.key]: v }));
                setTouched(true);
              }}
            />
          ))}
        </div>

        {usesFinance && (
          <fieldset className="mt-6 border-t border-line pt-5">
            <legend className="text-[0.95rem] font-semibold">Money (optional)</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {FINANCE_FIELDS.filter((f) => hasHours || (f.key !== "hourly" && f.key !== "realisation")).map((f) => (
                <Field
                  key={f.key}
                  id={`${uid}-f-${f.key}`}
                  label={f.label}
                  unit={f.unit}
                  help={f.help}
                  value={fin[f.key] ?? ""}
                  error={finErrors[f.key]}
                  onChange={(v) => setFin((o) => ({ ...o, [f.key]: v }))}
                />
              ))}
            </div>
            <p className="mt-3 text-[0.82rem] text-ink-soft">
              Enter every amount on the same basis — all including GST or all excluding it. Nothing
              here adds or removes tax. Values are nominal rupees, not discounted.
            </p>
          </fieldset>
        )}
      </form>

      <div className="card p-5 sm:p-6" aria-live="polite">
        <h3 className="text-[1.05rem] font-semibold">Result</h3>
        {!out && (
          <p className="mt-3 text-[0.92rem] text-ink-soft">
            Enter your own figures, or load the worked example, to see the result.
          </p>
        )}
        {out && (
          <dl className="mt-3">
            {out.hoursPerMonth !== undefined && (
              <Row label="Staff time released" value={hrs(out.hoursPerMonth)} strong />
            )}
            {out.kwhPerMonth !== undefined && (
              <Row label="Energy difference" value={`${formatNumber(out.kwhPerMonth, 1)} kWh / month`} strong />
            )}
            {out.cashPerMonth !== undefined && (
              <Row label="Cash difference computed by the model" value={inr(out.cashPerMonth)} strong />
            )}
            {out.contributionPerMonth !== undefined && (
              <Row
                label="Contribution scenario (not cash)"
                value={inr(out.contributionPerMonth)}
                strong
              />
            )}
            {out.monthlyDelta !== undefined && (
              <Row label="Monthly difference" value={inr(out.monthlyDelta)} />
            )}
            {out.termDelta !== undefined && (
              <Row label="Difference over the term" value={inr(out.termDelta, "")} strong />
            )}
            {money && (
              <>
                {out.hoursPerMonth !== undefined && (
                  <Row
                    label="Value of those hours if all became cash"
                    value={money.hoursValueAtFullRealisation === null ? "Hourly cost not entered" : inr(money.hoursValueAtFullRealisation)}
                  />
                )}
                <Row label="Monthly cash equivalent" value={inr(money.monthlyCashEquivalent)} />
                <Row label="Monthly net after recurring cost" value={inr(money.monthlyNet)} strong />
                <Row label="First-year net" value={inr(money.firstYearNet, "")} />
                <Row
                  label="Payback"
                  value={money.paybackMonths === null ? "Not applicable" : `${formatNumber(money.paybackMonths, 1)} months`}
                />
                <Row
                  label="First-year ROI"
                  value={money.firstYearRoi === null ? "Not applicable" : `${formatNumber(money.firstYearRoi * 100, 1)}%`}
                />
              </>
            )}
          </dl>
        )}
        {money && (money.paybackNote || money.roiNote || money.incomplete.length > 0) && (
          <ul className="mt-3 list-disc pl-5 text-[0.85rem] text-ink-soft">
            {money.incomplete.map((m) => (
              <li key={m}>{m}</li>
            ))}
            {money.paybackMonths === null && money.paybackNote && <li>Payback: {money.paybackNote}</li>}
            {money.firstYearRoi === null && money.roiNote && <li>ROI: {money.roiNote}</li>}
          </ul>
        )}
        {out && (
          <div className="mt-5 flex flex-wrap gap-2 print:hidden">
            <button type="button" className="btn btn-ghost text-[0.88rem]" onClick={() => window.print()}>
              Print
            </button>
            <button type="button" className="btn btn-ghost text-[0.88rem]" onClick={shareLink}>
              Copy a link with these numbers
            </button>
            <button type="button" className="btn btn-ghost text-[0.88rem]" onClick={downloadCsv}>
              Download as CSV
            </button>
          </div>
        )}
        {copied && <p className="mt-2 break-all text-[0.82rem] text-ink-soft">{copied}</p>}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  unit,
  help,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  help?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.88rem] font-medium text-ink">
        {label} <span className="text-ink-soft">({unit})</span>
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        className="field-input w-full"
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={[help ? `${id}-h` : "", error ? `${id}-e` : ""].filter(Boolean).join(" ") || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {help && (
        <p id={`${id}-h`} className="text-[0.8rem] text-ink-soft">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-e`} role="alert" className="text-[0.8rem] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0">
      <dt className="text-[0.88rem] text-ink-soft">{label}</dt>
      <dd className={strong ? "text-right text-[1.02rem] font-semibold text-ink" : "text-right text-[0.92rem] text-ink"}>
        {value}
      </dd>
    </div>
  );
}
