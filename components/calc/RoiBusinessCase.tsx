"use client";

import { useMemo, useState } from "react";

import CumulativeChart from "@/components/calc/CumulativeChart";
import { AssumptionNote, NumberField, Row } from "@/components/calc/fields";
import { trackConversion } from "@/lib/analytics";
import {
  FORMULA_VERSION,
  breakEvenBudget,
  computeCase,
  formatINR,
  formatPercent,
  type Benefit,
  type CostItem,
} from "@/lib/calc/engine";

/**
 * CCTV business case.
 *
 * Replaces the previous ROI calculator, which shipped hidden recovery rates
 * (0.4–0.85 of payroll drift, proxy-punching shares, guard-posting recovery)
 * and presented the result as though it came from the visitor's own numbers.
 * Here every rupee of benefit is a line the visitor types, labels and can
 * delete, and nothing is counted unless they switch it on.
 *
 * Other corrections carried over from that component:
 * - a benefit/cost multiple was labelled "Return"; ROI% and benefit/cost ratio
 *   are now separate, named figures
 * - upfront cost was hardcoded to zero; it is an input, and may be unknown
 * - a negative result hid the chart and nudged the visitor to raise benefits;
 *   the chart stays, and the nudge is gone
 * - a WhatsApp click fired Meta "Lead" valued at the hypothetical saving;
 *   nothing here reports a conversion or a money value to an ad platform
 * - scenario figures went to analytics; only the calculator id and formula
 *   version are sent now
 */

type BenefitLine = {
  id: string;
  label: string;
  kind: Benefit["kind"];
  amount: number;
  on: boolean;
  /** For capacity lines: how released time becomes money, if it does. */
  mechanism?: string;
  help: string;
};

const START: BenefitLine[] = [
  {
    id: "guard-posting",
    label: "Guard posting you could genuinely drop",
    kind: "cash",
    amount: 0,
    on: false,
    help: "Only if a specific posting would actually end. Fully-loaded monthly cost.",
  },
  {
    id: "documented-loss",
    label: "Documented monthly loss you expect to reduce",
    kind: "scenario",
    amount: 0,
    on: false,
    help: "Your own recorded loss at cost, times the improvement you believe in. A scenario, not a promise.",
  },
  {
    id: "admin-hours",
    label: "Admin and reconciliation time released (₹ value)",
    kind: "capacity",
    amount: 0,
    on: false,
    mechanism: "",
    help: "Hours × your hourly cost. Counted as cash only if you state how it becomes money.",
  },
  {
    id: "investigation-hours",
    label: "Investigation time released (₹ value)",
    kind: "capacity",
    amount: 0,
    on: false,
    mechanism: "",
    help: "Searching footage after an incident. Same rule: capacity first, cash only with a mechanism.",
  },
];

export default function RoiBusinessCase() {
  const [upfront, setUpfront] = useState<number | null>(null);
  const [monthlyCost, setMonthlyCost] = useState<number | null>(null);
  const [horizon, setHorizon] = useState<number | null>(12);
  const [lines, setLines] = useState<BenefitLine[]>(START);
  const [sample, setSample] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const benefits: Benefit[] = useMemo(
    () =>
      lines
        .filter((l) => l.on && l.amount > 0)
        .map((l) => ({
          id: l.id,
          label: l.label,
          amountPerMonth: l.amount,
          kind: l.kind,
          cashMechanism: l.mechanism,
        })),
    [lines]
  );

  const costs: CostItem[] = useMemo(
    () => [
      { id: "upfront", label: "Upfront (hardware, setup)", amount: upfront, cadence: "once" },
      { id: "monthly", label: "Monthly subscription and support", amount: monthlyCost, cadence: "monthly" },
    ],
    [upfront, monthlyCost]
  );

  const months = horizon && horizon > 0 ? horizon : 12;
  const result = useMemo(
    () => computeCase({ benefits, costs, horizonMonths: months }),
    [benefits, costs, months]
  );

  const budget = breakEvenBudget(result.monthlyCashBenefit, result.monthlyOperatingCost, months);

  function loadSample() {
    // Clearly-labelled hypothetical numbers, not PGAK's price list.
    setSample(true);
    setUpfront(30_000);
    setMonthlyCost(4_000);
    setHorizon(12);
    setLines((ls) =>
      ls.map((l) =>
        l.id === "guard-posting" ? { ...l, on: true, amount: 10_000 } : { ...l, on: false, amount: 0 }
      )
    );
  }

  function onPrint() {
    // Engagement, not a lead: no value, no scenario figures, no Meta event.
    trackConversion("calculator_print", {
      calculator_id: "roi",
      formula_version: FORMULA_VERSION,
    });
    window.print();
  }

  const update = (id: string, patch: Partial<BenefitLine>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* ── Inputs ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <div className="card p-6 sm:p-7">
          <h2 className="text-[1.1rem] font-semibold">What it costs you</h2>
          <p className="mt-1.5 text-[0.88rem] text-ink-soft">
            Use the figures on your quotation. PGAK does not publish a rate, so nothing is filled
            in for you.
          </p>
          <div className="mt-5 flex flex-col gap-4">
            <NumberField
              label="Upfront cost"
              unit="₹"
              value={upfront}
              onChange={setUpfront}
              allowUnknown
              hint="Processing hardware, setup, any cabling. Tick “Not known” if you have no quote yet."
            />
            <NumberField
              label="Monthly operating cost"
              unit="₹ per month"
              value={monthlyCost}
              onChange={setMonthlyCost}
              allowUnknown
              hint="Subscription, support, and any added connectivity or power you will actually pay."
            />
            <NumberField
              label="Horizon"
              unit="months"
              value={horizon}
              onChange={setHorizon}
              min={1}
              max={60}
              slider
              hint="The period you want judged. 12 months is a common starting point."
            />
          </div>
        </div>

        <div className="card p-6 sm:p-7">
          <h2 className="text-[1.1rem] font-semibold">What you expect back</h2>
          <p className="mt-1.5 text-[0.88rem] text-ink-soft">
            Switch on only what you can defend to your own finance team. Everything starts at zero.
          </p>
          <div className="mt-5 flex flex-col gap-5">
            {lines.map((l) => (
              <div key={l.id} className="border-b border-line pb-5 last:border-b-0 last:pb-0">
                <label className="flex items-start gap-2.5 text-[0.95rem] font-medium text-ink">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={l.on}
                    onChange={(e) => update(l.id, { on: e.target.checked })}
                  />
                  <span>
                    {l.label}
                    <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-[0.7rem] uppercase tracking-wide text-ink-soft">
                      {l.kind === "cash" ? "cash" : l.kind === "capacity" ? "capacity" : "scenario"}
                    </span>
                  </span>
                </label>
                {l.on && (
                  <div className="mt-3 flex flex-col gap-3 pl-7">
                    <NumberField
                      label="Amount"
                      unit="₹ per month"
                      value={l.amount}
                      onChange={(v) => update(l.id, { amount: v ?? 0 })}
                      hint={l.help}
                    />
                    {l.kind === "capacity" && (
                      <label className="flex flex-col gap-1.5 text-[0.88rem] text-ink">
                        How does this become money? (optional)
                        <input
                          type="text"
                          className="field-input"
                          placeholder="e.g. one night-shift contract not renewed"
                          value={l.mechanism ?? ""}
                          onChange={(e) => update(l.id, { mechanism: e.target.value })}
                        />
                        <span className="text-[0.82rem] text-ink-soft">
                          Left empty, these hours are reported as released capacity and kept out of
                          the cash result.
                        </span>
                      </label>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn btn-ghost" onClick={loadSample}>
              Load example numbers
            </button>
            {sample && (
              <span className="self-center text-[0.82rem] text-ink-soft">
                Example mode: hypothetical figures, not a PGAK quotation.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <div className="card p-6 sm:p-7">
          <h2 className="text-[1.1rem] font-semibold">Your position</h2>

          {result.flags.noBenefitsSelected && (
            <AssumptionNote>
              No benefits are switched on yet, so this shows cost only. That is the honest starting
              point — add a line above when you can justify it.
            </AssumptionNote>
          )}

          <div className="mt-4">
            <Row label="Cash benefits" value={`${formatINR(result.monthlyCashBenefit)} / month`} />
            <Row label="Operating cost" value={`${formatINR(result.monthlyOperatingCost)} / month`} />
            <Row
              label="Net cash"
              value={`${formatINR(result.monthlyNetCash)} / month`}
              strong
            />
            <Row label="Upfront" value={result.flags.costUnknown && upfront === null ? "Not known" : formatINR(result.upfront)} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[12px] border border-line p-4">
              <p className="text-[0.78rem] uppercase tracking-wide text-ink-soft">ROI over {months} months</p>
              <p className="mt-1 text-[1.5rem] font-semibold text-ink">
                {result.roiPercent === null ? "Incomplete" : formatPercent(result.roiPercent)}
              </p>
              <p className="mt-1 text-[0.82rem] text-ink-soft">
                {result.roiPercent === null
                  ? "A cost is unknown or zero, so a return cannot be stated."
                  : "100 × net benefit ÷ total cost."}
              </p>
            </div>
            <div className="rounded-[12px] border border-line p-4">
              <p className="text-[0.78rem] uppercase tracking-wide text-ink-soft">Benefit / cost ratio</p>
              <p className="mt-1 text-[1.5rem] font-semibold text-ink">
                {result.benefitCostRatio === null ? "—" : `${result.benefitCostRatio}×`}
              </p>
              <p className="mt-1 text-[0.82rem] text-ink-soft">
                Benefits ÷ cost. A different question from ROI%.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Row
              label="Payback"
              value={
                result.flags.noUpfrontInvestment && result.monthlyNetCash > 0
                  ? "No upfront investment entered"
                  : result.paybackMonth
                    ? `Month ${result.paybackMonth}`
                    : `Not reached within ${months} months`
              }
              strong
            />
            <Row label={`Net benefit over ${months} months`} value={formatINR(result.horizonNetBenefit)} />
            {result.capacityHoursValuePerMonth > 0 && (
              <Row
                label="Capacity released (not cash)"
                value={`${formatINR(result.capacityHoursValuePerMonth)} / month`}
              />
            )}
            {result.scenarioPerMonth > 0 && (
              <Row label="Scenario loss reduction (not cash)" value={`${formatINR(result.scenarioPerMonth)} / month`} />
            )}
          </div>

          {result.flags.negativeAtHorizon && (
            <AssumptionNote>
              On these numbers the case does not pay back over {months} months. That is a real
              answer, and it is shown in full below rather than hidden.
            </AssumptionNote>
          )}
        </div>

        <div className="card p-6 sm:p-7">
          <h2 className="text-[1.1rem] font-semibold">Month by month</h2>
          <CumulativeChart
            cumulative={result.cumulative}
            caption={`Cumulative cash position, starting at minus the upfront cost. Formula version ${FORMULA_VERSION}.`}
          />
        </div>

        <div className="card p-6 sm:p-7">
          <h2 className="text-[1.1rem] font-semibold">Break-even budget</h2>
          <p className="mt-2 text-[0.95rem] text-ink-soft">
            On the cash benefits you switched on, the most you could spend over {months} months and
            still break even is <strong className="text-ink">{formatINR(budget)}</strong>.
          </p>
          <AssumptionNote>
            This is an affordability ceiling, not PGAK&rsquo;s price, and not a discount you can
            ask for. A completed quotation does not make future savings certain.
          </AssumptionNote>

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="btn btn-ghost" onClick={onPrint}>
              Print or save as PDF
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowShare((s) => !s)}
              aria-expanded={showShare}
            >
              Ask PGAK to review this
            </button>
          </div>

          {showShare && (
            <div className="mt-5 rounded-[12px] border border-line p-4">
              <h3 className="text-[0.95rem] font-semibold">What would be shared</h3>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-[0.88rem] text-ink-soft">
                <li>Your contact details, entered on the enquiry form.</li>
                <li>
                  This summary: net cash {formatINR(result.monthlyNetCash)}/month, horizon {months}{" "}
                  months, ROI {result.roiPercent === null ? "incomplete" : formatPercent(result.roiPercent)}.
                </li>
                <li>Formula version {FORMULA_VERSION}, so the figures can be reproduced.</li>
              </ul>
              <p className="mt-3 text-[0.85rem] text-ink-soft">
                Nothing is sent until you submit the enquiry form, and your figures are never put
                into a shareable link.
              </p>
              <a href="/free-audit" data-cta="calculator-roi-review" className="btn btn-primary mt-4">
                Continue to the enquiry form →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
