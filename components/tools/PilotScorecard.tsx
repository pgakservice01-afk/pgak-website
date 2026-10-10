"use client";

import { useState } from "react";

import { overall, parseDelays, scoreRow, verdicts, type Criteria } from "@/lib/calc/pilot";

/**
 * Enter acceptance criteria first, then the ground-truth log. Runs in the
 * browser; nothing is sent. No default thresholds and no default results.
 */
type RowIn = { label: string; eligible: string; trueAlerts: string; falseAlerts: string; hours: string; delays: string };

const blank = (label: string): RowIn => ({ label, eligible: "", trueAlerts: "", falseAlerts: "", hours: "", delays: "" });
const num = (s: string) => (s.trim() === "" ? NaN : Number(s));
const pct = (v: number | null) => (v === null ? "—" : `${(v * 100).toFixed(1)}%`);

export default function PilotScorecard() {
  const [crit, setCrit] = useState({ minPrecision: "", minRecall: "", maxFalsePer24h: "", maxP90DelaySeconds: "" });
  const [rows, setRows] = useState<RowIn[]>([blank("Day"), blank("Night")]);

  const c: Criteria = {
    minPrecision: crit.minPrecision === "" ? null : Number(crit.minPrecision) / 100,
    minRecall: crit.minRecall === "" ? null : Number(crit.minRecall) / 100,
    maxFalsePer24h: crit.maxFalsePer24h === "" ? null : Number(crit.maxFalsePer24h),
    maxP90DelaySeconds: crit.maxP90DelaySeconds === "" ? null : Number(crit.maxP90DelaySeconds),
  };
  // A condition left completely blank was not tested: it scores as "not
  // measured", which makes the pilot incomplete rather than silently passed.
  const isBlank = (r: RowIn) => [r.eligible, r.trueAlerts, r.falseAlerts, r.hours, r.delays].every((v) => v.trim() === "");
  const anyFilled = rows.some((r) => !isBlank(r));
  const scored = anyFilled
    ? rows.map((r) =>
        isBlank(r)
          ? scoreRow({ label: `${r.label} (not tested)`, eligible: 0, trueAlerts: 0, falseAlerts: 0, hours: 0, delaysSeconds: [] })
          : scoreRow({ label: r.label, eligible: num(r.eligible), trueAlerts: num(r.trueAlerts), falseAlerts: num(r.falseAlerts), hours: num(r.hours), delaysSeconds: parseDelays(r.delays) }),
      )
    : [];
  const verdict = scored.length ? overall(scored, c) : null;

  const field = (value: string, onChange: (v: string) => void, label: string, wide = false) => (
    <label className="flex flex-col gap-1 text-[0.85rem]">
      <span>{label}</span>
      <input className="field-input" style={{ width: wide ? "100%" : undefined }} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );

  return (
    <div className="buyer-notice" style={{ marginTop: "1.5rem" }}>
      <h2 style={{ marginTop: 0 }}>Pilot acceptance scorecard</h2>
      <p>
        Step 1 — write the criteria <em>before</em> the test. Leave a box empty if it is not a
        criterion. Step 2 — enter what the manual ground-truth log recorded for each condition.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-4">
        {field(crit.minPrecision, (v) => setCrit({ ...crit, minPrecision: v }), "Minimum precision (%)")}
        {field(crit.minRecall, (v) => setCrit({ ...crit, minRecall: v }), "Minimum recall (%)")}
        {field(crit.maxFalsePer24h, (v) => setCrit({ ...crit, maxFalsePer24h: v }), "Max false alerts per 24 h")}
        {field(crit.maxP90DelaySeconds, (v) => setCrit({ ...crit, maxP90DelaySeconds: v }), "Max 90th-percentile delay (s)")}
      </div>

      {rows.map((r, i) => (
        <fieldset key={i} className="mt-5 border-t border-line pt-4">
          <legend className="font-semibold">Condition: {r.label}</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {field(r.label, (v) => setRows(rows.map((x, j) => (j === i ? { ...x, label: v } : x))), "Name (e.g. Night, Rain)")}
            {field(r.eligible, (v) => setRows(rows.map((x, j) => (j === i ? { ...x, eligible: v } : x))), "Eligible real events")}
            {field(r.trueAlerts, (v) => setRows(rows.map((x, j) => (j === i ? { ...x, trueAlerts: v } : x))), "Correct alerts")}
            {field(r.falseAlerts, (v) => setRows(rows.map((x, j) => (j === i ? { ...x, falseAlerts: v } : x))), "False alerts")}
            {field(r.hours, (v) => setRows(rows.map((x, j) => (j === i ? { ...x, hours: v } : x))), "Observation hours")}
            {field(r.delays, (v) => setRows(rows.map((x, j) => (j === i ? { ...x, delays: v } : x))), "Delays in seconds, comma-separated", true)}
          </div>
        </fieldset>
      ))}
      <div className="action-row">
        <button type="button" className="btn btn-ghost" onClick={() => setRows([...rows, blank(`Condition ${rows.length + 1}`)])}>Add a condition</button>
        {rows.length > 1 && (
          <button type="button" className="btn btn-ghost" onClick={() => setRows(rows.slice(0, -1))}>Remove the last condition</button>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => window.print()}>Print the scorecard</button>
      </div>

      <div aria-live="polite" className="mt-6">
        {scored.length > 0 && (
          <>
            <table className="buyer-table">
              <thead>
                <tr><th scope="col">Condition</th><th scope="col">Precision</th><th scope="col">Recall</th><th scope="col">Missed</th><th scope="col">False / 24 h</th><th scope="col">Median / p90 delay</th></tr>
              </thead>
              <tbody>
                {scored.map((s) => {
                  const v = verdicts(s, c);
                  return (
                    <tr key={s.label}>
                      <th scope="row">{s.label}{s.smallSample ? " (small sample)" : ""}</th>
                      <td>{pct(s.precision.value)} <small>{s.precision.note ?? v.precision}</small></td>
                      <td>{pct(s.recall.value)} <small>{s.recall.note ?? v.recall}</small></td>
                      <td>{s.errors.length ? "—" : s.missed}</td>
                      <td>{s.falsePer24h.value ?? "—"} <small>{s.falsePer24h.note ?? v.falsePer24h}</small></td>
                      <td>{s.medianDelay.value ?? "—"} / {s.p90Delay.value ?? "—"} s <small>{s.p90Delay.note ?? v.p90Delay}</small></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {scored.flatMap((s) => s.errors.map((e) => <p key={s.label + e} role="alert" className="text-danger">{s.label}: {e}</p>))}
            <p className="mt-3">
              <strong>Overall: {verdict === "pass" ? "passes every criterion you set" : verdict === "fail" ? "fails at least one criterion" : "incomplete — a condition or criterion was not measured"}.</strong>{" "}
              A pass on a small or staged sample does not prove performance at another site or season.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
