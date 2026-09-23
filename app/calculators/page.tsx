import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import DealerForm from "@/components/sections/DealerForm";
import Footer from "@/components/sections/Footer";
import { liveCalculators, plannedCalculators } from "@/lib/calc/registry";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const PATH = "/calculators";

export const metadata: Metadata = pageMeta({
  title: "CCTV Business-Case Calculators — Storage, Bandwidth, ROI | PGAK",
  description:
    "Free calculators for CCTV buyers: ROI and payback, retrofit versus replacement cost, storage and retention, bandwidth and cloud transfer. Runs in your browser.",
  path: PATH,
  keywords: [
    "CCTV calculator",
    "CCTV ROI calculator",
    "CCTV storage calculator",
    "CCTV bandwidth calculator",
    "security system cost calculator India",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: PATH },
];

export default function CalculatorsHub() {
  const live = liveCalculators();
  const planned = plannedCalculators();

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "CCTV business-case calculators",
            description:
              "Calculators for the numbers CCTV buyers have to settle: cost and payback, retrofit versus replacement, storage, and bandwidth.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />
      <main id="main-content" className="pt-[74px]">
        <section className="sec pb-8">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">Plan before you buy</p>
            <h1 className="display mt-4 max-w-[22ch] text-[clamp(2.1rem,4.6vw,3.2rem)]">
              Work out the numbers before anyone quotes you
            </h1>
            <p className="mt-6 max-w-[66ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Twelve tools, built on one published set of formulas. They run entirely in your
              browser, they show a negative answer as readily as a positive one, and none of them
              assumes a PGAK price — you type in the quotation you were given.
            </p>
          </div>
        </section>

        <section className="sec pt-0">
          <div className="wrap grid gap-5 md:grid-cols-2">
            {live.map((c) => (
              <article key={c.id} className="card flex flex-col p-6 sm:p-7">
                <h2 className="text-[1.12rem] font-semibold">
                  <Link href={c.path!} className="text-ink hover:text-accent">
                    {c.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[0.92rem] text-ink-soft">{c.question}</p>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">{c.summary}</p>
                <p className="mt-auto pt-5">
                  <Link href={c.path!} data-cta={`hub-${c.id}`} className="btn btn-ghost">
                    Open the calculator →
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </section>

        {planned.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">In progress</h2>
            <p className="mt-3 max-w-[66ch] text-ink-soft">
              These are specified and scheduled. They are listed rather than published, because an
              empty calculator page helps nobody.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {planned.map((c) => (
                <li key={c.id} className="rounded-[12px] border border-line p-4">
                  <p className="font-medium text-ink">{c.title}</p>
                  <p className="mt-1 text-[0.88rem] text-ink-soft">{c.question}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        )}

        <section className="sec pt-0">
          <div className="wrap">
            <div className="card p-7 sm:p-8">
              <h2 className="display text-[clamp(1.4rem,2.6vw,1.9rem)]">
                The PGAK CCTV business-case assessment
              </h2>
              <p className="mt-3 max-w-[66ch] text-ink-soft">
                Bring the numbers you produced here. We check them against your cameras and your
                quotation, say which benefits we think you can defend and which we cannot, and set
                acceptance criteria for a pilot so the case can be measured rather than argued.
              </p>
              <p className="mt-3 max-w-[66ch] text-[0.9rem] text-ink-soft">
                The calculators stay free and ungated whether or not you ask for this.
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
