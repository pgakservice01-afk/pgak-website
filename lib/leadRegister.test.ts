import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildRegisterPayload,
  encodeRegisterBody,
  isTestRef,
  postToRegister,
  signRegisterBody,
} from "./leadRegister.ts";
import { PROJECT_EXISTING, PROJECT_NEW, validateLead } from "./leads.ts";

/**
 * Run with:  npm run test:register
 *
 * The register is the shared sales sheet plus the two alert emails. The rules
 * that matter here: one row per lead id, no invented values, no customer text
 * that a spreadsheet could execute as a formula, and a failure that stays
 * visible instead of pretending.
 */

function lead(over: Record<string, unknown> = {}) {
  const r = validateLead({
    name: "Rana",
    phone: "9876543210",
    location: "Ludhiana",
    protecting: "Factory / Warehouse",
    cameras: "16–50",
    ...over,
  });
  assert.equal(r.ok, true);
  if (!r.ok) throw new Error("unreachable");
  return r.lead;
}

const ATTR = {
  page: "/cctv-installation-company",
  cta: "dealer-form-new-install",
  landing: "/factory-security",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "factory-q3",
  gclid: "abc123",
};

test("a new-installation enquiry maps to the sheet's columns", () => {
  const p = buildRegisterPayload(
    lead({ project: PROJECT_NEW, timeline: "1–3 months" }),
    "lead-1234-5678",
    ATTR,
    { formId: "new_installation_request", erpRef: "lead-1234-5678", erpStatus: "delivered" },
  );
  assert.equal(p.requirement, "New installation");
  assert.equal(p.category, "Customer");
  assert.equal(p.product, "cctv installation company");
  assert.equal(p.cameras, "16–50");
  assert.equal(p.timeline, "1–3 months");
  assert.equal(p.source, "google / cpc");
  assert.equal(p.click_ids, "gclid:abc123");
  assert.equal(p.landing_page, "/factory-security");
  assert.equal(p.erp_status, "delivered");
  assert.equal(p.is_test, "");
  // Nothing is invented: no form asks for a company.
  assert.equal(p.company, "");
});

test("an existing-camera enquiry keeps its own requirement and source", () => {
  const p = buildRegisterPayload(
    lead({ project: PROJECT_EXISTING, cameras: "5–15" }),
    "lead-9999",
    { page: "/ai-cctv-mumbai", cta: "dealer-form" },
    { formId: "dealer_demo_request", erpStatus: "delivered" },
  );
  assert.equal(p.requirement, "Existing CCTV upgrade");
  assert.equal(p.source, "Website (direct/organic)");
  assert.equal(p.product, "ai cctv mumbai");
});

test("a checklist request is categorised as a researcher, not a customer", () => {
  const p = buildRegisterPayload(lead(), "lead-5", { cta: "hero-checklist" }, {
    formId: "quick_checklist_request",
    erpStatus: "delivered",
  });
  assert.equal(p.category, "Checklist");
});

test("an enquiry with no journey is 'Other', never guessed", () => {
  const p = buildRegisterPayload(lead(), "lead-6", {}, { erpStatus: "delivered" });
  assert.equal(p.requirement, "Other");
  assert.equal(p.timeline, "");
});

test("test refs are flagged so sales can filter them out", () => {
  assert.equal(isTestRef("test-newsite-0001"), true);
  assert.equal(isTestRef("TEST_x"), true);
  assert.equal(isTestRef("a-real-uuid-1234"), false);
  const p = buildRegisterPayload(lead(), "test-abc", {}, { erpStatus: "delivered" });
  assert.equal(p.is_test, "TEST");
});

test("the signature covers the timestamp and the exact body", () => {
  const a = signRegisterBody('{"lead_id":"x"}', "s3cret", "1000");
  assert.equal(a, signRegisterBody('{"lead_id":"x"}', "s3cret", "1000"));
  assert.notEqual(a, signRegisterBody('{"lead_id":"x"}', "s3cret", "1001"));
  assert.notEqual(a, signRegisterBody('{"lead_id":"y"}', "s3cret", "1000"));
  assert.notEqual(a, signRegisterBody('{"lead_id":"x"}', "other", "1000"));
});

test("the request carries the signed envelope and the lead id", async (t) => {
  process.env.LEAD_REGISTER_URL = "https://script.example/exec";
  process.env.LEAD_REGISTER_SECRET = "s3cret";
  t.after(() => {
    delete process.env.LEAD_REGISTER_URL;
    delete process.env.LEAD_REGISTER_SECRET;
  });
  let seen: { body: string; headers: Record<string, string> } | null = null;
  const fake = (async (_url: string, init: RequestInit) => {
    seen = { body: String(init.body), headers: init.headers as Record<string, string> };
    return new Response(
      JSON.stringify({
        ok: true,
        row: "new",
        sheetSyncedAt: "2026-09-23T00:00:00Z",
        emails: { director: "accepted by Gmail", aditya: "accepted by Gmail" },
      }),
      { status: 200 },
    );
  }) as unknown as typeof fetch;

  const payload = buildRegisterPayload(lead(), "lead-77", {}, { erpStatus: "delivered" });
  const res = await postToRegister(payload, 3_000, fake);
  assert.equal(res.ok, true);
  assert.equal(res.emails.director, "accepted by Gmail");
  const sent = JSON.parse(seen!.body) as Record<string, string>;
  assert.equal(seen!.headers["Idempotency-Key"], "lead-77");
  // Base64 payload, signed exactly as sent; decoding returns the lead intact.
  const decoded = JSON.parse(Buffer.from(sent.__b64, "base64").toString("utf8"));
  assert.equal(decoded.lead_id, "lead-77");
  assert.equal(signRegisterBody(sent.__b64, "s3cret", sent.__ts), sent.__sig);
});

test("a refusal is reported, not swallowed, and 403 is not retried", async (t) => {
  process.env.LEAD_REGISTER_URL = "https://script.example/exec";
  process.env.LEAD_REGISTER_SECRET = "s3cret";
  t.after(() => {
    delete process.env.LEAD_REGISTER_URL;
    delete process.env.LEAD_REGISTER_SECRET;
  });
  let calls = 0;
  const fake = (async () => {
    calls += 1;
    return new Response(JSON.stringify({ ok: false, error: "bad signature" }), { status: 403 });
  }) as unknown as typeof fetch;
  const res = await postToRegister(
    buildRegisterPayload(lead(), "lead-88", {}, { erpStatus: "delivered" }),
    3_000,
    fake,
  );
  assert.equal(res.ok, false);
  assert.equal(res.error, "bad signature");
  assert.equal(calls, 1);
  assert.equal(res.emails.director, "not attempted");
});

test("an HTTP 200 that is not an ok JSON reply is a failure, and is retried once", async (t) => {
  process.env.LEAD_REGISTER_URL = "https://script.example/exec";
  process.env.LEAD_REGISTER_SECRET = "s3cret";
  t.after(() => {
    delete process.env.LEAD_REGISTER_URL;
    delete process.env.LEAD_REGISTER_SECRET;
  });
  let calls = 0;
  const fake = (async () => {
    calls += 1;
    // Apps Script answers 200 with an HTML error page when its handler dies.
    return new Response("<html>Google Script error</html>", { status: 200 });
  }) as unknown as typeof fetch;
  const res = await postToRegister(
    buildRegisterPayload(lead(), "lead-99", {}, { erpStatus: "delivered" }),
    3_000,
    fake,
  );
  assert.equal(res.ok, false);
  assert.equal(calls, 2);
  assert.match(res.error, /non-JSON/);
});

test("without configuration the sink is inert, never throwing", async () => {
  delete process.env.LEAD_REGISTER_URL;
  delete process.env.LEAD_REGISTER_SECRET;
  const res = await postToRegister(
    buildRegisterPayload(lead(), "lead-00", {}, { erpStatus: "delivered" }),
    3_000,
  );
  assert.equal(res.ok, false);
  assert.match(res.error, /not configured/);
});

test("non-ASCII leads survive the signature (regression: live 'bad signature')", () => {
  // "16–50" (en dash) and Hindi are ordinary lead content. Signing raw JSON
  // made the deployed Apps Script reject exactly these while ASCII passed.
  const p = buildRegisterPayload(
    lead({ cameras: "16–50", location: "मोहाली 160055", name: "टेस्ट — नई साइट" }),
    "test-utf8",
    {},
    { erpStatus: "delivered" },
  );
  const b64 = encodeRegisterBody(p);
  assert.match(b64, /^[A-Za-z0-9+/=]+$/); // pure ASCII on the wire
  const decoded = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  assert.equal(decoded.cameras, "16–50");
  assert.equal(decoded.city, "मोहाली 160055");
  assert.equal(decoded.name, "टेस्ट — नई साइट");
  assert.equal(signRegisterBody(b64, "s3cret", "1000"), signRegisterBody(b64, "s3cret", "1000"));
});
