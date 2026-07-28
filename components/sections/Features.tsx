"use client";

import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";

const FEATURES: { ic: IconName; t: string; d: string; tHi: string; dHi: string }[] = [
  {
    ic: "bell",
    t: "Instant Threat Alerts",
    tHi: "तुरंत ख़तरे के अलर्ट",
    d: "Sub-three-second detection of intrusions and anomalies, pushed straight to your phone with context.",
    dHi: "घुसपैठ और असामान्य गतिविधि की तीन सेकंड से कम में पहचान, संदर्भ के साथ सीधे आपके फ़ोन पर।",
  },
  {
    ic: "face",
    t: "Face & Person Recognition",
    tHi: "चेहरा और व्यक्ति पहचान",
    d: "Tell family from strangers automatically and build a trusted list of known faces.",
    dHi: "परिवार और अजनबियों में अपने-आप फ़र्क़ करें और जाने-पहचाने चेहरों की भरोसेमंद सूची बनाएँ।",
  },
  {
    ic: "filter",
    t: "False-Alarm Filtering",
    tHi: "झूठे अलार्म फ़िल्टरिंग",
    d: "AI learns your routine and ignores wind, shadows and pets — so alerts stay meaningful.",
    dHi: "एआई आपकी दिनचर्या सीखता है और हवा, परछाइयों व पालतू जानवरों को नज़रअंदाज़ करता है — ताकि अलर्ट मायने रखें।",
  },
  {
    ic: "devices",
    t: "Anywhere Access",
    tHi: "कहीं से भी पहुँच",
    d: "Live view and history from any device, whether you're across the room or across the country.",
    dHi: "किसी भी डिवाइस से लाइव व्यू और हिस्ट्री — चाहे आप कमरे में हों या देश के दूसरे कोने में।",
  },
  {
    ic: "camera",
    t: "Retrofit Ready",
    tHi: "रेट्रोफ़िट के लिए तैयार",
    d: "Works with your current CCTV, IP cameras and DVR/NVR — no rip-and-replace, no downtime.",
    dHi: "आपके मौजूदा सीसीटीवी, आईपी कैमरे और DVR/NVR के साथ काम करता है — कुछ बदलने की ज़रूरत नहीं, न डाउनटाइम।",
  },
  {
    ic: "shield-lock",
    t: "Private by Design",
    tHi: "डिज़ाइन से ही निजी",
    d: "End-to-end encryption keeps your footage and data secure and fully under your control.",
    dHi: "एंड-टू-एंड एन्क्रिप्शन आपकी फ़ुटेज और डेटा को सुरक्षित और पूरी तरह आपके नियंत्रण में रखता है।",
  },
];

export default function Features() {
  const { t } = useLang();
  return (
    <section id="features" className="sec sec-band">
      <div className="wrap">
        <Reveal className="mb-14 max-w-[680px]">
          <span className="eyebrow mb-4">
            {t("Products & features", "उत्पाद और विशेषताएँ")}
          </span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            {t(
              "Everything you need for genuine peace of mind.",
              "सच्ची मन की शांति के लिए ज़रूरी सब कुछ।",
            )}
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            {t(
              "A complete intelligence suite that layers onto your security — built for homes, shops, offices and industrial sites alike.",
              "एक संपूर्ण इंटेलिजेंस सुइट जो आपकी सुरक्षा पर जुड़ जाती है — घरों, दुकानों, दफ़्तरों और औद्योगिक साइटों, सबके लिए।",
            )}
          </p>
        </Reveal>

        {/* Swipeable rail on mobile (Nike-style), glassmorphism grid on desktop */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.t}
              delay={(i % 3) * 0.06}
              className="glass group min-w-[80%] snap-start p-8 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-30px_#7cf5c4] sm:min-w-[46%] md:min-w-0"
            >
              <div className="mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_10px_24px_-12px_#7cf5c4] transition-transform duration-300 group-hover:scale-105">
                <Icon name={f.ic} size={24} strokeWidth={1.8} />
              </div>
              <h4 className="mb-2 text-[1.2rem] font-semibold">{t(f.t, f.tHi)}</h4>
              <p className="text-[0.93rem] text-ink-soft">{t(f.d, f.dHi)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
