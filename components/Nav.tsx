"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { LangToggle, useLang } from "@/components/LangProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

// "/#..." (not "#...") so links also work from /insights and other pages.
const LINKS = [
  { href: "/#how", en: "How it works", hi: "कैसे काम करता है" },
  { href: "/features", en: "Features", hi: "विशेषताएँ" },
  { href: "/pricing", en: "Pricing", hi: "मूल्य" },
  { href: "/insights", en: "Insights", hi: "ब्लॉग" },
  { href: "/contact", en: "Contact", hi: "संपर्क" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/[0.92] backdrop-blur-[14px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-[74px] items-center justify-between">
        <a
          href="/"
          aria-label="PGAK — home"
          className={`flex items-center transition-opacity duration-300 ${
            scrolled
              ? "opacity-100"
              : "opacity-100 md:pointer-events-none md:opacity-0"
          }`}
        >
          <Logo variant="compact" className="text-[1.35rem]" />
        </a>

        <nav className="hidden items-center gap-[34px] md:flex">
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
          <a href="/#demo" className="btn btn-primary">
            {t("Book a demo", "डेमो बुक करें")}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LangToggle />
          <button
            aria-label="Toggle menu"
            className="text-2xl text-ink"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-line bg-bg-2 px-6 py-4 md:hidden">
          {[
            ...LINKS,
            { href: "/#demo", en: "Book a demo", hi: "डेमो बुक करें" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 text-ink-soft last:border-none"
            >
              {t(l.en, l.hi)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
