"use client";

import { useMemo, useState } from "react";

import { AssumptionNote, NumberField, Row } from "@/components/calc/fields";

/**
 * Shell for the single-answer calculators.
 *
 * Each tool supplies its fields and a pure `compute`; everything else — layout,
 * labels, units, "not known" handling, the results table — is shared, so eight
 * calculators do not become eight opportunities to drift from the modelling
 * contract. Numbers are typed directly; a slider only ever appears beside a
 * field, never instead of one.
 */

export type CalcField = {
  key: string;
  label: string;
  unit: string;
  initial: number | null;
  min?: number;
  max?: number;
  step?: number;
  allowUnknown?: boolean;
  hint?: string;
  slider?: boolean;
};

export type CalcToggle = { key: string; label: string; hint?: string; initial: boolean };

export type CalcOutput = { rows: { label: string; value: string; strong?: boolean }[]; note?: string };

export default function SimpleCalc({
  fields,
  toggles = [],
  compute,
  footnote,
  resultsTitle = "Result",
}: {
  fields: CalcField[];
  toggles?: CalcToggle[];
  compute: (values: Record<string, number | null>, toggles: Record<string, boolean>) => CalcOutput;
  footnote: string;
  resultsTitle?: string;
}) {
  const [values, setValues] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.initial]))
  );
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(toggles.map((t) => [t.key, t.initial]))
  );

  const out = useMemo(() => compute(values, flags), [compute, values, flags]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="card p-6 sm:p-7">
        <h2 className="text-[1.1rem] font-semibold">Your numbers</h2>
        <div className="mt-5 flex flex-col gap-4">
          {fields.map((f) => (
            <NumberField
              key={f.key}
              label={f.label}
              unit={f.unit}
              value={values[f.key]}
              onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
              min={f.min}
              max={f.max}
              step={f.step}
              hint={f.hint}
              allowUnknown={f.allowUnknown}
              slider={f.slider}
            />
          ))}
          {toggles.map((t) => (
            <label key={t.key} className="flex flex-col gap-1">
              <span className="flex items-start gap-2.5 text-[0.92rem] font-medium text-ink">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={flags[t.key]}
                  onChange={(e) => setFlags((s) => ({ ...s, [t.key]: e.target.checked }))}
                />
                {t.label}
              </span>
              {t.hint && <span className="pl-7 text-[0.82rem] text-ink-soft">{t.hint}</span>}
            </label>
          ))}
        </div>
      </div>

      <div className="card p-6 sm:p-7">
        <h2 className="text-[1.1rem] font-semibold">{resultsTitle}</h2>
        <div className="mt-4">
          {out.rows.map((r) => (
            <Row key={r.label} label={r.label} value={r.value} strong={r.strong} />
          ))}
        </div>
        {out.note && <AssumptionNote>{out.note}</AssumptionNote>}
        <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">{footnote}</p>
      </div>
    </div>
  );
}
