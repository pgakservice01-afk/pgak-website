"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";

/**
 * Hardware compatibility grid — the "will it work with MY recorder?" answer,
 * stated concretely enough for an AI assistant to quote back when someone asks
 * "does PGAK work with a CP Plus DVR?". Generic "works with any CCTV" copy is
 * unquotable; brand names and the actual mechanism are.
 *
 * Every claim here is anchored to shipping code, NOT to marketing ambition:
 *
 *   • RTSP path templates per brand    → api/app/services/dvr_scan.py
 *     (CHANNEL_TEMPLATES: xiongmai, dahua + dahua_h264, hikvision + ISAPI).
 *     CP Plus / Amcrest report Dahua-scheme paths — see `brand_for_path`.
 *   • ONVIF discovery                  → edge-devices/pgakv2_tunnel/onvif.py
 *     WS-Discovery Probe → GetCapabilities → GetProfiles → GetStreamUri.
 *     That set is ONVIF **Profile S** (streaming). We do NOT implement Profile
 *     G (recording search/replay) or Profile T (analytics metadata), so this
 *     copy says Profile S and must keep saying Profile S.
 *   • Sub-three-second alerts          → same claim as Features/HowItWorks/FAQ.
 *
 * The closing line is deliberate: the grid is three examples, not a whitelist.
 * Uniview, XiongMai/XMeye and Amcrest are all handled too, and a brand that
 * misses the templates still onboards through the manual stream-URL hatch —
 * `pgak-dvr-scan-handoff/DESIGN.md` records that some CP Plus firmwares do
 * exactly that. Promising "full support" per model would outrun the code.
 */
const SYSTEMS: { t: string; tHi: string; d: string; dHi: string }[] = [
  {
    t: "CP Plus Systems",
    tHi: "सीपी प्लस सिस्टम",
    d: "Orange, Indigo and Cosmic DVR/NVRs report Dahua-scheme RTSP paths, so PGAK finds them automatically — bringing human and vehicle perimeter detection to legacy analog lines. Unusual firmware is added by pasting the stream URL.",
    dHi: "Orange, Indigo और Cosmic DVR/NVR डाहुआ-शैली के RTSP पाथ देते हैं, इसलिए PGAK उन्हें अपने-आप पहचान लेता है — और पुरानी एनालॉग लाइनों पर भी व्यक्ति व वाहन की परिधि-पहचान चलने लगती है। अलग फ़र्मवेयर हो तो स्ट्रीम URL सीधे डाल दें।",
  },
  {
    t: "Hikvision & HiLook",
    tHi: "हिकविज़न और हाईलुक",
    d: "Turbo HD DVRs and standard IP cameras are detected on their native Hikvision stream paths. The recorder's own motion triggers are replaced by sub-three-second AI alerts, pushed to your phone with a snapshot.",
    dHi: "Turbo HD DVR और सामान्य आईपी कैमरे उनके अपने हिकविज़न स्ट्रीम पाथ पर पहचान लिए जाते हैं। रिकॉर्डर के मोशन ट्रिगर की जगह तीन सेकंड से कम में एआई अलर्ट — स्नैपशॉट के साथ सीधे आपके फ़ोन पर।",
  },
  {
    t: "Dahua & Uniview (UNV)",
    tHi: "डाहुआ और यूनिव्यू (UNV)",
    d: "Discovered automatically over ONVIF Profile S — the camera hands PGAK its own exact RTSP URL, so there is no per-brand guesswork. No vendor cloud plan and no storage hardware to swap.",
    dHi: "ONVIF Profile S से अपने-आप खोज लिए जाते हैं — कैमरा अपना सटीक RTSP URL ख़ुद बता देता है, इसलिए ब्रांड-दर-ब्रांड अंदाज़ा लगाने की ज़रूरत नहीं। न कंपनी का क्लाउड प्लान चाहिए, न स्टोरेज हार्डवेयर बदलना पड़ता है।",
  },
];

export default function HardwareGrid() {
  const { t } = useLang();

  return (
    <section id="hardware" className="sec">
      <div className="wrap">
        <Reveal className="mb-12 max-w-[680px]">
          <span className="eyebrow mb-4">
            {t("Hardware compatibility", "हार्डवेयर अनुकूलता")}
          </span>
          <h2 className="display mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)]">
            {t(
              "Supported CCTV & NVR hardware ecosystems",
              "समर्थित सीसीटीवी और एनवीआर हार्डवेयर",
            )}
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            {t(
              "PGAK connects directly over RTSP, ONVIF and standard network streams — no proprietary adapters, no vendor SDK, no box to swap out.",
              "PGAK सीधे RTSP, ONVIF और सामान्य नेटवर्क स्ट्रीम से जुड़ता है — न कोई ख़ास एडाप्टर, न कंपनी का SDK, न कोई बॉक्स बदलने की ज़रूरत।",
            )}
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06} className="glass p-7">
              <h3 className="mb-2.5 text-[1.15rem] font-semibold">{t(s.t, s.tHi)}</h3>
              <p className="text-[0.93rem] text-ink-soft">{t(s.d, s.dHi)}</p>
            </Reveal>
          ))}
        </div>

        {/* Three examples, not a whitelist — see the file header. */}
        <Reveal delay={0.18} className="mt-6">
          <p className="text-[0.93rem] text-ink-faint">
            {t(
              "Brand not listed? If your DVR shows footage in a phone app today, it almost certainly exposes an RTSP stream — which covers virtually every recorder installed in the last decade. The free camera audit confirms it before you spend anything.",
              "आपका ब्रांड यहाँ नहीं है? अगर आपका DVR आज फ़ोन ऐप में फ़ुटेज दिखाता है, तो लगभग तय है कि वह RTSP स्ट्रीम देता है — जो पिछले दस साल में लगे लगभग हर रिकॉर्डर पर मौजूद है। मुफ़्त कैमरा ऑडिट यह पहले ही पक्का कर देता है।",
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
