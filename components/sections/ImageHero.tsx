"use client";

import Icon, { type IconName } from "@/components/Icon";
import HeroMedia from "@/components/HeroMedia";
import Parallax from "@/components/Parallax";
import QuickLead from "@/components/sections/QuickLead";
import { useLang } from "@/components/LangProvider";
import { waHref } from "@/lib/whatsapp";

// Landing hero. The left column carries the real, accessible marketing copy,
// the compact lead form and the headline stats; the right column runs
// HeroScene — a looping, self-contained cinematic that shows what PGAK does
// (person walks in → camera locks on → AI identifies an unknown visitor →
// instant phone alert → the PGAK device links it all in real time).
//
// The primary action is the two-field form (WhatsApp number + camera count),
// not a button. The old "Book a free demo" button scrolled the visitor to the
// re-pitch block at the very bottom of the page, whose own button scrolled
// them back up to the form — two clicks and a confusing jump on the most
// clicked element of the site.

const STATS: {
  ic: IconName;
  big: string;
  small: string;
  bigHi: string;
  smallHi: string;
}[] = [
  {
    ic: "radar",
    big: "Under 3 sec",
    small: "Threat detection",
    bigHi: "3 सेकंड में",
    smallHi: "खतरे की पहचान",
  },
  {
    ic: "filter",
    big: "90%",
    small: "Fewer false alerts",
    bigHi: "90%",
    smallHi: "कम झूठे अलर्ट",
  },
  {
    ic: "ai-node",
    big: "24×7",
    small: "Smart monitoring",
    bigHi: "24×7",
    smallHi: "स्मार्ट निगरानी",
  },
  {
    ic: "camera",
    big: "No new",
    small: "hardware needed",
    bigHi: "कोई नया",
    smallHi: "हार्डवेयर ज़रूरी नहीं",
  },
];

export default function ImageHero() {
  const { lang, t } = useLang();
  const wa = waHref(
    t(
      "Hi PGAK, I'd like a free audit of my existing cameras.",
      "नमस्ते PGAK, मुझे अपने मौजूदा कैमरों का मुफ़्त ऑडिट चाहिए।",
    ),
  );
  return (
    <section id="top" className="relative w-full overflow-hidden bg-bg">

      <div className="wrap grid min-h-screen items-center gap-12 pb-16 pt-[120px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ── Left: brand copy + lead form + stats ── */}
        <div>
          <span className="eyebrow mb-5">
            <span className="mr-0.5 inline-block h-1.5 w-1.5 animate-pulseDot rounded-full bg-accent align-middle shadow-[0_0_6px_#7cf5c4]" />
            {t(
              "AI-powered security intelligence",
              "एआई-संचालित सुरक्षा इंटेलिजेंस",
            )}
          </span>
          {/* The visible headline IS the h1 — an sr-only h1 above a visible h2
              broke the heading order and hid the page's real title. */}
          <h1 className="display max-w-[14ch] text-[clamp(2.6rem,7vw,5rem)] leading-[1.02]">
            {lang === "hi" ? (
              <>
                आपके कैमरे देख सकते हैं।
                <br />
                हम उन्हें <span className="italic text-accent">
                  सोचना
                </span>{" "}
                सिखाते हैं।
              </>
            ) : (
              <>
                Your cameras can see.
                <br />
                We make them <span className="italic text-accent">think.</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-[46ch] text-[1.1rem] text-ink-soft">
            {lang === "hi" ? (
              <>
                PGAK आपके पहले से मौजूद कैमरों को{" "}
                <span className="text-ink underline decoration-accent/50 underline-offset-4">
                  बुद्धिमान
                </span>{" "}
                रक्षकों में बदल देता है — सेकंडों में खतरों की पहचान, झूठे अलार्म
                में कमी, और 24×7 सच्ची मन की शांति।
              </>
            ) : (
              <>
                PGAK turns the cameras you already own into{" "}
                <span className="text-ink underline decoration-accent/50 underline-offset-4">
                  intelligent
                </span>{" "}
                guardians — detecting threats in seconds, cutting false alarms,
                and giving you real peace of mind, 24×7.
              </>
            )}
          </p>

          {/* The ask, in the first screen: number + camera count, one button. */}
          <div className="mt-8 max-w-[640px]">
            <QuickLead cta="hero-quick" />
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#how" className="link-more">
                {t("See how it works", "देखें यह कैसे काम करता है")}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener"
                data-cta="hero-whatsapp"
                className="link-more"
              >
                {t("Or WhatsApp us", "या WhatsApp पर बात करें")}
              </a>
            </div>
          </div>

          <div className="mt-12 grid max-w-[760px] grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.big} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent">
                  <Icon name={s.ic} size={20} strokeWidth={1.7} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.98rem] font-semibold text-ink">
                    {t(s.big, s.bigHi)}
                  </span>
                  <span className="block text-[0.8rem] text-ink-soft">
                    {t(s.small, s.smallHi)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: humanoid video (when provided) or cinematic animated scene ── */}
        <Parallax className="relative" speed={26} scale={0.04}>
          <HeroMedia />
        </Parallax>
      </div>

      {/* scroll-down cue */}
      <a
        href="#how"
        aria-label={t("Scroll down", "नीचे स्क्रॉल करें")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-accent md:flex"
      >
        <span className="text-[0.64rem] font-semibold uppercase tracking-[0.28em]">
          {t("Scroll", "स्क्रॉल")}
        </span>
        <span className="flex h-9 w-[22px] justify-center rounded-full border border-current pt-1.5">
          <span className="pgak-scrollcue h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
