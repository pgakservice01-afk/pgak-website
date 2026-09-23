import { NextResponse, type NextRequest } from "next/server";

import {
  postToRegister,
  registerConfig,
  secretMatches,
  type RegisterPayload,
  REGISTER_COLUMNS,
} from "@/lib/leadRegister";

/**
 * Replay one enquiry into the shared register (sheet + both alert emails).
 *
 * For the case the main route cannot solve on its own: the ERP took the lead
 * but the register was down, so a row is missing. The owner alert carries the
 * lead's details; this endpoint puts them into the register afterwards without
 * touching the ERP, and the register's own one-row-per-lead-id rule means a
 * replay of something that did land is a no-op rather than a duplicate.
 *
 * Protected by `LEAD_REPLAY_SECRET`. Absent secret = endpoint disabled, so it
 * cannot be left quietly open on an environment that never configured it.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

const MAX_BODY_BYTES = 8_192;

export async function POST(request: NextRequest) {
  const secret = (process.env.LEAD_REPLAY_SECRET ?? "").trim();
  if (!secret) {
    return NextResponse.json({ ok: false, error: "replay disabled" }, { status: 404 });
  }
  const offered = (request.headers.get("x-replay-secret") ?? "").trim();
  if (!secretMatches(offered, secret)) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }
  if (!registerConfig().ok) {
    return NextResponse.json({ ok: false, error: "register not configured" }, { status: 503 });
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "body too large" }, { status: 413 });
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "body is not JSON" }, { status: 400 });
  }
  if (typeof parsed.lead_id !== "string" || !parsed.lead_id.trim()) {
    return NextResponse.json({ ok: false, error: "lead_id required" }, { status: 400 });
  }

  // Only known columns travel on, each a capped string: a replay must not be a
  // way to write arbitrary fields into the sales sheet.
  const payload = Object.fromEntries(
    REGISTER_COLUMNS.map((key) => [key, String(parsed[key] ?? "").slice(0, 500)]),
  ) as RegisterPayload;

  const result = await postToRegister(payload, 8_000);
  console[result.ok ? "log" : "error"](
    result.ok ? "LEAD_REPLAY_OK" : "LEAD_REPLAY_FAILED",
    JSON.stringify({ leadId: payload.lead_id, row: result.row, error: result.error }),
  );

  return NextResponse.json(
    {
      ok: result.ok,
      row: result.row,
      emails: result.emails,
      error: result.error,
    },
    { status: result.ok ? 200 : 502, headers: { "Cache-Control": "no-store" } },
  );
}
