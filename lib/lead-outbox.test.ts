import { test } from "node:test";
import assert from "node:assert/strict";

import { crmIdFrom, deliverJob, runOutbox, type FetchLike, type OutboxJob } from "./lead-outbox.ts";

/**
 * Run with:  npm run test:outbox
 *
 * Local contract tests for the durable-intake delivery worker. No database and
 * no network: the RPC and fetch are stubs that record what they were asked.
 * Covers success, ERP failure, a 2xx without a row, timeout, idempotent
 * retry, notification failure and a job left queued.
 */

const ENV = {
  erpEndpoint: "https://erp.example.test/leads",
  erpSecret: "test-secret",
  telegramToken: "bot-token",
  telegramChatId: "123",
};

const job = (over: Partial<OutboxJob> = {}): OutboxJob => ({
  id: 1,
  ref: "ref-abcdef12",
  kind: "crm",
  payload: { name: "Test", phone: "+919876543210", message: "Synthetic QA" },
  lease_token: "lease-1",
  ...over,
});

function reply(status: number, body: unknown): FetchLike {
  return async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
}

test("crm job with a row id is delivered and carries the idempotency key", async () => {
  const seen: { url: string; headers: Record<string, string> }[] = [];
  const f: FetchLike = async (url, init) => {
    seen.push({ url, headers: init.headers });
    return { ok: true, status: 200, json: async () => ({ id: 42 }) };
  };
  const r = await deliverJob(job(), ENV, f);
  assert.equal(r.success, true);
  assert.equal(r.crmId, "42");
  assert.equal(seen[0].headers["Idempotency-Key"], "ref-abcdef12");
});

test("a 2xx without a row id is not delivery", async () => {
  const r = await deliverJob(job(), ENV, reply(200, { ok: true }));
  assert.equal(r.success, false);
  assert.equal(r.reason, "ERP_200_NO_ROW");
});

test("an ERP duplicate answer counts as the original row", async () => {
  assert.equal(crmIdFrom({ duplicate: true }, "ref-x"), "ref-x");
  const r = await deliverJob(job(), ENV, reply(200, { duplicate: true }));
  assert.equal(r.success, true);
});

test("ERP 500 and 401 stay undelivered with a coarse reason", async () => {
  for (const status of [500, 401]) {
    const r = await deliverJob(job(), ENV, reply(status, { error: "secret echo +919876543210" }));
    assert.equal(r.success, false);
    assert.equal(r.reason, `ERP_${status}_REJECTED`);
    assert.ok(!r.reason.includes("9876543210"), "reason never echoes the body");
  }
});

test("a timeout is reported as TIMEOUT, not thrown", async () => {
  const f: FetchLike = async () => {
    const e = new Error("The operation was aborted due to timeout");
    e.name = "TimeoutError";
    throw e;
  };
  const r = await deliverJob(job(), ENV, f);
  assert.equal(r.success, false);
  assert.equal(r.reason, "TIMEOUT");
});

test("missing configuration never pretends to deliver", async () => {
  const r1 = await deliverJob(job(), {}, reply(200, { id: 1 }));
  assert.equal(r1.reason, "ERP_CONFIG_MISSING");
  const r2 = await deliverJob(job({ kind: "notification" }), {}, reply(200, {}));
  assert.equal(r2.reason, "NOTIFY_CONFIG_MISSING");
});

test("notification carries the reference only, never contact details", async () => {
  let sent = "";
  const f: FetchLike = async (_u, init) => {
    sent = init.body;
    return { ok: true, status: 200, json: async () => ({}) };
  };
  const r = await deliverJob(job({ kind: "notification" }), ENV, f);
  assert.equal(r.success, true);
  assert.ok(sent.includes("ref-abcdef12"));
  assert.ok(!sent.includes("9876543210") && !sent.includes("Synthetic QA"));
});

test("notification failure is recorded separately from CRM delivery", async () => {
  const calls: Record<string, unknown>[] = [];
  const rpc = async (name: string, args: Record<string, unknown>) => {
    if (name === "claim_website_outbox")
      return [job({ id: 1 }), job({ id: 2, kind: "notification", lease_token: "lease-2" })];
    calls.push(args);
    return null;
  };
  const f: FetchLike = async (url) =>
    url.includes("telegram")
      ? { ok: false, status: 502, json: async () => ({}) }
      : { ok: true, status: 200, json: async () => ({ id: "row-9" }) };
  const out = await runOutbox(rpc, ENV, f);
  assert.equal(out.delivered, 1);
  assert.equal(out.queued, 1);
  assert.deepEqual(
    calls.map((c) => [c.p_id, c.p_success, c.p_crm_id, c.p_error]),
    [
      [1, true, "row-9", null],
      [2, false, null, "NOTIFY_502"],
    ],
  );
});

test("each claimed job is finished exactly once, with its own lease", async () => {
  const finished: string[] = [];
  const rpc = async (name: string, args: Record<string, unknown>) => {
    if (name === "claim_website_outbox") return [job({ id: 7, lease_token: "L7" })];
    finished.push(String(args.p_lease));
    return null;
  };
  await runOutbox(rpc, ENV, reply(200, { id: 1 }));
  assert.deepEqual(finished, ["L7"]);
});

test("an empty queue does nothing", async () => {
  const out = await runOutbox(async () => [], ENV, reply(200, { id: 1 }));
  assert.deepEqual([out.delivered, out.queued], [0, 0]);
});

test("a failed finish() is reported as not done, so nothing claims success", async () => {
  const rpc = async (name: string) => {
    if (name === "claim_website_outbox") return [job()];
    throw new Error("INTAKE_RPC_503");
  };
  const out = await runOutbox(rpc, ENV, reply(200, { id: 5 }));
  assert.equal(out.delivered, 0);
  assert.match(out.results[0].reason, /FINISH_FAILED/);
});

test("retrying the same ref after a failure delivers once (idempotent key)", async () => {
  const keys: string[] = [];
  let n = 0;
  const f: FetchLike = async (_u, init) => {
    keys.push(init.headers["Idempotency-Key"]);
    n += 1;
    return n === 1
      ? { ok: false, status: 503, json: async () => ({}) }
      : { ok: true, status: 200, json: async () => ({ id: "row-1" }) };
  };
  const first = await deliverJob(job(), ENV, f);
  const second = await deliverJob(job(), ENV, f);
  assert.equal(first.success, false);
  assert.equal(second.success, true);
  assert.deepEqual(keys, ["ref-abcdef12", "ref-abcdef12"]);
});
