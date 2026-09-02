"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Sticky "free camera audit" button.
 *
 * Desktop only — on mobile the existing MobileActionBar already occupies the
 * bottom of the screen, and stacking two floating CTAs there would cover the
 * content people are trying to read.
 *
 * Appears after the first viewport so it doesn't compete with the hero's own
 * form, and hides while the lead form itself is on screen. It used to watch
 * the `#demo` re-pitch block instead, which sits BELOW the form — so the
 * button kept hovering over the very form it pointed at.
 *
 * Links to the form on the current page when there is one, and to the
 * homepage form otherwise, so a visitor on a solution page stays on that page
 * (and the lead is attributed to it).
 */
export default function StickyDemoCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [href, setHref] = useState("/#dealer");

  useEffect(() => {
    setHref(document.getElementById("dealer") ? "#dealer" : "/#dealer");

    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const form = document.getElementById("dealer");
      const atForm = form
        ? form.getBoundingClientRect().top < window.innerHeight * 0.85 &&
          form.getBoundingClientRect().bottom > 0
        : false;
      setShow(past && !atForm);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <a
      href={href}
      data-cta="sticky-audit"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`btn btn-primary fixed bottom-7 left-1/2 z-[90] hidden -translate-x-1/2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 md:inline-flex ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      Get a free camera audit →
    </a>
  );
}
