"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";
import { waHref } from "@/lib/whatsapp";

/**
 * Bottom-of-page re-pitch. Keeps `id="demo"` so old links still land, but no
 * longer sells a "demo" — it sells the same free camera audit as every other
 * button on the site, and its primary action is the form just above it.
 */
export default function FinalCTA() {
  const { t } = useLang();
  const wa = waHref(
    t(
      "Hi PGAK, I'd like a free audit of my existing cameras.",
      "नमस्ते PGAK, मुझे अपने मौजूदा कैमरों का मुफ़्त ऑडिट चाहिए।",
    ),
  );
  return (
    <section id="demo" className="relative overflow-hidden py-[110px] text-center">
      <div className="absolute -bottom-52 right-[30%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,#0fb89a55,transparent_70%)] opacity-40 blur-[90px]" />
      <div className="wrap relative z-[2]">
        <Reveal>
          <span className="eyebrow eyebrow-center mb-4">
            {t("Free camera audit", "मुफ़्त कैमरा ऑडिट")}
          </span>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            {t(
              "Start with a free audit of the cameras you already have.",
              "जो कैमरे आपके पास पहले से हैं, उनके मुफ़्त ऑडिट से शुरू करें।",
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1.1rem] text-ink-soft">
            {t(
              "Tell us your WhatsApp number and how many cameras you have. We call within one working hour and send your audit report within 48 hours.",
              "अपना WhatsApp नंबर और कैमरों की संख्या बताएँ। हम एक कार्य-घंटे के भीतर कॉल करते हैं और 48 घंटों में ऑडिट रिपोर्ट भेजते हैं।",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href="#dealer" data-cta="finalcta-dealer" className="btn btn-primary">
              {t("Get my free audit →", "मेरा मुफ़्त ऑडिट पाएँ →")}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              data-cta="finalcta-whatsapp"
              className="btn btn-ghost"
            >
              {t("WhatsApp us instead", "WhatsApp पर बात करें")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
