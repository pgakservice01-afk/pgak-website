import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import FreeAudit from "@/components/sections/FreeAudit";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  productSchema,
  webPageSchema,
} from "@/lib/schema";

const PATH = "/pricing";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Price in India — ₹1,000 per Camera per Month | PGAK Pricing",
  description:
    "One simple rate: ₹1,000 per camera a month for AI CCTV. Works with your existing cameras, no new hardware, no licence fee, no lock-in. Plans for homes, shops, offices and industrial sites.",
  path: PATH,
  keywords: [
    "AI CCTV price India",
    "CCTV monitoring cost per camera",
    "smart security system pricing",
    "business CCTV cost",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: PATH },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK pricing",
            description:
              "AI CCTV pricing: ₹1,000 per camera per month, no hidden fees.",
          }),
          productSchema({
            name: "PGAK Intelligent Security — per camera subscription",
            description:
              "AI video analytics on existing CCTV cameras, billed per camera per month with no hardware or licence cost.",
            path: PATH,
            price: 1000,
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-0">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              AI CCTV pricing — ₹1,000 per camera per month
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              One rate, whatever the industry and whatever the city. No hardware
              to buy, no separate licence, no charge for the software updates
              that arrive along the way, and no lock-in contract.
            </p>
          </div>
        </section>

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
