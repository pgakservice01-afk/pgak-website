import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RoiBusinessCase from "@/components/calc/RoiBusinessCase";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";

const PATH = "/roi-calculator";

export const metadata: Metadata = pageMeta({
  title: "CCTV ROI & Payback Calculator — Your Numbers | PGAK",
  description:
    "Enter your quotation and only the benefits you can defend. Shows net cash per month, payback month, ROI% and benefit/cost ratio — including when the answer is no.",
  path: PATH,
  keywords: [
    "CCTV ROI calculator",
    "AI security cost benefit",
    "CCTV payback period",
    "security system ROI India",
    "AI CCTV price calculator",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "ROI calculator", path: PATH },
];

const FAQS = [
  {
    q: "How accurate is this ROI calculator?",
    a: "It is exactly as accurate as the figures you enter, because it applies no hidden recovery rates of its own. Every benefit is a line you switch on, label and value yourself; nothing is assumed about lateness, shrinkage or staffing. The formulas are published on the page with a version number, so the same inputs always produce the same answer.",
  },
  {
    q: "Why is released staff time not counted as a saving?",
    a: "Because hours released only become money when something specific changes — a post is not refilled, overtime stops, or the work is redeployed. The calculator shows those hours and what they are worth as capacity, and adds them to the cash result only if you state the mechanism. That is also why ROI stays incomplete when a cost is unknown: an unknown is not zero.",
  },
  {
    q: "Does PGAK guarantee these savings?",
    a: "No. PGAK detects, records and reports — it cannot guarantee a rupee is recovered, and it does not replace a guard who physically intervenes. The calculator estimates what better information makes possible, not a promised outcome.",
  },
  {
    q: "What price does the calculator use?",
    a: "Only the one you type in. We don't publish a rate — pricing is quoted on a call or WhatsApp once we know your camera count and sites — so the calculator starts with the price box empty and shows your return the moment you enter the figure you were quoted.",
  },
  {
    q: "Is anything I type here sent to PGAK?",
    a: "No. Everything runs in your browser, nothing is written into the address bar, and no figure is saved or shared. If you ask for a review, the page first shows you exactly which summary lines would be sent, and nothing leaves until you submit the enquiry form yourself. You can print or save the result without giving any contact details.",
  },
];

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK ROI calculator",
            description:
              "Estimate what AI CCTV recovers per month, when it pays for itself, and what you keep in year one.",
          }),
          breadcrumbSchema(TRAIL),
          faqSchema(FAQS),
        ]}
      />

      <Nav />

      <main id="main-content" className="pt-[74px]">
        <section className="sec pb-0">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">ROI calculator</p>
            <h1 className="display mt-4 max-w-[17ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              What would AI CCTV actually give back?
            </h1>
            <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Security is a hard thing to justify, because the benefit is an
              absence — the theft that didn&rsquo;t happen, the queue that
              didn&rsquo;t form. This turns that into a number you can check.
              Enter your quotation and only the benefits you can defend, and it
              shows the net cash each month, the month it pays for itself, the
              return over your horizon and what you could afford to spend.
            </p>
            <p className="mt-5 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-faint">
              It starts empty on purpose: no PGAK price, no assumed recovery
              rates, no benefit switched on for you. If the numbers do not add
              up, it says so and keeps the chart on screen — an answer of “not
              yet” is worth more than a flattering one.
            </p>
          </div>
        </section>

        <RoiBusinessCase />

        {/* --------------------------------------------------------- FAQ */}
        <section className="sec-band sec">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              About these numbers
            </h2>
            <div className="mt-8 max-w-[76ch]">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-6">
                    <h3 className="text-[1.02rem] font-medium">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[68ch] leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- CTA */}
        <section className="sec">
          <div className="wrap">
            <div className="mx-auto max-w-[720px] rounded-[22px] border border-line bg-panel p-10 text-center">
              <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">
                An estimate is not a quote.
              </h2>
              <p className="mx-auto mt-3 max-w-[540px] text-ink-soft">
                Send us your camera layout and we&rsquo;ll tell you which cameras
                are worth making intelligent and which aren&rsquo;t — then the
                numbers above stop being an estimate.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="#dealer"
                  data-cta="roi-page-audit"
                  className="btn btn-primary"
                >
                  Get a free camera audit →
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  See full pricing
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
