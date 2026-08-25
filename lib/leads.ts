/**
 * Lead payload validation and normalisation, shared by the `/api/leads` route
 * handler and its tests. Pure — no I/O, no Next.js imports — so it can be
 * exercised directly (`npm run test:leads`).
 *
 * ── Why this validates rather than trusts ──
 * The ERP's `leads` table is **entirely unvalidated**: every column is a
 * nullable `text` with no length limit (checked against the live schema
 * 2026-08-10). Nothing downstream rejects a 10 MB `name` or an empty `phone`.
 * And moving the webhook secret server-side necessarily makes `/api/leads` a
 * publicly callable endpoint, so this module is the only thing between the open
 * internet and a CRM that auto-assigns real dealers to phone real people.
 *
 * ── The rule every decision here answers to ──
 * **No control may destroy a real lead.** A lead is worth thousands of rupees;
 * spam costs a dealer one wasted call. So every rule below is biased to admit a
 * doubtful human rather than exclude a possible bot, and anything rejected
 * still reaches the owner through the route's fallback path.
 */

/** Field caps. Generous for real humans, fatal to anyone pasting a payload. */
export const LIMITS = {
  name: 120,
  phone: 24,
  location: 120,
  protecting: 60,
} as const;

/** The only values the form's <select> can legitimately produce. */
export const PROTECT_OPTIONS = [
  "Home / Apartment",
  "Shop / Retail",
  "Office",
  "Warehouse / Industrial",
  "Multiple sites",
] as const;

/**
 * Honeypot field name.
 *
 * ⚠️ Deliberately **not** `company`, `organization`, `address` or anything else
 * a password manager recognises. Chrome, 1Password and Dashlane all autofill
 * organisation fields from the user's Identity record, and `autocomplete="off"`
 * does not stop them — so a `company` trap would fire on exactly the kind of
 * equipped business buyer this site is trying to reach. `website` is not part
 * of any standard Identity schema, so autofill leaves it alone.
 */
export const HONEYPOT_FIELD = "website";

export type LeadInput = {
  name?: unknown;
  phone?: unknown;
  location?: unknown;
  protecting?: unknown;
  /** See HONEYPOT_FIELD. Hidden + tabindex=-1, so a human never reaches it. */
  website?: unknown;
};

export type ValidLead = {
  name: string;
  phone: string;
  location: string;
  protecting: string;
};

export type FieldErrors = Partial<Record<"name" | "phone" | "location", string>>;

export type ValidationResult =
  | { ok: true; lead: ValidLead }
  | { ok: false; honeypot: true; lead: ValidLead | null }
  | { ok: false; honeypot: false; fieldErrors: FieldErrors };

/** Collapses whitespace and trims. Guards against non-string JSON values. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Normalises an Indian phone number to E.164, accepting the many ways people
 * actually type them: `9876543210`, `+91 98765 43210`, `0161-2345678`,
 * `+919876543210`.
 *
 * ⚠️ **Mobiles AND landlines.** Two earlier drafts got this wrong, both in the
 * expensive direction. `/^[6-9]\d{9}$/` was mobile-only, which rejects the
 * switchboard numbers that factories, warehouses, schools and hospitals
 * actually give. `/^[2-9]\d{9}$/` then rejected every area code beginning with
 * 1 — Delhi (11), Chandigarh (172) and **Ludhiana (161), PGAK's own city.**
 *
 * The real rule: an Indian national significant number is 10 digits and `0` is
 * only ever the trunk prefix, so the leading digit is 1-9 once stripped. That
 * is the whole constraint, and this accepts exactly it.
 *
 * Yes, `[1-9]` admits some strings that are not assigned numbers. That is the
 * correct side to err on: an unassigned number costs a dealer one wasted call,
 * while a rejected real one costs the lead outright.
 *
 * The one refinement on top (owner-reported 2026-08-21, junk was reaching the
 * CRM): a handful of keyboard-mash patterns that pass the shape test but are
 * never real numbers — all ten digits identical (9999999999, 8888888888…) and
 * the two straight runs (1234567890 / 0123456789). Each is unassignable or a
 * placeholder in practice, so rejecting them cannot cost a real lead.
 */
export function normalisePhone(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");

  // Strip country code / trunk prefixes, longest and most specific first.
  let local = digits;
  if (local.length === 13 && local.startsWith("091")) local = local.slice(3);
  else if (local.length === 12 && local.startsWith("91")) local = local.slice(2);
  else if (local.length === 11 && local.startsWith("0")) local = local.slice(1);

  if (!/^[1-9]\d{9}$/.test(local)) return null;
  if (/^(\d)\1{9}$/.test(local)) return null; // all ten digits identical
  if (local === "1234567890" || local === "0123456789") return null;
  return `+91${local}`;
}

/**
 * Validates a raw JSON body.
 *
 * A tripped honeypot returns `honeypot: true` **and the parsed lead when it is
 * otherwise valid**, so the route can still push it to the owner. That matters
 * because the trap is not infallible: if some future password manager does fill
 * `website`, a real customer's lead must not evaporate just because a heuristic
 * fired. The route decides what to do; this module only reports.
 */
export function validateLead(input: LeadInput): ValidationResult {
  const fieldErrors: FieldErrors = {};

  const name = clean(input.name, LIMITS.name);
  if (name.length < 2) fieldErrors.name = "Please enter your name.";

  const phone = normalisePhone(input.phone);
  if (!phone) {
    fieldErrors.phone = "Please enter a valid 10-digit Indian phone number.";
  }

  const location = clean(input.location, LIMITS.location);
  if (location.length < 2) {
    fieldErrors.location = "Please enter your city or PIN code.";
  }

  // Unrecognised values fall back to the safe default rather than rejecting:
  // the field is a <select>, so anything else is a tampered or stale client,
  // and losing a lead over a dropdown would be absurd.
  const rawProtecting = clean(input.protecting, LIMITS.protecting);
  const protecting = (PROTECT_OPTIONS as readonly string[]).includes(rawProtecting)
    ? rawProtecting
    : PROTECT_OPTIONS[0];

  const lead: ValidLead | null =
    Object.keys(fieldErrors).length === 0 && phone
      ? { name, phone, location, protecting }
      : null;

  if (clean(input[HONEYPOT_FIELD as "website"], 200) !== "") {
    return { ok: false, honeypot: true, lead };
  }

  if (!lead) return { ok: false, honeypot: false, fieldErrors };
  return { ok: true, lead };
}

/**
 * Maps a validated lead onto the ERP webhook's payload shape.
 *
 * ⚠️ `location -> district` and `protecting -> message` are inherited from the
 * original static site and must not drift: the ERP routes a lead to a dealer by
 * `district`, so renaming that field silently breaks assignment. `email` is
 * sent empty because this form does not collect one.
 *
 * `source` and `message` are authored **here, on the server**, never taken from
 * the client. The old client-side code sent `source: window.location.hostname`,
 * which any caller could forge — poisoning the owner's attribution and putting
 * arbitrary attacker text into the CRM screen a dealer reads.
 *
 * `ref` is echoed into `message` as well as sent as its own field so it is
 * eyeball-visible in the existing CRM UI without a schema change.
 */
export function toErpPayload(
  lead: ValidLead,
  hostname: string,
  nowIso: string,
  ref: string,
) {
  return {
    name: lead.name,
    phone: lead.phone,
    district: lead.location,
    email: "",
    message: `Protecting: ${lead.protecting} | Submitted: ${nowIso} | Ref: ${ref}`,
    source: `Website (${hostname})`,
    ref,
  };
}
