"use client";
import { useState } from "react";
import { economics, storageEstimate } from "@/lib/b2b/calculators";
export default function PlanningCalculator({
  storage = false,
}: {
  storage?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    cost: "",
    setup: "0",
    cash: "0",
    hours: "0",
    rate: "0",
    cameras: "8",
    bitrate: "2",
    days: "30",
  });
  const fields = storage
    ? [
        ["cameras", "Camera count"],
        ["bitrate", "Average bitrate per camera (Mbps)"],
        ["days", "Retention (days)"],
      ]
    : [
        ["cost", "Quoted total monthly cost (₹) — leave blank if unknown"],
        ["setup", "One-time hardware and setup cost (₹)"],
        ["cash", "Documented recoverable cash per month (₹)"],
        ["hours", "Estimated staff hours freed per month"],
        ["rate", "Value of a staff hour (₹) — productivity only"],
      ];
  const n = (k: string) => Number(values[k]);
  const result = economics({
    monthlyCost: values.cost === "" ? null : n("cost"),
    setupCost: n("setup"),
    cashSavings: n("cash"),
    hoursSaved: n("hours"),
    hourlyValue: n("rate"),
  });
  const storageResult = storageEstimate(n("cameras"), n("bitrate"), n("days"));
  const money = (x: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(x);
  return (
    <div className="assessment-layout">
      <div>
        {fields.map(([key, label]) => (
          <label className="buyer-field" key={key} htmlFor={`calc-${key}`}>
            {label}
            <input
              id={`calc-${key}`}
              type="number"
              min="0"
              step={key === "cameras" ? "1" : "any"}
              inputMode="decimal"
              value={values[key]}
              onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <div className="assessment-result" aria-live="polite">
        <h2>
          {storage ? "Recording scenario" : "Your business-case scenario"}
        </h2>
        {storage ? (
          storageResult ? (
            <>
              <p>
                <strong>{storageResult.bandwidthMbps.toFixed(1)} Mbps</strong>{" "}
                combined video bitrate.
              </p>
              <p>
                <strong>{storageResult.decimalTB.toFixed(2)} TB</strong> video
                data for continuous recording.
              </p>
              <p>
                Decimal TB. Excludes RAID, filesystem overhead, audio, metadata,
                variable bitrate peaks and spare capacity. This is not a
                hardware specification or a PGAK storage feature claim.
              </p>
            </>
          ) : (
            <p role="alert">
              Use a whole camera count and non-negative finite inputs.
            </p>
          )
        ) : "error" in result ? (
          <p role="alert">{result.error}</p>
        ) : (
          <>
            <p>
              Productivity estimate:{" "}
              <strong>{money(result.productivity)} / month</strong>. This is
              time value, not recovered cash.
            </p>
            {result.known ? (
              <>
                <p>
                  Net monthly cash: <strong>{money(result.monthlyCash)}</strong>
                </p>
                <p>
                  Year-one cash after setup:{" "}
                  <strong>{money(result.yearOneCash)}</strong>
                </p>
                <p>
                  Cash payback:{" "}
                  {result.paybackMonths === null
                    ? "not achieved"
                    : `${result.paybackMonths.toFixed(1)} months`}
                </p>
                <p>
                  <strong>
                    {result.justified
                      ? "The supplied cash assumptions cover year-one costs."
                      : "The supplied cash inputs do not justify the purchase on a year-one cash basis."}
                  </strong>
                </p>
              </>
            ) : (
              <p>
                <strong>Price unknown.</strong> Obtain a complete quote before
                calculating net savings or payback.
              </p>
            )}
          </>
        )}
        <p className="buyer-micro">
          Runs locally in your browser. Inputs are not sent to sales or
          analytics.
        </p>
      </div>
    </div>
  );
}
