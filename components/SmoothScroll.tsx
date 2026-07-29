"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling — gives the whole site that "camera-like", premium
 * agency glide. Also upgrades in-page anchor links (#how, #demo, …) to smooth
 * eased scrolls with a nav-height offset. Disabled for reduced-motion users so
 * accessibility and native jump-to behaviour are preserved.
 *
 * Existing scroll listeners (ScrollProgress, Reveal, HeroScene) keep working —
 * Lenis updates real scroll position and dispatches scroll events.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    // Expose for other components (e.g. BackToTop) so programmatic scrolls go
    // through Lenis instead of fighting its animation target.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth same-page anchor links
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const id = href.slice(hashIndex + 1);
      const path = href.slice(0, hashIndex);
      const samePage =
        path === "" || (path === "/" && location.pathname === "/") ||
        path === location.pathname;
      if (!id || !samePage) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      history.pushState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
