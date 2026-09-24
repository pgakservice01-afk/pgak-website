import { createHash, createHmac, timingSafeEqual } from "node:crypto";
/** Optional durable intake. Server-only; never expose keys in NEXT_PUBLIC variables. */
export function intakeConfigured() {
  return Boolean(
    process.env.LEAD_INTAKE_REST_URL && process.env.LEAD_INTAKE_SERVICE_KEY,
  );
}
export async function intakeRpc(name: string, args: Record<string, unknown>) {
  const base = process.env.LEAD_INTAKE_REST_URL?.replace(/\/$/, ""),
    key = process.env.LEAD_INTAKE_SERVICE_KEY;
  if (!base || !key) throw new Error("INTAKE_NOT_CONFIGURED");
  if (
    !base.startsWith("https://") &&
    !(
      process.env.NODE_ENV !== "production" &&
      /^http:\/\/127\.0\.0\.1[:/]/.test(base)
    )
  )
    throw new Error("INTAKE_HTTPS_REQUIRED");
  const res = await fetch(`${base}/rpc/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(4500),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`INTAKE_RPC_${res.status}`);
  return res.json();
}
export function receiptToken(ref: string, phone: string) {
  const key = process.env.LEAD_INTAKE_SERVICE_KEY;
  if (!key) throw new Error("INTAKE_NOT_CONFIGURED");
  return createHmac("sha256", key).update(`${ref}:${phone}`).digest("hex");
}
export const tokenHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export function authorisedWorker(value: string | null) {
  const secret = process.env.LEAD_OUTBOX_SECRET;
  if (!secret || !value) return false;
  const a = Buffer.from(value),
    b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}
export function cleanDetails(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>,
    out: Record<string, string> = {};
  for (const key of ["company", "location", "equipment", "timeline"]) {
    const v =
      typeof obj[key] === "string"
        ? (obj[key] as string).trim().slice(0, 180)
        : "";
    if (/(?:https?:\/\/|rtsp:|password|passwd|credential|token=)/i.test(v))
      return null;
    if (v) out[key] = v;
  }
  return Object.keys(out).length ? out : null;
}
