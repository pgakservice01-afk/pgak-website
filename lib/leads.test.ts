import { test } from "node:test";
import assert from "node:assert/strict";

import {
  ATTRIBUTION_KEYS,
  CAMERA_OPTIONS,
  HONEYPOT_FIELD,
  PROTECT_OPTIONS,
  PROTECT_UNSPECIFIED,
  cleanAttribution,
  normaliseEmail,
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

const GOOD = {
  name: "Rana",
  phone: "9876543210",
  location: "Ludhiana",
  protecting: "Office",
  cameras: "5–15",
};

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

test("rejects keyboard-mash junk that has a valid shape", () => {
  // Owner-reported 2026-08-21: these passed the shape rule and reached the
  // CRM, sending a dealer to phone a number that cannot exist.
  for (const junk of [
    "9999999999",
    "8888888888",
    "1111111111",
    "1234567890",
    "0123456789",
    "+91 99999 99999".replace(/9{10}/, "9999999999"), // formatted variant
  ]) {
    assert.equal(normalisePhone(junk), null, `should reject junk: ${junk}`);
  }
  // ...while a real number one digit away still passes.
  assert.equal(normalisePhone("9999999998"), "+919999999998");
  assert.equal(normalisePhone("1234567891"), "+911234567891");
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
    cameras: "5–15",
    employees: "",
    email: "", // optional and not given — still a complete lead
  });
});

test("a PHONE NUMBER ALONE is a complete lead", () => {
  // The compact hero form asks for a number and a camera band, nothing else.
  // Name, city and segment come on the call. Requiring them here would throw
  // away exactly the leads that form exists to catch.
  const r = validateLead({ phone: "98765 43210" });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.deepEqual(r.lead, {
    name: "",
    phone: "+919876543210",
    location: "",
    protecting: PROTECT_UNSPECIFIED,
    cameras: "",
    employees: "",
    email: "",
  });
});

test("only the phone can block a lead", () => {
  const r = validateLead({ name: "", phone: "123", location: "", cameras: "" });
  assert.equal(r.ok, false);
  if (r.ok || r.honeypot) return assert.fail("expected field errors");
  assert.ok(r.fieldErrors.phone);
  assert.equal(r.fieldErrors.name, undefined);
  assert.equal(r.fieldErrors.location, undefined);
  assert.equal(r.fieldErrors.cameras, undefined);
});

test("an unknown or blank 'protecting' is recorded as NOT SPECIFIED, never as a real option", () => {
  // Regression: the old fallback was the first option, "Home / Apartment", and
  // 24 of 33 CRM leads carried it — factory buyers filed as homeowners.
  for (const value of ["<script>alert(1)</script>", "", undefined, "Warehouse / Industrial"]) {
    const r = validateLead({ ...GOOD, protecting: value });
    assert.equal(r.ok, true);
    if (!r.ok) return;
    assert.equal(r.lead.protecting, PROTECT_UNSPECIFIED, `for: ${String(value)}`);
  }
  assert.ok(!(PROTECT_OPTIONS as readonly string[]).includes(PROTECT_UNSPECIFIED));
  assert.equal(PROTECT_OPTIONS[0], "Factory / Warehouse");
});

test("camera band: a real option is kept, anything else means 'not given'", () => {
  for (const o of CAMERA_OPTIONS) {
    const r = validateLead({ ...GOOD, cameras: o });
    assert.equal(r.ok, true);
    if (!r.ok) return;
    assert.equal(r.lead.cameras, o);
  }
  for (const value of ["", "lots", 12, undefined]) {
    const r = validateLead({ ...GOOD, cameras: value });
    assert.equal(r.ok, true);
    if (!r.ok) return;
    assert.equal(r.lead.cameras, "");
  }
});

test("headcount band (attendance pages): kept when real, blank otherwise, and in the message", () => {
  const r = validateLead({ ...GOOD, employees: "101–300" });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.lead.employees, "101–300");
  const p = toErpPayload(r.lead, "www.pgak.co.in", "2026-09-03T00:00:00.000Z", "r1");
  assert.match(p.message, /Employees: 101–300/);
  for (const value of ["", "many", 50, undefined]) {
    const q = validateLead({ ...GOOD, employees: value });
    assert.equal(q.ok, true);
    if (!q.ok) return;
    assert.equal(q.lead.employees, "");
  }
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
  assert.match(p.message, /Cameras: 5–15/);
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

test("attribution: known keys are kept and capped, everything else is dropped", () => {
  const a = cleanAttribution({
    page: "/pricing",
    cta: "hero-quick",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "attendance-sep",
    gclid: "g".repeat(1000),
    referrer: "  www.google.com  ",
    source: "Google Ads", // not an attribution key
    evil: "<script>",
    utm_term: 42, // wrong type
  });
  assert.deepEqual(Object.keys(a).sort(), [
    "cta",
    "gclid",
    "page",
    "referrer",
    "utm_campaign",
    "utm_medium",
    "utm_source",
  ]);
  assert.equal(a.gclid?.length, LIMITS.attribution);
  assert.equal(a.referrer, "www.google.com");
  for (const key of Object.keys(a)) {
    assert.ok((ATTRIBUTION_KEYS as readonly string[]).includes(key));
  }
});

test("attribution: garbage input yields an empty block, never a throw", () => {
  for (const raw of [undefined, null, "string", 12, [], () => {}]) {
    assert.deepEqual(cleanAttribution(raw), {});
  }
});

test("the ERP message carries page, button and campaign so a lead can be judged", () => {
  const r = validateLead(GOOD);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const p = toErpPayload(r.lead, "www.pgak.co.in", "2026-09-03T00:00:00.000Z", "r1", {
    page: "/biometric-attendance",
    cta: "hero-quick",
    landing: "/insights/proxy-attendance",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "attendance-sep",
    gclid: "abc.def",
    referrer: "www.google.com",
  });
  assert.match(p.message, /Page: \/biometric-attendance/);
  assert.match(p.message, /CTA: hero-quick/);
  assert.match(p.message, /Landing: \/insights\/proxy-attendance/);
  assert.match(p.message, /Campaign: google \/ cpc \/ attendance-sep/);
  assert.match(p.message, /gclid: abc\.def/);
  assert.match(p.message, /Referrer: www\.google\.com/);
  // Field mapping unchanged: the CRM still routes on district, not on message.
  assert.equal(p.district, "Ludhiana");
});

test("no attribution → the message is the same shape as before, nothing invented", () => {
  const r = validateLead({ phone: "9876543210" });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const p = toErpPayload(r.lead, "www.pgak.co.in", "2026-09-03T00:00:00.000Z", "r1");
  assert.equal(
    p.message,
    `Protecting: ${PROTECT_UNSPECIFIED} | Submitted: 2026-09-03T00:00:00.000Z | Ref: r1`,
  );
  assert.doesNotMatch(p.message, /Page:|CTA:|Campaign:|Cameras:/);
});

test("email is OPTIONAL — blank is a complete, valid lead", () => {
  // The dealer converts by phoning. Requiring email would cost more leads than
  // the addresses are worth, so absent/blank must succeed, not error.
  for (const blank of ["", "   ", undefined, null]) {
    assert.equal(normaliseEmail(blank as unknown), "", `blank should pass: ${String(blank)}`);
  }
  const r = validateLead({ ...GOOD, email: "" });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.lead.email, "");
});

test("accepts the address shapes real customers type", () => {
  assert.equal(normaliseEmail("rana@pgak.co.in"), "rana@pgak.co.in");
  assert.equal(normaliseEmail("  Rana@PGAK.co.in  "), "rana@pgak.co.in"); // trimmed + lowercased
  assert.equal(normaliseEmail("rana+leads@gmail.com"), "rana+leads@gmail.com");
  assert.equal(normaliseEmail("a.b.c@mail.corp.example.co.in"), "a.b.c@mail.corp.example.co.in");
});

test("rejects malformed addresses — worse than none, because they look usable", () => {
  for (const bad of ["foo@bar", "foo.com", "foo @bar.com", "foo@@bar.com", "@bar.com", "foo@bar.", "foo@.com"]) {
    assert.equal(normaliseEmail(bad), null, `should reject: ${bad}`);
  }
});

test("a malformed email blocks the lead with a field error, not silently", () => {
  const r = validateLead({ ...GOOD, email: "not-an-email" });
  assert.equal(r.ok, false);
  if (r.ok || r.honeypot) return assert.fail("expected field errors");
  assert.ok(r.fieldErrors.email);
  // ...and the other fields are untouched by it.
  assert.equal(r.fieldErrors.phone, undefined);
});

test("the ERP payload carries the email in its own column", () => {
  const r = validateLead({ ...GOOD, email: "Owner@Factory.co.in" });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const p = toErpPayload(r.lead, "www.pgak.co.in", "2026-08-25T00:00:00.000Z", "r1");
  assert.equal(p.email, "owner@factory.co.in");
  // The dealer-routing key is still the city, not the email.
  assert.equal(p.district, "Ludhiana");
});
