import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import NapBlock from "@/components/NapBlock";
import PrintButton from "@/components/PrintButton";
import { pageMeta } from "@/lib/seo";
import { SOLUTIONS } from "@/lib/solutions";
import { CAPABILITIES } from "@/lib/capabilities";

/**
 * Print-ready one-page brochure.
 *
 * Deliberately an HTML page rather than a static PDF: it can never drift out
 * of date against lib/solutions.ts and lib/capabilities.ts, and the browser's
 * "Save as PDF" produces the downloadable file people actually want. The
 * `print:` variants below strip the chrome so the printed sheet is clean.
 */

export const metadata: Metadata = pageMeta({
  title: "PGAK Brochure — AI CCTV on Your Existing Cameras (Printable)",
  description:
    "A one-page PGAK brochure covering what AI CCTV does, which sites it suits, what it costs and how to get started. Print it or save it as a PDF.",
  path: "/brochure",
  keywords: ["PGAK brochure", "AI CCTV brochure", "security system PDF"],
});

export default function BrochurePage() {
  return (
    <>
      <div className="print:hidden">
        <Nav />
      </div>

      <main className="pt-[74px] print:pt-0">
        <section className="sec">
          <div className="wrap max-w-[880px]">
            <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
              <p className="eyebrow">Brochure</p>
              <PrintButton />
            </div>

            <article className="mt-8 rounded-[22px] border border-line bg-panel p-10 print:rounded-none print:border-0 print:bg-transparent print:p-0">
              <h1 className="display text-[clamp(1.9rem,4vw,2.8rem)]">
                PGAK — intelligent security on the cameras you already own
              </h1>
              <p className="mt-5 max-w-[70ch] leading-relaxed text-ink-soft">
                PGAK is AI software that connects to your existing CCTV, IP
                cameras and DVR/NVR streams. It detects intruders in real time,
                recognises the people who belong, automates attendance and
                filters out the false alarms that made you mute the app — with
                video processed on a device at your own site.
              </p>

              <h2 className="display mt-10 text-[1.35rem]">What it does</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {CAPABILITIES.map((c) => (
                  <li key={c.slug} className="text-[0.94rem] text-ink-soft">
                    <strong className="text-ink">{c.navLabel}</strong> —{" "}
                    {c.summary}
                  </li>
                ))}
              </ul>

              <h2 className="display mt-10 text-[1.35rem]">Where it fits</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {SOLUTIONS.map((s) => (
                  <li key={s.slug} className="text-[0.94rem] text-ink-soft">
                    <strong className="text-ink">{s.navLabel}</strong> —{" "}
                    {s.primaryKeyword}
                  </li>
                ))}
              </ul>

              <h2 className="display mt-10 text-[1.35rem]">What it costs</h2>
              <p className="mt-4 text-[0.96rem] leading-relaxed text-ink-soft">
                <strong className="text-ink">₹1,000 per camera per month.</strong>{" "}
                No hardware to buy, no separate licence fee, no charge for
                software updates, and no lock-in contract. Pricing does not vary
                by city or industry.
              </p>

              <h2 className="display mt-10 text-[1.35rem]">
                How to get started
              </h2>
              <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 text-[0.94rem] text-ink-soft">
                <li>
                  Send us your camera layout — we run a free audit and tell you
                  which cameras are worth making intelligent, and which
                  aren&rsquo;t.
                </li>
                <li>
                  Book a 20-minute demo on one of your own live feeds.
                </li>
                <li>
                  Go live, usually within a day. Then two weeks of tuning zones
                  and thresholds against your real footage.
                </li>
              </ol>

              <div className="mt-10 border-t border-line pt-8">
                <NapBlock />
              </div>

              <p className="mt-6 text-[0.82rem] text-ink-faint">
                pgak.co.in — this brochure is generated from the live site, so
                it is never out of date.
              </p>
            </article>

            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <Link href="/#audit" data-cta="brochure-audit" className="btn btn-primary">
                Get a free camera audit →
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                See full pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
