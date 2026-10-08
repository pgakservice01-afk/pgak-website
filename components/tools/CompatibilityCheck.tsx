"use client";

import { useState } from "react";

import { trackConversion } from "@/lib/analytics";
import { USE_CASE_LABEL, assess, type Answers } from "@/lib/compat";

/**
 * A self-check, not a verdict. Runs in the browser, sends nothing, and never
 * asks for passwords, stream addresses or footage.
 */
const Q: { key: keyof Answers; label: string; options: [string, string][] }[] = [
  { key: "useCase", label: "What do you want the cameras to do?", options: Object.entries(USE_CASE_LABEL) },
  { key: "recorder", label: "What records your cameras today?", options: [["nvr", "A network video recorder (NVR)"], ["dvr", "A DVR (analogue / HD cameras on coaxial cable)"], ["hybrid", "A hybrid recorder"], ["cloud-only", "No recorder — an app or cloud service"], ["unsure", "Not sure"]] },
  { key: "cameras", label: "What kind of cameras?", options: [["ip", "IP / network cameras"], ["analogue", "Analogue or HD-over-coax cameras"], ["wifi-app", "Wi-Fi cameras set up through a phone app"], ["mixed", "A mix"], ["unsure", "Not sure"]] },
  { key: "stream", label: "Does the recorder or camera offer an RTSP or ONVIF stream?", options: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
  { key: "lan", label: "Could a small device near the recorder join the same local network?", options: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
  { key: "power", label: "Is there a power point and shelf space near the recorder?", options: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
  { key: "dedicatedView", label: "Is there a camera looking at the exact spot where this happens?", options: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
  { key: "nightLight", label: "Is that spot lit at night?", options: [["yes", "Yes"], ["no", "No"], ["na", "Not needed at night"]] },
  { key: "internet", label: "Does the site have internet?", options: [["yes", "Yes"], ["no", "No"]] },
];

const LEVEL = { good: "Good sign", check: "Check needed", blocker: "Likely blocker" } as const;

export default function CompatibilityCheck() {
  const [a, setA] = useState<Partial<Answers>>({});
  const done = Q.every((q) => a[q.key]);
  const result = done ? assess(a as Answers) : null;

  return (
    <div className="buyer-notice" style={{ marginTop: "1.5rem" }}>
      <h2 style={{ marginTop: 0 }}>Check your own setup in two minutes</h2>
      <p>
        Answer what you know; &ldquo;not sure&rdquo; is a fine answer. Nothing is sent anywhere, and
        nothing here asks for a password, stream address or footage — never share those over
        a form or chat.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="mt-4 grid gap-4">
        {Q.map((q) => (
          <fieldset key={q.key}>
            <legend className="font-semibold">{q.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-[0.92rem]">
                  <input
                    type="radio"
                    name={q.key}
                    value={value}
                    checked={a[q.key] === value}
                    onChange={() => {
                      const next = { ...a, [q.key]: value };
                      setA(next);
                      if (Q.every((x) => next[x.key])) trackConversion("compatibility_check_complete", { use_case: next.useCase });
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </form>

      <div aria-live="polite" className="mt-6">
        {!result && <p className="text-ink-soft">{Q.filter((q) => !a[q.key]).length} questions left.</p>}
        {result && (
          <>
            <h3>What your answers suggest</h3>
            <p><strong>{result.summary}</strong></p>
            <table className="buyer-table">
              <thead>
                <tr><th scope="col">Area</th><th scope="col">Finding</th><th scope="col">Why</th></tr>
              </thead>
              <tbody>
                {result.findings.map((f) => (
                  <tr key={f.area}>
                    <th scope="row">{f.area}</th>
                    <td>{LEVEL[f.level]}</td>
                    <td>{f.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Bring these to an assessment</h3>
            <ul className="buyer-list">
              {result.bring.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <p className="text-[0.9rem] text-ink-soft">
              This is a self-check, not a compatibility approval. PGAK confirms the exact camera,
              recorder and firmware on site before anything is quoted.
            </p>
            <div className="action-row">
              <a href="/free-audit" className="btn btn-primary" data-cta="compat-check-assessment">Ask for a site-specific assessment →</a>
              <button type="button" className="btn btn-ghost" onClick={() => window.print()}>Print this</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
