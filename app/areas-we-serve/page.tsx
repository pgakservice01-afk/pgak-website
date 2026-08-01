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
import { LOCATIONS, locationPath } from "@/lib/locations";

const PATH = "/areas-we-serve";

export const metadata: Metadata = pageMeta({
  title: "Areas We Serve — AI CCTV Across India | PGAK",
  description:
    "Where PGAK deploys AI CCTV: Ludhiana, Delhi NCR, Gurugram, Noida, Mumbai, Bengaluru and Jaipur — plus most of India through our verified dealer network.",
  path: PATH,
  keywords: [
    "AI CCTV camera India",
    "CCTV installation near me",
    "smart security system India",
    "business CCTV dealer",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Areas we serve", path: PATH },
];

export default function AreasPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "Areas PGAK serves",
            description:
              "Cities where PGAK deploys AI CCTV directly or through its verified dealer network.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />

      <Nav />

      <main className="pt-[74px]">
        <section className="sec pb-8">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">Areas we serve</p>
            <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              Where PGAK deploys AI CCTV
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              We&rsquo;re headquartered in Ludhiana and deploy across India
              through a verified dealer network. The cities below are the ones
              with active coverage today — if yours isn&rsquo;t here, ask, because
              the network grows faster than this page does.
            </p>
          </div>
        </section>

        <section className="sec pt-4">
          <div className="wrap">
            <h2 className="sr-only">Cities with active coverage</h2>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {LOCATIONS.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={locationPath(l.slug)}
                    className="card flex h-full flex-col p-7 transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[1.15rem] font-semibold">{l.city}</h3>
                      {l.hasOffice && (
                        <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[0.82rem] text-ink-faint">
                      {l.region}
                    </p>
                    <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-soft">
                      {l.focus}
                    </p>
                    <span className="mt-5 text-[0.9rem] text-accent">
                      AI CCTV in {l.city} →
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
              <h2 className="display text-[clamp(1.5rem,3vw,2.1rem)]">
                Your city isn&rsquo;t listed?
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-ink-soft">
                Tell us where you are. If we have a dealer nearby we&rsquo;ll put
                you in touch; if we don&rsquo;t, we&rsquo;ll say so rather than
                waste your time.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Ask about your area →
                </Link>
                <Link href="/#dealer" className="btn btn-ghost">
                  Become a dealer
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
