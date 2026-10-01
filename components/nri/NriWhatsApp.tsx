"use client";

import { useEffect, useState } from "react";

/**
 * A WhatsApp CTA that tells us where the visitor came from.
 *
 * ── The problem this solves ──
 * wa.me does not forward query strings. Put `?utm_source=google` on this page
 * and the UTM dies the moment the visitor taps through — the WhatsApp message
 * arrives carrying nothing but the number it came from, so paid and organic
 * enquiries land in one undifferentiated pile. For a page whose entire success
 * metric is "qualified WhatsApp enquiries", that is the measurement that
 * matters most, and it is the one that silently goes missing.
 *
 * ── How it works ──
 * The campaign marker is appended to the *message body*, which is the only
 * part of a wa.me link that survives the hop. The visitor sends, and the first
 * inbound message already says `[via: google/cpc]`. Short, lowercase, in square
 * brackets so it reads as a reference rather than something the sender typed.
 *
 * ── Why the href is server-rendered first ──
 * The plain link ships in the HTML and works with no JavaScript at all; the
 * marker is added on mount. A visitor who taps before hydration gets a working
 * WhatsApp link with no tag, which is the correct failure mode — never a dead
 * CTA, and never a blocked tap waiting on a tracking script.
 *
 * Values are read from the URL, so they are untrusted input: the marker is
 * whitelist-filtered to [a-z0-9_-] and truncated before it goes anywhere near
 * the message body.
 */
const clean = (v: string | null): string =>
  (v || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 24);

export default function NriWhatsApp({
  message,
  children,
  className,
  placement,
}: {
  /** The pre-filled message, without any campaign marker. */
  message: string;
  children: React.ReactNode;
  className?: string;
  /** Which CTA on the page this is — hero, pricing, final band. */
  placement: string;
}) {
  const base = `https://wa.me/916283993600?text=${encodeURIComponent(message)}`;
  const [href, setHref] = useState(base);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const source = clean(q.get("utm_source"));
    if (!source) return; // Organic: send the message exactly as written.

    const medium = clean(q.get("utm_medium"));
    const campaign = clean(q.get("utm_campaign"));
    const ref = [source, medium, campaign].filter(Boolean).join("/");
    setHref(
      `https://wa.me/916283993600?text=${encodeURIComponent(`${message}\n\n[via: ${ref}]`)}`,
    );
  }, [message]);

  return (
    <a
      href={href}
      className={className}
      data-cta={`nri-whatsapp-${placement}`}
      data-nri={placement}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
