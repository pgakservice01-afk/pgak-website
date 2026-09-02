import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RoiCalculator from "@/components/sections/RoiCalculator";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";

const PATH = "/roi-calculator";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV ROI Calculator — What Would It Save You? | PGAK",
  description:
    "Enter your staff count, cameras and monthly loss to see what AI CCTV gives back each month and when it pays for itself. Runs in your browser.",
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
    a: "It is an estimate built entirely from numbers you enter, and it is deliberately conservative — the 'Careful' setting loads by default and discounts every line. We count only a fraction of the loss you state rather than all of it. If the result looks too good, switch to Careful and check the 'How this was worked out' section, which shows every percentage being applied.",
  },
  {
    q: "What does the calculator deliberately leave out?",
    a: "Three real savings we don't count: the biometric machines and AMC you no longer buy, faster insurance and police paperwork, and customers your staff missed while distracted. Leaving them out is what makes the remaining numbers defensible.",
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
    a: "No. Everything runs in your browser. Nothing reaches us unless you press the WhatsApp button, which opens a chat with your result pre-filled so you can decide whether to send it.",
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

      <main className="pt-[74px]">
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
              Enter your own figures and it shows what PGAK recovers each month,
              the month it pays for itself, and what you keep after a year.
            </p>
            <p className="mt-5 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-faint">
              It is built to under-promise. The conservative setting loads by
              default, three genuine savings are left out entirely, and if your
              numbers don&rsquo;t add up to a return it says so and hides the
              chart rather than tuning the answer.
            </p>
          </div>
        </section>

        <RoiCalculator />

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
