/**
 * Local stand-in for the PGAK Apps Script web app (integrations/…gs).
 *
 * Mirrors the real contract so the whole flow can be exercised without
 * deploying: same signed envelope, same 5-minute skew window, same
 * one-row-per-lead-id rule, same JSON reply shape. Emails are recorded, never
 * sent. Never point this at anything but localhost.
 *
 *   node scripts/mock-lead-register.cjs <out.jsonl> [port] [secret]
 *   MOCK_FAIL=mail|refuse|throw   simulate a failing destination
 */
const http = require("node:http");
const fs = require("node:fs");
const { createHmac } = require("node:crypto");

const out = process.argv[2] || "/tmp/pgak-register.jsonl";
const port = Number(process.argv[3] || 4320);
const secret = process.argv[4] || "local-register-secret";
const fail = process.env.MOCK_FAIL || "";
const SKEW_MS = 5 * 60 * 1000;
const rows = new Map();

function reply(res, body) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

http
  .createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      if (fail === "throw") {
        res.writeHead(500);
        return res.end("boom");
      }
      let envelope;
      try {
        envelope = JSON.parse(raw || "{}");
      } catch {
        return reply(res, { ok: false, error: "body is not JSON" });
      }
      const ts = String(envelope.__ts || "");
      const sig = String(envelope.__sig || "");
      const inner = {};
      for (const k of Object.keys(envelope)) if (k !== "__ts" && k !== "__sig") inner[k] = envelope[k];
      const body = JSON.stringify(inner);
      if (!ts || !sig) return reply(res, { ok: false, error: "missing signature" });
      if (Math.abs(Date.now() - Number(ts)) > SKEW_MS) return reply(res, { ok: false, error: "stale request" });
      const expected = createHmac("sha256", secret).update(`${ts}.${body}`).digest("hex");
      if (expected !== sig) return reply(res, { ok: false, error: "bad signature" });
      if (fail === "refuse") return reply(res, { ok: false, error: "refused by mock" });

      const id = String(inner.lead_id || "");
      if (!id) return reply(res, { ok: false, error: "lead_id missing" });
      if (rows.has(id)) {
        return reply(res, {
          ok: true,
          row: "duplicate",
          rowNumber: rows.get(id),
          sheetSyncedAt: new Date().toISOString(),
          emails: { director: "already sent", aditya: "already sent" },
          error: "",
        });
      }
      const rowNumber = rows.size + 2;
      rows.set(id, rowNumber);
      const emails =
        fail === "mail"
          ? { director: "failed", aditya: "failed" }
          : {
              director: `accepted by Gmail ${new Date().toISOString()}`,
              aditya: `accepted by Gmail ${new Date().toISOString()}`,
            };
      fs.appendFileSync(out, JSON.stringify({ rowNumber, row: inner, emails }) + "\n");
      reply(res, {
        ok: true,
        row: "new",
        rowNumber,
        sheetSyncedAt: new Date().toISOString(),
        emails,
        error: fail === "mail" ? "mock mail failure" : "",
      });
    });
  })
  .listen(port, "127.0.0.1", () => console.log(`mock register on ${port} → ${out}`));
