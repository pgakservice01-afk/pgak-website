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
 *
 * ── What a lead is (since 2026-09-03) ──
 * A phone number. That is the only required field. Camera count is asked
 * because it is the one number a quote needs; name, city and segment are
 * welcome but optional — the call collects them. Before this, four fields were
 * required and a pre-selected segment filed most leads as "Home / Apartment":
 * 24 of 33 CRM rows carried that default on 2026-09-02, so factory buyers were
 * being recorded as homeowners.
 */

/** Field caps. Generous for real humans, fatal to anyone pasting a payload. */
export const LIMITS = {
  name: 120,
  phone: 24,
  location: 120,
  protecting: 60,
  cameras: 20,
  /** RFC 5321's practical ceiling for a whole address. */
  email: 254,
  /** One attribution value: a path, a hostname, a campaign tag, a click id. */
  attribution: 160,
} as const;

/**
 * The only values the segment chips can legitimately produce. Factory first:
 * attendance for factories and warehouses is the business the site now leads
 * with, and order is the quiet signal of who the product is for.
 */
export const PROTECT_OPTIONS = [
  "Factory / Warehouse",
  "Office",
  "Shop / Retail",
  "Home / Apartment",
  "Multiple sites",
] as const;

/**
 * Recorded when the visitor made no choice. Deliberately NOT one of the real
 * options, so a blank can never be mistaken for an answer — the old default
 * ("Home / Apartment") was exactly that mistake.
 */
export const PROTECT_UNSPECIFIED = "Not specified";

/** Camera-count bands. Coarse on purpose: nobody counts before they enquire. */
export const CAMERA_OPTIONS = ["1–4", "5–15", "16–50", "50+", "Not sure"] as const;

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

/** Attribution keys the client may send. Anything else is dropped unread. */
export const ATTRIBUTION_KEYS = [
  "page",
  "cta",
  "landing",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

export type LeadInput = {
  name?: unknown;
  phone?: unknown;
  location?: unknown;
  protecting?: unknown;
  cameras?: unknown;
  /** Optional — see `normaliseEmail`. Empty string and absent are the same. */
  email?: unknown;
  /** See HONEYPOT_FIELD. Hidden + tabindex=-1, so a human never reaches it. */
  website?: unknown;
};

export type ValidLead = {
  /** Empty string when not given — the call collects it. */
  name: string;
  phone: string;
  /** Empty string when not given. Still the dealer-routing key when present. */
  location: string;
  /** One of PROTECT_OPTIONS, or PROTECT_UNSPECIFIED. */
  protecting: string;
  /** One of CAMERA_OPTIONS, or "" when not given. */
  cameras: string;
  /** Empty string when the customer chose not to give one. */
  email: string;
};

export type FieldErrors = Partial<
  Record<"name" | "phone" | "location" | "cameras" | "email", string>
>;

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
 * Normalises an optional email address, or reports it as unusable.
 *
 * Returns `""` for absent/blank — **that is a success, not a failure.** Email
 * is deliberately OPTIONAL: the dealer converts a lead by phoning it, and every
 * extra required field on a form this small costs more leads than the data is
 * worth. So a customer who gives only a phone number is a complete, valid lead.
 *
 * But a *malformed* address is worse than none — it looks like a working
 * follow-up channel and silently is not. So anything non-blank must parse, and
 * the customer is told when it doesn't.
 */
export function normaliseEmail(raw: unknown): string | null {
  if (raw === undefined || raw === null) return "";
  if (typeof raw !== "string") return null;
  const value = raw.trim().toLowerCase().slice(0, LIMITS.email);
  if (value === "") return "";
  if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/.test(value)) return null;
  return value;
}

export function validateLead(input: LeadInput): ValidationResult {
  const fieldErrors: FieldErrors = {};

  // Optional. A one-letter name is odd but not a reason to lose a lead.
  const name = clean(input.name, LIMITS.name);

  const phone = normalisePhone(input.phone);
  if (!phone) {
    fieldErrors.phone = "Please enter a valid 10-digit Indian phone number.";
  }

  // Optional since 2026-09-03: the compact hero form does not ask, and the
  // call collects it. When present it is still the dealer-routing key.
  const location = clean(input.location, LIMITS.location);

  // Optional: blank is fine, malformed is not.
  const email = normaliseEmail(input.email);
  if (email === null) {
    fieldErrors.email = "That email doesn't look right — or leave it blank.";
  }

  // Blank or unrecognised → "Not specified", never a real option. The field
  // is a set of chips, so anything else is a tampered or stale client, and
  // losing a lead over a chip would be absurd — but so would inventing an
  // answer the customer did not give.
  const rawProtecting = clean(input.protecting, LIMITS.protecting);
  const protecting = (PROTECT_OPTIONS as readonly string[]).includes(rawProtecting)
    ? rawProtecting
    : PROTECT_UNSPECIFIED;

  // Same rule for the camera band: unknown means "not given", not an error.
  const rawCameras = clean(input.cameras, LIMITS.cameras);
  const cameras = (CAMERA_OPTIONS as readonly string[]).includes(rawCameras)
    ? rawCameras
    : "";

  const lead: ValidLead | null =
    Object.keys(fieldErrors).length === 0 && phone && email !== null
      ? { name, phone, location, protecting, cameras, email }
      : null;

  if (clean(input[HONEYPOT_FIELD as "website"], 200) !== "") {
    return { ok: false, honeypot: true, lead };
  }

  if (!lead) return { ok: false, honeypot: false, fieldErrors };
  return { ok: true, lead };
}

/**
 * Whitelists and caps the attribution block the client sends. Unknown keys and
 * non-string values are dropped; every kept value is whitespace-collapsed and
 * capped, so nothing here can carry a payload into the CRM message.
 */
export function cleanAttribution(raw: unknown): Attribution {
  const out: Attribution = {};
  if (!raw || typeof raw !== "object") return out;
  const source = raw as Record<string, unknown>;
  for (const key of ATTRIBUTION_KEYS) {
    const value = clean(source[key], LIMITS.attribution);
    if (value) out[key] = value;
  }
  return out;
}

/**
 * The ERP's inbound route maps only name / email / phone / district / message /
 * source / ref, so everything the CRM has no column for — segment, camera band,
 * page, button, campaign — travels in `message`, one `key: value` per segment,
 * eyeball-readable in the CRM. Promote fields to real columns on the ERP side
 * when it is next touched.
 */
export function toErpPayload(
  lead: ValidLead,
  hostname: string,
  nowIso: string,
  ref: string,
  attribution: Attribution = {},
) {
  const campaign = attribution.utm_source
    ? [attribution.utm_source, attribution.utm_medium, attribution.utm_campaign]
        .filter(Boolean)
        .join(" / ")
    : "";

  const parts = [
    `Protecting: ${lead.protecting}`,
    lead.cameras ? `Cameras: ${lead.cameras}` : "",
    attribution.page ? `Page: ${attribution.page}` : "",
    attribution.cta ? `CTA: ${attribution.cta}` : "",
    attribution.landing ? `Landing: ${attribution.landing}` : "",
    campaign ? `Campaign: ${campaign}` : "",
    attribution.utm_term ? `Term: ${attribution.utm_term}` : "",
    attribution.utm_content ? `Ad: ${attribution.utm_content}` : "",
    attribution.gclid ? `gclid: ${attribution.gclid}` : "",
    attribution.fbclid ? `fbclid: ${attribution.fbclid}` : "",
    attribution.referrer ? `Referrer: ${attribution.referrer}` : "",
    `Submitted: ${nowIso}`,
    `Ref: ${ref}`,
  ].filter(Boolean);

  return {
    name: lead.name,
    phone: lead.phone,
    district: lead.location,
    email: lead.email,
    message: parts.join(" | "),
    source: `Website (${hostname})`,
    ref,
  };
}
