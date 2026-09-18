"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";

const PROOFS: { ic: IconName; t: string; d: string; tHi: string; dHi: string; href: string }[] = [
 { ic: "factory", t: "Illustrative deployment scenarios", tHi: "डिप्लॉयमेंट के उदाहरण", d: "Worked examples explain the approach. They are not completed customer projects or measured results.", dHi: "ये काम करने का तरीका समझाने वाले उदाहरण हैं, ग्राहक परियोजनाओं के वास्तविक परिणाम नहीं।", href: "/insights/case-studies" },
 { ic: "devices", t: "Check your own cameras", tHi: "अपने कैमरों की जाँच", d: "Assess streams, placement, lighting and processing requirements before selecting a rollout.", dHi: "डिप्लॉयमेंट से पहले स्ट्रीम, कैमरे की जगह, रोशनी और प्रोसेसिंग की जाँच करें।", href: "/free-audit" },
 { ic: "chart", t: "Transparent cost assumptions", tHi: "लागत की स्पष्ट जानकारी", d: "Review what determines the quote. Modelled ROI is an estimate, not a promise of savings.", dHi: "कोटेशन का आधार जानें। अनुमानित ROI बचत की गारंटी नहीं है।", href: "/pricing" },
];

export default function CustomerTrust() {
  const { t } = useLang();
  return (
    <section id="trust" className="sec sec-band">
      <div className="wrap">
        <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">
            {t("Customer trust", "ग्राहकों का भरोसा")}
          </span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            {t("Customers trust real proof.", "ग्राहक असली सबूत पर भरोसा करते हैं।")}
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            {t(
              "Before you commit, review the deployment approach and test suitability on your own cameras. Ask for evidence relevant to your site.",
              "प्रतिबद्ध होने से पहले हम आपको क्या दिखा सकते हैं — आपकी जैसी साइटों के उदाहरण, डिप्लॉयमेंट की स्पष्ट जानकारी, और आपके अपने कैमरों का मुफ़्त ऑडिट।",
            )}
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROOFS.map((p, i) => (
            <Reveal
              key={p.t}
              delay={(i % 3) * 0.06}
              className={`glass group relative p-8 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-30px_#7cf5c4] ${
                p.href ? "cursor-pointer" : ""
              }`}
            >
              <div className="mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_10px_24px_-12px_#7cf5c4] transition-transform duration-300 group-hover:scale-105">
                <Icon name={p.ic} size={24} strokeWidth={1.8} />
              </div>
              <h3 className="mb-2 text-[1.2rem] font-semibold">{t(p.t, p.tHi)}</h3>
              <p className="text-[0.93rem] text-ink-soft">{t(p.d, p.dHi)}</p>
              {p.href && (
                <Link
                  href={p.href}
                  className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-accent after:absolute after:inset-0 group-hover:translate-x-0.5"
                >
                  {t("View", "देखें")} <span aria-hidden>→</span>
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
