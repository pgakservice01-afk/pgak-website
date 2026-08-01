"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/components/LangProvider";
import { FAQS } from "@/lib/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useLang();

  return (
    <section id="faq" className="sec sec-band">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">
            {t("Questions", "सवाल")}
          </span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            {t("Things people ask us", "लोग हमसे जो पूछते हैं")}
          </h2>
        </div>

        <div className="mx-auto max-w-[820px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left font-display text-[1.2rem] font-medium text-ink"
                >
                  {t(f.q, f.qHi)}
                  <span
                    className={`grid h-7 w-7 flex-none place-items-center rounded-full border text-[1.1rem] transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-accent bg-accent text-[#04201a]"
                        : "border-line text-accent"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden text-ink-soft"
                    >
                      <p className="max-w-[680px] pb-6 text-[0.97rem]">
                        {t(f.a, f.aHi)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
