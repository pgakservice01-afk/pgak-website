"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fbTrack } from "@/lib/fbpixel";
import { useLang } from "@/components/LangProvider";
import { waHref } from "@/lib/whatsapp";
import { BUSINESS } from "@/lib/seo";

/**
 * Mobile-only bottom action bar — keeps the three highest-intent actions (Call,
 * WhatsApp, free audit) one tap away at every scroll depth. Most Indian traffic
 * is mobile, so this is the single biggest lead-gen lever. Desktop keeps the
 * header CTA + floating WhatsApp button instead.
 *
 * The audit button links to the form on the CURRENT page when there is one
 * (every commercial page embeds it), so the visitor stays where they are and
 * the lead is attributed to that page; otherwise it goes to the homepage form.
 *
 * ⚠️ No `Lead` pixel event here. It used to fire one on the tap, which told
 * Meta that pressing a button was a lead — the real event fires once, on a
 * server-confirmed CRM row (lib/lead-client.ts). Clicks are still counted by
 * the global [data-cta] tracker in app/layout.tsx.
 */
const WA_HREF = waHref(
  "Hi PGAK! I want to make my existing cameras intelligent. Can you tell me more?",
);
const TEL = BUSINESS.phoneE164;

export default function MobileActionBar() {
  const { t } = useLang();
  const pathname = usePathname();
  const [auditHref, setAuditHref] = useState("/#dealer");

  useEffect(() => {
    setAuditHref(document.getElementById("dealer") ? "#dealer" : "/#dealer");
  }, [pathname]);

  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-[95] flex items-stretch gap-2 border-t border-line bg-bg/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:hidden"
    >
      <a
        href={`tel:${TEL}`} data-cta="phone-mobilebar"
        onClick={() => fbTrack("Contact", { content_name: "Mobile Call" })}
        className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-line py-2 text-ink active:scale-95"
      >
        <PhoneIcon />
        <span className="text-[0.72rem] font-semibold">{t("Call", "कॉल")}</span>
      </a>
      <a
        href={WA_HREF}
        data-cta="whatsapp-mobilebar"
        target="_blank"
        rel="noopener"
        onClick={() => fbTrack("Contact", { content_name: "Mobile WhatsApp" })}
        className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-[#25D366]/40 bg-[#25D366]/15 py-2 text-[#57e58e] active:scale-95"
      >
        <WaIcon />
        <span className="text-[0.72rem] font-semibold">
          {t("WhatsApp", "व्हाट्सएप")}
        </span>
      </a>
      <a
        href={auditHref} data-cta="mobilebar-audit"
        className="flex flex-[1.4] flex-col items-center justify-center gap-1 rounded-xl bg-accent py-2 text-[#ffffff] active:scale-95"
      >
        <AuditIcon />
        <span className="text-[0.72rem] font-bold">
          {t("Free audit", "मुफ़्त ऑडिट")}
        </span>
      </a>
    </nav>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.34 4.97L2 22l5.23-1.37a9.98 9.98 0 0 0 4.8 1.22c5.5 0 9.96-4.45 9.96-9.94A9.9 9.9 0 0 0 12.04 2Zm4.54 12c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.15.16-.29.19-.54.06-.25-.12-1.05-.38-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
/** Clipboard with a tick — "we check your cameras". */
function AuditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="4" width="15" height="17.5" rx="2.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M8.5 13.5l2.4 2.4 4.8-5" />
    </svg>
  );
}
