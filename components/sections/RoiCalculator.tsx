"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

/**
 * ROI Calculator — turns PGAK's two headline truths into a personal number:
 *   • Price: ₹1,000 / camera / month (see Pricing.tsx)
 *   • Outcome: a share of theft / loss prevented by AI deterrence
 *
 * Design notes / honest-math guardrails:
 *   - Every assumption is an editable input — nothing is a black box.
 *   - The loss figure is scoped to "the area these cameras cover", so camera
 *     count and loss stay logically linked instead of drifting apart.
 *   - Payback is expressed in *operating* days, chosen by facility type, so a
 *     5-day office and a 24/7 site don't share a misleading 30-day baseline.
 *   - ROI is rounded DOWN — we never inflate the return.
 *   - The CTA drives to a free audit (lead gen), not a promise to "lock in"
 *     an estimate.
 */
const PRICE_PER_CAMERA = 1000; // ₹ / camera / month

const FACILITIES = [
  { id: "247", label: "24/7 site (retail, warehouse, factory floor)", days: 30 },
  { id: "6day", label: "6-day business (shops, most retail)", days: 26 },
  { id: "5day", label: "5-day office (weekdays only)", days: 22 },
] as const;

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function RoiCalculator() {
  const [cameras, setCameras] = useState(10);
  const [monthlyLoss, setMonthlyLoss] = useState(50000);
  const [reduction, setReduction] = useState(55); // % of loss PGAK prevents
  const [facilityId, setFacilityId] = useState<string>("247");

  const operatingDays =
    FACILITIES.find((f) => f.id === facilityId)?.days ?? 30;

  const monthlyCost = cameras * PRICE_PER_CAMERA;
  const monthlySaved = Math.round((monthlyLoss * reduction) / 100);
  const netMonthly = monthlySaved - monthlyCost;
  const netAnnual = netMonthly * 12;
  // Round DOWN so we never overstate the return.
  const roi =
    monthlyCost > 0 ? Math.floor((netMonthly / monthlyCost) * 100) : 0;
  // Payback in operating days: how long the prevented loss takes to cover a
  // month's cost, at this facility's real working-day rate.
  const paybackDays =
    monthlySaved > 0
      ? Math.max(1, Math.ceil(monthlyCost / (monthlySaved / operatingDays)))
      : null;

  const profitable = netMonthly > 0;

  return (
    <section id="roi" className="sec">
      <div className="wrap">
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">ROI calculator</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            See what PGAK saves you.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            At ₹1,000 per camera a month, PGAK usually pays for itself with the
            very first prevented incident. Type your figures or drag the
            sliders.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[1000px] gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <Reveal className="card flex flex-col gap-7 p-8">
            <Field
              label="Number of cameras"
              value={cameras}
              min={1}
              max={200}
              step={1}
              onChange={setCameras}
            />
            <Field
              label="Theft / loss per month"
              value={monthlyLoss}
              min={0}
              max={1000000}
              step={5000}
              onChange={setMonthlyLoss}
              prefix="₹"
              hint="Count only the theft, shrinkage or loss in the area these cameras actually cover — that keeps the estimate realistic for your camera count."
            />
            <Field
              label="Loss PGAK helps prevent"
              value={reduction}
              min={10}
              max={95}
              step={5}
              onChange={setReduction}
              suffix="%"
              hint="Typical AI-driven deterrence. Set your own conservative figure."
            />

            <div>
              <label
                htmlFor="facility"
                className="mb-2 block text-[0.92rem] font-semibold text-ink"
              >
                Facility type
                <span className="ml-2 font-normal text-ink-faint">
                  ({operatingDays} operating days / month)
                </span>
              </label>
              <select
                id="facility"
                value={facilityId}
                onChange={(e) => setFacilityId(e.target.value)}
                className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-[0.92rem] text-ink outline-none transition-colors focus:border-accent"
              >
                {FACILITIES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal
            delay={0.08}
            className="flex flex-col justify-between gap-6 rounded-2xl border border-accent bg-gradient-to-b from-[#13332b] to-[#0c1a17] p-8"
          >
            <div className="text-center">
              <div className="text-[0.8rem] font-semibold uppercase tracking-wide text-ink-faint">
                {profitable ? "Your net saving" : "Your net position"}
              </div>
              <div
                className={`mt-2 font-display text-[clamp(2.4rem,6vw,3.4rem)] leading-none ${
                  profitable ? "text-accent" : "text-ink"
                }`}
              >
                {INR.format(Math.abs(netMonthly))}
                <span className="ml-1 font-sans text-[0.9rem] font-medium text-ink-faint">
                  / month
                </span>
              </div>
              <div className="mt-1 text-[0.85rem] text-ink-soft">
                {INR.format(Math.abs(netAnnual))} a year
                {profitable ? " kept in your pocket" : " shortfall"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Stat label="PGAK cost" value={`${INR.format(monthlyCost)}/mo`} />
              <Stat
                label="Loss prevented"
                value={`${INR.format(monthlySaved)}/mo`}
              />
              <Stat
                label="Return on cost"
                value={`${roi > 0 ? "+" : ""}${roi}%`}
                accent={profitable}
              />
              <Stat
                label="Pays for itself in"
                value={
                  paybackDays
                    ? `${paybackDays} op. day${paybackDays === 1 ? "" : "s"}`
                    : "—"
                }
              />
            </div>

            <a href="#audit" className="btn btn-primary w-full">
              Get your free site audit →
            </a>
          </Reveal>
        </div>

        <p className="mx-auto mt-7 max-w-[680px] text-center text-[0.8rem] text-ink-faint">
          Estimates only, based on the figures you enter, a ₹1,000/camera rate
          and {operatingDays} operating days a month. Actual results vary by
          site — a PGAK partner confirms real numbers during your free audit.
        </p>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[0.92rem] font-semibold text-ink">{label}</label>
        {/* Editable number box — clamps max while typing, min on blur, so
            precise values can be typed without the slider fighting back. */}
        <div className="flex items-center gap-1 rounded-lg border border-line bg-panel px-2.5 py-1 focus-within:border-accent">
          {prefix && <span className="text-[0.9rem] text-ink-faint">{prefix}</span>}
          <input
            type="text"
            inputMode="numeric"
            value={value.toLocaleString("en-IN")}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              if (raw === "") {
                onChange(min);
                return;
              }
              onChange(Math.min(max, Number(raw)));
            }}
            onBlur={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              onChange(Math.min(max, Math.max(min, Number(raw) || min)));
            }}
            className="w-[7ch] bg-transparent text-right font-display text-[1.15rem] text-accent outline-none"
            aria-label={label}
          />
          {suffix && <span className="text-[0.9rem] text-ink-faint">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent"
        aria-label={`${label} slider`}
      />
      {hint && <p className="mt-2 text-[0.76rem] text-ink-faint">{hint}</p>}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line/60 bg-black/20 px-4 py-3">
      <div className="text-[0.72rem] uppercase tracking-wide text-ink-faint">
        {label}
      </div>
      <div
        className={`mt-1 font-display text-[1.15rem] ${
          accent ? "text-accent" : "text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
