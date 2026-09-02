import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  webPageSchema,
} from "@/lib/schema";
import { CASE_STUDIES } from "@/lib/caseStudies";

const PATH = "/insights/case-studies";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Use Cases — Warehouse, Factory, Retail | PGAK",
  description:
    "Four worked scenarios showing how warehouses, factories, shops and societies would use AI CCTV on existing cameras. Illustrative, not case reports.",
  path: PATH,
  keywords: [
    "AI CCTV case study",
    "warehouse security case study",
    "business CCTV results",
    "smart security system",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
  { name: "Case studies", path: PATH },
];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK use-case scenarios",
            description:
              "Worked scenarios showing how PGAK is configured for warehouses, factory gates, retail chains and housing societies using their existing cameras.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />

      <Nav />

      <main className="pt-[74px]">
        <section className="sec pb-8">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">Use-case scenarios</p>
            <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              What AI CCTV looks like on a site like yours
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Four worked scenarios — a warehouse, a factory gate, a retail
              chain and a housing society. Each one walks through the problem
              the site starts with, how PGAK would be configured for it, and
              which of the existing cameras it would use.
            </p>
            <p className="mt-5 max-w-[62ch] rounded-[14px] border border-line bg-panel p-4 text-[0.88rem] text-ink-faint">
              These are illustrative scenarios, not reports of completed
              projects. They describe how the system is set up for each type of
              site and the outcomes such a deployment is designed to achieve —
              the figures are modelled, not measured at a named customer.
            </p>
          </div>
        </section>

        <section className="sec pt-4">
          <div className="wrap">
            <h2 className="sr-only">All case studies</h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {CASE_STUDIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/insights/case-studies/${c.slug}`}
                    className="card flex h-full flex-col p-8 transition-transform hover:-translate-y-0.5"
                  >
                    <p className="text-[0.74rem] uppercase tracking-[0.16em] text-ink-faint">
                      {c.context}
                    </p>
                    <h3 className="display mt-3 text-[1.3rem] leading-snug">
                      {c.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-ink-soft">
                      {c.summary}
                    </p>
                    <span className="mt-6 text-[0.9rem] text-accent">
                      Read the deployment →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[720px] rounded-[22px] border border-line bg-panel p-10 text-center">
              <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">
                Want to know what your site would look like?
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-ink-soft">
                Send us your camera layout. We&rsquo;ll tell you which cameras
                are worth making intelligent and which ones aren&rsquo;t.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="#dealer" className="btn btn-primary">
                  Get a free camera audit →
                </Link>
                <Link href="/trust/reviews" className="btn btn-ghost">
                  Read customer reviews
                </Link>
              </div>
            </div>
          </div>
        </section>
        <DealerForm />
      </main>

      <Footer />
    </>
  );
}
