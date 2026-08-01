"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";

/**
 * Homepage block that sends people to the full ROI calculator.
 *
 * Sits between Features and the Free Audit offer: someone who has just read
 * what PGAK does is at exactly the point of asking "yes, but what does it cost
 * me and what do I get back". Deliberately shows no numbers of its own — the
 * calculator's whole value is that the numbers are *theirs*.
 */
export default function RoiTeaser() {
  const { t } = useLang();

  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="grid items-center gap-9 rounded-[22px] border border-line bg-panel p-8 sm:p-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="eyebrow mb-4">
              {t("Your numbers", "आपके आँकड़े")}
            </span>
            <h2 className="display mt-4 text-[clamp(1.8rem,3.5vw,2.5rem)]">
              {t(
                "What would PGAK give back on your site?",
                "आपकी साइट पर PGAK कितना लौटाएगा?",
              )}
            </h2>
            <p className="mt-3.5 max-w-[52ch] text-ink-soft">
              {t(
                "Put in your staff count, your cameras and what you think you lose each month. You get back a monthly figure, the month it pays for itself, and what you keep after a year — worked out in your browser, with every assumption shown.",
                "अपने स्टाफ की संख्या, कैमरे और हर महीने होने वाला अनुमानित नुकसान डालें। आपको मासिक आँकड़ा, कब यह अपनी लागत निकाल लेगा, और साल भर बाद क्या बचेगा — सब आपके ब्राउज़र में, हर अनुमान दिखाते हुए।",
              )}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5 text-[0.93rem] text-ink-soft">
              {[
                [
                  "Conservative by default — it under-promises on purpose",
                  "डिफ़ॉल्ट रूप से सतर्क — यह जानबूझकर कम वादा करता है",
                ],
                [
                  "Says so plainly when the numbers don't work yet",
                  "जब आँकड़े काम नहीं करते, यह साफ़ कह देता है",
                ],
                [
                  "Nothing is sent to us unless you choose to send it",
                  "जब तक आप न भेजें, हमें कुछ नहीं भेजा जाता",
                ],
              ].map(([en, hi]) => (
                <li key={en} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-accent">
                    ✓
                  </span>
                  <span>{t(en, hi)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/roi-calculator"
                data-cta="roi-teaser"
                className="btn btn-primary"
              >
                {t("Work out my return →", "मेरा रिटर्न निकालें →")}
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                {t("See pricing", "मूल्य देखें")}
              </Link>
            </div>
          </div>

          {/* Illustrative only — an empty calculator, not a claimed result. */}
          <div
            aria-hidden="true"
            className="rounded-[18px] border border-line bg-bg-2 p-7"
          >
            <div className="flex flex-col gap-5">
              {[
                { label: "People on the payroll", w: "62%" },
                { label: "Cameras", w: "38%" },
                { label: "Monthly loss", w: "48%" },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-[0.82rem] text-ink-faint">{row.label}</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-line">
                    <div
                      className="h-1.5 rounded-full bg-accent"
                      style={{ width: row.w }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-line pt-6">
              <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
                {t("Recovered a month", "प्रति माह वसूली")}
              </p>
              <p className="display mt-1.5 text-[1.9rem] text-accent">
                {t("Your number", "आपका आँकड़ा")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
