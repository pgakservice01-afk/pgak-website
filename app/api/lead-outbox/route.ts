import { NextRequest, NextResponse } from "next/server";
import {
  authorisedWorker,
  intakeConfigured,
  intakeRpc,
} from "@/lib/lead-intake";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  const reply = (body: object, status = 200) =>
    NextResponse.json(body, {
      status,
      headers: { "Cache-Control": "no-store" },
    });
  if (!authorisedWorker(req.headers.get("authorization")))
    return reply({ ok: false }, 401);
  if (!intakeConfigured()) return reply({ ok: false }, 503);
  try {
    const jobs = await intakeRpc("claim_website_outbox", { p_limit: 5 });
    let delivered = 0,
      queued = 0;
    for (const job of jobs) {
      let success = false,
        crmId: string | null = null,
        reason = "DELIVERY_FAILED";
      try {
        if (job.kind === "crm") {
          const url = process.env.ERP_LEADS_ENDPOINT,
            secret = process.env.ERP_WEBHOOK_SECRET;
          if (!url || !secret) throw new Error("ERP_CONFIG_MISSING");
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Webhook-Secret": secret,
              "Idempotency-Key": job.ref,
            },
            body: JSON.stringify(job.payload),
            signal: AbortSignal.timeout(6000),
            cache: "no-store",
          });
          const body = await res.json().catch(() => ({}));
          crmId = body.id ?? body.lead_id ?? null;
          success = res.ok && typeof crmId === "string" && crmId.length > 0;
          reason = `ERP_${res.status}_${crmId ? "ROW" : "NO_ROW"}`;
        } else {
          const token = process.env.LEAD_ALERT_TELEGRAM_TOKEN,
            chat = process.env.LEAD_ALERT_TELEGRAM_CHAT_ID;
          if (!token || !chat) throw new Error("NOTIFY_CONFIG_MISSING");
          const res = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chat,
                text: `PGAK enquiry received. Ref: ${job.ref}. Review the private website-sales intake queue. CRM delivery may still be queued.`,
              }),
              signal: AbortSignal.timeout(5000),
            },
          );
          success = res.ok;
          reason = `NOTIFY_${res.status}`;
        }
      } catch {
        reason = "DELIVERY_UNAVAILABLE";
      }
      await intakeRpc("finish_website_outbox", {
        p_id: job.id,
        p_lease: job.lease_token,
        p_success: success,
        p_crm_id: crmId,
        p_error: success ? null : reason,
      });
      if (success) delivered++;
      else queued++;
    }
    return reply({ ok: true, delivered, queued });
  } catch {
    console.error("LEAD_OUTBOX_UNAVAILABLE");
    return reply({ ok: false }, 503);
  }
}
