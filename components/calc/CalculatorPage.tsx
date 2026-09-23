import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import DealerForm from "@/components/sections/DealerForm";
import Footer from "@/components/sections/Footer";
import type { CalculatorRecord } from "@/lib/calc/registry";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

/**
 * Shared frame for a calculator route.
 *
 * The explanation, formula, worked example and limitations are server-rendered
 * HTML, so the page answers the buyer's question (and can be quoted by a
 * search-grounded answer) even before any JavaScript runs. Only the tool
 * itself is a client island, and only on its own route.
 */
export default function CalculatorPage({
  record,
  children,
  example,
}: {
  record: CalculatorRecord;
  children: React.ReactNode;
  example: { inputs: string; result: string };
}) {
  const path = record.path!;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: record.title, path },
  ];

  const capabilityNote =
    record.capability === "verified"
      ? "PGAK supplies this capability; what your site can support is confirmed at the assessment."
      : record.capability === "assessment-required"
        ? "Possible at your site subject to a survey — nothing here is a commitment until it is quoted."
        : "Published because buyers need the number. It is not a claim that PGAK sells a product for it.";

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ path, name: record.title, description: record.summary }),
          breadcrumbSchema(trail),
        ]}
      />
      <Nav />
      <main id="main-content" className="pt-[74px]">
        <section className="sec pb-8">
          <div className="wrap">
            <Breadcrumbs trail={trail} />
            <p className="eyebrow mt-6">Calculator</p>
            <h1 className="display mt-4 max-w-[24ch] text-[clamp(2rem,4.4vw,3rem)]">
              {record.title}
            </h1>
            <p className="mt-5 max-w-[68ch] text-[1.03rem] leading-relaxed text-ink-soft">
              {record.summary}
            </p>
            <p className="mt-4 max-w-[68ch] text-[0.92rem] text-ink-soft">
              Everything runs in your browser. Nothing is sent anywhere, and no figure is saved or
              put into a link.
            </p>
          </div>
        </section>

        <section className="sec pt-0">
          <div className="wrap">{children}</div>
        </section>

        <section className="sec">
          <div className="wrap grid gap-6 lg:grid-cols-2">
            <div className="card p-6 sm:p-7">
              <h2 className="text-[1.1rem] font-semibold">How it is calculated</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{record.method}</p>
              <h3 className="mt-5 text-[0.95rem] font-semibold">Worked example</h3>
              <p className="mt-2 text-[0.92rem] text-ink-soft">{example.inputs}</p>
              <p className="mt-1.5 text-[0.92rem] text-ink">{example.result}</p>
              <p className="mt-4 text-[0.82rem] text-ink-soft">
                Formula version {record.formulaVersion}. Reviewed 23 September 2026.
              </p>
            </div>
            <div className="card p-6 sm:p-7">
              <h2 className="text-[1.1rem] font-semibold">What this does not tell you</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{record.limits}</p>
              <p className="mt-4 text-[0.92rem] text-ink-soft">{capabilityNote}</p>
              <p className="mt-5">
                <Link href={record.relatedPath} className="text-accent underline underline-offset-2">
                  {record.relatedLabel} →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="sec pt-0">
          <div className="wrap">
            <div className="card p-7 sm:p-8">
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Want this checked against your own site?
              </h2>
              <p className="mt-3 max-w-[64ch] text-ink-soft">
                A PGAK business-case assessment goes through your cameras, your quotation and the
                numbers you entered here, and says plainly where the case is weak. {record.cta}.
              </p>
              <p className="mt-4 text-[0.88rem] text-ink-soft">
                The result above is yours to keep either way — print it, save it, no contact
                details required.
              </p>
            </div>
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
