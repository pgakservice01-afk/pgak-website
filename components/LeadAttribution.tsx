"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureTouch } from "@/lib/attribution";

/**
 * Two small jobs, both about knowing where a lead came from. Renders nothing.
 *
 * 1. Records the visit's first touch (landing page, referrer host, campaign
 *    tags) so the lead forms can send it with the lead. See lib/attribution.ts.
 *
 * 2. When someone taps ANY WhatsApp link, appends the page they were on to the
 *    prefilled message — "[from AI CCTV Camera Price in India]". The person
 *    reading WhatsApp then knows whether this is a price question or an
 *    attendance enquiry without asking, and the site's WhatsApp links can stay
 *    plain static hrefs. Done in the capture phase so it runs before the
 *    browser follows the link; idempotent, so a second tap does not double it.
 */
export default function LeadAttribution() {
  const pathname = usePathname();

  useEffect(() => {
    captureTouch();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.<HTMLAnchorElement>('a[href*="wa.me/"]');
      if (!a) return;
      try {
        const url = new URL(a.href);
        const text = url.searchParams.get("text");
        if (text === null || text.includes("[from ")) return;

        // "Contact PGAK | PGAK" → "Contact PGAK"; fall back to the path.
        const title = document.title.replace(/\s*[|—–-]\s*PGAK.*$/i, "").trim();
        const label = (title || window.location.pathname).slice(0, 70);

        // Rebuilt by hand: URLSearchParams would encode spaces as "+", which
        // wa.me shows literally on some clients.
        a.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(
          `${text}\n\n[from ${label}]`,
        )}`;
      } catch {
        // Leave the link exactly as it was.
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
