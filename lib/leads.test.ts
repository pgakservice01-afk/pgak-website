import { test } from "node:test";
import assert from "node:assert/strict";

import {
  HONEYPOT_FIELD,
  normalisePhone,
  toErpPayload,
  validateLead,
  LIMITS,
} from "./leads.ts";

/**
 * Run with:  npm run test:leads
 *
 * The governing rule is asymmetric, so the tests are too: a lead is worth
 * thousands of rupees and spam costs one wasted dealer call. The
 * "must be accepted" cases are therefore the important half of this file.
 */

const GOOD = { name: "Rana", phone: "9876543210", location: "Ludhiana", protecting: "Office" };

test("accepts Indian phone numbers in the shapes people actually type", () => {
  for (const input of [
    "9876543210",
    "+919876543210",
    "+91 98765 43210",
    "098765 43210",
    "0919876543210",
    " 98765-43210 ",
    "(98765) 43210",
  ]) {
    assert.equal(normalisePhone(input), "+919876543210", `should accept: ${input}`);
  }
});

test("accepts LANDLINES, not just mobiles", () => {
  // PGAK sells to factories, warehouses, schools and hospitals — a switchboard
  // number is a real lead. A mobile-only rule rejected all of these.
  assert.equal(normalisePhone("044 2345 6789"), "+914423456789"); // Chennai
  assert.equal(normalisePhone("022-23456789"), "+912223456789"); // Mumbai
  assert.equal(normalisePhone("080 2345 6789"), "+918023456789"); // Bengaluru
});

test("accepts area codes beginning with 1 — including Ludhiana", () => {
  // Regression: a `[2-9]` first-digit rule silently rejected Delhi, Chandigarh
  // and Ludhiana, which is the company's own city and its densest lead source.
  assert.equal(normalisePhone("0161-2345678"), "+911612345678"); // Ludhiana
  assert.equal(normalisePhone("011-23456789"), "+911123456789"); // Delhi
  assert.equal(normalisePhone("0172-2345678"), "+911722345678"); // Chandigarh
});

test("rejects numbers that cannot be dialled", () => {
  for (const bad of [
    "1234", // too short
    "12345678901234", // too long
    "0000000000", // 0 is only ever a trunk prefix, never a leading NSN digit
    "abcdefghij",
    "",
    null,
    undefined,
    12345,
  ]) {
    assert.equal(normalisePhone(bad as unknown), null, `should reject: ${String(bad)}`);
  }
});

test("a complete, ordinary submission validates", () => {
  const r = validateLead(GOOD);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.deepEqual(r.lead, {
    name: "Rana",
    phone: "+919876543210",
    location: "Ludhiana",
    protecting: "Office",
  });
});

test("reports per-field errors rather than one opaque failure", () => {
  const r = validateLead({ name: "", phone: "123", location: "" });
  assert.equal(r.ok, false);
  if (r.ok || r.honeypot) return assert.fail("expected field errors");
  assert.ok(r.fieldErrors.name);
  assert.ok(r.fieldErrors.phone);
  assert.ok(r.fieldErrors.location);
});

test("an unknown 'protecting' value falls back instead of losing the lead", () => {
  const r = validateLead({ ...GOOD, protecting: "<script>alert(1)</script>" });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.lead.protecting, "Home / Apartment");
});

test("caps every field so an oversized payload cannot reach the CRM", () => {
  const r = validateLead({
    ...GOOD,
    name: "x".repeat(5000),
    location: "y".repeat(5000),
  });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.lead.name.length, LIMITS.name);
  assert.equal(r.lead.location.length, LIMITS.location);
});

test("honeypot fires, but still surfaces an otherwise-valid lead", () => {
  // The trap is a heuristic. If it ever misfires on a real customer, the route
  // must still be able to rescue the lead — so validation reports both.
  const r = validateLead({ ...GOOD, [HONEYPOT_FIELD]: "http://spam.example" });
  assert.equal(r.ok, false);
  if (r.ok || !r.honeypot) return assert.fail("expected honeypot");
  assert.equal(r.honeypot, true);
  assert.equal(r.lead?.phone, "+919876543210");
});

test("the honeypot is not a field any password manager autofills", () => {
  // Chrome / 1Password / Dashlane autofill organisation fields from the user's
  // Identity record and ignore autocomplete="off". A `company` trap would fire
  // on exactly the equipped business buyer this site wants.
  for (const unsafe of ["company", "organization", "organisation", "address", "email", "url"]) {
    assert.notEqual(HONEYPOT_FIELD, unsafe);
  }
});

test("an empty honeypot is not treated as tripped", () => {
  assert.equal(validateLead({ ...GOOD, [HONEYPOT_FIELD]: "   " }).ok, true);
  assert.equal(validateLead({ ...GOOD, [HONEYPOT_FIELD]: "" }).ok, true);
});

test("the ERP payload keeps the field mapping the ERP routes on", () => {
  const r = validateLead(GOOD);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const p = toErpPayload(r.lead, "www.pgak.co.in", "2026-08-10T12:00:00.000Z", "abc123");

  // `district` is the dealer-routing key. Renaming it silently breaks assignment.
  assert.equal(p.district, "Ludhiana");
  assert.equal(p.name, "Rana");
  assert.equal(p.phone, "+919876543210");
  assert.equal(p.email, "");
  assert.equal(p.source, "Website (www.pgak.co.in)");
  assert.match(p.message, /Protecting: Office/);
  assert.match(p.message, /Ref: abc123/); // eyeball-visible in the CRM
  assert.equal(p.ref, "abc123");
});

test("source is server-authored and cannot be poisoned by the client", () => {
  const r = validateLead({ ...GOOD, source: "Google Ads" } as never);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  // Whatever the caller sent, the payload carries only what the server passes.
  const p = toErpPayload(r.lead, "www.pgak.co.in", "2026-08-10T12:00:00.000Z", "r1");
  assert.equal(p.source, "Website (www.pgak.co.in)");
  assert.equal((p as Record<string, unknown>).Source, undefined);
});
