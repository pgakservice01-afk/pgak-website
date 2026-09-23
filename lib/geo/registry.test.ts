import { test } from "node:test";
import assert from "node:assert/strict";

import {
  STATES,
  coverageTotals,
  getStateByCode,
  isPublishable,
  legacyCanonicalFor,
  legacyCityPageSlugs,
  readinessOf,
  slugifyPlace,
  type DistrictRecord,
} from "./registry.ts";

/**
 * Run with:  npm run test:geo
 *
 * The stakes here are the mirror image of lib/spamUrls.test.ts. There, a false
 * positive deleted a live page. Here, a false positive PUBLISHES one — a thin
 * district page that Google clusters as a duplicate, on a site where 19 URLs
 * are already flagged "Duplicate without user-selected canonical" with
 * validation FAILED. So the tests that matter most are the ones asserting the
 * gate stays SHUT.
 */

/** A record that passes every condition; each test below breaks exactly one. */
function readyRecord(over: Partial<DistrictRecord> = {}): DistrictRecord {
  return {
    lgdDistrictCode: 425,
    lgdStateCode: 3,
    name: "Ludhiana",
    rawName: "Ludhiana",
    source: "lgd-master",
    sourceUrl: "https://lgdirectory.gov.in/",
    sourceDate: "2026-09-23",
    verifiedOn: "2026-09-23",
    slug: "ludhiana-district",
    services: [
      {
        service: "existing-camera-analytics",
        mode: "own-team",
        evidence: "PGAK's own team is based in Ludhiana; see /about.",
        reviewedOn: "2026-09-23",
      },
    ],
    localEvidence: [
      {
        claim: "Focal Point is the city's principal planned industrial estate.",
        sourceUrl: "https://pbindustries.gov.in/",
        sourceName: "Department of Industries & Commerce, Punjab",
        verifiedOn: "2026-09-23",
      },
    ],
    publicationApproved: true,
    ...over,
  };
}

test("the state registry is the complete official set", () => {
  // 28 states + 8 union territories. A change here means LGD changed, which
  // is a reviewable event, not a silent one.
  assert.equal(STATES.length, 36);
  assert.equal(getStateByCode(3)?.name, "Punjab");
  assert.equal(getStateByCode(9)?.name, "Uttar Pradesh");
  // Codes are unique and the key; names are not.
  assert.equal(new Set(STATES.map((s) => s.lgdStateCode)).size, 36);
  assert.equal(new Set(STATES.map((s) => s.slug)).size, 36);
});

test("a fully evidenced, approved district passes the gate", () => {
  const r = readinessOf(readyRecord());
  assert.deepEqual(r.gaps, []);
  assert.equal(r.status, "indexable-page-ready");
  assert.equal(isPublishable(readyRecord()), true);
});

test("a cross-check source can never publish, however complete it looks", () => {
  // This is the whole point of the source distinction. igod gives a name and
  // a website and nothing else; that must not be enough.
  const r = readinessOf(
    readyRecord({
      source: "igod-crosscheck",
      lgdDistrictCode: undefined,
      lgdStateCode: undefined,
    })
  );
  assert.equal(r.status, "research-needed");
  assert.ok(r.gaps.includes("cross-check-source-only"));
  assert.ok(r.gaps.includes("no-lgd-district-code"));
  assert.ok(r.gaps.includes("no-verified-parent-state"));
  assert.equal(isPublishable({ ...readyRecord(), source: "igod-crosscheck" }), false);
});

test("an unverifiable parent state blocks publication", () => {
  // 99 is not an LGD code. A record must not publish under an invented parent.
  const r = readinessOf(readyRecord({ lgdStateCode: 99 }));
  assert.ok(r.gaps.includes("no-verified-parent-state"));
  assert.notEqual(r.status, "indexable-page-ready");
});

test("a service with no evidence does not count as deliverable", () => {
  const r = readinessOf(
    readyRecord({
      services: [{ service: "cctv-installation", mode: "own-team" }], // no evidence
    })
  );
  assert.equal(r.status, "availability-check");
  assert.ok(r.gaps.includes("no-deliverable-service"));
});

test("a district PGAK does not serve reads as unavailable, not as pending", () => {
  const r = readinessOf(
    readyRecord({
      services: [
        { service: "cctv-installation", mode: "not-offered" },
        { service: "anpr", mode: "not-offered" },
      ],
    })
  );
  assert.equal(r.status, "unavailable");
});

test("missing local evidence blocks publication", () => {
  const r = readinessOf(readyRecord({ localEvidence: [] }));
  assert.equal(r.status, "research-needed");
  assert.ok(r.gaps.includes("no-local-evidence"));
});

test("the gate cannot approve a page on its own", () => {
  const r = readinessOf(readyRecord({ publicationApproved: false }));
  assert.ok(r.gaps.includes("not-approved"));
  assert.notEqual(r.status, "indexable-page-ready");
});

test("a mapped legacy page short-circuits instead of growing a rival URL", () => {
  const r = readinessOf(
    readyRecord({ canonicalUrl: "/ai-cctv-ludhiana", publicationApproved: false })
  );
  assert.equal(r.status, "legacy-mapped");
  assert.deepEqual(r.gaps, []);
  assert.equal(isPublishable({ ...readyRecord(), canonicalUrl: "/ai-cctv-ludhiana" }), false);
});

test("legacy mapping covers the city pages and omits the non-district ones", () => {
  assert.equal(legacyCanonicalFor("ludhiana"), "/ai-cctv-ludhiana");
  assert.equal(legacyCanonicalFor("mumbai"), "/ai-cctv-mumbai");
  // Deliberately unmapped: these existing pages are not districts, so a
  // district record must not silently inherit or absorb them.
  for (const notADistrict of ["delhi-ncr", "chandigarh-mohali", "noida", "khanna", "batala", "mandi-gobindgarh"]) {
    assert.equal(
      legacyCanonicalFor(notADistrict),
      undefined,
      `${notADistrict} must stay an explicit decision`
    );
  }
  assert.equal(legacyCityPageSlugs().length, 12);
});

test("identically named districts in different states stay separate", () => {
  // Aurangabad exists in both Bihar (10) and Maharashtra (27). Name is not an
  // identifier; the LGD code is. Nothing here may collapse them.
  const bihar = readyRecord({
    name: "Aurangabad",
    rawName: "Aurangabad",
    lgdStateCode: 10,
    lgdDistrictCode: 231,
    slug: "aurangabad-bihar",
  });
  const maharashtra = readyRecord({
    name: "Aurangabad",
    rawName: "Aurangabad",
    lgdStateCode: 27,
    lgdDistrictCode: 517,
    slug: "aurangabad-maharashtra",
  });
  assert.notEqual(bihar.slug, maharashtra.slug);
  assert.notEqual(bihar.lgdDistrictCode, maharashtra.lgdDistrictCode);
  assert.equal(readinessOf(bihar).status, "indexable-page-ready");
  assert.equal(readinessOf(maharashtra).status, "indexable-page-ready");
  const totals = coverageTotals([bihar, maharashtra]);
  assert.equal(totals["indexable-page-ready"], 2);
});

test("every record lands in exactly one coverage bucket", () => {
  const records = [
    readyRecord(),
    readyRecord({ source: "igod-crosscheck", lgdDistrictCode: undefined }),
    readyRecord({ services: [{ service: "anpr", mode: "not-offered" }] }),
    readyRecord({ canonicalUrl: "/ai-cctv-mumbai" }),
    readyRecord({ services: [] }),
  ];
  const totals = coverageTotals(records);
  const summed = Object.values(totals).reduce((a, b) => a + b, 0);
  assert.equal(summed, records.length, "a record was double-counted or lost");
});

test("slugs are deterministic and URL-safe", () => {
  assert.equal(slugifyPlace("Ludhiana"), "ludhiana");
  assert.equal(slugifyPlace("Dadra & Nagar Haveli"), "dadra-and-nagar-haveli");
  assert.equal(slugifyPlace("  Y.S.R.  "), "y-s-r");
  assert.equal(slugifyPlace("Sri Potti Sriramulu Nellore"), "sri-potti-sriramulu-nellore");
});
