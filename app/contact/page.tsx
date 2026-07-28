import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Contact — PGAK | Talk to us or find a dealer",
  description:
    "Call, WhatsApp or email PGAK, or request a verified dealer near you. We'll help make the cameras you already own intelligent.",
  alternates: { canonical: "https://www.pgak.co.in/contact" },
};

const METHODS: {
  ic: IconName;
  label: string;
  value: string;
  href: string;
  ext?: boolean;
}[] = [
  {
    ic: "phone-alert",
    label: "Call us",
    value: "+91 62839 93600",
    href: "tel:+916283993600",
  },
  {
    ic: "bell",
    label: "WhatsApp",
    value: "Chat with the team",
    href: "https://wa.me/916283993600",
    ext: true,
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
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-[50px]">
          <div className="wrap">
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

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
