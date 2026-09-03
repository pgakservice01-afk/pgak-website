"use client";

import Reveal from "@/components/Reveal";
import { fbTrack } from "@/lib/fbpixel";
import { useLang } from "@/components/LangProvider";
import { AUDIT_ITEMS } from "@/lib/audit";

const WA_HREF = `https://wa.me/916283993600?text=${encodeURIComponent(
  "Hi PGAK! I'd like my free AI readiness audit. I have __ cameras at my __ (home / shop / factory)."
)}`;

const ITEMS = AUDIT_ITEMS;

export default function FreeAudit() {
  const { t } = useLang();
  return (
    <section id="audit" className="sec relative overflow-hidden">
      <div className="absolute -top-40 left-[15%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#0fb89a44,transparent_70%)] opacity-40 blur-[90px]" />
      <div className="wrap relative z-[2]">
        <Reveal className="mx-auto mb-12 max-w-[720px] text-center">
          <span className="eyebrow eyebrow-center mb-4">
            {t("Free — no obligation", "मुफ़्त — कोई बाध्यता नहीं")}
          </span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            {t(
              "Get a free AI readiness audit of your cameras.",
              "अपने कैमरों का मुफ़्त एआई-रेडीनेस ऑडिट पाएँ।",
            )}
          </h2>
          <p className="mt-4 text-[1.05rem] text-ink-soft">
            {t(
              "Before you spend a rupee, know exactly what your existing setup can do. We analyse your feeds remotely and send you a clear report — within 48 hours.",
              "एक रुपया ख़र्च करने से पहले जानें कि आपका मौजूदा सेटअप वास्तव में क्या कर सकता है। हम आपकी फ़ीड का रिमोट विश्लेषण करते हैं और 48 घंटों के भीतर एक स्पष्ट रिपोर्ट भेजते हैं।",
            )}
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-[820px] rounded-[22px] border border-line bg-panel p-7 sm:p-10">
          <div className="mb-2 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {t("Everything you get —", "आपको जो कुछ मिलता है —")}{" "}
            <span className="text-accent">{t("free", "मुफ़्त")}</span>
          </div>

          <div>
            {ITEMS.map((it) => (
              <div
                key={it.t}
                className="flex items-start justify-between gap-5 border-b border-dashed border-line py-4 last:border-none"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent/15 text-[0.7rem] text-accent">
                    ✓
                  </span>
                  <div>
                    <div className="text-[0.97rem] font-semibold text-ink">
                      {t(it.t, it.tHi)}
                    </div>
                    <div className="mt-0.5 text-[0.84rem] text-ink-faint">
                      {t(it.d, it.dHi)}
                    </div>
                  </div>
                </div>
                <div className="whitespace-nowrap text-[0.95rem] text-ink-faint line-through decoration-danger/70">
                  {it.v}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4">
            <div>
              <div className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
                {t("Total value", "कुल मूल्य")}
              </div>
              <div className="font-display text-[1.5rem] text-ink">
                <span className="text-ink-faint line-through decoration-danger/70">
                  ₹15,995
                </span>{" "}
                <span className="text-accent">{t("→ FREE", "→ मुफ़्त")}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={WA_HREF}
                data-cta="whatsapp-audit"
                target="_blank"
                rel="noopener"
                onClick={() =>
                  fbTrack("Contact", { content_name: "Free Audit — WhatsApp" })
                }
                className="btn btn-primary"
              >
                {t("Claim my free audit →", "मेरा मुफ़्त ऑडिट पाएँ →")}
              </a>
              <a href="#dealer" className="btn btn-ghost">
                {t("Or request a call-back", "या कॉल-बैक का अनुरोध करें")}
              </a>
            </div>
          </div>

          <p className="mt-4 text-center text-[0.82rem] text-ink-faint">
            {t(
              "Done remotely on your existing feed · report in 48 hours · zero pressure to buy anything.",
              "आपकी मौजूदा फ़ीड पर रिमोट किया जाता है · रिपोर्ट 48 घंटों में · कुछ ख़रीदने का कोई दबाव नहीं।",
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
