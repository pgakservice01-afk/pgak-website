"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";

const PAIN: { en: string; hi: string }[] = [
  {
    en: "Cameras only record, never protect — you discover incidents after the loss has already happened.",
    hi: "कैमरे सिर्फ़ रिकॉर्ड करते हैं, बचाते नहीं — घटना का पता तब चलता है जब नुक़सान हो चुका होता है।",
  },
  {
    en: "Too many false alerts, or none at all — so people stop trusting the system completely.",
    hi: "बहुत ज़्यादा झूठे अलर्ट, या बिल्कुल नहीं — इसलिए लोग सिस्टम पर भरोसा करना ही छोड़ देते हैं।",
  },
  {
    en: "No intelligence — it can't tell who belongs, who doesn't, or what's unusual.",
    hi: "कोई समझ नहीं — यह नहीं बता सकता कौन अपना है, कौन बाहरी, या क्या असामान्य है।",
  },
  {
    en: "Complicated setup and poor service — DVRs, storage and maintenance feel like a burden.",
    hi: "जटिल सेटअप और ख़राब सर्विस — DVR, स्टोरेज और रखरखाव एक बोझ जैसा लगता है।",
  },
  {
    en: "Zero peace of mind — despite the spend, safety still depends on luck, not technology.",
    hi: "मन की शांति शून्य — इतना ख़र्च करने के बाद भी सुरक्षा तकनीक नहीं, क़िस्मत पर निर्भर रहती है।",
  },
];

const SOL: { en: string; hi: string }[] = [
  {
    en: "Get alerted before incidents — not after losses.",
    hi: "घटना से पहले अलर्ट पाएँ — नुक़सान के बाद नहीं।",
  },
  {
    en: "AI learns your routine and cuts false alarms dramatically.",
    hi: "एआई आपकी दिनचर्या सीखता है और झूठे अलार्म काफ़ी हद तक घटा देता है।",
  },
  {
    en: "Detects strangers and threats in seconds — protecting the people you love.",
    hi: "अजनबियों और ख़तरों की पहचान सेकंडों में — अपनों की सुरक्षा।",
  },
  {
    en: "Works on your existing cameras — no new setup, no rip-and-replace.",
    hi: "आपके मौजूदा कैमरों पर काम करता है — कोई नया सेटअप नहीं, कोई रिप-एंड-रिप्लेस नहीं।",
  },
  {
    en: "Private by design — your data stays encrypted and secure.",
    hi: "डिज़ाइन से ही निजी — आपका डेटा एन्क्रिप्टेड और सुरक्षित रहता है।",
  },
];

export default function ProblemSolution() {
  const { t } = useLang();
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="mb-14 max-w-[680px]">
          <span className="eyebrow mb-4">{t("The reality today", "आज की हक़ीक़त")}</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            {t(
              "You spent lakhs on cameras. So why doesn’t it feel safe?",
              "आपने कैमरों पर लाखों ख़र्च किए। फिर भी सुरक्षित क्यों नहीं लगता?",
            )}
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            {t(
              "Traditional security shows you the damage after it’s done. PGAK changes that equation entirely.",
              "पारंपरिक सुरक्षा नुक़सान होने के बाद दिखाती है। PGAK इस समीकरण को पूरी तरह बदल देता है।",
            )}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="panel-dark rounded-2xl border border-line bg-gradient-to-br from-[#1a1113] to-[#120d0e] p-8">
            <h3 className="mb-5 flex items-center gap-3 text-[1.4rem]">
              <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-danger/15 text-danger">
                ⚠
              </span>
              {t("The problem", "समस्या")}
            </h3>
            <ul>
              {PAIN.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 border-b border-line py-2.5 text-[0.97rem] text-ink-soft last:border-none"
                >
                  <span className="font-bold text-danger">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t(item.en, item.hi)}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="card p-8">
            <h3 className="mb-5 flex items-center gap-3 text-[1.4rem]">
              <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-accent/15 text-accent">
                ✦
              </span>
              {t("The PGAK way", "PGAK का तरीक़ा")}
            </h3>
            <ul>
              {SOL.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 border-b border-line py-2.5 text-[0.97rem] text-ink-soft last:border-none"
                >
                  <span className="font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t(item.en, item.hi)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
