"use client";

import { useMemo, useState } from "react";

import { AssumptionNote, NumberField, Row } from "@/components/calc/fields";
import { FORMULA_VERSION, computeTco, formatINR } from "@/lib/calc/engine";

type Side = {
  upfront: number | null;
  monthly: number | null;
  replacement: number | null;
  residual: number | null;
};

const EMPTY: Side = { upfront: null, monthly: null, replacement: 0, residual: 0 };

/** Retrofit vs replacement over one horizon. Neither option wins by default. */
export default function TcoCalc() {
  const [months, setMonths] = useState<number | null>(36);
  const [a, setA] = useState<Side>(EMPTY);
  const [b, setB] = useState<Side>(EMPTY);

  const r = useMemo(
    () =>
      computeTco(
        [
          { id: "retrofit", label: "Retrofit existing cameras", upfront: a.upfront, monthlyOperating: a.monthly, replacementCost: a.replacement, residualValue: a.residual },
          { id: "replace", label: "Replace the system", upfront: b.upfront, monthlyOperating: b.monthly, replacementCost: b.replacement, residualValue: b.residual },
        ],
        months ?? 36
      ),
    [a, b, months]
  );

  const side = (
    title: string,
    s: Side,
    set: (s: Side) => void,
    hint: string
  ) => (
    <div className="card p-6 sm:p-7">
      <h2 className="text-[1.1rem] font-semibold">{title}</h2>
      <p className="mt-1.5 text-[0.88rem] text-ink-soft">{hint}</p>
      <div className="mt-5 flex flex-col gap-4">
        <NumberField label="Upfront" unit="₹" value={s.upfront} onChange={(v) => set({ ...s, upfront: v })} allowUnknown />
        <NumberField label="Monthly operating" unit="₹ per month" value={s.monthly} onChange={(v) => set({ ...s, monthly: v })} allowUnknown />
        <NumberField label="Replacements inside the horizon" unit="₹" value={s.replacement} onChange={(v) => set({ ...s, replacement: v })} allowUnknown hint="Cameras or recorders you expect to replace before the horizon ends." />
        <NumberField label="Residual value at the end" unit="₹" value={s.residual} onChange={(v) => set({ ...s, residual: v })} allowUnknown hint="Only if you could genuinely sell or redeploy it." />
      </div>
    </div>
  );

  const row = (id: string) => r.options.find((o) => o.id === id)!;

  return (
    <div className="flex flex-col gap-8">
      <div className="card p-6 sm:p-7">
        <NumberField label="Horizon to compare" unit="months" value={months} onChange={setMonths} min={12} max={120} slider hint="Both options must be judged over the same period, and must cover the same cameras and areas." />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {side("Retrofit existing cameras", a, setA, "Analytics on what you already own, plus any on-site processing hardware.")}
        {side("Replace the system", b, setB, "New cameras, cabling, recorder and storage, plus whatever runs on them.")}
      </div>

      <div className="card p-6 sm:p-7">
        <h2 className="text-[1.1rem] font-semibold">Total over {r.horizonMonths} months</h2>
        <div className="mt-4">
          <Row label="Retrofit" value={row("retrofit").total === null ? `Incomplete (${row("retrofit").unknownFields.length} unknown)` : formatINR(row("retrofit").total!)} strong />
          <Row label="Replace" value={row("replace").total === null ? `Incomplete (${row("replace").unknownFields.length} unknown)` : formatINR(row("replace").total!)} strong />
        </div>

        <p className="mt-5 text-[0.98rem] text-ink">
          {r.anyUnknown
            ? "One or more figures are not known yet, so no comparison is claimed. Fill both sides, or ask for the missing quotation."
            : r.equal
              ? "Both options cost the same over this horizon. Decide on coverage, disruption and lifespan instead."
              : `${r.cheaperOptionId === "retrofit" ? "Retrofit" : "Replacement"} is cheaper by ${formatINR(r.difference ?? 0)} over ${r.horizonMonths} months.`}
        </p>

        <AssumptionNote>
          Like-for-like only. If one option covers more cameras or areas than the other, this
          comparison is not valid. Retrofit does not automatically win: a cheap replacement with
          low running costs can beat it. Formula version {FORMULA_VERSION}.
        </AssumptionNote>
      </div>
    </div>
  );
}
