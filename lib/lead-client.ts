/**
 * Browser-side lead submission, shared by every lead form on the site.
 *
 * Two forms post leads — the compact one in the hero and the full one at
 * `#dealer` — and they must behave identically on the things that matter:
 *
 *   - Attribution (page, button, campaign) rides along with every lead.
 *   - Conversions fire ONCE per form session, and only on a server-confirmed
 *     CRM row. Meta optimises ad spend on these events, so counting a failed
 *     or duplicated submit would spend real money chasing nobody.
 *   - A failure never loses what the customer typed: callers keep their form
 *     mounted and offer the WhatsApp / phone fallbacks built here.
 */
import { HONEYPOT_FIELD, type FieldErrors } from "./leads";
import { readAttribution } from "./attribution";
import { fbTrack } from "./fbpixel";
import { trackLead } from "./analytics";
import { waHref } from "./whatsapp";
import { BUSINESS } from "./seo";

export type LeadValues = {
  phone: string;
  cameras: string;
  name?: string;
  location?: string;
  protecting?: string;
  email?: string;
  honeypot?: string;
};

export type SubmitOutcome =
  | { kind: "done" }
  | { kind: "fieldErrors"; fieldErrors: FieldErrors }
  | { kind: "fallback"; retryable: boolean };

/** Refs whose conversion has already been reported. */
const converted = new Set<string>();

/**
 * One ref per form instance, reused on every retry, so the ERP can collapse a
 * repeat onto the original row instead of assigning two dealers to one person.
 * Matches the server's `resolveRef` shape: 8–64 of [A-Za-z0-9-].
 */
export function mintRef(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return String(Math.random()).slice(2).padEnd(12, "0");
}

export async function submitLead(
  values: LeadValues,
  opts: { ref: string; cta: string; formName: string },
): Promise<SubmitOutcome> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name ?? "",
        phone: values.phone,
        location: values.location ?? "",
        protecting: values.protecting ?? "",
        cameras: values.cameras,
        email: values.email ?? "",
        [HONEYPOT_FIELD]: values.honeypot ?? "",
        ref: opts.ref,
        attribution: readAttribution(opts.cta),
      }),
      // Lets the request finish even if the customer navigates away the
      // instant after tapping — a real behaviour on slow mobile connections.
      keepalive: true,
    });

    const body = (await res.json().catch(() => ({}))) as {
      delivered?: boolean;
      fieldErrors?: FieldErrors;
      retryable?: boolean;
    };

    if (body.fieldErrors && Object.keys(body.fieldErrors).length > 0) {
      return { kind: "fieldErrors", fieldErrors: body.fieldErrors };
    }

    if (res.ok && body.delivered) {
      if (!converted.has(opts.ref)) {
        converted.add(opts.ref);
        fbTrack("Lead", { content_name: opts.formName, currency: "INR" });
        trackLead(opts.formName, {
          cta: opts.cta,
          cameras: values.cameras,
          protecting: values.protecting ?? "",
        });
      }
      return { kind: "done" };
    }

    return { kind: "fallback", retryable: body.retryable !== false };
  } catch {
    // Network died before any answer. The lead may or may not have landed;
    // either way the customer keeps their data and a way through.
    return { kind: "fallback", retryable: true };
  }
}

/**
 * WhatsApp continuation after a successful submit. The call-back is promised
 * within the hour; this keeps the conversation moving in the meantime, and
 * gives the team the details without asking for them again.
 */
export function waContinueHref(v: LeadValues, ref: string): string {
  const lines = [
    "Hi PGAK, I just requested a free camera audit on your website.",
    v.name ? `Name: ${v.name}` : "",
    `Phone: ${v.phone}`,
    v.cameras ? `Cameras: ${v.cameras}` : "",
    v.protecting ? `Protecting: ${v.protecting}` : "",
    v.location ? `City: ${v.location}` : "",
    `Ref: ${ref.slice(0, 8)}`,
  ].filter(Boolean);
  return waHref(lines.join("\n"));
}

/** WhatsApp fallback when the automated path did not deliver. */
export function waFallbackHref(v: LeadValues): string {
  const lines = [
    "Hi PGAK, I tried the website form but it didn't go through.",
    "",
    v.name ? `Name: ${v.name}` : "",
    `Phone: ${v.phone}`,
    v.cameras ? `Cameras: ${v.cameras}` : "",
    v.protecting ? `Protecting: ${v.protecting}` : "",
    v.location ? `City: ${v.location}` : "",
  ].filter((line, i) => line !== "" || i === 1);
  return waHref(lines.join("\n"));
}

export const TEL_HREF = `tel:${BUSINESS.phoneE164}`;
export const PHONE_DISPLAY = BUSINESS.phone;
