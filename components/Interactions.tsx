"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global micro-interactions, attached after render (and re-attached on route
 * change). Content-safe — it only adds behavior, never changes markup/content:
 *   • subtle 3D tilt on glass cards (mouse-parallax)
 *   • material-style ripple on any .btn click
 * Disabled on touch / reduced-motion.
 */
export default function Interactions() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // ── 3D tilt on glass cards ──
    if (!reduce && fine) {
      document.querySelectorAll<HTMLElement>(".glass").forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          // instant follow — no easing while tracking the cursor (no wobble)
          card.style.transition = "transform 0s";
          card.style.transform = `perspective(800px) rotateX(${(-py * 5).toFixed(
            2,
          )}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-4px)`;
        };
        const onLeave = () => {
          // smooth settle back to rest
          card.style.transition = "transform 0.35s ease";
          card.style.transform = "";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
          card.style.transform = "";
        });
      });
    }

    // ── Magnetic buttons (subtle pull toward cursor) ──
    if (!reduce && fine) {
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          btn.style.transform = `translate(${(mx * 0.22).toFixed(1)}px, ${(
            my * 0.3
          ).toFixed(1)}px)`;
        };
        const onLeave = () => {
          btn.style.transform = "";
        };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
          btn.style.transform = "";
        });
      });
    }

    // ── Ripple on .btn (delegated) ──
    const onClick = (e: MouseEvent) => {
      if (reduce) return;
      const target = e.target as HTMLElement;
      const btn = target.closest<HTMLElement>(".btn");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const span = document.createElement("span");
      span.className = "pgak-ripple";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - r.left - size / 2}px`;
      span.style.top = `${e.clientY - r.top - size / 2}px`;
      btn.appendChild(span);
      window.setTimeout(() => span.remove(), 650);
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
