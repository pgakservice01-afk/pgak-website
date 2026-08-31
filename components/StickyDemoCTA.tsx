"use client";

import { useEffect, useState } from "react";

/**
 * Sticky "Book a demo" button.
 *
 * Desktop only — on mobile the existing MobileActionBar already occupies the
 * bottom of the screen, and stacking two floating CTAs there would cover the
 * content people are trying to read.
 *
 * Appears after the first viewport so it doesn't compete with the hero's own
 * call-to-action, and hides once the user reaches the demo form itself.
 */
export default function StickyDemoCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;

      // Don't hover over the form the button points at.
      const demo = document.getElementById("demo");
      const atDemo = demo
        ? demo.getBoundingClientRect().top < window.innerHeight
        : false;

      setShow(past && !atDemo);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      // Straight to the lead form, not the /#demo re-pitch section: this bar
      // shows on every page, so the extra hop was costing every visitor a click.
      href="/#dealer"
      data-cta="sticky-demo"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`btn btn-primary fixed bottom-7 left-1/2 z-[90] hidden -translate-x-1/2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 md:inline-flex ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      Book a free demo →
    </a>
  );
}
