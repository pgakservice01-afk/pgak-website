"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";

const STEPS: {
  n: string;
  t: string;
  d: string;
  tHi: string;
  dHi: string;
  ic: IconName;
}[] = [
  {
    n: "01",
    t: "Connect",
    tHi: "कनेक्ट",
    ic: "link",
    d: "Link your existing cameras and DVR/NVR to PGAK's AI layer — no new hardware required.",
    dHi: "अपने मौजूदा कैमरे और DVR/NVR को PGAK की एआई लेयर से जोड़ें — किसी नए हार्डवेयर की ज़रूरत नहीं।",
  },
  {
    n: "02",
    t: "Learn",
    tHi: "सीखना",
    ic: "ai-node",
    d: "The AI studies your normal routine — who comes and goes, and what counts as ordinary.",
    dHi: "एआई आपकी सामान्य दिनचर्या समझता है — कौन आता-जाता है, और क्या सामान्य माना जाए।",
  },
  {
    n: "03",
    t: "Detect",
    tHi: "पहचान",
    ic: "radar",
    d: "Unknown faces, loitering, intrusion and unusual activity are flagged in under three seconds.",
    dHi: "अनजान चेहरे, मँडराना, घुसपैठ और असामान्य गतिविधि तीन सेकंड से भी कम में चिह्नित होते हैं।",
  },
  {
    n: "04",
    t: "Alert",
    tHi: "अलर्ट",
    ic: "phone-alert",
    d: "You get a clear, instant notification on your phone — with context, before things escalate.",
    dHi: "आपको अपने फ़ोन पर एक स्पष्ट, तुरंत सूचना मिलती है — संदर्भ के साथ, स्थिति बिगड़ने से पहले।",
  },
];

export default function HowItWorks() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(m.matches);
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  // Auto-advance the timeline, pausing on hover/focus or reduced-motion.
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % STEPS.length),
      3800,
    );
    return () => clearInterval(id);
  }, [paused, reduced]);

  const pct = (active / (STEPS.length - 1)) * 100;
  const step = STEPS[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => (a + 1) % STEPS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => (a - 1 + STEPS.length) % STEPS.length);
    }
  };

  return (
    <section id="how" className="sec sec-band">
      <div className="wrap">
        <Reveal className="mb-14 max-w-[680px]">
          <span className="eyebrow mb-4">
            {t("How it works", "कैसे काम करता है")}
          </span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            {t(
              "From passive footage to active protection — in four steps.",
              "निष्क्रिय फ़ुटेज से सक्रिय सुरक्षा तक — चार चरणों में।",
            )}
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            {t(
              "No engineers in vans. No new wiring. PGAK’s intelligence layer connects to what you already run.",
              "न वैन में इंजीनियर, न नई वायरिंग। PGAK की इंटेलिजेंस लेयर उसी से जुड़ती है जो आप पहले से चला रहे हैं।",
            )}
          </p>
        </Reveal>

        {/* ── Desktop: horizontal interactive timeline ── */}
        <Reveal className="hidden md:block">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
          {/* track + progress fill */}
          <div className="absolute inset-x-7 top-7 h-0.5 -translate-y-1/2 bg-line" />
          <div
            className="absolute left-7 top-7 h-0.5 -translate-y-1/2 bg-gradient-to-r from-accent to-accent-2 transition-all duration-500"
            style={{ width: `calc(${pct}% - ${(pct / 100) * 56}px)` }}
          />

          <div
            role="tablist"
            aria-label="How PGAK works"
            onKeyDown={onKeyDown}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative grid grid-cols-4 gap-4"
          >
            {STEPS.map((s, i) => {
              const stateCls =
                i === active
                  ? "border-accent bg-accent text-[#04201a] shadow-[0_0_22px_-2px_#7cf5c4]"
                  : i < active
                    ? "border-accent/50 text-accent [background:linear-gradient(rgb(124_245_196/0.15),rgb(124_245_196/0.15)),rgb(var(--c-panel))]"
                    : "border-line bg-panel text-ink-faint";
              return (
                <button
                  key={s.n}
                  role="tab"
                  aria-selected={i === active}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center text-center outline-none"
                >
                  <span
                    className={`relative z-10 grid h-14 w-14 place-items-center rounded-full border transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-accent ${stateCls}`}
                  >
                    <Icon name={s.ic} size={24} strokeWidth={1.7} />
                  </span>
                  <span className="mt-3.5 font-display text-[0.72rem] font-semibold tracking-[0.18em] text-accent/70">
                    {t("STEP", "चरण")} {s.n}
                  </span>
                  <span
                    className={`mt-1 text-[1.05rem] font-semibold transition-colors ${
                      i === active ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {t(s.t, s.tHi)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div className="card mt-10 p-9">
            <div key={active} className="pgak-fade flex items-start gap-6">
              <span className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_12px_30px_-12px_#7cf5c4]">
                <Icon name={step.ic} size={26} strokeWidth={1.7} />
              </span>
              <div>
                <div className="font-display text-[0.75rem] font-semibold tracking-[0.18em] text-accent/70">
                  {t("STEP", "चरण")} {step.n}
                </div>
                <h3 className="mt-1 text-[1.5rem] font-semibold text-ink">
                  {t(step.t, step.tHi)}
                </h3>
                <p className="mt-2 max-w-[62ch] text-[1rem] text-ink-soft">
                  {t(step.d, step.dHi)}
                </p>
              </div>
            </div>
          </div>
          </div>
        </Reveal>

        {/* ── Mobile: vertical timeline ── */}
        <div className="relative md:hidden">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-5 top-4 w-px bg-line"
          />
          <div className="flex flex-col gap-6">
            {STEPS.map((s, i) => {
              const stateCls =
                i === active
                  ? "border-accent bg-accent text-[#04201a]"
                  : i < active
                    ? "border-accent/60 bg-bg-2 text-accent"
                    : "border-line bg-bg-2 text-ink-faint";
              return (
                <button
                  key={s.n}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className="relative pl-16 text-left"
                >
                  <span
                    className={`absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border transition-all ${stateCls}`}
                  >
                    <Icon name={s.ic} size={20} strokeWidth={1.7} />
                  </span>
                  <div className="font-display text-[0.7rem] font-semibold tracking-[0.18em] text-accent/70">
                    {t("STEP", "चरण")} {s.n}
                  </div>
                  <h4
                    className={`mt-0.5 text-[1.15rem] font-semibold ${
                      i === active ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {t(s.t, s.tHi)}
                  </h4>
                  <p className="mt-1 text-[0.92rem] text-ink-soft">
                    {t(s.d, s.dHi)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
