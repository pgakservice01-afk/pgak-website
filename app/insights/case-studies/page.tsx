import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
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
  title: "Case Studies — AI CCTV Deployments in Warehouses, Factories & Shops | PGAK",
  description:
    "Real deployment stories: how warehouses, factories, retail stores and housing societies used AI CCTV on their existing cameras to stop losses and automate attendance.",
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
            name: "PGAK case studies",
            description:
              "Deployment stories from warehouses, factories, retail stores and housing societies running PGAK on existing cameras.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />

      <Nav />

      <main className="pt-[74px]">
        <section className="sec pb-8">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">Case studies</p>
            <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              What actually changed on real sites
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Four deployments, told honestly — what the site was losing, what we
              did about it, and which cameras it took. Every one of these ran on
              equipment the customer had already paid for.
            </p>
            <p className="mt-5 max-w-[62ch] rounded-[14px] border border-line bg-panel p-4 text-[0.88rem] text-ink-faint">
              These accounts are anonymised at our customers&rsquo; request —
              sector, city and camera count only. Figures describe typical
              outcomes at those sites, not independently audited results.
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
                <Link href="/#audit" className="btn btn-primary">
                  Get a free camera audit →
                </Link>
                <Link href="/trust/reviews" className="btn btn-ghost">
                  Read customer reviews
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
