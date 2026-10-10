/**
 * Delivery worker for the durable lead intake (db/lead-intake.sql).
 *
 * ── The states this file is responsible for ──
 * A website enquiry passes through distinct states, and none of them implies
 * the next one (see docs/pgak-growth-implementation-log/01-lead-states.md):
 *
 *   accepted   — /api/leads validated it and answered the browser
 *   stored     — accept_website_lead() wrote a receipt row (durable intake)
 *   delivered  — the ERP answered 2xx WITH a row id (kind = 'crm')
 *   notified   — Telegram answered 2xx (kind = 'notification')
 *   qualified  — a person decided it is a real opportunity (CRM stage, not here)
 *
 * This module moves `stored` jobs to `delivered` / `notified`, or back to the
 * queue with a coarse reason. It never decides `qualified`.
 *
 * Pure apart from the injected `rpc` and `fetchImpl`, so the success, failure,
 * timeout, retry and notification paths are testable without a database or a
 * network (`npm run test:outbox`).
 *
 * ── Privacy ──
 * Reasons are coarse codes ("ERP_500_NO_ROW"), never response bodies, which
 * could echo what the customer typed. The notification carries only the
 * reference; the contact details stay in the private intake database.
 */

export type OutboxJob = {
  id: number;
  ref: string;
  kind: "crm" | "notification";
  payload: unknown;
  lease_token: string;
  attempts?: number;
};

export type OutboxEnv = {
  erpEndpoint?: string;
  erpSecret?: string;
  telegramToken?: string;
  telegramChatId?: string;
};

export type Rpc = (name: string, args: Record<string, unknown>) => Promise<unknown>;
export type FetchLike = (
  input: string,
  init: {
    method: string;
    headers: Record<string, string>;
    body: string;
    signal?: AbortSignal;
    cache?: "no-store";
  },
) => Promise<{ ok: boolean; status: number; json: () => Promise<unknown> }>;

export type JobResult = {
  id: number;
  ref: string;
  kind: OutboxJob["kind"];
  success: boolean;
  crmId: string | null;
  reason: string;
};

export function outboxEnvFromProcess(): OutboxEnv {
  const read = (k: string) => (process.env[k] ?? "").trim() || undefined;
  return {
    erpEndpoint: read("ERP_LEADS_ENDPOINT"),
    erpSecret: read("ERP_WEBHOOK_SECRET"),
    telegramToken: read("LEAD_ALERT_TELEGRAM_TOKEN"),
    telegramChatId: read("LEAD_ALERT_TELEGRAM_CHAT_ID"),
  };
}

/** The ERP's row id, as a string, or null. Numbers count: a serial id is a row. */
export function crmIdFrom(body: unknown, ref: string): string | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  for (const v of [b.id, b.lead_id]) {
    if (typeof v === "string" && v.trim()) return v.trim().slice(0, 80);
    if (typeof v === "number" && Number.isFinite(v)) return String(v);
  }
  // The ERP collapses a repeated Idempotency-Key into the original row and
  // says so; that row exists, so the delivery is complete.
  return b.duplicate === true ? ref : null;
}

export async function deliverJob(
  job: OutboxJob,
  env: OutboxEnv,
  fetchImpl: FetchLike,
  timeoutMs = 6_000,
): Promise<JobResult> {
  const base = { id: job.id, ref: job.ref, kind: job.kind };
  try {
    if (job.kind === "crm") {
      if (!env.erpEndpoint || !env.erpSecret)
        return { ...base, success: false, crmId: null, reason: "ERP_CONFIG_MISSING" };
      const res = await fetchImpl(env.erpEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": env.erpSecret,
          "Idempotency-Key": job.ref,
        },
        body: JSON.stringify(job.payload),
        signal: AbortSignal.timeout(timeoutMs),
        cache: "no-store",
      });
      const body = await res.json().catch(() => null);
      const crmId = res.ok ? crmIdFrom(body, job.ref) : null;
      // A bare 2xx is not proof of a row: a webhook that swallowed a database
      // error still answers 200. Delivery means an id came back.
      const success = res.ok && crmId !== null;
      return {
        ...base,
        success,
        crmId,
        reason: success ? "ERP_ROW" : `ERP_${res.status}_${res.ok ? "NO_ROW" : "REJECTED"}`,
      };
    }

    if (!env.telegramToken || !env.telegramChatId)
      return { ...base, success: false, crmId: null, reason: "NOTIFY_CONFIG_MISSING" };
    const res = await fetchImpl(`https://api.telegram.org/bot${env.telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.telegramChatId,
        text:
          `PGAK enquiry received. Ref: ${job.ref}. ` +
          `Review the private website-sales intake queue. CRM delivery may still be queued.`,
      }),
      signal: AbortSignal.timeout(Math.min(timeoutMs, 5_000)),
    });
    return {
      ...base,
      success: res.ok,
      crmId: null,
      reason: res.ok ? "NOTIFIED" : `NOTIFY_${res.status}`,
    };
  } catch (err) {
    const timeout = err instanceof Error && /timeout|abort/i.test(err.name + err.message);
    return { ...base, success: false, crmId: null, reason: timeout ? "TIMEOUT" : "UNREACHABLE" };
  }
}

/**
 * Claim up to `limit` jobs, attempt each once, and record every outcome.
 *
 * Retry and backoff live in the database (finish_website_outbox): a failed job
 * goes back to `queued` with an exponential `next_attempt_at`, and to
 * `attention` after eight attempts. Running this twice cannot deliver a job
 * twice — each claim takes a lease, and finish() ignores a stale lease — and
 * the ERP collapses repeats by Idempotency-Key in any case.
 */
export async function runOutbox(
  rpc: Rpc,
  env: OutboxEnv,
  fetchImpl: FetchLike,
  limit = 5,
): Promise<{ delivered: number; queued: number; results: JobResult[] }> {
  const claimed = await rpc("claim_website_outbox", { p_limit: limit });
  const jobs = Array.isArray(claimed) ? (claimed as OutboxJob[]) : [];
  const results: JobResult[] = [];
  for (const job of jobs) {
    const result = await deliverJob(job, env, fetchImpl);
    try {
      await rpc("finish_website_outbox", {
        p_id: job.id,
        p_lease: job.lease_token,
        p_success: result.success,
        p_crm_id: result.crmId,
        p_error: result.success ? null : result.reason,
      });
    } catch {
      // The lease expires and the job is claimed again; the ERP's idempotency
      // key keeps that from becoming a second row. Report it as not done.
      result.success = false;
      result.reason = `${result.reason}+FINISH_FAILED`;
    }
    results.push(result);
  }
  const delivered = results.filter((r) => r.success).length;
  return { delivered, queued: results.length - delivered, results };
}
