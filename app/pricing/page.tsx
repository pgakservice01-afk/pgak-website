import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import FreeAudit from "@/components/sections/FreeAudit";

export const metadata: Metadata = {
  title: "Pricing — PGAK | ₹1,000 per camera, no hidden fees",
  description:
    "One simple rate: ₹1,000 per camera a month. Works with your existing cameras, no new hardware, no lock-in. Plans for homes, shops, offices and industrial sites.",
  alternates: { canonical: "https://www.pgak.co.in/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-[74px]">
        <Pricing />
        <FreeAudit />

        <section className="sec pt-0">
          <div className="wrap text-center">
            <p className="text-ink-soft">
              Not sure what your site needs?{" "}
              <Link href="/#dealer" className="text-accent underline underline-offset-4">
                Talk to a dealer
              </Link>{" "}
              or{" "}
              <Link href="/#demo" className="text-accent underline underline-offset-4">
                book a free demo
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
