"use client";

import { useLang } from "@/components/LangProvider";

// Compatibility wall — the honest "trust bar": PGAK layers onto the gear you
// already own. These are camera types and open standards (not client logos), so
// every item is a true compatibility claim. The heading translates; the
// technical terms stay as-is.
const WORKS_WITH = [
  "CCTV",
  "IP Cameras",
  "DVR / NVR",
  "ONVIF",
  "RTSP",
  "PTZ",
  "Analog HD",
  "4K / HD",
  "Wi-Fi Cams",
  "Existing Networks",
];

export default function TrustStrip() {
  const { t } = useLang();
  const track = [...WORKS_WITH, ...WORKS_WITH];

  return (
    <div className="sec-band border-y border-line py-7">
      <div className="wrap">
        <p className="mb-5 text-center text-[0.78rem] uppercase tracking-[0.2em] text-ink-faint">
          {t(
            "Works with the cameras & recorders you already own",
            "आपके पहले से मौजूद कैमरों और रिकॉर्डर के साथ काम करता है",
          )}
          <span className="text-ink-soft">
            {" "}
            {t("— no rip-and-replace", "— कुछ भी बदलने की ज़रूरत नहीं")}
          </span>
        </p>

        <div className="pgak-marquee-mask relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="pgak-marquee flex w-max items-center gap-3">
            {track.map((item, i) => (
              <span
                key={item + i}
                className="inline-flex flex-none items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[0.82rem] font-semibold tracking-wide text-ink-soft"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
