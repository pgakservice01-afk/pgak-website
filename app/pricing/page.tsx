import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import GuardCostCompare from "@/components/sections/GuardCostCompare";
import FreeAudit from "@/components/sections/FreeAudit";
import WhoIsPgak from "@/components/sections/WhoIsPgak";
import DealerForm from "@/components/sections/DealerForm";
import QuickLead from "@/components/sections/QuickLead";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, pageMeta } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";

const PATH = "/pricing";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Camera Price in India — What It Actually Costs",
  description:
    "What drives the cost of AI CCTV in India, and what is never an extra line item. Priced per camera on the ones you own.",
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

/**
 * The questions a price-page visitor arrives with. The answers hold to the
 * no-published-rate rule: they explain the structure and hand over the two
 * ways to get the number, and never state PGAK's own figure.
 */
const FAQS = [
  {
    q: "How is PGAK priced?",
    a: "Per camera per month, on the cameras you already own. The rate depends on how many cameras you make intelligent and how many sites you run, so it is quoted per site on a call or WhatsApp rather than printed as a single number that would be wrong for half the people reading it.",
  },
  {
    q: "Do I have to put AI on every camera?",
    a: "No. Most sites start with the four to six cameras that matter most — the gate, the cash counter, the stock room, the perimeter line — and add more later. Billing follows the cameras you switch on, not the cameras you own.",
  },
  {
    q: "What is never charged for?",
    a: "New cameras, a separate software licence, software updates, per-employee or per-enrolment charges on attendance, and the camera audit before you decide anything.",
  },
  {
    q: "How quickly can I get a quote?",
    a: "Leave your number and camera count and we call within one working hour, 9 am to 7 pm Monday to Saturday, with your per-camera number. Or message us on WhatsApp with your camera count and get it there.",
  },
  {
    q: "Is there a contract or lock-in?",
    a: "No lock-in contract. You pay monthly for the cameras that are switched on, and you can change the count as your site changes.",
  },
];

export default function PricingPage() {
  const wa = waHref("Hi PGAK, I'd like a price for AI CCTV on my existing cameras. I have __ cameras at my __ (shop / factory / office / society).");
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
          faqSchema(FAQS),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-10">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              What AI CCTV costs in India
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              PGAK is billed per camera per month and runs on the cameras you
              already own: no hardware to buy, no separate licence, no charge
              for updates, no lock-in. The number depends on your camera count
              and sites, so it is quoted per site — leave your number and you
              have it on the call within one working hour.
            </p>
            <div className="mt-8 max-w-[640px]">
              <QuickLead cta="pricing-quote" offer="quote" />
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  data-cta="pricing-whatsapp-top"
                  className="link-more"
                >
                  Or get it on WhatsApp now
                </a>
                <a href={`tel:${BUSINESS.phoneE164}`} data-cta="pricing-call-top" className="link-more">
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Pricing />
        <GuardCostCompare />

        <section className="sec pt-0">
          <div className="wrap">
            <h2 className="display text-[clamp(1.6rem,3.2vw,2.3rem)]">Questions people ask about the price</h2>
            <div className="mt-6 max-w-[760px]">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-[1.02rem] font-medium text-ink">
                    {f.q}
                    <span className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FreeAudit />
        <WhoIsPgak />

        {/* Convert in place: the same lead form the homepage funnels to,
            so no pricing visitor is bounced through "/" to reach it. */}
        <DealerForm />

        <section className="sec pt-0">
          <div className="wrap text-center">
            <p className="text-ink-soft">
              Want the market context first?{" "}
              <Link
                href="/insights/ai-cctv-price-in-india-what-it-should-cost"
                className="text-accent underline underline-offset-4"
              >
                Read what AI CCTV should cost in India
              </Link>{" "}
              — industry ranges, not our rate.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
