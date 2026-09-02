import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import FreeAudit from "@/components/sections/FreeAudit";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  webPageSchema,
} from "@/lib/schema";

const PATH = "/pricing";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Camera Price in India — What It Actually Costs",
  description:
    "What AI CCTV costs in India, what moves the number, and what is never an extra line item. Priced per camera on the ones you own. Free audit.",
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
              "How AI CCTV is priced in India: per camera per month on the cameras you already own, quoted per site.",
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
              What AI CCTV costs in India
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              PGAK is billed per camera per month and runs on the cameras you
              already own — so there is no hardware to buy, no separate licence,
              no charge for the software updates that arrive along the way, and
              no lock-in contract. The rate itself depends on your camera count
              and sites, so we quote it on a call or WhatsApp rather than
              printing a number that would be wrong for half the people reading
              it.
            </p>
          </div>
        </section>

        <Pricing />
        <FreeAudit />

        {/* Convert in place: the same lead form the homepage funnels to,
            so no pricing visitor is bounced through "/" to reach it. */}
        <DealerForm />

        <section className="sec pt-0">
          <div className="wrap text-center">
            <p className="text-ink-soft">
              Not sure what your site needs?{" "}
              <Link href="#dealer" className="text-accent underline underline-offset-4">
                Talk to a PGAK partner
              </Link>{" "}
              — takes under a minute. Or{" "}
              <Link
                href="/insights/ai-cctv-price-in-india-what-it-should-cost"
                className="text-accent underline underline-offset-4"
              >
                read the full breakdown of what AI CCTV should cost in India
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
