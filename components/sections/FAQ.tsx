"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/components/LangProvider";

const FAQS: { q: string; a: string; qHi: string; aHi: string }[] = [
  {
    q: "Do I need to buy new cameras?",
    qHi: "क्या मुझे नए कैमरे ख़रीदने होंगे?",
    a: "No. PGAK is built to work with the cameras you already own — CCTV, IP cameras and most DVR/NVR systems. The intelligence is added as a layer on top, so there's no rip-and-replace.",
    aHi: "नहीं। PGAK आपके पहले से मौजूद कैमरों — सीसीटीवी, आईपी कैमरे और ज़्यादातर DVR/NVR सिस्टम — के साथ काम करने के लिए बनाया गया है। इंटेलिजेंस को ऊपर एक लेयर के रूप में जोड़ा जाता है, इसलिए कुछ भी बदलने की ज़रूरत नहीं।",
  },
  {
    q: "How fast does it detect a threat?",
    qHi: "यह ख़तरे का पता कितनी जल्दी लगाता है?",
    a: "PGAK flags unknown people, intrusions and unusual activity in under three seconds, sending you an alert with a snapshot so you can act before a situation escalates.",
    aHi: "PGAK अनजान लोगों, घुसपैठ और असामान्य गतिविधि को तीन सेकंड से भी कम में पहचान लेता है, और आपको स्नैपशॉट के साथ अलर्ट भेजता है ताकि स्थिति बिगड़ने से पहले आप कार्रवाई कर सकें।",
  },
  {
    q: "What about all the false alarms I get today?",
    qHi: "आज मुझे जो इतने झूठे अलार्म मिलते हैं, उनका क्या?",
    a: "That's exactly what the AI is designed to fix. It learns your normal routine and filters out wind, shadows, pets and other noise, so the alerts you receive are the ones that genuinely matter.",
    aHi: "एआई इसे ठीक करने के लिए ही बना है। यह आपकी सामान्य दिनचर्या सीखता है और हवा, परछाइयों, पालतू जानवरों और अन्य शोर को फ़िल्टर कर देता है, ताकि आपको मिलने वाले अलर्ट वही हों जो वाक़ई मायने रखते हैं।",
  },
  {
    q: "Is my footage private and secure?",
    qHi: "क्या मेरी फ़ुटेज निजी और सुरक्षित है?",
    a: "Yes. Your data is protected with end-to-end encryption and stays under your control. Privacy is a core part of the design, not an afterthought.",
    aHi: "हाँ। आपका डेटा एंड-टू-एंड एन्क्रिप्शन से सुरक्षित रहता है और आपके नियंत्रण में रहता है। निजता डिज़ाइन का मूल हिस्सा है, बाद का ख़याल नहीं।",
  },
  {
    q: "Can I monitor multiple locations?",
    qHi: "क्या मैं कई जगहों की निगरानी कर सकता हूँ?",
    a: "Absolutely. PGAK supports multiple cameras and sites from a single dashboard, with multi-user access and roles.",
    aHi: "बिल्कुल। PGAK एक ही डैशबोर्ड से कई कैमरों और साइटों को सपोर्ट करता है, मल्टी-यूज़र एक्सेस और रोल्स के साथ।",
  },
  {
    q: "How do I get started?",
    qHi: "मैं शुरुआत कैसे करूँ?",
    a: "Book a free demo or connect with a PGAK dealer near you. We'll assess your existing setup and recommend the right fit — no obligation.",
    aHi: "एक मुफ़्त डेमो बुक करें या अपने नज़दीकी PGAK डीलर से जुड़ें। हम आपके मौजूदा सेटअप का आकलन करेंगे और सही विकल्प सुझाएँगे — बिना किसी बाध्यता के।",
  },
];

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
