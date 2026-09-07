#!/usr/bin/env node
/**
 * A mock of the PGAK cloud API for local website work: sign-in, cameras,
 * devices and billing, plus a pretend Razorpay page.
 *
 * Why it exists: production cannot be reached from localhost (its CORS list is
 * locked to https://pgak.co.in, on purpose), and a real checkout needs a real
 * autopay mandate on a real bank account. This serves the same contracts the
 * website's client code relies on — the same paths, field names and error
 * shapes as api/app/routers in pgak-customer-cloud — so /billing and /wall can
 * be driven end to end on a laptop with nothing real behind them.
 *
 *   node scripts/mock-cloud.mjs          # http://127.0.0.1:8000/api/v1
 *   npm run dev                          # with NEXT_PUBLIC_PGAK_API=http://127.0.0.1:8000/api/v1
 *
 * Sign in with any email and any password. An email starting with "viewer"
 * gets a viewer role (can look, cannot buy or cancel); anything else is an
 * owner. The password "wrong" answers LOGIN_BAD_CREDENTIALS, like the real API.
 *
 * "Paying" on the pretend Razorpay page flips the cameras to mode "face"
 * after a few seconds, the way the real webhook does — that delay is what the
 * billing page's "waiting" state exists for, so keep it.
 *
 * State lives in memory and resets on restart. Nothing here is a secret.
 */
import http from "node:http";
import { randomBytes } from "node:crypto";

const PORT = Number(process.env.MOCK_PORT || 8000);
const PREFIX = "/api/v1";
const UNIT_PAISE = 100_000; // Rs 1000 per camera per month, like the live plan today
const WEBHOOK_DELAY_MS = 4000;

const now = () => new Date().toISOString();
const plusDays = (d) => new Date(Date.now() + d * 86_400_000).toISOString();

const devices = [
  { id: "d1", name: "Main gate box", serial_number: "MOCK-01", status: "online", last_seen_at: now(), version: "0.3.0-tunnel", tailscale_ip: null, created_at: "2026-07-01T00:00:00Z", live_only: false },
  { id: "d2", name: "Warehouse box", serial_number: "MOCK-02", status: "online", last_seen_at: now(), version: "0.3.0-tunnel", tailscale_ip: null, created_at: "2026-07-15T00:00:00Z", live_only: false },
];

const cam = (id, device_id, name, location, mode, is_online = true) => ({
  id, device_id, name, location, rtsp_url_masked: "rtsp://***", is_active: true, mode,
  settings: {}, zones: [], is_online, last_frame_at: now(), last_error: null, fps: 12,
  camera_score: null, created_at: "2026-07-01T00:00:00Z",
});
const cameras = [
  cam("c1", "d1", "Main gate", "Entry", "face"),
  cam("c2", "d1", "Reception", null, "free"),
  cam("c3", "d2", "Loading bay", "Dock 2", "free", false),
  cam("c4", "d2", "Stores", null, "free"),
];

// One mandate already live, covering c1 — so the page has a plan card to show.
let seq = 1;
const subs = [
  {
    id: "sub_MOCK0001", plan_id: "plan_mock", status: "active", camera_ids: ["c1"],
    unit_amount_paise: UNIT_PAISE, current_end: plusDays(23), cancel_scheduled_at: null,
    created_at: "2026-08-15T09:00:00Z", updated_at: now(),
  },
];

const tokens = new Map(); // access token -> { email, role }

/* ───────────────────────────── helpers ───────────────────────────── */

function send(res, status, body, extra = {}) {
  const data = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": typeof body === "string" ? "text/html; charset=utf-8" : "application/json",
    "Content-Length": Buffer.byteLength(data),
    ...extra,
  });
  res.end(data);
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => resolve(raw));
  });
}

function user(req) {
  const h = req.headers.authorization || "";
  const tok = h.startsWith("Bearer ") ? h.slice(7) : "";
  return tokens.get(tok) || null;
}

const LIVE = new Set(["active", "authenticated", "charged"]);

function subView(s) {
  const live = LIVE.has(s.status);
  const renews = live && s.current_end && !s.cancel_scheduled_at && new Date(s.current_end) > new Date();
  const cams = s.camera_ids.map((id) => cameras.find((c) => c.id === id)).filter(Boolean);
  return {
    razorpay_subscription_id: s.id,
    razorpay_plan_id: s.plan_id,
    status: s.status,
    cameras: cams.map((c) => ({ id: c.id, name: c.name, mode: c.mode })),
    visible_camera_count: cams.length,
    unit_amount_paise: s.unit_amount_paise,
    currency: "INR",
    current_end: s.current_end,
    renews_at: renews ? s.current_end : null,
    cancel_scheduled_at: s.cancel_scheduled_at,
    created_at: s.created_at,
    updated_at: s.updated_at,
  };
}

function requireAdmin(req, res) {
  const u = user(req);
  if (!u) {
    send(res, 401, { detail: "Unauthorized" });
    return null;
  }
  if (u.role !== "owner" && u.role !== "admin") {
    send(res, 403, { detail: "This action requires an owner or admin account." });
    return null;
  }
  return u;
}

/* ───────────────────────────── routes ────────────────────────────── */

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || "*";
  const cors = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };
  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    res.end();
    return;
  }
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const path = url.pathname;
  const reply = (status, body) => send(res, status, body, cors);
  console.log(`${req.method} ${path}`);

  // ── the pretend Razorpay hosted page ──────────────────────────────────
  let m = path.match(/^\/mock-razorpay\/([^/]+)(\/pay)?$/);
  if (m) {
    const s = subs.find((x) => x.id === m[1]);
    if (!s) return reply(404, "<h1>No such subscription</h1>");
    const n = s.camera_ids.length;
    if (req.method === "POST" && m[2]) {
      if (s.status === "created") {
        s.status = "authenticated";
        s.updated_at = now();
        // The real webhook lands 7-19 s after approval. Keep a gap so the
        // billing page's waiting state is exercised.
        setTimeout(() => {
          s.status = "active";
          s.current_end = plusDays(30);
          s.updated_at = now();
          for (const id of s.camera_ids) {
            const c = cameras.find((x) => x.id === id);
            if (c) c.mode = "face";
          }
          console.log(`webhook: ${s.id} active, ${n} camera(s) -> face`);
        }, WEBHOOK_DELAY_MS);
      }
      return reply(200, page(`
        <h1>Payment successful</h1>
        <p>Mandate approved for ${n} camera(s) · ₹${(UNIT_PAISE * n) / 100} every month.</p>
        <p>You can close this tab and return to PGAK.</p>`));
    }
    return reply(200, page(`
      <p style="color:#888">Razorpay (mock)</p>
      <h1>PGAK AI Vision</h1>
      <p>${n} camera(s) × ₹${UNIT_PAISE / 100} = <b>₹${(UNIT_PAISE * n) / 100} / month</b></p>
      <p>Status: ${s.status}</p>
      <form method="post" action="/mock-razorpay/${s.id}/pay">
        <button type="submit" style="font-size:18px;padding:12px 24px">Pay ₹${(UNIT_PAISE * n) / 100} with UPI autopay</button>
      </form>`));
  }

  if (!path.startsWith(PREFIX)) return reply(404, { detail: "Not Found" });
  const p = path.slice(PREFIX.length);

  // ── auth (fastapi-users shapes) ───────────────────────────────────────
  if (p === "/auth/login" && req.method === "POST") {
    const form = new URLSearchParams(await readBody(req));
    const email = (form.get("username") || "").trim().toLowerCase();
    const password = form.get("password") || "";
    if (!email || password === "wrong") return reply(400, { detail: "LOGIN_BAD_CREDENTIALS" });
    const role = email.startsWith("viewer") ? "viewer" : email.startsWith("admin") ? "admin" : "owner";
    const tok = `mock-${randomBytes(8).toString("hex")}`;
    tokens.set(tok, { email, role });
    return reply(200, { access_token: tok, token_type: "bearer" });
  }
  if (p === "/auth/refresh-token" && req.method === "POST") {
    const u = user(req);
    if (!u) return reply(401, { detail: "Unauthorized" });
    const rt = `refresh-${randomBytes(8).toString("hex")}`;
    tokens.set(rt, u);
    return reply(200, { refresh_token: rt });
  }
  if (p === "/auth/refresh" && req.method === "POST") {
    const body = JSON.parse((await readBody(req)) || "{}");
    const u = tokens.get(body.refresh_token || "");
    if (!u) return reply(401, { detail: "Unauthorized" });
    tokens.delete(body.refresh_token);
    const at = `mock-${randomBytes(8).toString("hex")}`;
    const rt = `refresh-${randomBytes(8).toString("hex")}`;
    tokens.set(at, u);
    tokens.set(rt, u);
    return reply(200, { access_token: at, refresh_token: rt, token_type: "bearer" });
  }

  const u = user(req);
  if (!u) return reply(401, { detail: "Unauthorized" });

  if (p === "/users/me") {
    return reply(200, { id: "u1", email: u.email, name: u.email.split("@")[0], role: u.role, organization_id: "org1", is_verified: true });
  }
  if (p === "/cameras" && req.method === "GET") return reply(200, { items: cameras });
  if (p === "/devices" && req.method === "GET") return reply(200, { items: devices });

  // ── billing ───────────────────────────────────────────────────────────
  if (p === "/billing/pricing") {
    return reply(200, { amount: UNIT_PAISE, currency: "INR", period: "monthly", interval: 1, name: "PGAK AI Vision", plan_id: "plan_mock", source: "razorpay", stale: false });
  }
  if (p === "/billing/subscriptions" && req.method === "GET") {
    const includeEnded = url.searchParams.get("include_ended") === "true";
    const visible = subs.filter((s) => includeEnded || LIVE.has(s.status) || s.status === "halted" || s.status === "paused");
    return reply(200, { subscriptions: visible.map(subView).sort((a, b) => (a.created_at < b.created_at ? 1 : -1)) });
  }
  if (p === "/billing/checkout" && req.method === "POST") {
    if (!requireAdmin(req, res)) return;
    const body = JSON.parse((await readBody(req)) || "{}");
    const ids = [...new Set(body.camera_ids || [])];
    if (ids.length === 0) return reply(400, { detail: "No cameras selected" });
    const paid = new Set(subs.filter((s) => LIVE.has(s.status)).flatMap((s) => s.camera_ids));
    const eligible = ids.filter((id) => {
      const c = cameras.find((x) => x.id === id);
      return c && c.mode !== "face" && !paid.has(id);
    });
    if (eligible.length === 0) return reply(400, { detail: "No eligible cameras" });
    // Supersede any open checkout on these cameras, like the real router.
    for (const s of subs) {
      if ((s.status === "created" || s.status === "pending") && s.camera_ids.some((id) => eligible.includes(id))) {
        s.status = "cancelled";
        s.updated_at = now();
      }
    }
    const id = `sub_MOCK${String(++seq).padStart(4, "0")}`;
    subs.push({ id, plan_id: "plan_mock", status: "created", camera_ids: eligible, unit_amount_paise: UNIT_PAISE, current_end: null, cancel_scheduled_at: null, created_at: now(), updated_at: now() });
    return reply(200, { subscription_id: id, short_url: `http://127.0.0.1:${PORT}/mock-razorpay/${id}`, razorpay_key_id: "rzp_test_mock", amount: UNIT_PAISE * eligible.length, currency: "INR", camera_ids: eligible });
  }
  m = p.match(/^\/billing\/subscriptions\/([^/]+)\/cancel$/);
  if (m && req.method === "POST") {
    if (!requireAdmin(req, res)) return;
    const s = subs.find((x) => x.id === decodeURIComponent(m[1]));
    if (!s) return reply(404, { detail: "Subscription not found." });
    if (LIVE.has(s.status)) {
      s.cancel_scheduled_at = s.current_end || plusDays(30);
      s.updated_at = now();
      return reply(200, { razorpay_subscription_id: s.id, status: s.status, ends_at: s.cancel_scheduled_at, cancelled_immediately: false });
    }
    s.status = "cancelled";
    s.updated_at = now();
    return reply(200, { razorpay_subscription_id: s.id, status: "cancelled", ends_at: null, cancelled_immediately: true });
  }

  return reply(404, { detail: "Not Found" });
});

function page(inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Razorpay (mock)</title>
  <style>html{background:#fff}body{font:16px/1.5 system-ui;max-width:520px;margin:60px auto;padding:0 20px;color:#222}h1{font-size:24px}</style>
  </head><body>${inner}</body></html>`;
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`mock cloud API on http://127.0.0.1:${PORT}${PREFIX}  (Ctrl+C to stop)`);
});
