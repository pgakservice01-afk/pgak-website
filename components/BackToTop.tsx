"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";

/**
 * Back-to-top button — fades in once the visitor has scrolled past the hero,
 * scrolls smoothly home on click. Sits above the WhatsApp button on desktop
 * and mirrors the chatbot launcher's height on mobile so nothing overlaps.
 */
export default function BackToTop() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={t("Go to top", "ऊपर जाएँ")}
      title={t("Go to top", "ऊपर जाएँ")}
      onClick={() => {
        const lenis = (
          window as unknown as { __lenis?: { scrollTo: (t: number) => void } }
        ).__lenis;
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`fixed bottom-36 right-4 z-[94] grid h-11 w-11 place-items-center rounded-full border border-line bg-panel/90 text-ink-soft shadow-[0_10px_28px_-10px_#000] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent md:bottom-24 md:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
      </svg>
    </button>
  );
}
