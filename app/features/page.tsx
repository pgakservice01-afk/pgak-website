import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Features from "@/components/sections/Features";
import LiveIntelligence from "@/components/sections/LiveIntelligence";

export const metadata: Metadata = {
  title: "Features — PGAK | Intelligent security on your existing cameras",
  description:
    "Instant threat alerts, face & person recognition, false-alarm filtering, anywhere access and privacy by design — PGAK layers real intelligence onto the cameras you already own.",
  alternates: { canonical: "https://www.pgak.co.in/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="pt-[74px]">
        <Features />
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
                <Link href="/#demo" className="btn btn-primary">
                  Book a free demo →
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  See pricing
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
