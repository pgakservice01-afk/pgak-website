"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { LangToggle, useLang } from "@/components/LangProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  SOLUTIONS,
  SOLUTIONS_BY_GROUP,
  SOLUTION_GROUP_LABELS,
} from "@/lib/solutions";
import { CAPABILITIES } from "@/lib/capabilities";

// "/#..." (not "#...") so links also work from /insights and other pages.
const LINKS = [
  { href: "/#how", en: "How it works", hi: "कैसे काम करता है" },
  { href: "/pricing", en: "Pricing", hi: "मूल्य" },
  { href: "/roi-calculator", en: "ROI calculator", hi: "आरओआई कैलकुलेटर" },
  // Case studies live inside Insights now, so they don't get their own
  // top-level slot — the Insights page surfaces them above the guides.
  { href: "/insights", en: "Insights", hi: "ब्लॉग" },
  { href: "/contact", en: "Contact", hi: "संपर्क" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the solutions panel on outside click or Escape.
  useEffect(() => {
    if (!mega) return;
    const onDown = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMega(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [mega]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled || mega
          ? "border-b border-line bg-bg/[0.92] backdrop-blur-[14px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-[74px] items-center justify-between">
        <a href="/" aria-label="PGAK — home" className="flex items-center">
          <Logo variant="compact" className="text-[1.35rem]" />
        </a>

        <nav
          aria-label="Main"
          className="hidden items-center gap-[30px] md:flex"
        >
          {/* Solutions mega-menu — the entry point to the whole page cluster. */}
          <div ref={megaRef} className="relative">
            <button
              onClick={() => setMega((v) => !v)}
              aria-expanded={mega}
              aria-haspopup="true"
              className="group relative flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {t("Solutions", "समाधान")}
              <span
                aria-hidden="true"
                className={`text-[0.7rem] transition-transform ${
                  mega ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {mega && (
              <div className="fixed left-1/2 top-[86px] w-[min(94vw,1080px)] -translate-x-1/2 rounded-[18px] border border-line bg-bg-2 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {SOLUTIONS_BY_GROUP.map(({ group, items }) => (
                    <div key={group}>
                      <p className="mb-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint">
                        {t(
                          SOLUTION_GROUP_LABELS[group].en,
                          SOLUTION_GROUP_LABELS[group].hi,
                        )}
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {items.map((s) => (
                          <li key={s.slug}>
                            <a
                              href={`/${s.slug}`}
                              onClick={() => setMega(false)}
                              className="block rounded-md px-2 py-1.5 text-[0.9rem] text-ink-soft transition-colors hover:bg-panel hover:text-accent"
                            >
                              {s.navLabel}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div>
                    <p className="mb-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint">
                      {t("By capability", "क्षमता के अनुसार")}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {CAPABILITIES.map((c) => (
                        <li key={c.slug}>
                          <a
                            href={`/features/${c.slug}`}
                            onClick={() => setMega(false)}
                            className="block rounded-md px-2 py-1.5 text-[0.9rem] text-ink-soft transition-colors hover:bg-panel hover:text-accent"
                          >
                            {c.navLabel}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/features"
                      onClick={() => setMega(false)}
                      className="mt-3 inline-flex px-2 text-[0.86rem] text-accent hover:underline"
                    >
                      {t("All features →", "सभी विशेषताएँ →")}
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <a
                    href="/solutions"
                    onClick={() => setMega(false)}
                    className="text-[0.9rem] text-accent hover:underline"
                  >
                    {t("Browse all solutions →", "सभी समाधान देखें →")}
                  </a>
                  <a
                    href="/areas-we-serve"
                    onClick={() => setMega(false)}
                    className="text-[0.9rem] text-ink-soft hover:text-accent"
                  >
                    {t("Areas we serve", "हम जहाँ सेवा देते हैं")}
                  </a>
                </div>
              </div>
            )}
          </div>

          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {t(l.en, l.hi)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LangToggle />
          {/* Customer sign-in, not a sales CTA. The demo booking action still
              lives in StickyDemoCTA, MobileActionBar, ChatBot, FinalCTA and the
              footer — only this nav slot changed, so lead capture is unaffected. */}
          <a href="/live" data-cta="nav-live" className="btn btn-primary">
            {t("Live view", "लाइव व्यू")}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LangToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            // 44×44 hit-box: the only mobile nav entry point must beat the
            // 24×24 minimum tap-target size (WCAG 2.5.8) with room to spare.
            className="grid h-11 w-11 place-items-center text-2xl text-ink"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-74px)] overflow-y-auto border-t border-line bg-bg-2 px-6 py-4 md:hidden">
          {SOLUTIONS_BY_GROUP.map(({ group, items }, gi) => (
            <div key={group}>
              <p
                className={`pb-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint ${
                  gi === 0 ? "pt-1" : "pt-5"
                }`}
              >
                {t(
                  SOLUTION_GROUP_LABELS[group].en,
                  SOLUTION_GROUP_LABELS[group].hi,
                )}
              </p>
              {items.map((s) => (
                <a
                  key={s.slug}
                  href={`/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-2.5 text-[0.95rem] text-ink-soft"
                >
                  {s.navLabel}
                </a>
              ))}
            </div>
          ))}

          <p className="pb-2 pt-5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint">
            {t("Features", "विशेषताएँ")}
          </p>
          {CAPABILITIES.map((c) => (
            <a
              key={c.slug}
              href={`/features/${c.slug}`}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-2.5 text-[0.95rem] text-ink-soft"
            >
              {c.navLabel}
            </a>
          ))}

          <div className="pt-5">
            {[
              ...LINKS,
              { href: "/areas-we-serve", en: "Areas we serve", hi: "हम जहाँ सेवा देते हैं" },
              { href: "/live", en: "Live view", hi: "लाइव व्यू" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 text-ink-soft last:border-none"
              >
                {t(l.en, l.hi)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
