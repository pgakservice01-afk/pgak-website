"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon, waOpener } from "@/components/WhatsAppButton";
import { fbTrack } from "@/lib/fbpixel";
import { BUSINESS } from "@/lib/seo";
export default function MobileActions() {
  const [hidden, setHidden] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const tracked = new Set<Element>(),
      visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target),
        );
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px 100px 0px" },
    );
    const sync = () => {
      tracked.forEach((f) => {
        if (!f.isConnected) {
          observer.unobserve(f);
          tracked.delete(f);
          visible.delete(f);
        }
      });
      document
        .querySelectorAll(
          'form[data-lead-form],form[aria-label="Optional project details"]',
        )
        .forEach((f) => {
          if (!tracked.has(f)) {
            tracked.add(f);
            observer.observe(f);
          }
        });
      setHidden(visible.size > 0);
    };
    sync();
    const mutations = new MutationObserver(sync);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [path]);
  if (["/live", "/wall", "/billing"].includes(path)) return null;
  // Call and WhatsApp first: phones bring about half the search clicks, and
  // until 2026-10-26 a phone visitor had no one-tap way to reach a person —
  // the floating WhatsApp button is desktop-only. "Request demo" gave way to
  // make room; /book-demo stays in the menu and on the pages that offer it.
  // ConversionEvents records the taps as click_phone / click_whatsapp.
  return (
    <nav
      aria-label="Mobile project actions"
      className="buyer-mobile-actions"
      hidden={hidden}
    >
      <a
        href={`tel:${BUSINESS.phoneE164}`}
        className="btn btn-ghost buyer-mobile-contact"
        data-cta="mobile-call"
        aria-label={`Call PGAK on ${BUSINESS.phone}`}
      >
        <PhoneIcon />
        <span>Call</span>
      </a>
      <a
        href={waOpener(path)}
        target="_blank"
        rel="noopener"
        className="btn buyer-mobile-contact buyer-mobile-whatsapp"
        data-cta="mobile-whatsapp"
        aria-label="Chat on WhatsApp with PGAK"
        onClick={() => fbTrack("Contact", { content_name: "WhatsApp Mobile Bar" })}
      >
        <WhatsAppIcon className="h-5 w-5 flex-none" />
        <span>WhatsApp</span>
      </a>
      <a
        href="/free-audit"
        className="btn btn-primary"
        data-cta="mobile-camera-check"
      >
        Check my cameras
      </a>
    </nav>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-none" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
