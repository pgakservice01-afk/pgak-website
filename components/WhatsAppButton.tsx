"use client";

import { useEffect, useState } from "react";
import { fbTrack } from "@/lib/fbpixel";

const WA_NUMBER = "916283993600";
const WA_MESSAGE =
  "Hi PGAK! I want to make my existing cameras intelligent. Can you tell me more?";

const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

/**
 * Floating WhatsApp chat button — visible on every page, every scroll depth.
 * Indian buyers convert on WhatsApp far more than on forms, so this is the
 * always-available CTA. Expands with a label on desktop, icon-only on small
 * screens to stay out of the way.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  // Slide in after the visitor has seen the hero, so it doesn't fight the
  // first impression.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener"
      aria-label="Chat with PGAK on WhatsApp"
      onClick={() =>
        fbTrack("Contact", { content_name: "WhatsApp Floating Button" })
      }
      className={`group fixed bottom-5 right-5 z-[90] hidden items-center gap-2.5 rounded-full bg-[#25D366] py-3 pl-3.5 pr-3.5 text-[#062b1a] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-8px_rgba(37,211,102,0.8)] md:flex md:bottom-6 md:right-6 md:pr-5 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6 flex-none" />
      <span className="hidden text-sm font-semibold sm:inline">
        Chat on WhatsApp
      </span>
      <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-[#25D366] animate-pulseDot" />
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.34 4.97L2 22l5.23-1.37a9.98 9.98 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.45 9.96-9.94A9.9 9.9 0 0 0 12.04 2Zm0 18.16h-.01a8.28 8.28 0 0 1-4.22-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.22 8.22 0 0 1-1.27-4.37c0-4.56 3.72-8.27 8.28-8.27a8.24 8.24 0 0 1 8.27 8.28c0 4.56-3.72 8.21-8.28 8.21Zm4.54-6.16c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.15.16-.29.19-.54.06-.25-.12-1.05-.38-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
