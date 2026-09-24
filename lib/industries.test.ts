import { test } from "node:test";
import assert from "node:assert/strict";

import { INDUSTRIES, industryLinkProblems } from "./industries.ts";

/**
 * Run with:  npm run test:industries
 *
 * The hub's whole value is that it points at pages that already exist. A dead
 * link here is worse than a missing sector: the visitor picked their own
 * industry and got a 404. So the integrity check is the test that matters, and
 * it runs against the real SOLUTIONS, CAPABILITIES and insights files rather
 * than fixtures — renaming a solution slug must break this, not production.
 */

test("every industry points only at pages that exist", () => {
  const problems = industryLinkProblems();
  assert.deepEqual(problems, [], `dead references on the industries hub:\n  ${problems.join("\n  ")}`);
});

test("the list covers the sectors PGAK actually has content for", () => {
  // Not an arbitrary count — a floor, so a future edit cannot quietly gut the
  // hub and leave a page with three entries claiming to be a directory.
  assert.ok(INDUSTRIES.length >= 12, `expected at least 12 sectors, got ${INDUSTRIES.length}`);
  const slugs = INDUSTRIES.map((i) => i.slug);
  assert.equal(new Set(slugs).size, slugs.length, "industry slugs must be unique");
});

test("the Indian sectors that distinguish this list from a translated one are present", () => {
  // Milestone's equivalent lists airports, casinos and public transit. PGAK's
  // market is not that market, and these five are the reason this file is not
  // just their page with the names swapped.
  for (const slug of ["grain-mandis", "textiles", "jewellery", "petrol-pumps", "housing-societies"]) {
    assert.ok(
      INDUSTRIES.some((i) => i.slug === slug),
      `${slug} must stay on the list — it is why this is an Indian industries page`
    );
  }
});

test("no entry claims a deployment, a price, an accuracy figure or a timing", () => {
  // The TRUTH RULE, enforced rather than trusted. `context` describes the
  // sector; it must never become a claim about PGAK's record in it.
  const banned = [
    /\b\d+\s*%/,
    /₹|\brs\.?\s*\d|\brupees\b/i,
    /\bwe (?:have )?(?:deployed|installed|secured|protect)\b/i,
    /\bour (?:customers?|clients?)\b/i,
    /\b\d+\s*(?:customers?|clients?|sites?|installations?)\b/i,
    /\bguarantee/i,
    /\bwithin \d+\s*(?:seconds?|minutes?|hours?)\b/i,
  ];
  for (const industry of INDUSTRIES) {
    for (const pattern of banned) {
      assert.equal(
        pattern.test(industry.context),
        false,
        `${industry.slug} context matches a banned claim pattern ${pattern}: "${industry.context}"`
      );
    }
    assert.ok(industry.context.length > 40, `${industry.slug}: context is too thin to be useful`);
  }
});

test("every sector gives the reader somewhere to go", () => {
  for (const industry of INDUSTRIES) {
    assert.ok(
      industry.solution || industry.reading.length > 0,
      `${industry.slug} is a dead end — it must link a solution page or an article`
    );
  }
});
