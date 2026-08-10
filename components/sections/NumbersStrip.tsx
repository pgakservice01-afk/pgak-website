"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";

const STATS: Stat[] = [
  {
    ic: "radar",
    value: 3,
    prefix: "< ",
    suffix: " sec",
    suffixHi: " सेकंड",
    label: "From threat to alert",
    labelHi: "ख़तरे से अलर्ट तक",
    note: "on your phone, with a snapshot",
    noteHi: "आपके फ़ोन पर, स्नैपशॉट के साथ",
  },
  {
    ic: "filter",
    value: 90,
    suffix: "%",
    label: "Fewer false alarms",
    labelHi: "कम झूठे अलार्म",
    note: "AI filters wind, shadows & pets",
    noteHi: "एआई हवा, परछाइयों और पालतू जानवरों को फ़िल्टर करता है",
  },
  {
    ic: "ai-node",
    value: 24,
    suffix: "×7",
    label: "Always watching",
    labelHi: "हमेशा निगरानी",
    note: "never blinks, never sleeps",
    noteHi: "न पलक झपकाता, न सोता",
  },
  {
    ic: "camera",
    value: 0,
    prefix: "₹",
    label: "New hardware needed",
    labelHi: "नया हार्डवेयर ज़रूरी",
    note: "runs on the cameras you own",
    noteHi: "आपके अपने कैमरों पर चलता है",
  },
  {
    ic: "shield-lock",
    value: 100,
    suffix: "%",
    label: "Footage stays yours",
    labelHi: "फ़ुटेज आपकी रहती है",
    note: "end-to-end encrypted",
    noteHi: "एंड-टू-एंड एन्क्रिप्टेड",
  },
  {
    ic: "devices",
    value: 1,
    suffix: " day",
    suffixHi: " दिन",
    label: "From sign-up to live",
    labelHi: "साइन-अप से लाइव तक",
    note: "no wiring, no downtime",
    noteHi: "न वायरिंग, न डाउनटाइम",
  },
];

type Stat = {
  ic: IconName;
  value: number;
  prefix?: string;
  suffix?: string;
  suffixHi?: string;
  label: string;
  labelHi: string;
  note: string;
  noteHi: string;
};

export default function NumbersStrip() {
  const { t } = useLang();
  return (
    <section className="sec-band border-y border-line py-[72px]">
      <div className="wrap">
        <Reveal className="mb-12 text-center">
          <span className="eyebrow eyebrow-center mb-4">
            {t("The numbers", "आँकड़े")}
          </span>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,2.7rem)]">
            {t("Intelligence you can measure.", "इंटेलिजेंस जिसे आप माप सकते हैं।")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <span className="mx-auto mb-3.5 grid h-11 w-11 place-items-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent">
                <Icon name={s.ic} size={20} strokeWidth={1.7} />
              </span>
              <div className="font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-none text-accent">
                {s.prefix}
                <CountUp target={s.value} />
                {s.suffix ? t(s.suffix, s.suffixHi ?? s.suffix) : ""}
              </div>
              <div className="mt-2.5 text-[0.92rem] font-semibold text-ink">
                {t(s.label, s.labelHi)}
              </div>
              <div className="mt-1 text-[0.8rem] text-ink-faint">
                {t(s.note, s.noteHi)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Counts 0 → target the first time it scrolls into view.
 *
 * ⚠️ The initial state is `target`, not 0, and that is load-bearing — these six
 * numbers are the page's strongest proof points, and every one of them used to
 * ship as a zero. This component renders on the server, so `useState(0)` put
 * literally `0 % Fewer false alarms`, `< 0 sec` and `0×7` into the prerendered
 * HTML. Anything reading the page without executing JS — LLM crawlers, social
 * unfurlers, a reader on a failed bundle — saw the claims inverted.
 *
 * So the resting value is the true one, and the animation is layered on top:
 * it drops to 0 only at the moment it is committed to counting back up. That
 * ordering also means a visitor who never triggers the animation still sees the
 * right number, which matters more than it sounds:
 *
 *   - deep-link or find-in-page jump landing BELOW this section → it never
 *     intersects, `inView` stays false, and the numbers simply stay correct.
 *     (Under the old code that path left them at 0 for a real human.)
 *   - reduced-motion → no animation at all, just the numbers.
 *
 * Same instinct as Reveal's "visible-without-animation beats invisible": here,
 * correct-without-animation beats wrong-with-animation.
 */
function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Positive margin on purpose: this fires ~200px BEFORE the element reaches
  // the viewport, which is earlier than Reveal's own 0.88×vh trigger. The
  // count is therefore already running by the time Reveal fades the tile in,
  // so the drop to 0 happens while the tile is still transparent. A trigger
  // later than Reveal's would show the true number and then visibly snap back.
  const inView = useInView(ref, { once: true, margin: "200px" });
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!inView || target === 0) return;
    // Read at animation time rather than via state — no extra render, and no
    // window of "animating before we knew the user opted out".
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    setN(0);
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{n}</span>;
}
