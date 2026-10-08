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
    "./attribution": { readAttribution: (cta, ctx = {}) => ({ cta, ...ctx }) },
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
      // form_submit_attempt fires before the response is known — it is an
      // attempt, not a conversion, and it fires once even across the retry.
      ["form_submit_attempt", "lead_accepted", "form_submit", event, "generate_lead"],
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
    const names = h.events.map((e) => e.name);
    // No conversion of any kind — this is the asymmetric rule under test.
    for (const conv of ["form_submit", "generate_lead", "demo_request"])
      assert.ok(!names.includes(conv), `${conv} must not fire on ${JSON.stringify(response)}`);
    // The failure IS recorded, exactly once per ref: a silent delivery failure
    // and a visitor who changed their mind must not look identical in GA4.
    assert.equal(
      names.filter((n) => n === "lead_delivery_failed").length,
      1,
      "lead_delivery_failed fires once",
    );
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
  assert.equal(
      h.events.filter((e) => e.name !== "form_submit_attempt").length,
      0,
      "an attempt may be logged; a conversion must not",
    );
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

test("company, requirement and contactTime reach the POST body", async () => {
  // Regression: the homepage form collected all three, the server validated
  // and capped all three, the ERP message led with them — and the client body
  // omitted them, so they never left the browser.
  const h = setup({ ok: true, body: { delivered: true } });
  await h.submitLead(
    {
      ...values,
      company: "Ludhiana Forgings Pvt Ltd",
      requirement: "16 cameras, want alerts when the yard gate opens after 10pm",
      contactTime: "Morning 10-12",
    },
    { ref: "test-reference-456", cta: "home", formName: "home_assessment" },
  );
  const body = h.requests[0];
  assert.equal(body.company, "Ludhiana Forgings Pvt Ltd");
  assert.equal(body.requirement, "16 cameras, want alerts when the yard gate opens after 10pm");
  assert.equal(body.contactTime, "Morning 10-12");
});

test("the three fields default to empty strings, never undefined", async () => {
  // A form that does not ask for them (QuickLead) must still send a well-formed
  // body; `undefined` would be dropped by JSON.stringify and read as absent.
  const h = setup({ ok: true, body: { delivered: true } });
  await h.submitLead(values, { ref: "test-reference-789", cta: "x", formName: "demo_request" });
  const body = h.requests[0];
  assert.equal(body.company, "");
  assert.equal(body.requirement, "");
  assert.equal(body.contactTime, "");
});


test("lead_accepted separates delivered from queued and carries registry ids only", async () => {
  const queued = setup({ ok: true, body: { received: true, delivered: false, state: "queued" } });
  await queued.submitLead(values, {
    ref: "ctx-reference-1",
    cta: "calc",
    formName: "quick_audit_request",
    featureId: "anpr",
    calculatorId: "C09",
  });
  const acc = queued.events.find((e) => e.name === "lead_accepted");
  assert.equal(acc.params.delivery_state, "queued");
  assert.equal(acc.params.feature_id, "anpr");
  assert.equal(acc.params.calculator_id, "C09");
  assert.equal(queued.requests[0].attribution.featureId, "anpr");
  const gl = queued.events.find((e) => e.name === "generate_lead");
  assert.equal(gl.params.delivery_state, "queued");

  const delivered = setup({ ok: true, body: { delivered: true } });
  await delivered.submitLead(values, { ref: "ctx-reference-2", cta: "x", formName: "demo_request" });
  assert.equal(delivered.events.find((e) => e.name === "lead_accepted").params.delivery_state, "delivered");
});

test("honeypot-style 200 with a failure body never counts as a lead", async () => {
  const h = setup({ ok: true, body: { ok: false, delivered: false, fallback: true } });
  const out = await h.submitLead(values, { ref: "hp-reference-1", cta: "x", formName: "demo_request" });
  assert.equal(out.kind, "fallback");
  assert.ok(!h.events.some((e) => ["lead_accepted", "generate_lead"].includes(e.name)));
});
