"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * The comparison every site owner runs, done with the right numbers.
 *
 * Two honesty rules, both deliberate:
 *   1. No PGAK rate is printed or defaulted. The visitor types the per-camera
 *      figure they were quoted on the call; until they do, only the guard
 *      side of the table is filled in. Same rule as the ROI calculator.
 *   2. A 24-hour guard post is compared as ~4 people, not one salary — three
 *      shifts, weekly offs and leave cover. Comparing against one salary is
 *      the mistake the comparison usually makes.
 *
 * Market figures only: the default guard salary is a Punjab industrial-belt
 * figure the visitor can change.
 */
const PEOPLE_PER_24H_POST = 4;

const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function GuardCostCompare() {
  const [cameras, setCameras] = useState(12);
  const [rate, setRate] = useState<string>("");
  const [salary, setSalary] = useState(16000);

  const rateNum = Number(rate);
  const haveRate = rate.trim() !== "" && Number.isFinite(rateNum) && rateNum > 0;
  const postMonthly = PEOPLE_PER_24H_POST * salary;
  const aiMonthly = haveRate ? cameras * rateNum : null;

  return (
    <section className="sec pt-0">
      <div className="wrap">
        <div className="rounded-[22px] border border-line bg-panel p-7 sm:p-9">
          <span className="eyebrow mb-4">The comparison worth running</span>
          <h2 className="display mt-4 text-[clamp(1.5rem,3vw,2.1rem)]">
            One more guard post, or AI on the cameras you already have?
          </h2>
          <p className="mt-3.5 max-w-[64ch] text-ink-soft">
            A 24-hour post is not one salary. With three shifts, weekly offs and
            leave cover it is roughly four people. Put in the per-camera rate
            you were quoted and the table fills in. It is not a replacement
            decision — a guard intervenes, software watches everything at once —
            but it is the honest arithmetic.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.78rem] uppercase tracking-wide text-ink-faint">Cameras to make intelligent</span>
              <input
                type="number"
                min={1}
                max={500}
                value={cameras}
                onChange={(e) => setCameras(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
                className="field-input"
                inputMode="numeric"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.78rem] uppercase tracking-wide text-ink-faint">Your quoted rate, ₹ per camera per month</span>
              <input
                type="number"
                min={0}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="From your call with us"
                className="field-input"
                inputMode="numeric"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.78rem] uppercase tracking-wide text-ink-faint">One guard's monthly cost, ₹</span>
              <input
                type="number"
                min={5000}
                step={500}
                value={salary}
                onChange={(e) => setSalary(Math.max(5000, Number(e.target.value) || 5000))}
                className="field-input"
                inputMode="numeric"
              />
            </label>
          </div>

          <div className="mt-6 overflow-x-auto rounded-[12px] border border-line">
            <table className="w-full text-[0.95rem]">
              <thead>
                <tr className="text-left text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">
                  <th className="px-4 py-3 font-medium"></th>
                  <th className="px-4 py-3 font-medium">Per month</th>
                  <th className="px-4 py-3 font-medium">Per year</th>
                  <th className="px-4 py-3 font-medium">Covers</th>
                </tr>
              </thead>
              <tbody className="[&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-3">
                <tr>
                  <td className="font-medium text-ink">One extra 24-hour guard post</td>
                  <td className="font-mono">{fmt(postMonthly)}</td>
                  <td className="font-mono">{fmt(postMonthly * 12)}</td>
                  <td className="text-ink-soft">One position, one place at a time, {PEOPLE_PER_24H_POST} people on rota</td>
                </tr>
                <tr>
                  <td className="font-medium text-ink">AI on {cameras} existing camera{cameras === 1 ? "" : "s"}</td>
                  <td className="font-mono">{aiMonthly == null ? <span className="text-ink-faint">enter your rate</span> : fmt(aiMonthly)}</td>
                  <td className="font-mono">{aiMonthly == null ? <span className="text-ink-faint">—</span> : fmt(aiMonthly * 12)}</td>
                  <td className="text-ink-soft">Every camera at once, 24×7, with a timestamped record</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-[0.85rem] text-ink-faint">
            Guard figure is a market estimate you can change; PGAK&rsquo;s rate is quoted per site and never printed here.{" "}
            <Link href="/insights/ai-cctv-vs-security-guard-cost" className="text-accent underline underline-offset-4">
              Why this is not a replacement decision →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
