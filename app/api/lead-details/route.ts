import { NextRequest, NextResponse } from "next/server";
import {
  cleanDetails,
  intakeConfigured,
  intakeRpc,
  tokenHash,
} from "@/lib/lead-intake";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const response = (body: object, status: number) =>
    NextResponse.json(body, {
      status,
      headers: { "Cache-Control": "no-store" },
    });
  if (!intakeConfigured()) return response({ ok: false }, 503);
  if (!req.headers.get("content-type")?.startsWith("application/json"))
    return response({ ok: false }, 415);
  const raw = await req.text();
  if (Buffer.byteLength(raw) > 2048) return response({ ok: false }, 413);
  try {
    const body = JSON.parse(raw),
      details = cleanDetails(body.details);
    if (
      !details ||
      !/^[-\w]{8,64}$/.test(body.ref ?? "") ||
      !/^[a-f0-9]{64}$/.test(body.token ?? "")
    )
      return response(
        {
          ok: false,
          message: "Use text only; do not include credentials or links.",
        },
        400,
      );
    const result = await intakeRpc("enrich_website_lead", {
      p_ref: body.ref,
      p_token_hash: tokenHash(body.token),
      p_details: details,
    });
    return response({ ok: result.saved === true }, result.saved ? 200 : 502);
  } catch {
    return response(
      {
        ok: false,
        message:
          "Details were not saved. Your original enquiry remains received.",
      },
      502,
    );
  }
}
