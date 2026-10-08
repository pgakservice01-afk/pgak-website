import { HARDWARE_NOTE_LONG } from "@/lib/offer";
import { publishedProjects } from "@/lib/proof/projects";

/**
 * What a buyer needs before a call: prerequisites, what the quote is made of,
 * how the work is evaluated, and the PGAK evidence that exists for this page.
 *
 * No price appears because none is approved for publication; every component
 * is listed and priced per site. Evidence is read from lib/proof/projects.ts
 * by page path, so a page shows a recording only if one is approved for it.
 * `variant` matches the two page templates (marketing and buyer guide).
 */
const COMPONENTS: [string, string][] = [
  ["Cameras reused", "Which existing cameras give a usable view for each use case — confirmed on a still image of each view."],
  ["Cameras moved or added", "Only where a use case needs a view no camera has (plates and faces usually do). Each one named in the quote."],
  ["On-site processing unit", "Detection runs here, next to the recorder. Model, quantity and warranty depend on camera count and analytics."],
  ["Software / licences", "Which analytics on which cameras, the term, and the basis for renewal."],
  ["Installation and configuration", "Stream setup, zones, schedules, alert routing and commissioning."],
  ["Pilot", "Agreed scenes, acceptance criteria and duration before rollout."],
  ["Support", "Hours, response versus fix time, and who replaces failed hardware."],
  ["Taxes", "Stated separately on the quote."],
];

const STEPS: [string, string, string][] = [
  ["Self-check", "Two minutes, nothing sent — find likely blockers.", "/platform/compatibility"],
  ["Scope on paper", "Cameras, use cases and acceptance tests, written down.", "/resources/scope-worksheet"],
  ["Site assessment", "PGAK checks streams, views and network on your cameras.", "/free-audit"],
  ["Pilot against criteria", "Precision, recall, false alerts and delay, agreed in advance.", "/resources/evaluation-method"],
  ["Written proposal", "Itemised as above; you decide whether to roll out.", "/pricing"],
];

export default function ScopeAndEvidence({
  path,
  variant = "site",
}: {
  path: string;
  variant?: "site" | "buyer";
}) {
  const evidence = publishedProjects().filter((p) => p.href === path);
  const buyer = variant === "buyer";

  const body = (
    <>
      <h2 className={buyer ? undefined : "display text-[clamp(1.4rem,2.6vw,1.9rem)]"}>
        What a project here involves
      </h2>
      <p className={buyer ? undefined : "mt-3 max-w-[70ch] text-ink-soft"}>{HARDWARE_NOTE_LONG}</p>

      <h3 className={buyer ? undefined : "mt-6 text-[1.05rem] font-semibold"}>What the quote is made of</h3>
      <div className={buyer ? "buyer-table-wrap" : "mt-3 overflow-x-auto"}>
        <table className={buyer ? "buyer-table" : "w-full text-left text-[0.92rem]"}>
          <thead>
            <tr>
              <th scope="col" className={buyer ? undefined : "border-b border-line py-2 pr-4"}>Component</th>
              <th scope="col" className={buyer ? undefined : "border-b border-line py-2 pr-4"}>What decides it</th>
              <th scope="col" className={buyer ? undefined : "border-b border-line py-2"}>Price</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENTS.map(([c, d]) => (
              <tr key={c}>
                <th scope="row" className={buyer ? undefined : "border-b border-line py-2 pr-4 align-top font-medium"}>{c}</th>
                <td className={buyer ? undefined : "border-b border-line py-2 pr-4 align-top text-ink-soft"}>{d}</td>
                <td className={buyer ? undefined : "border-b border-line py-2 align-top text-ink-soft"}>Quoted per site</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className={buyer ? undefined : "mt-6 text-[1.05rem] font-semibold"}>How it is evaluated</h3>
      <ol className={buyer ? "buyer-list" : "mt-3 grid gap-2 sm:grid-cols-5"}>
        {STEPS.map(([h, t, href], i) => (
          <li key={h} className={buyer ? undefined : "rounded-md border border-line p-3 text-[0.9rem]"}>
            <a href={href} className={buyer ? "text-link" : "font-semibold text-accent"}>
              {i + 1}. {h}
            </a>
            <span className={buyer ? undefined : "mt-1 block text-ink-soft"}> — {t}</span>
          </li>
        ))}
      </ol>

      <h3 className={buyer ? undefined : "mt-6 text-[1.05rem] font-semibold"}>Evidence for this page</h3>
      {evidence.length ? (
        <ul className={buyer ? "buyer-list" : "mt-2 list-disc pl-5 text-[0.92rem] text-ink-soft"}>
          {evidence.map((p) => (
            <li key={p.id}>
              <strong>{p.title}.</strong> {p.conditions} Not proved: {p.limits}{" "}
              <a href={`/resources/evidence#evidence-${p.id}`} className="text-link">See it →</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className={buyer ? undefined : "mt-2 text-[0.92rem] text-ink-soft"}>
          No PGAK recording is published for this page yet. The{" "}
          <a href="/platform/capabilities" className="text-link">capability register</a> shows what
          has been demonstrated and under what conditions.
        </p>
      )}
    </>
  );

  return buyer ? (
    <section aria-label="Scope, cost components and evidence">{body}</section>
  ) : (
    <section className="sec" aria-label="Scope, cost components and evidence">
      <div className="wrap">
        <div className="card p-6 sm:p-8">{body}</div>
      </div>
    </section>
  );
}
