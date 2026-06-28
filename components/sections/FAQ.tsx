"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    q: "Do I need to buy new cameras?",
    a: "No. PGAK is built to work with the cameras you already own — CCTV, IP cameras and most DVR/NVR systems. The intelligence is added as a layer on top, so there's no rip-and-replace.",
  },
  {
    q: "How fast does it detect a threat?",
    a: "PGAK flags unknown people, intrusions and unusual activity in under three seconds, sending you an alert with a snapshot so you can act before a situation escalates.",
  },
  {
    q: "What about all the false alarms I get today?",
    a: "That's exactly what the AI is designed to fix. It learns your normal routine and filters out wind, shadows, pets and other noise, so the alerts you receive are the ones that genuinely matter.",
  },
  {
    q: "Is my footage private and secure?",
    a: "Yes. Your data is protected with end-to-end encryption and stays under your control. Privacy is a core part of the design, not an afterthought.",
  },
  {
    q: "Can I monitor multiple locations?",
    a: "Absolutely. PGAK supports multiple cameras and sites from a single dashboard, with multi-user access and roles.",
  },
  {
    q: "How do I get started?",
    a: "Book a free demo or connect with a PGAK dealer near you. We'll assess your existing setup and recommend the right fit — no obligation.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="sec bg-bg-2">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Questions</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            Things people ask us
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
                  {f.q}
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
                      <p className="max-w-[680px] pb-6 text-[0.97rem]">{f.a}</p>
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
