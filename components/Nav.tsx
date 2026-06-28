"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
  { href: "#dealer", label: "Find a dealer" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          href="#top"
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
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a href="#demo" className="btn btn-primary hidden md:inline-flex">
          Book a demo
        </a>

        <button
          aria-label="Toggle menu"
          className="text-2xl text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-line bg-bg-2 px-6 py-4 md:hidden">
          {[...LINKS, { href: "#demo", label: "Book a demo" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 text-ink-soft last:border-none"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
