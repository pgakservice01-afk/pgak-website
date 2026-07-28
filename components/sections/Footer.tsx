"use client";

import Logo from "@/components/Logo";
import { useLang } from "@/components/LangProvider";

const COLS: {
  h: string;
  hHi: string;
  links: { t: string; tHi: string; href: string; ext?: boolean }[];
}[] = [
  {
    h: "Explore",
    hHi: "एक्सप्लोर करें",
    links: [
      { t: "How it works", tHi: "कैसे काम करता है", href: "/#how" },
      { t: "Features", tHi: "विशेषताएँ", href: "/features" },
      { t: "Pricing", tHi: "मूल्य", href: "/pricing" },
      { t: "About", tHi: "हमारे बारे में", href: "/about" },
      { t: "Insights", tHi: "ब्लॉग", href: "/insights" },
    ],
  },
  {
    h: "Get started",
    hHi: "शुरू करें",
    links: [
      { t: "Free AI audit", tHi: "मुफ़्त एआई ऑडिट", href: "/#audit" },
      { t: "Book a demo", tHi: "डेमो बुक करें", href: "/#demo" },
      { t: "Find a dealer", tHi: "डीलर खोजें", href: "/#dealer" },
      { t: "Contact us", tHi: "संपर्क करें", href: "/contact" },
    ],
  },
  {
    h: "Contact",
    hHi: "संपर्क",
    links: [
      { t: "+91 62839 93600", tHi: "+91 62839 93600", href: "tel:+916283993600" },
      {
        t: "Pgakinnovation@gmail.com",
        tHi: "Pgakinnovation@gmail.com",
        href: "mailto:Pgakinnovation@gmail.com",
      },
      {
        t: "Instagram",
        tHi: "Instagram",
        href: "https://www.instagram.com/pgakinnovation/",
        ext: true,
      },
      { t: "WhatsApp", tHi: "व्हाट्सएप", href: "https://wa.me/916283993600", ext: true },
    ],
  },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer id="contact" className="sec-band border-t border-line pb-8 pt-16">
      <div className="wrap">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label="PGAK — home" className="mb-4 inline-flex">
              <Logo variant="full" className="text-[1.5rem]" />
            </a>
            <p className="max-w-[280px] text-[0.92rem] text-ink-soft">
              {t(
                "Intelligent security that acts before it’s too late. PGAK turns the cameras you already own into AI-powered guardians — for homes, businesses and beyond.",
                "बुद्धिमान सुरक्षा जो बहुत देर होने से पहले कार्रवाई करती है। PGAK आपके पहले से मौजूद कैमरों को एआई-संचालित रक्षकों में बदल देता है — घरों, व्यवसायों और उससे आगे के लिए।",
              )}
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.h}>
              <h5 className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
                {t(c.h, c.hHi)}
              </h5>
              {c.links.map((l) => (
                <a
                  key={l.t}
                  href={l.href}
                  {...(l.ext ? { target: "_blank", rel: "noopener" } : {})}
                  className="block py-1.5 text-[0.92rem] text-ink-soft transition-colors hover:text-accent"
                >
                  {t(l.t, l.tHi)}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3.5 border-t border-line pt-6 text-[0.84rem] text-ink-faint">
          <span>
            {t("© 2026 PGAK. All rights reserved.", "© 2026 PGAK. सर्वाधिकार सुरक्षित।")}
          </span>
          <span className="flex gap-5">
            <a href="/privacy" className="hover:text-ink-soft">
              {t("Privacy Policy", "गोपनीयता नीति")}
            </a>
            <a href="#" className="hover:text-ink-soft">
              {t("Terms of Use", "उपयोग की शर्तें")}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
