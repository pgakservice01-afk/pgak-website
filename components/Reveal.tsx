"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type State = "hidden" | "reveal" | "instant";

/**
 * Reveal — fade/slide-in the first time an element approaches the viewport.
 *
 * Driven by direct scroll-position checks (not IntersectionObserver) so it is
 * robust against every way a page can move or render:
 *   - normal scrolling            → animated reveal as the element nears view
 *   - hash deep-links (/#audit),
 *     back/forward restoration,
 *     find-in-page jumps          → elements jumped PAST are shown instantly,
 *                                   never left invisible
 *   - tall elements on small
 *     screens                     → reveal keys off the element's top edge,
 *                                   so element height never blocks the trigger
 *   - degenerate viewports
 *     (0-height embeds/prerender) → content is shown rather than left hidden;
 *                                   visible-without-animation beats invisible
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<State>("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      // No DOM node to measure — never leave content invisible.
      setState("instant");
      return;
    }
    let done = false;

    const finish = (next: State) => {
      done = true;
      setState(next);
      cleanup();
    };
    const check = () => {
      if (done) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!vh) {
        // Viewport reports zero height (hidden embed, prerender) — show
        // everything instantly instead of gating on geometry that can't work.
        finish("instant");
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.height === 0) return;
      if (r.bottom < 0) {
        // Already scrolled past without ever being shown — show instantly.
        finish("instant");
      } else if (r.top < vh * 0.88) {
        finish("reveal");
      }
    };
    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    check();
    if (!done) {
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check);
    }
    return cleanup;
  }, []);

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={state === "hidden" ? undefined : { opacity: 1, y: 0 }}
      transition={
        state === "instant"
          ? { duration: 0 }
          : { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }
      }
    >
      {children}
    </MotionTag>
  );
}
