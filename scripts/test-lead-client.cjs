const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const vm = require("node:vm");
const fs = require("node:fs");
function setup(response) {
  const events = [],
    requests = [],
    exports = {};
  const modules = {
    "./leads": { HONEYPOT_FIELD: "website" },
    "./attribution": { readAttribution: (cta) => ({ cta }) },
    "./fbpixel": { fbTrack: () => {} },
    "./analytics": {
      trackConversion: (name, params) => events.push({ name, params }),
      trackLead: (name, params) =>
        events.push({ name: "generate_lead", params }),
    },
    "./whatsapp": {
      waHref: (s) => "https://wa.me/916283993600?text=" + encodeURIComponent(s),
    },
    "./seo": {
      BUSINESS: { phoneE164: "+916283993600", phone: "+91 62839 93600" },
    },
  };
  const code = ts.transpileModule(
    fs.readFileSync("lib/lead-client.ts", "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  vm.runInNewContext(code, {
    exports,
    require: (n) => modules[n],
    fetch: async (url, opts) => {
      requests.push(JSON.parse(opts.body));
      if (response instanceof Error) throw response;
      return { ok: response.ok, json: async () => response.body };
    },
    crypto: require("node:crypto").webcrypto,
  });
  return { ...exports, events, requests };
}
const values = { phone: "9876501234", cameras: "5–15" };
for (const [form, event] of [
  ["demo_request", "demo_request"],
  ["quick_quote_request", "pricing_request"],
  ["quick_audit_request", "assessment_request"],
]) {
  test(form + " records only confirmed, deduplicated conversions", async () => {
    const h = setup({ ok: true, body: { delivered: true } }),
      opts = { ref: "test-reference-123", cta: "book-demo", formName: form };
    assert.equal((await h.submitLead(values, opts)).kind, "done");
    await h.submitLead(values, opts);
    assert.deepEqual(
      h.events.map((e) => e.name),
      ["form_submit", event, "generate_lead"],
    );
    assert.equal(h.requests[0].ref, h.requests[1].ref);
    assert.ok(!JSON.stringify(h.events).includes(values.phone));
  });
}
test("unconfirmed and failed delivery never become a successful lead", async () => {
  for (const response of [
    { ok: true, body: { delivered: false } },
    { ok: false, body: { retryable: true } },
    new Error("offline"),
  ]) {
    const h = setup(response);
    assert.equal(
      (
        await h.submitLead(values, {
          ref: "test-reference-123",
          cta: "test",
          formName: "demo_request",
        })
      ).kind,
      "fallback",
    );
    assert.equal(h.events.length, 0);
  }
});
test("server field errors are returned for correction without conversions", async () => {
  const h = setup({
    ok: false,
    body: { fieldErrors: { phone: "Invalid number" } },
  });
  const result = await h.submitLead(values, {
    ref: "test-reference-123",
    cta: "test",
    formName: "demo_request",
  });
  assert.equal(result.kind, "fieldErrors");
  assert.equal(result.fieldErrors.phone, "Invalid number");
  assert.equal(h.events.length, 0);
});
test("durable receipt counts once while CRM delivery is queued", async () => {
  const h = setup({
    ok: true,
    body: { received: true, delivered: false, receiptToken: "test-token" },
  });
  const opts = {
    ref: "durable-reference",
    cta: "assessment",
    formName: "quick_audit_request",
  };
  const out = await h.submitLead(
    { ...values, context: "Synthetic QA warehouse brief" },
    opts,
  );
  assert.equal(out.kind, "done");
  assert.equal(out.receiptToken, "test-token");
  await h.submitLead(values, opts);
  assert.equal(h.events.filter((e) => e.name === "generate_lead").length, 1);
  assert.ok(!JSON.stringify(h.events).includes("Synthetic QA"));
});
