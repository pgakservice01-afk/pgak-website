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
import { trackLead, trackConversion } from "./analytics";
import { waHref } from "./whatsapp";
import { BUSINESS } from "./seo";

export type LeadValues = {
  context?: string;
  phone: string;
  cameras: string;
  employees?: string;
  name?: string;
  location?: string;
  protecting?: string;
  /** PROJECT_OPTIONS value when the form knows the journey. */
  project?: string;
  timeline?: string;
  email?: string;
  honeypot?: string;
};

export type SubmitOutcome =
  | { kind: "done"; receiptToken?: string }
  | { kind: "fieldErrors"; fieldErrors: FieldErrors }
  | { kind: "fallback"; retryable: boolean };

/** Refs whose conversion has already been reported. */
const converted = new Set<string>();
/** Same dedup rule as `converted`, one step earlier in the funnel. */
const attempted = new Set<string>();
/** So a customer retrying three times reports one failure, not three. */
const failureReported = new Set<string>();

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

/**
 * A submission that reached us and did not land.
 *
 * This is the event nobody thinks to add, and the one that matters most: a
 * silent delivery failure and a visitor who changed their mind look identical
 * in every other report. `reason` stays coarse on purpose — "network" or
 * "not_delivered", never the response body, which could carry what the
 * customer typed.
 */
function reportFailure(opts: { ref: string; cta: string; formName: string }, reason: string): void {
  if (failureReported.has(opts.ref)) return;
  failureReported.add(opts.ref);
  trackConversion("lead_delivery_failed", {
    form_name: opts.formName,
    cta: opts.cta,
    reason,
  });
}

export async function submitLead(
  values: LeadValues,
  opts: { ref: string; cta: string; formName: string },
): Promise<SubmitOutcome> {
  // Counted once per form instance, not per retry: `ref` is minted with the
  // form and reused on every attempt, so a customer who retries twice is one
  // person trying to reach us, not three. Without this the funnel jumps
  // straight from "started typing" to "server accepted it", and a delivery
  // problem looks identical to someone changing their mind.
  if (!attempted.has(opts.ref)) {
    attempted.add(opts.ref);
    trackConversion("form_submit_attempt", { form_name: opts.formName, cta: opts.cta });
  }
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: values.context ?? "",
        name: values.name ?? "",
        phone: values.phone,
        location: values.location ?? "",
        protecting: values.protecting ?? "",
        cameras: values.cameras,
        employees: values.employees ?? "",
        project: values.project ?? "",
        timeline: values.timeline ?? "",
        email: values.email ?? "",
        [HONEYPOT_FIELD]: values.honeypot ?? "",
        ref: opts.ref,
        form: opts.formName,
        attribution: readAttribution(opts.cta),
      }),
      // Lets the request finish even if the customer navigates away the
      // instant after tapping — a real behaviour on slow mobile connections.
      keepalive: true,
    });

    const body = (await res.json().catch(() => ({}))) as {
      delivered?: boolean;
      received?: boolean;
      receiptToken?: string;
      fieldErrors?: FieldErrors;
      retryable?: boolean;
    };

    if (body.fieldErrors && Object.keys(body.fieldErrors).length > 0) {
      return { kind: "fieldErrors", fieldErrors: body.fieldErrors };
    }

    if (res.ok && (body.received === true || body.delivered === true)) {
      if (!converted.has(opts.ref)) {
        converted.add(opts.ref);
        fbTrack("Lead", { content_name: opts.formName, currency: "INR" });
        trackConversion("form_submit", {
          form_name: opts.formName,
          cta: opts.cta,
        });
        if (opts.formName === "quick_quote_request")
          trackConversion("pricing_request", { form_name: opts.formName });
        else if (opts.formName === "demo_request")
          trackConversion("demo_request", { form_name: opts.formName });
        else
          trackConversion("assessment_request", { form_name: opts.formName });
        trackLead(opts.formName, {
          cta: opts.cta,
          cameras: values.cameras,
          protecting: values.protecting ?? "",
          project_type: values.project ?? "",
          // Random per-form id, not personal data: lets reports count one
          // accepted enquiry once even if an event is ever sent twice.
          lead_ref: opts.ref,
        });
      }
      return body.receiptToken
        ? { kind: "done", receiptToken: body.receiptToken }
        : { kind: "done" };
    }

    reportFailure(opts, "not_delivered");
    return { kind: "fallback", retryable: body.retryable !== false };
  } catch {
    // Network died before any answer. The lead may or may not have landed;
    // either way the customer keeps their data and a way through.
    reportFailure(opts, "network");
    return { kind: "fallback", retryable: true };
  }
}

/**
 * WhatsApp continuation after a successful submit. The call-back is promised
 * within the hour; this keeps the conversation moving in the meantime, and
 * gives the team the details without asking for them again.
 */
export function waContinueHref(_v: LeadValues, ref: string): string {
  return waHref(
    `Hi PGAK, I submitted a website enquiry. Reference: ${ref.slice(0, 8)}. I would like to discuss the next step.`,
  );
}
/** Do not place contact details or camera credentials in a shareable URL. */
export function waFallbackHref(_v: LeadValues): string {
  return waHref(
    "Hi PGAK, I could not confirm my website enquiry. Please help me arrange a technical conversation.",
  );
}

export const TEL_HREF = `tel:${BUSINESS.phoneE164}`;
export const PHONE_DISPLAY = BUSINESS.phone;
