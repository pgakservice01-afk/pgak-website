"use client";

import { useMemo, useState } from "react";
import { fbTrack } from "@/lib/fbpixel";
import { trackConversion } from "@/lib/analytics";
import { BUSINESS } from "@/lib/seo";

/**
 * ROI calculator.
 *
 * A customer enters their own numbers and sees what PGAK gives back per month,
 * the month they break even, and what they keep in year one. Everything runs in
 * the browser — nothing reaches us until they press the WhatsApp button.
 *
 * ── The one rule for editing this file ──────────────────────────────────────
 * If you can't defend a number in front of a customer, lower it. An ROI page
 * that over-promises loses the deal twice: once when they don't believe it, and
 * again when they do and it doesn't happen.
 *
 * Everything the calculator believes lives in `A` below. You should never need
 * to touch the math or the layout to change what it claims.
 *
 * ── Reference figures ───────────────────────────────────────────────────────
 * Default sliders, no guard postings, attendance on. If you edit `A` these
 * change — that's the point. Use them to spot an edit that broke something
 * rather than tuned it.
 *
 *   CAREFUL          Recovered    Cost      Return   Year 1
 *   Factory          ₹30,590      ₹16,000   1.9×     ₹1.75 L
 *   Warehouse        ₹17,003      ₹10,000   1.7×     ₹0.84 L
 *   Shop             ₹5,280       ₹4,000    1.3×     ₹0.15 L
 *   Office           ₹22,955      ₹12,000   1.9×     ₹1.31 L
 *   School           ₹22,054      ₹14,000   1.5×     ₹0.97 L
 *   Hotel            ₹13,061      ₹12,000   1.0×     ₹0.13 L
 *
 *   Careful spans 1.0×–1.9×; Likely spans 2.2×–4.0×.
 *
 * Sanity check that matters as much as the table: 1 staff, 1 camera, zero
 * stated loss must produce the honest "doesn't pay for itself yet" state.
 * If it doesn't, some line has acquired a floor that doesn't scale with site
 * size, and the page has quietly stopped being able to say no.
 *
 * GUARDRAIL: if a change pushes Careful above roughly 4× for a normal site,
 * something has drifted — go back and look. The usual culprit is
 * `lateMinutesPerDay`, which multiplies against the entire wage bill and so
 * quietly dominates every white-collar segment.
 */

// ─────────────────────────────────────────────────────────────── assumptions
const A = {
  // ══ What counts as a saving ══════════════════════════════════════════════
  // Two numbers per setting: Careful and Likely. Careful loads by default,
  // on purpose.

  /**
   * Minutes per employee per day lost to loose gate timing before automation.
   * Kept low deliberately: this line multiplies against the whole wage bill, so
   * it dominates the result on any white-collar site. At 8 minutes and 40%
   * recovery we are claiming 0.67% of payroll on Careful — a number you can say
   * out loud. Raising it past ~10 minutes pushes office ROI above 4×, which the
   * guardrail below says is drift, not tuning.
   */
  lateMinutesPerDay: 8,
  /** Share of that drift a site realistically claws back. */
  timeRecovery: { careful: 0.4, likely: 0.65 },

  /** Payroll lost to proxy ("buddy") punching, as a share of total payroll. */
  proxyPayrollShare: { careful: 0.004, likely: 0.012 },

  /** Share of the customer's OWN stated monthly loss that we count. */
  lossRecovery: { careful: 0.15, likely: 0.3 },

  admin: {
    /**
     * Hours a month spent hunting through footage, per camera. Scales with
     * camera count rather than being a flat floor — a flat baseline claimed
     * real savings on a one-camera site and, worse, kept the honest
     * "doesn't pay for itself yet" state from ever appearing.
     */
    hoursPerCamera: 0.4,
    /** Extra hours a month per employee — registers, payroll reconciliation. */
    hoursPerStaff: 0.05,
    /** Loaded cost of an admin hour. */
    hourlyCost: 250,
    /** Share of those hours actually recovered. */
    recovery: { careful: 0.5, likely: 0.8 },
  },

  /** Fully-loaded monthly cost of one guard posting the site could drop. */
  guardMonthlyCost: 18000,
  /** Share of that cost genuinely saved — rarely 100%, cover is still needed. */
  guardRecovery: { careful: 0.5, likely: 0.85 },

  /** Hours in a paid working day, for converting late minutes into money. */
  workingHoursPerDay: 8,

  // ══ What PGAK costs ══════════════════════════════════════════════════════
  // Matches the published rate on /pricing. If that page changes, change this.
  /** ₹ per camera per month. One rate, all features, every industry. */
  pricePerCamera: 1000,
  /**
   * One-time setup & survey. Zero because /pricing promises "no hidden fees".
   * If a setup charge is ever introduced, put it here — the payback chart will
   * show the catch-up period automatically.
   */
  installOneTime: 0,
} as const;

type Mode = "careful" | "likely";

// ───────────────────────────────────────────────────────────────── segments
// Where the sliders start when someone taps a chip, plus the wording of the
// loss slider — a jeweller loses "stock", a hotel loses "billing".
type Segment = {
  id: string;
  label: string;
  staff: number;
  salary: number;
  cameras: number;
  loss: number;
  lossLabel: string;
  lossHelp: string;
};

const SEGMENTS: Segment[] = [
  {
    id: "factory",
    label: "Factory",
    staff: 120,
    salary: 18000,
    cameras: 16,
    loss: 40000,
    lossLabel: "Material & tool loss a month",
    lossHelp: "Raw material, tools and scrap that leave without paperwork.",
  },
  {
    id: "warehouse",
    label: "Warehouse",
    staff: 40,
    salary: 17000,
    cameras: 10,
    loss: 60000,
    lossLabel: "Stock shrinkage a month",
    lossHelp: "The gap between the system count and the physical count.",
  },
  {
    id: "shop",
    label: "Shop / Retail",
    staff: 8,
    salary: 15000,
    // Most single-unit shops run 4 cameras: till, door, high-value shelf,
    // stock room. Six was a mid-size store and made the default look marginal.
    cameras: 4,
    loss: 25000,
    lossLabel: "Stock & till loss a month",
    lossHelp: "Shoplifting, till shortfalls and unexplained stock gaps.",
  },
  {
    id: "office",
    label: "Office",
    staff: 60,
    salary: 32000,
    // A 60-person office realistically covers reception, both floors, the
    // server room and the car park — 8 was too few and inflated the ratio.
    cameras: 12,
    loss: 10000,
    lossLabel: "Equipment loss a month",
    lossHelp: "Laptops, peripherals and consumables that go missing.",
  },
  {
    id: "school",
    label: "School",
    staff: 70,
    salary: 25000,
    cameras: 14,
    loss: 15000,
    lossLabel: "Equipment & fittings loss a month",
    lossHelp: "Electronics, copper and lab equipment — mostly out of hours.",
  },
  {
    id: "hotel",
    label: "Hotel",
    staff: 45,
    salary: 16000,
    cameras: 12,
    loss: 30000,
    lossLabel: "Billing & stores loss a month",
    lossHelp: "Unbilled covers, F&B stores and housekeeping consumables.",
  },
];

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const money = (n: number) => INR.format(Math.round(n));

/** ₹3,34,000 → "₹3.34 L". Used for the year-one headline only. */
function lakh(n: number) {
  if (Math.abs(n) < 100000) return money(n);
  return `₹${(n / 100000).toFixed(2)} L`;
}

const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;

// ──────────────────────────────────────────────────────────────── component
export default function RoiCalculator() {
  const [segId, setSegId] = useState(SEGMENTS[0].id);
  const seg = SEGMENTS.find((s) => s.id === segId) ?? SEGMENTS[0];

  const [staff, setStaff] = useState(seg.staff);
  const [salary, setSalary] = useState(seg.salary);
  const [cameras, setCameras] = useState(seg.cameras);
  const [loss, setLoss] = useState(seg.loss);
  const [guards, setGuards] = useState(0);
  const [attendance, setAttendance] = useState(true);
  const [mode, setMode] = useState<Mode>("careful");
  /** Overridable so a customer holding a real quote sees THEIR ROI, not ours. */
  const [pricePerCamera, setPricePerCamera] = useState<number>(A.pricePerCamera);

  function pickSegment(s: Segment) {
    setSegId(s.id);
    setStaff(s.staff);
    setSalary(s.salary);
    setCameras(s.cameras);
    setLoss(s.loss);
  }

  const r = useMemo(() => {
    const timeRecovery = A.timeRecovery[mode];
    const proxyShare = A.proxyPayrollShare[mode];
    const lossRecovery = A.lossRecovery[mode];
    const adminRecovery = A.admin.recovery[mode];
    const guardRecovery = A.guardRecovery[mode];

    const payroll = staff * salary;

    // Late-arrival drift, converted from minutes into a share of a paid day.
    const dayFraction = A.lateMinutesPerDay / (A.workingHoursPerDay * 60);
    const timeSaving = attendance ? payroll * dayFraction * timeRecovery : 0;

    // Proxy punching — a face can't be handed to a colleague at the gate.
    const proxySaving = attendance ? payroll * proxyShare : 0;

    // The customer's own stated loss, discounted hard.
    const lossSaving = loss * lossRecovery;

    // Admin time: registers, payroll reconciliation, hunting through footage.
    const adminHours =
      cameras * A.admin.hoursPerCamera + staff * A.admin.hoursPerStaff;
    const adminSaving = adminHours * A.admin.hourlyCost * adminRecovery;

    // Guard postings the site could genuinely drop.
    const guardSaving = guards * A.guardMonthlyCost * guardRecovery;

    const recovered =
      timeSaving + proxySaving + lossSaving + adminSaving + guardSaving;

    const monthlyCost = cameras * pricePerCamera;
    const net = recovered - monthlyCost;

    // Cumulative position at the end of each month, after one-time setup.
    const months = Array.from(
      { length: 12 },
      (_, i) => net * (i + 1) - A.installOneTime
    );
    const paybackIdx = months.findIndex((v) => v >= 0);

    return {
      timeSaving,
      proxySaving,
      lossSaving,
      adminSaving,
      guardSaving,
      adminHours,
      recovered,
      monthlyCost,
      net,
      months,
      // Rounded DOWN — we never inflate the return.
      multiple:
        monthlyCost > 0 ? Math.floor((recovered / monthlyCost) * 10) / 10 : 0,
      paybackMonth: paybackIdx === -1 ? null : paybackIdx + 1,
      yearOne: net * 12 - A.installOneTime,
      profitable: net > 0,
      rates: {
        timeRecovery,
        proxyShare,
        lossRecovery,
        adminRecovery,
        guardRecovery,
      },
    };
  }, [staff, salary, cameras, loss, guards, attendance, mode, pricePerCamera]);

  // What to nudge next when the numbers don't work yet.
  const nextLever = !attendance
    ? "Tick “Include CCTV attendance” — on any site with staff that is usually the single biggest line."
    : guards === 0
      ? "If a guard posting exists purely to watch screens, add it to the guard slider — automation is what makes that posting droppable."
      : "Try the loss slider. Most sites underestimate what they quietly write off each month.";

  const waHref = useMemo(() => {
    const msg =
      `Hi PGAK! I used the ROI calculator on pgak.co.in for my ${seg.label.toLowerCase()} — ` +
      `${staff} staff, ${cameras} cameras. It estimated about ${money(r.recovered)}/month ` +
      `recovered against ${money(r.monthlyCost)}/month for PGAK ` +
      `(${r.multiple}× return${r.paybackMonth ? `, paid back in month ${r.paybackMonth}` : ""}). ` +
      `Please run the free audit on my cameras and send me an exact quote.`;
    return `https://wa.me/${BUSINESS.phoneE164.replace("+", "")}?text=${encodeURIComponent(msg)}`;
  }, [seg.label, staff, cameras, r]);

  function onSend() {
    // Value the lead by its monthly net, so ad spend optimises toward people
    // whose numbers actually work rather than toward raw clicks.
    fbTrack("Lead", {
      content_name: "ROI calculator",
      value: Math.max(0, Math.round(r.net)),
      currency: "INR",
    });
    trackConversion("roi_whatsapp_send", {
      segment: seg.id,
      staff,
      cameras,
      monthly_net: Math.round(r.net),
      mode,
    });
  }

  const maxBar = Math.max(...r.months.map((m) => Math.abs(m)), 1);

  return (
    <section id="roi" className="sec">
      <div className="wrap">
        {/* ─────────────────────────────────────────── business type chips */}
        <div className="mx-auto max-w-[780px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Your numbers</span>
          <h2 className="display mt-4 text-[clamp(1.9rem,4vw,2.8rem)]">
            What would PGAK actually give back?
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1.02rem] text-ink-soft">
            Put in your own numbers. Everything runs in your browser — nothing
            reaches us until you press the WhatsApp button.
          </p>
        </div>

        <div
          role="group"
          aria-label="Business type"
          className="mx-auto mt-9 flex max-w-[820px] flex-wrap justify-center gap-2.5"
        >
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => pickSegment(s)}
              aria-pressed={s.id === segId}
              className={`rounded-full border px-4 py-2 text-[0.9rem] transition-all ${
                s.id === segId
                  ? "border-accent bg-accent text-[#04201a]"
                  : "border-line text-ink-soft hover:border-accent/40 hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-11 grid gap-7 lg:grid-cols-[1fr_1.05fr]">
          {/* ───────────────────────────────────────────────────── inputs */}
          <div className="card p-7 sm:p-8">
            <Slider
              label="People on the payroll"
              value={staff}
              min={1}
              max={1000}
              step={1}
              onChange={setStaff}
              format={(v) => `${v}`}
            />
            <Slider
              label="Average salary a month"
              value={salary}
              min={8000}
              max={80000}
              step={1000}
              onChange={setSalary}
              format={money}
            />
            <Slider
              label="Cameras you want made intelligent"
              value={cameras}
              min={1}
              max={150}
              step={1}
              onChange={setCameras}
              format={(v) => `${v}`}
            />
            <Slider
              label={seg.lossLabel}
              help={seg.lossHelp}
              value={loss}
              min={0}
              max={500000}
              step={5000}
              onChange={setLoss}
              format={money}
            />
            <Slider
              label="Guard postings you could drop"
              help="Only count a posting that exists purely to watch, not to intervene."
              value={guards}
              min={0}
              max={6}
              step={1}
              onChange={setGuards}
              format={(v) => (v === 0 ? "None" : `${v}`)}
            />

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-[0.94rem] text-ink-soft">
              <input
                type="checkbox"
                checked={attendance}
                onChange={(e) => setAttendance(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#7cf5c4]"
              />
              <span>
                Include CCTV attendance
                <span className="block text-[0.84rem] text-ink-faint">
                  Face recognition at the gate replaces the punch machine. No
                  extra charge — it&rsquo;s part of the same per-camera rate.
                </span>
              </span>
            </label>

            {/* Careful / Likely */}
            <div className="mt-7 border-t border-line pt-6">
              <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
                How optimistic should this be?
              </p>
              <div className="mt-3 flex gap-2">
                {(["careful", "likely"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-[0.9rem] capitalize transition-all ${
                      mode === m
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-line text-ink-soft hover:text-ink"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="mt-2.5 text-[0.84rem] text-ink-faint">
                {mode === "careful"
                  ? "Conservative throughout. This is what loads by default, deliberately."
                  : "What a well-tuned site typically reaches after the first month."}
              </p>
            </div>

            {/* Fine-tune */}
            <details className="mt-6 border-t border-line pt-5">
              <summary className="cursor-pointer text-[0.9rem] text-accent">
                Fine-tune the assumptions
              </summary>
              <div className="mt-4">
                <Slider
                  label="Your quoted price per camera a month"
                  help="Holding a real quote? Type it in and the ROI shown becomes yours, not ours."
                  value={pricePerCamera}
                  min={200}
                  max={3000}
                  step={50}
                  onChange={setPricePerCamera}
                  format={money}
                />
                {pricePerCamera !== A.pricePerCamera && (
                  <button
                    type="button"
                    onClick={() => setPricePerCamera(A.pricePerCamera)}
                    className="text-[0.84rem] text-ink-faint underline underline-offset-4 hover:text-accent"
                  >
                    Reset to the published {money(A.pricePerCamera)} rate
                  </button>
                )}
              </div>
            </details>
          </div>

          {/* ──────────────────────────────────────────────────── results */}
          <div className="flex flex-col gap-5">
            {r.profitable ? (
              <>
                <div className="card p-7 sm:p-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Stat
                      label="Recovered a month"
                      value={money(r.recovered)}
                      accent
                    />
                    <Stat label="PGAK a month" value={money(r.monthlyCost)} />
                    <Stat label="Return" value={`${r.multiple}×`} accent />
                    <Stat
                      label="Pays for itself"
                      value={`Month ${r.paybackMonth}`}
                    />
                  </div>

                  <div className="mt-7 rounded-[16px] border border-accent/25 bg-accent/[0.07] p-5">
                    <p className="text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
                      Kept in year one
                    </p>
                    <p className="display mt-1.5 text-[2rem] text-accent">
                      {lakh(r.yearOne)}
                    </p>
                  </div>
                </div>

                {/* ────────────────────────────────── 12-month position */}
                <div className="card p-7 sm:p-8">
                  <h3 className="text-[1rem] font-semibold">
                    Where you stand, month by month
                  </h3>
                  <p className="mt-1.5 text-[0.86rem] text-ink-faint">
                    Cumulative position after paying for PGAK.
                  </p>

                  <div className="mt-6 flex h-[150px] items-end gap-1.5">
                    {r.months.map((v, i) => {
                      const behind = v < 0;
                      return (
                        <div
                          key={i}
                          className="group relative flex h-full flex-1 flex-col justify-end"
                        >
                          <div
                            className={`w-full rounded-t-[4px] transition-all ${
                              behind ? "bg-[#ff8a6b]" : "bg-accent"
                            }`}
                            style={{
                              height: `${Math.max(3, (Math.abs(v) / maxBar) * 100)}%`,
                            }}
                          />
                          {/* Clamped to the edges so months 1 and 12 aren't cut
                              off on a phone-width window. */}
                          <span
                            className={`pointer-events-none absolute bottom-full z-10 mb-2 hidden whitespace-nowrap rounded-md border border-line bg-bg-2 px-2.5 py-1.5 text-[0.78rem] text-ink shadow-lg group-hover:block ${
                              i <= 1
                                ? "left-0"
                                : i >= r.months.length - 2
                                  ? "right-0"
                                  : "left-1/2 -translate-x-1/2"
                            }`}
                          >
                            Month {i + 1}: {money(v)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 flex justify-between text-[0.76rem] text-ink-faint">
                    <span>Month 1</span>
                    <span>Month 12</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-[0.8rem] text-ink-faint">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
                      Ahead
                    </span>
                    {/* Hidden when setup is paid back in month 1 — there is no
                        period of being behind, so the colour has no meaning. */}
                    {r.months.some((v) => v < 0) && (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#ff8a6b]" />
                        Still catching up
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener"
                  onClick={onSend}
                  data-cta="roi-whatsapp"
                  className="btn btn-primary w-full justify-center"
                >
                  Send my numbers on WhatsApp →
                </a>
              </>
            ) : (
              /* ────────────────── the honest state. This is a feature. */
              <div className="card p-8">
                <h3 className="display text-[1.4rem]">
                  On these numbers, it doesn&rsquo;t pay for itself yet.
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  At {cameras} camera{cameras === 1 ? "" : "s"} you&rsquo;d pay{" "}
                  {money(r.monthlyCost)} a month, and we can only defend{" "}
                  {money(r.recovered)} of return. We&rsquo;d rather tell you here
                  than after an invoice.
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft">{nextLever}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="/#audit"
                    data-cta="roi-audit"
                    className="btn btn-ghost"
                  >
                    Get a free camera audit anyway
                  </a>
                </div>
              </div>
            )}

            {/* ─────────────────────────────── how this was worked out */}
            <details className="card p-7 sm:p-8">
              <summary className="cursor-pointer text-[1rem] font-semibold">
                How this was worked out
              </summary>

              <ul className="mt-5 flex flex-col gap-4 text-[0.92rem] leading-relaxed text-ink-soft">
                {attendance && (
                  <>
                    <li>
                      <strong className="text-ink">Time at the gate</strong> —{" "}
                      {A.lateMinutesPerDay} minutes a day per person of loose
                      timing, of which we count {pct(r.rates.timeRecovery)} as
                      genuinely recovered:{" "}
                      <span className="text-accent">{money(r.timeSaving)}</span>
                    </li>
                    <li>
                      <strong className="text-ink">Proxy punching</strong> —{" "}
                      {pct(r.rates.proxyShare)} of payroll, which a face at the
                      gate removes structurally:{" "}
                      <span className="text-accent">{money(r.proxySaving)}</span>
                    </li>
                  </>
                )}
                <li>
                  <strong className="text-ink">Your stated loss</strong> — we
                  count {pct(r.rates.lossRecovery)} of the {money(loss)} you
                  entered, not all of it:{" "}
                  <span className="text-accent">{money(r.lossSaving)}</span>
                </li>
                <li>
                  <strong className="text-ink">Admin time</strong> —{" "}
                  {Math.round(r.adminHours)} hours a month on registers, payroll
                  and hunting through footage, {pct(r.rates.adminRecovery)}{" "}
                  recovered at {money(A.admin.hourlyCost)}/hour:{" "}
                  <span className="text-accent">{money(r.adminSaving)}</span>
                </li>
                {guards > 0 && (
                  <li>
                    <strong className="text-ink">Guard postings</strong> —{" "}
                    {guards} posting{guards === 1 ? "" : "s"} at{" "}
                    {money(A.guardMonthlyCost)}, {pct(r.rates.guardRecovery)}{" "}
                    saved because cover is still needed:{" "}
                    <span className="text-accent">{money(r.guardSaving)}</span>
                  </li>
                )}
              </ul>

              <h4 className="mt-7 text-[0.94rem] font-semibold">
                What this deliberately leaves out
              </h4>
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-[0.9rem] text-ink-soft">
                <li>The biometric machines and AMC you no longer buy.</li>
                <li>Faster insurance and police paperwork.</li>
                <li>Customers your staff missed.</li>
              </ul>
              <p className="mt-3 text-[0.9rem] text-ink-soft">
                All real. All left out.
              </p>

              <p className="mt-6 rounded-[14px] border border-line bg-panel p-4 text-[0.88rem] leading-relaxed text-ink-faint">
                PGAK detects, records and reports. It cannot guarantee a rupee is
                recovered, and it does not replace a guard who physically
                intervenes. Every figure above is an estimate built from the
                numbers you entered.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────── UI pieces
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
    <div>
      <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </p>
      <p
        className={`display mt-1.5 text-[1.7rem] ${
          accent ? "text-accent" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Slider({
  label,
  help,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  help?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-[0.92rem] text-ink-soft">{label}</label>
        <span className="display text-[1.05rem] text-ink">{format(value)}</span>
      </div>
      <input
        type="range"
        className="range mt-2.5 w-full"
        value={value}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {help && <p className="mt-1.5 text-[0.82rem] text-ink-faint">{help}</p>}
    </div>
  );
}
