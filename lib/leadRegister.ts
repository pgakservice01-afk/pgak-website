import { createHmac, timingSafeEqual } from "node:crypto";

import type { Attribution, ValidLead } from "./leads.ts";
import { PROJECT_EXISTING, PROJECT_NEW } from "./leads.ts";
// Explicit extension: this module is also executed directly by
// `node --experimental-strip-types` in lib/leadRegister.test.ts.
import { aiReferrerName } from "./aiReferrers.ts";

/**
 * The shared sales register: one row per enquiry in the "PGAK — Master Leads"
 * Google Sheet, plus one alert email to each internal recipient.
 *
 * WHY A WEB APP AND NOT THE SHEETS API
 * A Google Apps Script web app bound to the sheet needs no service account, no
 * key file in Vercel and no paid tier: it runs as the sheet's owner, appends
 * the row and sends both emails in one call. The same pattern is already in
 * production on the sister site (its `SHEETS_URL`). The trade-off is that the
 * web app URL is reachable by anyone who learns it, so every request is signed
 * (see `signRegisterBody`) and the script rejects an unsigned or stale one.
 *
 * WHAT THIS IS NOT
 * It is not a replacement for the ERP. The ERP relay in app/api/leads/route.ts
 * is untouched and still decides `delivered` on its own; this sink runs after
 * it and reports its own per-destination status so one failing destination
 * never hides another.
 */

/** Column order in the sheet's "Leads" tab. The Apps Script owns the layout. */
export const REGISTER_COLUMNS = [
  "lead_id",
  "received_at",
  "name",
  "phone",
  "email",
  "company",
  "city",
  "category",
  "requirement",
  "product",
  "cameras",
  "message",
  "timeline",
  "source",
  "landing_page",
  "submitted_from",
  "form_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "click_ids",
  "erp_ref",
  "erp_status",
  "is_test",
] as const;

export type RegisterPayload = Record<(typeof REGISTER_COLUMNS)[number], string>;

export type RegisterResult = {
  ok: boolean;
  /** "new" | "duplicate" — a repeat of the same lead id must not add a row. */
  row: string;
  sheetSyncedAt: string;
  emails: { director: string; aditya: string };
  error: string;
};

const CATEGORY_BY_FORM: Record<string, string> = {
  checklist_request: "Checklist",
  quick_checklist_request: "Checklist",
};

/** Sales-facing requirement, derived from the journey the visitor chose. */
function requirementOf(lead: ValidLead): string {
  if (lead.project === PROJECT_NEW) return "New installation";
  if (lead.project === PROJECT_EXISTING) return "Existing CCTV upgrade";
  return "Other";
}

/**
 * Enquiry category. A checklist download is a researcher, not a buyer, and a
 * dealer application never reaches this endpoint (it goes to WhatsApp), so
 * anything else here is a customer enquiry.
 */
function categoryOf(formId: string, cta: string): string {
  if (CATEGORY_BY_FORM[formId]) return CATEGORY_BY_FORM[formId];
  if (/checklist/i.test(formId) || /checklist/i.test(cta)) return "Checklist";
  if (/dealer-application/i.test(cta)) return "Dealer";
  return "Customer";
}

/**
 * What they asked about, from the page they submitted on — `/factory-security`
 * → "factory security". Never invented: blank when the page is unknown.
 */
function productOf(page: string): string {
  const slug = (page || "").split("?")[0].replace(/^\/+|\/+$/g, "");
  if (!slug || slug === "/") return "Homepage enquiry";
  return slug.split("/").pop()!.replace(/-/g, " ");
}

function sourceOf(a: Attribution): string {
  if (a.utm_source) return [a.utm_source, a.utm_medium].filter(Boolean).join(" / ");
  if (a.gclid) return "Google Ads";
  if (a.fbclid) return "Meta ads";
  // Named before the generic referral line so sales can see at a glance that
  // an assistant recommended us — the one channel no campaign tag ever marks.
  const assistant = aiReferrerName(a.referrer);
  if (assistant) return `AI assistant: ${assistant}`;
  if (a.referrer) return `Referral: ${a.referrer}`;
  return "Website (direct/organic)";
}

/** Marks records made by the test harness so sales can filter them out. */
export function isTestRef(ref: string): boolean {
  return /^test[-_]/i.test(ref);
}

export function buildRegisterPayload(
  lead: ValidLead,
  ref: string,
  attribution: Attribution,
  opts: { formId?: string; erpRef?: string; erpStatus: string; nowIso?: string },
): RegisterPayload {
  const page = attribution.page ?? "";
  return {
    lead_id: ref,
    received_at: opts.nowIso ?? new Date().toISOString(),
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    // Filled since 2026-09-24 by the homepage assessment form, which asks for
    // it directly. Still empty for every other form — never guessed from an
    // email domain, which is how a gmail.com lead becomes "Gmail".
    company: lead.company,
    city: lead.location,
    category: categoryOf(opts.formId ?? "", attribution.cta ?? ""),
    requirement: requirementOf(lead),
    product: productOf(page),
    cameras: lead.cameras,
    // The homepage assessment form collects one free-text requirement; every
    // other form is structured answers only. Where the customer wrote
    // something, it leads — their sentence is worth more to the person making
    // the call than the chips they tapped afterwards.
    message: [
      lead.requirement,
      lead.contactTime ? `Best time to call: ${lead.contactTime}` : "",
      lead.protecting ? `Protecting: ${lead.protecting}` : "",
      lead.employees ? `People clocking in: ${lead.employees}` : "",
    ]
      .filter(Boolean)
      .join(" · "),
    timeline: lead.timeline,
    source: sourceOf(attribution),
    landing_page: attribution.landing ?? "",
    submitted_from: page,
    form_id: opts.formId ?? attribution.cta ?? "",
    utm_source: attribution.utm_source ?? "",
    utm_medium: attribution.utm_medium ?? "",
    utm_campaign: attribution.utm_campaign ?? "",
    utm_content: attribution.utm_content ?? "",
    click_ids: [
      attribution.gclid ? `gclid:${attribution.gclid}` : "",
      attribution.fbclid ? `fbclid:${attribution.fbclid}` : "",
    ]
      .filter(Boolean)
      .join(" "),
    erp_ref: opts.erpRef ?? "",
    erp_status: opts.erpStatus,
    is_test: isTestRef(ref) ? "TEST" : "",
  };
}

/**
 * HMAC-SHA256 over `timestamp.body`, so a captured request cannot be replayed
 * days later and an attacker who finds the web app URL cannot write rows.
 *
 * `body` is the BASE64 of the UTF-8 payload, never raw JSON. Apps Script's
 * Utilities.computeHmacSha256Signature does not default to UTF-8, so one
 * non-ASCII character — the en dash in "5–15", or any Hindi text — produced a
 * different digest there: verified against the live deployment on 2026-09-23,
 * where an ASCII payload was accepted and the same payload with an en dash
 * came back "bad signature". Signing ASCII base64 removes the charset question
 * on both sides, and the receiver decodes instead of re-serialising, so JSON
 * key order cannot drift either.
 */
export function signRegisterBody(body: string, secret: string, timestamp: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

/** Base64 of the UTF-8 payload — what travels, and what is signed. */
export function encodeRegisterBody(payload: RegisterPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}

/** Constant-time compare, for the replay endpoint. */
export function secretMatches(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length || left.length === 0) return false;
  return timingSafeEqual(left, right);
}

/**
 * Which specific piece of the register config is missing or wrong.
 *
 * `registerConfig()` answers one boolean, and on 2026-09-23 that was not
 * enough: production read `"register": false` for a day and the only way to
 * tell WHY was to open Vercel. There are four distinct ways to land on false
 * and they need four different fixes, so this names the one that applies.
 *
 * Values never leave the server. The secret is reported only as set/not set,
 * and the URL only as three booleans — the `/exec` URL is itself a capability
 * (anyone who learns it can post to the sheet, which is why every request is
 * signed), so it must not be echoed by a public endpoint either.
 *
 * `endsWithExec` is here because it is the mistake people actually make:
 * pasting the Apps Script editor URL, or the `/dev` deployment, instead of the
 * `/exec` one from Deploy → New deployment.
 */
export type RegisterConfigDetail = {
  urlSet: boolean;
  urlHttps: boolean;
  endsWithExec: boolean;
  secretSet: boolean;
  /** The one thing to fix next, or "" when the config is complete. */
  nextAction: string;
};

export function registerConfigDetail(): RegisterConfigDetail {
  const url = (process.env.LEAD_REGISTER_URL ?? "").trim();
  const secret = (process.env.LEAD_REGISTER_SECRET ?? "").trim();
  const urlSet = url.length > 0;
  const urlHttps = /^https:\/\//.test(url);
  const endsWithExec = /\/exec$/.test(url);
  const secretSet = secret.length > 0;

  let nextAction = "";
  if (!urlSet && !secretSet) {
    nextAction =
      "Set LEAD_REGISTER_URL and LEAD_REGISTER_SECRET in Vercel (Production), then redeploy — env vars do not apply to an existing deployment.";
  } else if (!urlSet) {
    nextAction = "LEAD_REGISTER_SECRET is set but LEAD_REGISTER_URL is not. Add the Apps Script /exec URL, then redeploy.";
  } else if (!secretSet) {
    nextAction = "LEAD_REGISTER_URL is set but LEAD_REGISTER_SECRET is not. Add the script's SECRET property value, then redeploy.";
  } else if (!urlHttps) {
    nextAction = "LEAD_REGISTER_URL is set but is not https:// — Apps Script /exec URLs are https. Correct it, then redeploy.";
  } else if (!endsWithExec) {
    nextAction =
      "LEAD_REGISTER_URL does not end in /exec — this is usually the script editor or /dev URL. Use Deploy → New deployment → Web app, then redeploy.";
  }

  return { urlSet, urlHttps, endsWithExec, secretSet, nextAction };
}

export function registerConfig(): { ok: true; url: string; secret: string } | { ok: false } {
  const url = (process.env.LEAD_REGISTER_URL ?? "").trim();
  const secret = (process.env.LEAD_REGISTER_SECRET ?? "").trim();
  if (!url || !secret) return { ok: false };
  // https only, except for a local mock outside production — the secret and
  // the customer's details must never cross the internet in the clear.
  const local =
    process.env.VERCEL_ENV !== "production" &&
    /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(url);
  if (!/^https:\/\//.test(url) && !local) return { ok: false };
  return { ok: true, url, secret };
}

const EMPTY: RegisterResult = {
  ok: false,
  row: "",
  sheetSyncedAt: "",
  emails: { director: "not attempted", aditya: "not attempted" },
  error: "",
};

/**
 * Post one enquiry to the register. Bounded: at most two attempts inside
 * `budgetMs` total, and never throws — a failure here must not cost the lead,
 * which the ERP and the Telegram alert already hold.
 *
 * Apps Script answers HTTP 200 even when its own handler threw, so success is
 * only believed when the JSON says so.
 */
export async function postToRegister(
  payload: RegisterPayload,
  budgetMs: number,
  fetchImpl: typeof fetch = fetch,
): Promise<RegisterResult> {
  const config = registerConfig();
  if (!config.ok) return { ...EMPTY, error: "register not configured" };
  const deadline = Date.now() + budgetMs;
  // Apps Script cannot read custom request headers, so the timestamp and the
  // signature travel in the body beside the base64 payload.
  const body = encodeRegisterBody(payload);
  let error = "no attempt made";

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const left = deadline - Date.now();
    if (left < 400) break;
    const timestamp = String(Date.now());
    try {
      const envelope = JSON.stringify({
        __b64: body,
        __ts: timestamp,
        __sig: signRegisterBody(body, config.secret, timestamp),
      });
      const res = await fetchImpl(config.url, {
        method: "POST",
        headers: {
          // Apps Script only exposes the raw body for text/plain; sending
          // application/json triggers a CORS preflight it cannot answer.
          "Content-Type": "text/plain;charset=utf-8",
          "Idempotency-Key": payload.lead_id,
        },
        body: envelope,
        signal: AbortSignal.timeout(Math.min(left, 4_000)),
        redirect: "follow",
        cache: "no-store",
      });
      const text = await res.text();
      let reply: Partial<RegisterResult> & { ok?: boolean } = {};
      try {
        reply = JSON.parse(text) as typeof reply;
      } catch {
        error = `register replied with non-JSON (${res.status})`;
        continue;
      }
      if (reply.ok === true) {
        return {
          ok: true,
          row: String(reply.row ?? "new"),
          sheetSyncedAt: String(reply.sheetSyncedAt ?? new Date().toISOString()),
          emails: {
            director: String(reply.emails?.director ?? "unknown"),
            aditya: String(reply.emails?.aditya ?? "unknown"),
          },
          error: String(reply.error ?? ""),
        };
      }
      error = String(reply.error ?? `register refused the row (${res.status})`);
      // A refusal is a decision, not a hiccup: repeating it wastes the budget.
      if (res.status === 401 || res.status === 403) break;
    } catch (err) {
      error = `register unreachable (${String(err)})`;
    }
  }

  return { ...EMPTY, error };
}
