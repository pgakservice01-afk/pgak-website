"use client";

import { useState } from "react";

import { trackConversion } from "@/lib/analytics";

/**
 * Scope builder: choices in, a printable scope summary out. No price is
 * shown — PGAK publishes no unit rates — and nothing is sent anywhere; the
 * summary lists what a quote would contain and what is still unknown.
 */
export type ScopeTask = {
  id: string;
  label: string;
  needs: string;
  evidence: string;
  calculatorHref: string;
};

const SITE_TYPES = ["Factory", "Warehouse or godown", "Office", "Shop or showroom", "School, hospital or institution", "Other"];
const CAMERA_BANDS = ["Up to 8", "9 to 32", "33 to 100", "More than 100", "Not sure"];
const SUPPORT = ["Business hours", "Extended hours", "Not sure yet"];

export default function ScopeBuilder({ tasks }: { tasks: ScopeTask[] }) {
  const [site, setSite] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [cameras, setCameras] = useState("");
  const [sites, setSites] = useState("1");
  const [retention, setRetention] = useState("");
  const [support, setSupport] = useState("");
  const chosen = tasks.filter((t) => picked.includes(t.id));
  const ready = site && chosen.length > 0 && cameras;
  const nSites = Math.max(1, Math.round(Number(sites) || 1));

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="buyer-notice" style={{ marginTop: "1.5rem" }} id="builder">
      <h2 style={{ marginTop: 0 }}>Build your scope summary</h2>
      <p>
        Choose what applies. The summary appears below as you go, with no contact details needed.
        Print it, or save it as a PDF, and hand the same summary to every supplier you ask.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="mt-4 grid gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Type of site</span>
          <select className="field-input" value={site} onChange={(e) => setSite(e.target.value)}>
            <option value="">Choose one</option>
            {SITE_TYPES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="font-semibold">What the cameras should help with</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {tasks.map((t) => (
              <label key={t.id} className="flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-[0.92rem]">
                <input type="checkbox" checked={picked.includes(t.id)} onChange={() => toggle(t.id)} />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Approximate cameras per site</span>
            <select className="field-input" value={cameras} onChange={(e) => setCameras(e.target.value)}>
              <option value="">Choose one</option>
              {CAMERA_BANDS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Number of sites</span>
            <input className="field-input" inputMode="numeric" value={sites} onChange={(e) => setSites(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Days of footage you need to keep (if known)</span>
            <input className="field-input" inputMode="numeric" value={retention} onChange={(e) => setRetention(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Support you expect</span>
            <select className="field-input" value={support} onChange={(e) => setSupport(e.target.value)}>
              <option value="">Choose one</option>
              {SUPPORT.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
      </form>

      <div aria-live="polite" className="mt-6">
        {!ready && <p className="text-ink-soft">Choose a site type, at least one task and a camera count to see the summary.</p>}
        {ready && (
          <section aria-label="Scope summary">
            <h3>Scope summary</h3>
            <p>
              <strong>{site}</strong> · {nSites} site{nSites > 1 ? "s" : ""} · {cameras} cameras per site
              {retention ? ` · keep ${retention} days of footage` : ""}
              {support ? ` · ${support.toLowerCase()} support` : ""}
            </p>
            <table className="buyer-table">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">What it needs</th>
                  <th scope="col">PGAK evidence today</th>
                </tr>
              </thead>
              <tbody>
                {chosen.map((t) => (
                  <tr key={t.id}>
                    <th scope="row">
                      {t.label}
                      <br />
                      <a href={t.calculatorHref} className="text-link" onClick={() => trackConversion("scope_builder_calc", { task: t.id })}>
                        Estimate it →
                      </a>
                    </th>
                    <td>{t.needs}</td>
                    <td>{t.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>A quote for this should itemise</h4>
            <ul className="buyer-list">
              <li>Which existing cameras are reused, and any moved or added — named per camera</li>
              <li>Processing hardware{nSites > 1 ? `, at each of the ${nSites} sites` : ""}: model, quantity, warranty</li>
              <li>Configuration of the {chosen.length} chosen task{chosen.length > 1 ? "s" : ""}, alert routing and who receives what</li>
              {retention && <li>Storage that actually holds {retention} days at your cameras&rsquo; real bitrate</li>}
              <li>Any licence or support: what it covers, the term and the renewal basis{support ? ` (${support.toLowerCase()})` : ""}</li>
              <li>The pilot, if any: scenes, duration, acceptance criteria and charges, agreed in writing</li>
              <li>Taxes shown separately; anything excluded named</li>
            </ul>
            <h4>Still unknown until the assessment</h4>
            <ul className="buyer-list">
              <li>Camera models, firmware and whether each provides a usable stream</li>
              <li>Whether each view suits its task (placement, lighting, distance)</li>
              <li>Network path between the recorder and the processing unit</li>
              <li>The price — PGAK quotes per site and publishes no unit rate</li>
            </ul>
            <div className="action-row print:hidden">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  trackConversion("scope_builder_print", { tasks: chosen.length });
                  window.print();
                }}
              >
                Print or save as PDF
              </button>
              <a href="/free-audit" className="btn btn-primary" data-cta="scope-builder-assessment">
                Ask for a site-specific assessment →
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
