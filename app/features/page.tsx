import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Features from "@/components/sections/Features";
import LiveIntelligence from "@/components/sections/LiveIntelligence";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { CAPABILITIES } from "@/lib/capabilities";

const PATH = "/features";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Features — Face Recognition & Intruder Alerts | PGAK",
  description:
    "Every AI feature PGAK adds to the cameras you already own: intruder alerts, face recognition, false-alarm filtering, attendance and number plates.",
  path: PATH,
  keywords: [
    "AI CCTV camera features",
    "CCTV face recognition",
    "AI intruder detection",
    "smart security system",
    "video analytics",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: PATH },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK AI CCTV features",
            description:
              "AI CCTV capabilities PGAK adds to existing cameras — intruder alerts, face recognition, false-alarm filtering, attendance, loitering and ANPR.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-0">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              AI CCTV camera features that work on the cameras you already own
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Every capability below is software. It runs against your existing
              CCTV, IP cameras and DVR/NVR streams — so upgrading your security
              no longer means re-cabling a building. Each one has its own page
              explaining exactly how it works and where it falls short.
            </p>
          </div>
        </section>

        <Features />

        {/* --------------------------- deep-dive pages, one per capability */}
        <section className="sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              Every capability, in detail
            </h2>
            <ul className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/features/${c.slug}`}
                    className="card flex h-full flex-col p-7 transition-transform hover:-translate-y-0.5"
                  >
                    <h3 className="text-[1.1rem] font-semibold">{c.navLabel}</h3>
                    <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-soft">
                      {c.summary}
                    </p>
                    <span className="mt-5 text-[0.9rem] text-accent">
                      How {c.primaryKeyword.toLowerCase()} works →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <LiveIntelligence />

        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[720px] rounded-[22px] border border-line bg-panel p-10 text-center">
              <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">
                See it working on your own cameras.
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-ink-soft">
                Book a free demo and watch PGAK turn a live feed into intelligent
                protection — in about 20 minutes.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="#dealer" className="btn btn-primary">
                  Book a free demo →
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  See pricing
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
