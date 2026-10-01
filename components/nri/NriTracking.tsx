"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

/**
 * The four named events the NRI brief asks for, plus scroll depth.
 *
 * Why a page-local tracker at all: components/ConversionEvents.tsx already
 * fires the sitewide `click_whatsapp` / `cta_click` pair on every WhatsApp
 * link, and those stay. This adds the *_nri suffixed events so this page's
 * performance can be read on its own — a WhatsApp click from an NRI who found
 * us from Brampton is a different thing from one off a Ludhiana factory page,
 * and in a single `click_whatsapp` total the two are indistinguishable.
 *
 * Note on naming: the brief calls these "GTM events". The site retired its GTM
 * container on 2026-09-19 (it held nothing but the same GA4 config) and now
 * loads GA4 directly — see app/layout.tsx. These fire as GA4 events under the
 * exact names the brief specifies, which is the same destination by a shorter
 * route. `faq_open_nri` is fired by NriFaq, which owns the open/close state.
 */
const DEPTHS = [50, 90] as const;

export default function NriTracking() {
  useEffect(() => {
    // ── Named CTA clicks ───────────────────────────────────────────────────
    // Delegated rather than per-button so a CTA added to this page later is
    // tracked without anyone remembering to wire it up.
    const onClick = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>("a");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      const placement = el.dataset.nri || "unknown";

      if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
        trackConversion("whatsapp_click_nri", { placement });
      } else if (el.dataset.nriAudit === "1") {
        trackConversion("audit_click_nri", { placement });
      }
    };

    // ── Scroll depth ───────────────────────────────────────────────────────
    // Fires once per threshold per page view, measured against the scrollable
    // distance rather than viewport height, so a tall phone and a short laptop
    // agree on what "half the page" means.
    //
    // ⚠️ Two things here are deliberate, and both were found by testing rather
    // than assumed:
    //
    //   1. The position is read from document.scrollingElement, not from
    //      window.scrollY. On this site window.scrollY stays at 0 while the
    //      page scrolls — app/buyer.css puts `overflow-y: auto` on <body>, so
    //      the scroll offset lives on an element, not on the window. A
    //      window.scrollY reading would have meant this event silently never
    //      fired, which is the worst kind of analytics bug: the dashboard
    //      shows a clean zero and looks like a finding.
    //
    //   2. The listener is on `document` in the CAPTURE phase. Scroll events
    //      do not bubble, so a listener on `window` misses a scroll raised by
    //      a nested container; capture on document sees all of them.
    const fired = new Set<number>();

    const scrollTop = () =>
      document.scrollingElement?.scrollTop ??
      document.documentElement.scrollTop ??
      document.body.scrollTop ??
      window.scrollY ??
      0;

    const onScroll = () => {
      if (fired.size === DEPTHS.length) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (scrollTop() / scrollable) * 100;
      for (const d of DEPTHS) {
        if (pct >= d && !fired.has(d)) {
          fired.add(d);
          trackConversion("scroll_depth_nri", { percent: d });
        }
      }
      if (fired.size === DEPTHS.length) {
        document.removeEventListener("scroll", onScroll, true);
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    // A visitor who lands mid-page on a #faq anchor is already past 50%.
    onScroll();

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  return null;
}
