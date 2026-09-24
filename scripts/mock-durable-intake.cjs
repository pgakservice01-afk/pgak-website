// Isolated synthetic QA only. Emulates RPC contracts using local SQLite; NOT a PostgreSQL migration test.
const http = require("node:http"),
  { DatabaseSync } = require("node:sqlite"),
  crypto = require("node:crypto");
const db = new DatabaseSync("/tmp/pgak-b2b-synthetic.sqlite");
db.exec(
  "CREATE TABLE IF NOT EXISTS receipts(ref TEXT PRIMARY KEY,token TEXT,payload TEXT,details TEXT); CREATE TABLE IF NOT EXISTS jobs(id INTEGER PRIMARY KEY,ref TEXT UNIQUE,payload TEXT,state TEXT,attempts INTEGER DEFAULT 0,lease TEXT); CREATE TABLE IF NOT EXISTS crm(ref TEXT PRIMARY KEY,payload TEXT);",
);
let intakeFails = false,
  erpFails = true;
const server = http.createServer((req, res) => {
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    res.setHeader("Content-Type", "application/json");
    const send = (data, status = 200) => {
      res.statusCode = status;
      res.end(JSON.stringify(data));
    };
    try {
      const b = raw ? JSON.parse(raw) : {};
      if (req.url === "/control" && req.method === "POST") {
        if (typeof b.intakeFails === "boolean") intakeFails = b.intakeFails;
        if (typeof b.erpFails === "boolean") erpFails = b.erpFails;
        return send({ intakeFails, erpFails });
      }
      if (req.url === "/inspect")
        return send({
          receipts: db.prepare("select ref,details from receipts").all(),
          jobs: db.prepare("select ref,state,attempts from jobs").all(),
          crmCount: db.prepare("select count(*) as n from crm").get().n,
        });
      if (req.url === "/erp") {
        if (erpFails) return send({ ok: false }, 503);
        db.prepare("INSERT OR IGNORE INTO crm VALUES(?,?)").run(
          b.ref,
          JSON.stringify(b),
        );
        return send({ id: b.ref });
      }
      if (intakeFails) return send({ ok: false }, 503);
      if (req.url === "/rpc/accept_website_lead") {
        db.exec("BEGIN IMMEDIATE");
        const prior = db
          .prepare("SELECT * FROM receipts WHERE ref=?")
          .get(b.p_ref);
        if (prior && prior.token !== b.p_token_hash) {
          db.exec("ROLLBACK");
          return send({ ok: false }, 409);
        }
        db.prepare("INSERT OR IGNORE INTO receipts VALUES(?,?,?,?)").run(
          b.p_ref,
          b.p_token_hash,
          JSON.stringify(b.p_payload),
          "{}",
        );
        db.prepare(
          "INSERT OR IGNORE INTO jobs(ref,payload,state) VALUES(?,?,'queued')",
        ).run(b.p_ref, JSON.stringify(b.p_payload));
        db.exec("COMMIT");
        return send({ received: true, ref: b.p_ref, state: "queued" });
      }
      if (req.url === "/rpc/enrich_website_lead") {
        const r = db
          .prepare("UPDATE receipts SET details=? WHERE ref=? AND token=?")
          .run(JSON.stringify(b.p_details), b.p_ref, b.p_token_hash);
        return send({ saved: r.changes === 1 });
      }
      if (req.url === "/rpc/claim_website_outbox") {
        const jobs = db
          .prepare(
            "SELECT * FROM jobs WHERE state='queued' AND attempts<8 LIMIT 5",
          )
          .all();
        return send(
          jobs.map((j) => {
            const lease = crypto.randomUUID();
            db.prepare(
              "UPDATE jobs SET state='processing',attempts=attempts+1,lease=? WHERE id=?",
            ).run(lease, j.id);
            return {
              ...j,
              kind: "crm",
              payload: JSON.parse(j.payload),
              lease_token: lease,
            };
          }),
        );
      }
      if (req.url === "/rpc/finish_website_outbox") {
        db.prepare("UPDATE jobs SET state=? WHERE id=? AND lease=?").run(
          b.p_success ? "delivered" : "queued",
          b.p_id,
          b.p_lease,
        );
        return send(null);
      }
      send({ ok: false }, 404);
    } catch {
      try {
        db.exec("ROLLBACK");
      } catch {}
      send({ ok: false }, 500);
    }
  });
});
server.listen(4319, "127.0.0.1", () =>
  console.log("Synthetic SQLite RPC/ERP sink on 4319. No external messages."),
);
