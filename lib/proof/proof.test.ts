import { test } from "node:test";
import assert from "node:assert/strict";

import { approvalProblems, publishable, sectionReady, PUBLISHABLE } from "./consent.ts";
import {
  TESTIMONIALS,
  publishedTestimonials,
  testimonialsReady,
  initialsOf,
} from "./testimonials.ts";
import { PROJECTS, publishedProjects } from "./projects.ts";

/**
 * Run with:  node --test lib/proof/proof.test.ts
 *
 * These tests exist because this repository has shipped invented proof twice
 * and deleted it twice — five fabricated named testimonials with star ratings,
 * and six AI-generated photographs captioned as real installations. Both got
 * out because publishing was the default and suppressing was the thing you had
 * to remember to do.
 *
 * So the failure these guard is not a rendering bug. It is a named person's
 * words, face or company mark appearing on a public website without that
 * person having agreed. Every test below is one way that happened or could.
 */

test("nothing is published that has not been approved", () => {
  for (const t of publishedTestimonials()) {
    assert.equal(
      t.approval.status,
      PUBLISHABLE,
      `${t.id} reached the published list without approval`,
    );
  }
  for (const p of publishedProjects()) {
    assert.equal(
      p.approval.status,
      PUBLISHABLE,
      `${p.id} reached the published list without approval`,
    );
  }
});

test("an approval claim is backed by a date, a named approver and a written source", () => {
  const problems = [
    ...TESTIMONIALS.flatMap((t) => approvalProblems(`testimonial ${t.id}`, t.approval)),
    ...PROJECTS.flatMap((p) => approvalProblems(`project ${p.id}`, p.approval)),
  ];
  assert.deepEqual(problems, []);
});

test("a face or a logo needs its own permission, separate from the quote", () => {
  for (const t of publishedTestimonials()) {
    if (t.portrait) {
      assert.ok(
        t.approval.portraitPermission,
        `${t.id} renders a portrait without portraitPermission`,
      );
    }
    if (t.logo) {
      assert.ok(t.approval.logoPermission, `${t.id} renders a logo without logoPermission`);
    }
  }
});

test("the testimonial section stays hidden until two clients have approved", () => {
  const approved = publishedTestimonials().length;
  assert.equal(
    testimonialsReady(),
    approved >= 2,
    "testimonialsReady() disagrees with the number of approved records",
  );
  // As of writing, all three are drafts prepared FOR the clients to review.
  // If this line starts failing, someone has approved one — which is good, and
  // the number here should be updated to match reality.
  assert.equal(
    approved,
    0,
    "A testimonial is now approved. Confirm the written approval exists, then update this count.",
  );
});

test("the drafted quotes are never treated as something the client said", () => {
  // Every record starts life as text prepared for the client, not by them.
  // This asserts the three supplied on 2026-09-24 are still gated.
  const ids = ["sangal-constructions", "hagerstone-international", "vedic-group"];
  for (const id of ids) {
    const t = TESTIMONIALS.find((x) => x.id === id);
    assert.ok(t, `${id} is missing`);
    assert.notEqual(
      t.approval.status,
      PUBLISHABLE,
      `${id} is marked approved — verify the client confirmed this exact wording in writing.`,
    );
  }
});

test("every published project carries its conditions and its limits", () => {
  for (const p of publishedProjects()) {
    assert.ok(p.conditions.trim().length > 20, `${p.id} has no meaningful conditions`);
    assert.ok(p.limits.trim().length > 20, `${p.id} does not say what it fails to prove`);
    assert.ok(p.alt.trim().length > 10, `${p.id} has no useful alt text`);
  }
});

test("no homepage project uses third-party or synthetic media", () => {
  // /media holds Spot AI reference films; /features and /illustrations hold
  // generated feature art. None of it may be presented as PGAK's own work.
  const banned = ["/media/", "/features/", "/illustrations/", "/hero/"];
  for (const p of PROJECTS) {
    const src = p.media.kind === "video" ? p.media.src : p.media.src;
    for (const dir of banned) {
      assert.ok(
        !src.startsWith(dir),
        `${p.id} points at ${dir}, which is not PGAK-original material`,
      );
    }
  }
});

test("the gate returns a copy, so a caller cannot reach the full list", () => {
  const out = publishable(TESTIMONIALS);
  assert.notEqual(out, TESTIMONIALS as unknown);
  out.push({} as never);
  assert.equal(TESTIMONIALS.length, 3, "mutating the gated list changed the source");
});

test("sectionReady counts approvals, not records", () => {
  assert.equal(sectionReady(TESTIMONIALS, 1), false);
  assert.equal(sectionReady(TESTIMONIALS, 2), false);
});

test("initials never invent a face", () => {
  assert.equal(initialsOf("Sunil Sangal"), "SS");
  assert.equal(initialsOf("Dhruv Agarwal"), "DA");
  // Honorifics are not initials. "Shri Anand Kumar Agrawal" is A.A., not S.A.
  assert.equal(initialsOf("Shri Anand Kumar Agrawal"), "AA");
  assert.equal(initialsOf("Priya"), "PR");
});
