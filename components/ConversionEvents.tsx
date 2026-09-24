"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackConversion } from "@/lib/analytics";

/** Track intent separately from server-confirmed leads; never read field values. */
export default function ConversionEvents() {
  const pathname = usePathname();
  useEffect(() => {
    if (["/live", "/wall", "/billing"].includes(pathname)) return;
    if (document.querySelector('[data-money-page]')) {
      trackConversion("view_money_page", { use_case: pathname });
    }
    // Without this the funnel has no denominator: "form starts" can only be
    // read against how many people actually saw a form, not how many landed on
    // a page that happens to contain one far below the fold.
    const seen = new WeakSet<HTMLFormElement>();
    const io =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                const form = entry.target as HTMLFormElement;
                if (seen.has(form)) continue;
                seen.add(form);
                trackConversion("form_view", { form_name: form.dataset.leadForm });
                io?.unobserve(form);
              }
            },
            // Half of it on screen: a form clipped by one pixel was not "seen".
            { threshold: 0.5 },
          );
    if (io) {
      document
        .querySelectorAll<HTMLFormElement>("form[data-lead-form]")
        .forEach((form) => io.observe(form));
    }

    const started = new WeakSet<HTMLFormElement>();
    const onFocus = (event: FocusEvent) => {
      const field = event.target as HTMLElement | null;
      const form = field?.closest<HTMLFormElement>('form[data-lead-form]');
      if (!form || started.has(form)) return;
      started.add(form);
      trackConversion("form_start", { form_name: form.dataset.leadForm });
    };
    const onClick = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>('a,button[data-cta]');
      if (!el) return;
      const href = el.getAttribute("href") || "";
      const cta = el.dataset.cta || (href.startsWith("tel:") ? "phone" : "link");
      const params = { cta, use_case: pathname };
      // Keep the legacy event for existing dashboards, without transmitting link URLs or text.
      if (el.dataset.cta) trackConversion("cta_click", params);
      if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) trackConversion("click_whatsapp", params);
      else if (href.startsWith("tel:")) trackConversion("click_phone", params);
      else if ((el.dataset.intent === "demo" || /book.*demo/i.test(el.textContent || ""))) trackConversion("click_book_demo", params);
      else if (href === "#dealer" || href === "/free-audit" || el.dataset.intent === "assessment") trackConversion("click_assessment", params);
      if (el.hasAttribute("download") || /\.(pdf|csv|xlsx|zip)(?:\?|$)/i.test(href)) trackConversion("download_asset", { ...params, asset_path: href.split("?")[0] });
    };
    const onPlay = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      if (video.tagName === "VIDEO" && !video.autoplay) trackConversion("video_play", { video_name: video.getAttribute("aria-label") || "product_video" });
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick, true);
    document.addEventListener("play", onPlay, true);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("play", onPlay, true);
      io?.disconnect();
    };
  }, [pathname]);
  return null;
}
