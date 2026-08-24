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
import { SOLUTIONS } from "@/lib/solutions";
import { CAPABILITIES } from "@/lib/capabilities";

const PATH = "/solutions";

export const metadata: Metadata = pageMeta({
  title: "Solutions — AI CCTV for Warehouses, Factories, Offices & Homes | PGAK",
  description:
    "Every place PGAK's AI CCTV protects: warehouses, factories, offices, retail shops, homes, societies, schools and hospitals — plus intruder detection and smart perimeter protection on your existing cameras.",
  path: PATH,
  keywords: [
    "AI CCTV camera",
    "smart security system",
    "business CCTV",
    "AI intruder detection",
    "warehouse security",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: PATH },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK Solutions",
            description:
              "AI CCTV solutions by place and by problem — warehouses, factories, offices, retail, homes, schools, hospitals and perimeters.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />

      <Nav />

      <main className="pt-[74px]">
        <section className="sec pb-8">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">Solutions</p>
            <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.1rem,4.8vw,3.4rem)]">
              AI CCTV for every place worth protecting
            </h1>
            <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-relaxed text-ink-soft">
              The same intelligence, tuned to what each site actually loses.
              Every solution below runs as software on the security cameras you
              already own — no rip-and-replace, no new cabling, ₹1,000 per camera
              per month.
            </p>
          </div>
        </section>

        <section className="sec pt-4">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              By place
            </h2>
            <ul className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="card flex h-full flex-col p-7 transition-transform hover:-translate-y-0.5"
                  >
                    <p className="text-[0.74rem] uppercase tracking-[0.16em] text-ink-faint">
                      {s.eyebrow}
                    </p>
                    <h3 className="mt-3 text-[1.12rem] font-semibold">
                      {s.navLabel}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-soft">
                      {s.description}
                    </p>
                    <span className="mt-5 text-[0.9rem] text-accent">
                      Explore {s.primaryKeyword} →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              By capability
            </h2>
            <p className="mt-3 max-w-[60ch] text-ink-soft">
              Each capability has its own page explaining exactly how it works
              and where it earns its keep.
            </p>
            <ul className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/features/${c.slug}`}
                    className="card flex h-full flex-col p-7 transition-transform hover:-translate-y-0.5"
                  >
                    <h3 className="text-[1.12rem] font-semibold">{c.navLabel}</h3>
                    <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-soft">
                      {c.summary}
                    </p>
                    <span className="mt-5 text-[0.9rem] text-accent">
                      How it works →
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
                Not sure which one fits your site?
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-ink-soft">
                Send us your camera layout and we&rsquo;ll tell you — free, in
                writing, with no obligation to buy anything.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="#dealer" className="btn btn-primary">
                  Get a free camera audit →
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Talk to us
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
