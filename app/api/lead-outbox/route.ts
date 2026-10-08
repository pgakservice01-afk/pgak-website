import { NextRequest, NextResponse } from "next/server";
import {
  authorisedWorker,
  intakeConfigured,
  intakeRpc,
} from "@/lib/lead-intake";
import { outboxEnvFromProcess, runOutbox } from "@/lib/lead-outbox";

/**
 * Retry backstop for the durable intake. /api/leads already attempts delivery
 * right after a receipt is stored (see `after()` there); this endpoint picks up
 * whatever that first attempt left queued. Call it on a schedule with
 * `Authorization: Bearer $LEAD_OUTBOX_SECRET` — see
 * docs/pgak-growth-implementation-log/01-lead-states.md for scheduler options.
 * Answers with counts only, never lead contents.
 */
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
    const { delivered, queued, results } = await runOutbox(
      intakeRpc,
      outboxEnvFromProcess(),
      fetch,
    );
    for (const r of results)
      if (!r.success)
        console.error(
          "LEAD_OUTBOX_RETRY",
          JSON.stringify({ ref: r.ref, kind: r.kind, reason: r.reason }),
        );
    return reply({ ok: true, delivered, queued });
  } catch {
    console.error("LEAD_OUTBOX_UNAVAILABLE");
    return reply({ ok: false }, 503);
  }
}
