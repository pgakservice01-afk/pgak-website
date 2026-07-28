"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";

export default function FinalCTA() {
  const { t } = useLang();
  return (
    <section id="demo" className="relative overflow-hidden py-[110px] text-center">
      <div className="absolute -bottom-52 right-[30%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,#0fb89a55,transparent_70%)] opacity-40 blur-[90px]" />
      <div className="wrap relative z-[2]">
        <Reveal>
          <span className="eyebrow eyebrow-center mb-4">
            {t("Book a demo", "डेमो बुक करें")}
          </span>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            {t(
              "See PGAK protect a space in real time.",
              "देखें PGAK को रियल-टाइम में किसी जगह की सुरक्षा करते हुए।",
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1.1rem] text-ink-soft">
            {t(
              "In 20 minutes, we’ll show you exactly how PGAK turns your existing cameras into an intelligent security system — live, on a real feed.",
              "सिर्फ़ 20 मिनट में, हम आपको दिखाएँगे कि PGAK आपके मौजूदा कैमरों को एक बुद्धिमान सुरक्षा प्रणाली में कैसे बदलता है — लाइव, असली फ़ीड पर।",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href="#dealer" className="btn btn-primary">
              {t("Book a free demo →", "मुफ़्त डेमो बुक करें →")}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t("Contact us", "संपर्क करें")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
