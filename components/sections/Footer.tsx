"use client";

import Logo from "@/components/Logo";
import { useLang } from "@/components/LangProvider";
import { SOLUTIONS } from "@/lib/solutions";
import { CAPABILITIES } from "@/lib/capabilities";
import { LOCATIONS, locationPath } from "@/lib/locations";
import { BUSINESS } from "@/lib/seo";

type FooterLink = {
  t: string;
  tHi: string;
  href: string;
  ext?: boolean;
  cta?: string;
};

const COMPANY: FooterLink[] = [
  { t: "How it works", tHi: "कैसे काम करता है", href: "/#how" },
  { t: "Solutions", tHi: "समाधान", href: "/solutions" },
  { t: "Features", tHi: "विशेषताएँ", href: "/features" },
  { t: "Pricing", tHi: "मूल्य", href: "/pricing" },
  { t: "ROI calculator", tHi: "आरओआई कैलकुलेटर", href: "/roi-calculator" },
  { t: "About", tHi: "हमारे बारे में", href: "/about" },
  { t: "Insights", tHi: "ब्लॉग", href: "/insights" },
  { t: "Case studies", tHi: "केस स्टडी", href: "/insights/case-studies" },
  { t: "Areas we serve", tHi: "सेवा क्षेत्र", href: "/areas-we-serve" },
];

const GET_STARTED: FooterLink[] = [
  { t: "Free AI audit", tHi: "मुफ़्त एआई ऑडिट", href: "/#audit", cta: "footer-audit" },
  { t: "Book a demo", tHi: "डेमो बुक करें", href: "/#demo", cta: "footer-demo" },
  { t: "Find a dealer", tHi: "डीलर खोजें", href: "/#dealer", cta: "footer-dealer" },
  { t: "Contact us", tHi: "संपर्क करें", href: "/contact" },
  {
    t: "Brochure (print / save as PDF)",
    tHi: "ब्रोशर (प्रिंट / PDF सेव करें)",
    href: "/brochure",
    cta: "footer-brochure",
  },
];

const CONTACT: FooterLink[] = [
  {
    t: BUSINESS.phone,
    tHi: BUSINESS.phone,
    href: `tel:${BUSINESS.phoneE164}`,
    cta: "footer-phone",
  },
  {
    t: BUSINESS.email,
    tHi: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
    cta: "footer-email",
  },
  {
    t: "Instagram",
    tHi: "Instagram",
    href: "https://www.instagram.com/pgakinnovation/",
    ext: true,
  },
  {
    t: "WhatsApp",
    tHi: "व्हाट्सएप",
    href: BUSINESS.whatsapp,
    ext: true,
    cta: "footer-whatsapp",
  },
];

function LinkList({ links }: { links: FooterLink[] }) {
  const { t } = useLang();
  return (
    <>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          {...(l.ext ? { target: "_blank", rel: "noopener" } : {})}
          {...(l.cta ? { "data-cta": l.cta } : {})}
          className="block py-1.5 text-[0.9rem] text-ink-soft transition-colors hover:text-accent [overflow-wrap:anywhere]"
        >
          {t(l.t, l.tHi)}
        </a>
      ))}
    </>
  );
}

export default function Footer() {
  const { t } = useLang();
  const a = BUSINESS.address;

  return (
    <footer id="contact" className="sec-band border-t border-line pb-8 pt-16">
      <div className="wrap">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
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

            {/* NAP — must stay byte-identical to the Google Business Profile. */}
            <address className="mt-6 not-italic text-[0.88rem] leading-relaxed text-ink-faint">
              {BUSINESS.legalName}
              <br />
              {a.street}
              <br />
              {a.area}
              <br />
              {a.locality}, {a.region} {a.postalCode}, India
            </address>
          </div>

          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
              {t("Company", "कंपनी")}
            </p>
            <LinkList links={COMPANY} />
          </div>

          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
              {t("Get started", "शुरू करें")}
            </p>
            <LinkList links={GET_STARTED} />
          </div>

          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
              {t("Contact", "संपर्क")}
            </p>
            <LinkList links={CONTACT} />
          </div>
        </div>

        {/* ------------------------------ solution / feature / city sitemap */}
        <div className="mt-14 grid gap-9 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
              {t("Solutions", "समाधान")}
            </p>
            <ul>
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/${s.slug}`}
                    className="block py-1 text-[0.88rem] text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.primaryKeyword}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
              {t("Capabilities", "क्षमताएँ")}
            </p>
            <ul>
              {CAPABILITIES.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/features/${c.slug}`}
                    className="block py-1 text-[0.88rem] text-ink-soft transition-colors hover:text-accent"
                  >
                    {c.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
              {t("Cities we serve", "हमारे सेवा शहर")}
            </p>
            <ul>
              {LOCATIONS.map((l) => (
                <li key={l.slug}>
                  <a
                    href={locationPath(l.slug)}
                    className="block py-1 text-[0.88rem] text-ink-soft transition-colors hover:text-accent"
                  >
                    {t(
                      `AI CCTV in ${l.city}`,
                      `${l.city} में एआई सीसीटीवी`,
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3.5 border-t border-line pt-6 text-[0.84rem] text-ink-faint">
          <span>
            {t("© 2026 PGAK. All rights reserved.", "© 2026 PGAK. सर्वाधिकार सुरक्षित।")}
          </span>
          <span className="flex gap-5">
            <a href="/terms" className="hover:text-ink-soft">
              {t("Terms & Conditions", "नियम व शर्तें")}
            </a>{" "}
            ·{" "}
            <a href="/privacy" className="hover:text-ink-soft">
              {t("Privacy Policy", "गोपनीयता नीति")}
            </a>
            <a href="/sitemap.xml" className="hover:text-ink-soft">
              {t("Sitemap", "साइटमैप")}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
