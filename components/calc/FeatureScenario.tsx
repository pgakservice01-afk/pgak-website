import Link from "next/link";

import FeatureScenarioTool from "@/components/calc/FeatureScenarioTool";
import QuickLead from "@/components/sections/QuickLead";
import { SCENARIO_FORMULA_VERSION, scenarioById, type ScenarioId } from "@/lib/calc/scenarios";

/**
 * A feature's calculator scenario, embedded on that feature's canonical page.
 *
 * The question, formula, worked example, proof status and guardrails are
 * server-rendered HTML — readable without JavaScript and by search crawlers —
 * and only the tool is a client island. One scenario per feature does not need
 * its own URL; it lives where the buyer is already reading about the feature.
 */
export default function FeatureScenario({
  id,
  withLeadForm = true,
}: {
  id: ScenarioId;
  withLeadForm?: boolean;
}) {
  const s = scenarioById(id)!;
  return (
    <section id={`scenario-${id}`} className="sec" aria-labelledby={`scenario-${id}-h`}>
      <div className="wrap">
        <p className="eyebrow">Calculator · {id}</p>
        <h2 id={`scenario-${id}-h`} className="display mt-3 text-[clamp(1.5rem,3vw,2.1rem)]">
          Estimate {s.feature.toLowerCase()} for your site
        </h2>
        <p className="mt-3 max-w-[68ch] text-ink-soft">
          Use your own measurements. The result is{" "}
          {s.kind === "tco"
            ? "the rupee difference between two options you have been quoted"
            : s.kind === "contribution"
              ? "a contribution-margin scenario, kept apart from cash"
              : s.kind === "energy"
                ? "the energy and tariff difference on your own figures"
                : "the staff time released, shown separately from any cash"}
          , using the formula below. It runs in your browser and nothing is sent anywhere.
        </p>

        <div className="mt-6">
          <FeatureScenarioTool id={id} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card p-5 sm:p-6">
            <h3 className="text-[1rem] font-semibold">How it is calculated</h3>
            <p className="mt-2 font-mono text-[0.85rem] leading-relaxed text-ink">{s.formula}</p>
            <h4 className="mt-4 text-[0.92rem] font-semibold">Worked example (illustrative inputs)</h4>
            <p className="mt-1 text-[0.9rem] text-ink-soft">{s.example.summary}.</p>
            <p className="mt-1 text-[0.9rem] text-ink">
              {Object.entries(s.example.expect)
                .map(([k, v]) => `${LABEL[k] ?? k}: ${fmt(k, v as number)}`)
                .join("; ")}
              .
            </p>
            <p className="mt-3 text-[0.8rem] text-ink-soft">
              Formula version {SCENARIO_FORMULA_VERSION}.
              {s.existingCalculator && (
                <>
                  {" "}
                  The full standalone tool:{" "}
                  <Link href={s.existingCalculator} className="text-accent underline underline-offset-2">
                    {s.existingCalculator.replace("/calculators/", "").replace(/-/g, " ")}
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
          <div className="card p-5 sm:p-6">
            <h3 className="text-[1rem] font-semibold">What this does not tell you</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.9rem] text-ink-soft">
              {s.guardrails.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="mt-3 text-[0.85rem] text-ink-soft">
              <strong className="text-ink">Evidence status:</strong> {s.proofStatus}.
            </p>
          </div>
        </div>

        {withLeadForm && (
          <div className="mt-6 card p-5 sm:p-6 print:hidden">
            <h3 className="text-[1.05rem] font-semibold">
              Request a site-specific assessment with these assumptions
            </h3>
            <p className="mt-2 max-w-[64ch] text-[0.92rem] text-ink-soft">
              Your result stays on this page either way. If you want it checked against your
              cameras and quotation, leave a number; mention the figures on the call. Nothing you
              typed into the calculator is sent with this form.
            </p>
            <div className="mt-4 max-w-[560px]">
              <QuickLead cta={`scenario-${id}`} offer="audit" calculatorId={id} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const LABEL: Record<string, string> = {
  hoursPerMonth: "staff time released",
  cashPerMonth: "cash difference",
  kwhPerMonth: "energy difference",
  contributionPerMonth: "contribution scenario",
  termDelta: "difference over the term",
  monthlyDelta: "monthly difference",
};

function fmt(k: string, v: number): string {
  if (k === "hoursPerMonth") return `${v} hours a month`;
  if (k === "kwhPerMonth") return `${v} kWh a month`;
  const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);
  return k === "termDelta" ? inr : `${inr} a month`;
}
