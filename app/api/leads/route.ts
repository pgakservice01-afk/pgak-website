import { NextResponse, type NextRequest } from "next/server";

import {
  cleanAttribution,
  toErpPayload,
  validateLead,
  type Attribution,
  type ValidLead,
} from "@/lib/leads";

/**
 * Server-side relay for the "Find a dealer" form.
 *
 * ── Why this route exists ──
 * The form used to POST straight from the browser to the ERP webhook, carrying
 * `NEXT_PUBLIC_WEBHOOK_SECRET`. Next inlines `NEXT_PUBLIC_*` at build time, so
 * the secret shipped in the public bundle and was readable by anyone viewing
 * source — verified in the deployed chunk on 2026-08-10, after 44 days live.
 * Relaying server-to-server keeps the secret in the server environment, and
 * incidentally removes CORS from the equation entirely (the `www.` CORS
 * blindness that bit this stack once cannot recur on a server-to-server call).
 *
 * ── The one rule everything here answers to ──
 * **A validated lead that reaches this function must never die here.** A lead
 * is worth thousands of rupees. So `notifyOwner()` fires on *every* path where
 * a validated lead did not land in the CRM — not just on exhausted retries.
 * That distinction is the whole point: if the secret rotation is botched, the
 * ERP returns 401 for every lead, and a design that only alerts on 5xx would
 * destroy 100% of leads while reporting nothing at all.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Headroom, not the guarantee. The guarantee is DEADLINE_MS below: it ensures
// we always return a JSON body the client can parse, rather than letting the
// platform kill us and serve its own HTML 504.
export const maxDuration = 20;

/** Hard internal budget. Worst case below lands ~6.4s, comfortably inside. */
const DEADLINE_MS = 8_500;
const ERP_ATTEMPT_MS = 3_000;
const ERP_RETRY_GAP_MS = 300;
const NOTIFY_MS = 3_000;
/**
 * Bodies are ~300 bytes; with attribution (page, campaign tags, a whole gclid)
 * they can approach 2 KB. 8 KB is still roomy for a human and fatal to a
 * pasted payload.
 */
const MAX_BODY_BYTES = 8_192;

const ALLOWED_ORIGINS = ["https://pgak.co.in", "https://www.pgak.co.in"];
const PREVIEW_ORIGIN = /^https:\/\/[a-z0-9-]+\.vercel\.app$/;
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

// ─── Rate limiting ────────────────────────────────────────────────────────────
// ⚠️ Best-effort ONLY, and deliberately lenient. This lives in one warm
// instance's memory: it is uncoordinated across instances and resets on every
// cold start. It stops casual repeat submission and nothing more — it is not a
// security control, and the real bound on abuse is the owner-side volume alert.
//
// 30 per 10 minutes rather than something tight, because Jio and Airtel put
// thousands of genuine Ludhiana customers behind one CGNAT address; a low cap
// would silently block real buyers, which is the failure this file exists to
// prevent.
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function clientKey(request: NextRequest): string {
  // `x-forwarded-for`'s first hop is client-settable, so prefer the values the
  // platform sets itself.
  const raw =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  // Collapse IPv6 to its /64, so one routed VPS allocation is one bucket
  // instead of 18 quintillion.
  if (raw.includes(":")) return raw.split(":").slice(0, 4).join(":");
  return raw;
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  if (hits.size > 5_000) hits.clear(); // crude unbounded-growth guard
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT;
}

// ─── Config ───────────────────────────────────────────────────────────────────
/**
 * Reads and *validates* config, rather than merely checking presence.
 *
 * A secret pasted into Vercel with a trailing newline makes an invalid HTTP
 * header value, so `fetch` throws `TypeError` before the request ever leaves.
 * That is indistinguishable from an ERP outage from the outside, and would have
 * the owner restarting a perfectly healthy Supabase. Catch it here and name it.
 *
 * The `NEXT_PUBLIC_*` fallbacks exist ONLY for the rollout window, so the deploy
 * and the Vercel env change do not have to be simultaneous. Remove them once
 * the server-only vars are set (see DEPLOY.md §6).
 */
function readConfig() {
  const endpoint = (
    process.env.ERP_LEADS_ENDPOINT ??
    process.env.NEXT_PUBLIC_ERP_ENDPOINT ??
    ""
  ).trim();
  const secret = (
    process.env.ERP_WEBHOOK_SECRET ??
    process.env.NEXT_PUBLIC_WEBHOOK_SECRET ??
    ""
  ).trim();

  if (!endpoint || !secret) return { ok: false as const, reason: "LEAD_CONFIG_MISSING" };
  // Printable ASCII only — anything else cannot be a legal header value.
  if (!/^[\x21-\x7e]+$/.test(secret)) {
    return { ok: false as const, reason: "LEAD_CONFIG_MALFORMED" };
  }
  return { ok: true as const, endpoint, secret };
}

// ─── Owner notification ───────────────────────────────────────────────────────
/**
 * Last-resort sink: pushes an undelivered lead to the owner directly.
 *
 * Configured with `LEAD_ALERT_TELEGRAM_TOKEN` + `LEAD_ALERT_TELEGRAM_CHAT_ID`.
 * When it is NOT configured this logs loudly and returns false — it never
 * throws, because a broken alarm must not also break the request.
 *
 * ⚠️ Until those vars are set, the only record of a lead that failed to reach
 * the ERP is a Vercel function log, which is retained about an hour on Hobby.
 * The customer still gets the WhatsApp fallback, so the lead is not silently
 * dropped from *their* side — but the owner learns nothing if they walk away.
 * Setting these two vars is what upgrades that from "probably fine" to "cannot
 * be lost". Note it sends the customer's name and phone to Telegram, which is a
 * real third-party data-processor decision, which is why it is opt-in.
 */
async function notifyOwner(
  lead: ValidLead,
  ref: string,
  why: string,
  budgetMs: number,
): Promise<boolean> {
  const token = (process.env.LEAD_ALERT_TELEGRAM_TOKEN ?? "").trim();
  const chatId = (process.env.LEAD_ALERT_TELEGRAM_CHAT_ID ?? "").trim();

  if (!token || !chatId) {
    console.error(
      "LEAD_NOTIFY_UNCONFIGURED",
      JSON.stringify({ ref, why, lead }),
    );
    return false;
  }
  if (budgetMs <= 0) {
    console.error("LEAD_NOTIFY_NO_BUDGET", JSON.stringify({ ref, why, lead }));
    return false;
  }

  const text =
    `🔴 PGAK website lead did NOT reach the CRM\n\n` +
    `Name: ${lead.name}\nPhone: ${lead.phone}\nCity: ${lead.location}\n` +
    `Protecting: ${lead.protecting}\n\nReason: ${why}\nRef: ${ref}\n\n` +
    `Call them back manually — this lead exists nowhere else.`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(budgetMs),
    });
    if (!res.ok) {
      console.error("LEAD_NOTIFY_FAILED", res.status, JSON.stringify({ ref, lead }));
      return false;
    }
    return true;
  } catch (err) {
    console.error(
      "LEAD_NOTIFY_THREW",
      String(err),
      JSON.stringify({ ref, why, lead }),
    );
    return false;
  }
}

// ─── New-lead alert (speed to lead) ───────────────────────────────────────────
/**
 * Pushes every DELIVERED lead to the owner's phone the moment it lands.
 *
 * The failure sink above exists so a lead cannot be lost; this one exists so a
 * lead cannot go cold. On 2026-09-02 the CRM held 30 leads that had never left
 * "New", some 55 days old. A lead phoned within the hour converts several
 * times more often than one found in a list days later — and the thank-you
 * screen now promises that hour, so someone has to hear about the lead.
 *
 * Uses the same Telegram bot as the failure alert. On by default whenever that
 * bot is configured; `LEAD_ALERT_NEW_LEADS=0` switches just this alert off.
 * Never throws and never fails the request: a broken alarm must not break the
 * lead it is announcing.
 */
function newLeadAlertsEnabled(): boolean {
  const flag = (process.env.LEAD_ALERT_NEW_LEADS ?? "").trim().toLowerCase();
  if (["0", "false", "off", "no"].includes(flag)) return false;
  return Boolean(
    (process.env.LEAD_ALERT_TELEGRAM_TOKEN ?? "").trim() &&
      (process.env.LEAD_ALERT_TELEGRAM_CHAT_ID ?? "").trim(),
  );
}

async function notifyNewLead(
  lead: ValidLead,
  ref: string,
  attribution: Attribution,
  budgetMs: number,
): Promise<boolean> {
  if (!newLeadAlertsEnabled() || budgetMs <= 0) return false;
  const token = (process.env.LEAD_ALERT_TELEGRAM_TOKEN ?? "").trim();
  const chatId = (process.env.LEAD_ALERT_TELEGRAM_CHAT_ID ?? "").trim();

  const campaign = attribution.utm_source
    ? [attribution.utm_source, attribution.utm_medium, attribution.utm_campaign]
        .filter(Boolean)
        .join(" / ")
    : "";
  const where = [
    attribution.page ? `Page: ${attribution.page}` : "",
    attribution.cta ? `Button: ${attribution.cta}` : "",
    campaign ? `Campaign: ${campaign}` : "",
    attribution.referrer ? `Referrer: ${attribution.referrer}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const text =
    `🟢 New website lead — call within the hour\n\n` +
    `Name: ${lead.name || "(not given)"}\n` +
    `Phone: ${lead.phone}\n` +
    `Cameras: ${lead.cameras || "(not given)"}\n` +
    `Protecting: ${lead.protecting}\n` +
    `City: ${lead.location || "(not given)"}\n` +
    (where ? `\n${where}\n` : "") +
    `\nRef: ${ref}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(budgetMs),
    });
    if (!res.ok) {
      console.error("LEAD_NEW_ALERT_FAILED", res.status, ref);
      return false;
    }
    return true;
  } catch (err) {
    console.error("LEAD_NEW_ALERT_THREW", String(err), ref);
    return false;
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────
type Outcome = {
  status: number;
  body: Record<string, unknown>;
};

function json({ status, body }: Outcome) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * The idempotency ref.
 *
 * Prefers the client's, because that is the whole point: the form mints one per
 * form instance and reuses it when the customer taps "Try again", so the ERP
 * can collapse the repeat instead of assigning a second dealer to phone the
 * same person. Minting a fresh one here would silently defeat that.
 *
 * Client input, so it is shape-checked and capped. An attacker controlling
 * their own ref can only collapse their own submissions, which helps us.
 */
function resolveRef(candidate: unknown): string {
  if (typeof candidate === "string") {
    const trimmed = candidate.trim();
    if (/^[A-Za-z0-9-]{8,64}$/.test(trimmed)) return trimmed;
  }
  return crypto.randomUUID();
}

export async function POST(request: NextRequest) {
  const deadline = Date.now() + DEADLINE_MS;
  const left = () => deadline - Date.now();
  // Provisional until the body is parsed; replaced by the client's ref below so
  // retries stay idempotent.
  let ref = crypto.randomUUID();

  // 1. Cheapest checks first — each one is quota protection, not style.
  if (!(request.headers.get("content-type") ?? "").startsWith("application/json")) {
    return json({ status: 415, body: { ok: false, delivered: false, ref, fallback: true } });
  }

  const raw = await request.text();
  // Measured on the ACTUAL bytes. `content-length` is absent under chunked
  // encoding and coerces to 0, which would wave through an unbounded body.
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return json({ status: 413, body: { ok: false, delivered: false, ref, fallback: true } });
  }

  const origin = request.headers.get("origin");
  if (origin) {
    const allowed =
      ALLOWED_ORIGINS.includes(origin) ||
      PREVIEW_ORIGIN.test(origin) ||
      // Local origins are accepted OUTSIDE production only. Kept on one line so
      // a developer fixing local dev cannot widen the production list by accident.
      (process.env.VERCEL_ENV !== "production" && LOCAL_ORIGIN.test(origin));
    if (!allowed) {
      return json({ status: 403, body: { ok: false, delivered: false, ref, fallback: true } });
    }
  }
  // A MISSING Origin is accepted: old in-app WebViews omit it, and rejecting
  // would lose real leads to defend against nothing (an attacker simply sets it).

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ status: 400, body: { ok: false, delivered: false, ref, fallback: true } });
  }

  ref = resolveRef((parsed as { ref?: unknown } | null)?.ref);

  const result = validateLead((parsed ?? {}) as Record<string, unknown>);

  // 2. Honeypot. Returns 200 so a spam operator gets no signal about which
  //    submissions were dropped — but still carries `fallback: true`, never a
  //    success body, so a real human whose password manager tripped the trap is
  //    shown the WhatsApp route instead of a fake "we'll call you".
  if (!result.ok && result.honeypot) {
    if (result.lead) {
      await notifyOwner(result.lead, ref, "honeypot tripped (may be a real customer)", Math.min(NOTIFY_MS, left()));
    }
    return json({ status: 200, body: { ok: false, delivered: false, ref, fallback: true } });
  }

  if (!result.ok) {
    // Nothing to preserve: without a usable phone number there is no lead to
    // rescue. Tell the user precisely which field to fix.
    return json({
      status: 400,
      body: { ok: false, delivered: false, ref, fieldErrors: result.fieldErrors },
    });
  }

  const lead = result.lead;
  const attribution = cleanAttribution(
    (parsed as { attribution?: unknown } | null)?.attribution,
  );

  if (rateLimited(clientKey(request))) {
    await notifyOwner(lead, ref, "rate limited", Math.min(NOTIFY_MS, left()));
    return json({ status: 429, body: { ok: false, delivered: false, ref, fallback: true } });
  }

  const config = readConfig();
  if (!config.ok) {
    console.error(config.reason, JSON.stringify({ ref }));
    await notifyOwner(lead, ref, config.reason, Math.min(NOTIFY_MS, left()));
    return json({ status: 503, body: { ok: false, delivered: false, ref, fallback: true } });
  }

  // 3. Relay. Two attempts on timeout/5xx only; never on 4xx, which cannot be
  //    fixed by repeating and could duplicate a lead the ERP already took.
  const payload = toErpPayload(
    lead,
    "www.pgak.co.in",
    new Date().toISOString(),
    ref,
    attribution,
  );
  let notified: Promise<boolean> | null = null;
  let lastReason = "unknown";
  let authFailed = false;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const budget = Math.min(ERP_ATTEMPT_MS, left() - 200);
    if (budget <= 0) {
      lastReason = "deadline reached before ERP could be contacted";
      break;
    }

    try {
      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": config.secret,
          // The ERP can use this to collapse a retry into the original row.
          "Idempotency-Key": ref,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(budget),
        cache: "no-store",
      });

      if (res.status === 401 || res.status === 403) {
        // The rotation's smoke alarm. Retrying cannot help, and this is the
        // failure mode that would otherwise destroy every lead in silence.
        authFailed = true;
        lastReason = `ERP rejected our secret (${res.status})`;
        console.error("LEAD_ERP_AUTH_FAILED", res.status, ref);
        break;
      }

      if (res.ok) {
        // A bare 2xx is NOT proof of persistence: a webhook whose broad
        // try/catch swallowed a database error still answers 200. `delivered`
        // must mean a row exists, so require an id before we say so — and
        // before we report a conversion to Meta.
        let id: unknown = null;
        try {
          const body = (await res.json()) as Record<string, unknown>;
          id = body?.id ?? body?.lead_id ?? (body?.duplicate ? ref : null);
        } catch {
          id = null;
        }

        if (id) {
          // Speed to lead: the owner hears about a delivered lead the moment
          // it lands, not when someone next opens the CRM. Bounded by
          // NOTIFY_MS so it cannot stall the customer's success response.
          await notifyNewLead(lead, ref, attribution, Math.min(NOTIFY_MS, left()));
          return json({ status: 200, body: { ok: true, delivered: true, ref } });
        }

        lastReason = "ERP accepted the request but returned no row id";
        console.error("LEAD_ERP_NO_ID", ref);
        break;
      }

      if (res.status >= 400 && res.status < 500) {
        lastReason = `ERP rejected the lead (${res.status})`;
        break;
      }

      lastReason = `ERP error ${res.status}`;
    } catch (err) {
      lastReason = `ERP unreachable (${String(err)})`;
    }

    // Start the owner push the moment the FIRST attempt fails, so it runs
    // concurrently with attempt 2 rather than queueing behind it. Without this
    // the notify would be the thing the deadline kills — i.e. exactly the sink
    // the design depends on.
    if (attempt === 1 && !notified) {
      notified = notifyOwner(lead, ref, lastReason, Math.min(NOTIFY_MS, left()));
      await new Promise((r) => setTimeout(r, ERP_RETRY_GAP_MS));
    }
  }

  if (!notified) {
    notified = notifyOwner(lead, ref, lastReason, Math.min(NOTIFY_MS, left()));
  }
  await notified;

  console.error("LEAD_ERP_UNREACHABLE", JSON.stringify({ ref, reason: lastReason }));

  return json({
    status: 502,
    body: {
      ok: false,
      delivered: false,
      ref,
      fallback: true,
      // 4xx and auth failures will not fix themselves; a retry only makes the
      // customer wait before seeing the same thing.
      retryable: !authFailed,
    },
  });
}

/**
 * Health probe. Booleans only — never values, never lengths.
 *
 * This exists so the rollout can prove against PRODUCTION that the config and
 * the alert sink are actually set, rather than inferring it from a preview
 * deploy. Env vars are scoped per environment, and "it worked on preview" is
 * exactly how a durability guarantee stays false for weeks.
 */
export async function GET() {
  const config = readConfig();
  return NextResponse.json(
    {
      ok: true,
      erp: config.ok,
      notify: Boolean(
        (process.env.LEAD_ALERT_TELEGRAM_TOKEN ?? "").trim() &&
          (process.env.LEAD_ALERT_TELEGRAM_CHAT_ID ?? "").trim(),
      ),
      newLeadAlerts: newLeadAlertsEnabled(),
      env: process.env.VERCEL_ENV ?? "development",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
