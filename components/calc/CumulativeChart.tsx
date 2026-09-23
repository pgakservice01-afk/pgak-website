"use client";

import { formatINR } from "@/lib/calc/engine";

/**
 * Cumulative position, month by month.
 *
 * Rules this component exists to enforce:
 * - A negative outcome is drawn, not hidden. Bars below the zero line are the
 *   point of the chart, because a buyer who is going to lose money should see
 *   the shape of it.
 * - No value is hover-only. Every month is also a row in the table below, so
 *   the numbers survive touch, keyboard and screen readers.
 *   (The old ROI chart put month values in a `group-hover` tooltip.)
 * - Colour is never the only signal: the ahead/behind state is written into
 *   each row's text and the bar's accessible label.
 */

export default function CumulativeChart({
  cumulative,
  caption,
}: {
  cumulative: number[];
  caption: string;
}) {
  const max = Math.max(...cumulative.map((v) => Math.abs(v)), 1);
  const hasNegative = cumulative.some((v) => v < 0);

  return (
    <figure className="m-0">
      <figcaption className="text-[0.86rem] text-ink-soft">{caption}</figcaption>

      <div
        className="mt-5 flex h-[170px] items-center gap-1.5"
        role="img"
        aria-label={`Cumulative position over ${cumulative.length} months. ${
          hasNegative ? "Months below zero are shown below the line." : "Every month is above zero."
        } Exact values are in the table that follows.`}
      >
        {cumulative.map((v, i) => {
          const height = (Math.abs(v) / max) * 50; // % of the half-height
          const behind = v < 0;
          return (
            <div key={i} className="flex h-full flex-1 flex-col justify-center">
              <div className="flex h-1/2 items-end">
                {!behind && (
                  <div
                    className="w-full rounded-t-[4px] bg-accent"
                    style={{ height: `${Math.max(2, height * 2)}%` }}
                  />
                )}
              </div>
              <div className="h-px w-full bg-ink-soft/40" />
              <div className="flex h-1/2 items-start">
                {behind && (
                  <div
                    className="w-full rounded-b-[4px] bg-danger"
                    style={{ height: `${Math.max(2, height * 2)}%` }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-[0.78rem] text-ink-soft">
        <span>Month 1</span>
        <span>Month {cumulative.length}</span>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-[0.9rem] font-medium text-ink">
          Month-by-month figures
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-[0.88rem]">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-4 font-semibold">Month</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Cumulative position</th>
                <th scope="col" className="py-2 font-semibold">State</th>
              </tr>
            </thead>
            <tbody>
              {cumulative.map((v, i) => (
                <tr key={i} className="border-b border-line last:border-b-0">
                  <td className="py-2 pr-4">{i + 1}</td>
                  <td className="py-2 pr-4">{formatINR(v)}</td>
                  <td className="py-2">{v < 0 ? "Behind" : "Ahead"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
