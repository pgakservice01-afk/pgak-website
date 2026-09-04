import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Icon, { type IconName } from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import NapBlock from "@/components/NapBlock";
import { BUSINESS, pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  webPageSchema,
} from "@/lib/schema";

const PATH = "/contact";

export const metadata: Metadata = pageMeta({
  title: "Contact PGAK — Talk to Us or Find an AI CCTV Dealer Near You",
  description:
    "Call, WhatsApp or email PGAK, or request a verified AI CCTV dealer near you. We'll make the cameras you own intelligent.",
  path: PATH,
  keywords: [
    "contact PGAK",
    "AI CCTV dealer near me",
    "CCTV company Ludhiana",
    "book a CCTV demo",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

const METHODS: {
  ic: IconName;
  label: string;
  value: string;
  href: string;
  ext?: boolean;
  /** Feeds the global [data-cta] click tracker in app/layout.tsx. */
  cta?: string;
}[] = [
  {
    ic: "phone-alert",
    label: "Call us",
    value: "+91 62839 93600",
    href: "tel:+916283993600",
    cta: "contact-call",
  },
  {
    ic: "bell",
    label: "WhatsApp",
    value: "Chat with the team",
    href: "https://wa.me/916283993600?text=Hi%20PGAK%2C%20I%27d%20like%20a%20free%20audit%20of%20my%20existing%20cameras.",
    ext: true,
    cta: "contact-whatsapp",
  },
  {
    ic: "link",
    label: "Email",
    value: "Pgakinnovation@gmail.com",
    href: "mailto:Pgakinnovation@gmail.com",
  },
  {
    ic: "devices",
    label: "Instagram",
    value: "@pgakinnovation",
    href: "https://www.instagram.com/pgakinnovation/",
    ext: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "Contact PGAK",
            description:
              "Phone, WhatsApp, email and dealer enquiry for PGAK AI CCTV.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-[50px]">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <div className="mx-auto max-w-[680px] text-center">
              <span className="eyebrow eyebrow-center mb-4">Contact us</span>
              <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
                Let&rsquo;s make your cameras intelligent.
              </h1>
              <p className="mx-auto mt-4 max-w-[540px] text-[1.05rem] text-ink-soft">
                Reach us directly, or drop your details below and a verified PGAK
                dealer near you will get in touch.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-[900px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {METHODS.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  data-cta={m.cta}
                  {...(m.ext ? { target: "_blank", rel: "noopener" } : {})}
                  className="card group flex flex-col gap-3 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent">
                    <Icon name={m.ic} size={20} strokeWidth={1.7} />
                  </span>
                  <span className="text-[0.78rem] uppercase tracking-wide text-ink-faint">
                    {m.label}
                  </span>
                  <span className="text-[0.92rem] font-semibold leading-snug text-ink transition-colors [overflow-wrap:anywhere] group-hover:text-accent">
                    {m.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------- NAP + Google Map embed */}
        <section className="sec-band sec">
          <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.25fr]">
            <div>
              <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
                Where to find us
              </h2>
              <p className="mt-4 max-w-[46ch] text-ink-soft">
                We&rsquo;re headquartered in Ludhiana and deploy across India
                through a verified dealer network.
              </p>
              <div className="mt-7">
                <NapBlock />
              </div>
              <Link
                href="/areas-we-serve"
                className="mt-7 inline-flex text-[0.94rem] text-accent hover:underline"
              >
                See every area we serve →
              </Link>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-line">
              <iframe
                title={`Map showing PGAK in ${BUSINESS.address.locality}, ${BUSINESS.address.region}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${BUSINESS.address.street}, ${BUSINESS.address.area}, ${BUSINESS.address.locality}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}, India`
                )}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0"
              />
            </div>
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
