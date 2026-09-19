// Against the local synthetic server only. Never pass a production URL.
import assert from "node:assert/strict";
const base = "http://127.0.0.1:3100",
  sink = "http://127.0.0.1:4319";
async function post(url, data, headers = {}) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });
  return { status: r.status, body: await r.json() };
}
await post(sink + "/control", { intakeFails: false, erpFails: true });
const ref = "synthetic-http-" + Date.now(),
  payload = {
    ref,
    phone: "9876501234",
    name: "SYNTHETIC QA",
    cameras: "Not sure",
    context: "Synthetic warehouse evaluation",
  };
const accepted = await post(base + "/api/leads", payload);
assert.equal(accepted.status, 202);
assert.equal(accepted.body.received, true);
assert.equal(accepted.body.delivered, false);
const duplicate = await post(base + "/api/leads", payload);
assert.equal(duplicate.body.received, true);
let inspect = await (await fetch(sink + "/inspect")).json();
assert.equal(inspect.receipts.filter((r) => r.ref === ref).length, 1);
assert.equal(
  (
    await post(base + "/api/lead-details", {
      ref,
      token: accepted.body.receiptToken,
      details: { company: "SYNTHETIC QA", equipment: "Test model" },
    })
  ).body.ok,
  true,
);
assert.equal(
  (
    await post(base + "/api/lead-details", {
      ref,
      token: "a".repeat(64),
      details: { company: "Wrong token" },
    })
  ).body.ok,
  false,
);
assert.equal((await post(base + "/api/lead-outbox", {})).status, 401);
const failed = await post(
  base + "/api/lead-outbox",
  {},
  { Authorization: "Bearer synthetic-worker" },
);
assert.ok(failed.body.queued >= 1);
await post(sink + "/control", { erpFails: false });
await post(
  base + "/api/lead-outbox",
  {},
  { Authorization: "Bearer synthetic-worker" },
);
inspect = await (await fetch(sink + "/inspect")).json();
assert.equal(inspect.jobs.find((r) => r.ref === ref).state, "delivered");
await post(sink + "/control", { intakeFails: true });
const failure = await post(base + "/api/leads", {
  ...payload,
  ref: ref + "-fail",
});
assert.equal(failure.status, 503);
assert.equal(failure.body.received, false);
await post(sink + "/control", { intakeFails: false });
console.log(
  "PASS: receipt during CRM outage, duplicate ref, optional details without location, invalid token, worker auth, recoverable retry, failed intake. Local emulation only.",
);
