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
  // This used to assert `approved === 0`, with a note to update the number
  // once a client approved. Ten did, on 2026-09-25, so the count is no longer
  // a useful thing to freeze — it would have to be edited by the same person
  // approving the records, which is not a check on anything.
  //
  // What is worth asserting is that an approved record cannot be a bare flag:
  // every one of them must carry evidence somebody could produce later.
  for (const t of publishedTestimonials()) {
    assert.ok(
      t.approval.source.trim().length > 20,
      `${t.id} is published with no meaningful record of where the approval came from`,
    );
    assert.ok(
      t.approval.approverName.trim(),
      `${t.id} is published without naming who approved it`,
    );
  }
});

test("a withdrawn client never reappears on the site", () => {
  // Vedic Group was withdrawn by the owner on 2026-09-25 and is kept as a
  // `rejected` record rather than deleted, so the instruction survives. This
  // asserts it, because the failure mode is somebody adding the company back
  // to a client list months from now without knowing it was pulled.
  const vedic = TESTIMONIALS.find((x) => x.id === "vedic-group");
  assert.ok(vedic, "vedic-group is missing — it should be present and rejected");
  assert.equal(vedic.approval.status, "rejected", "vedic-group is no longer rejected");
  assert.ok(
    !publishedTestimonials().some((t) => t.id === "vedic-group"),
    "a rejected client reached the published list",
  );
});

test("nothing that is not approved can reach the page", () => {
  // The general form of the test above: draft and rejected are both invisible,
  // and only the one explicit status publishes.
  for (const t of TESTIMONIALS) {
    const visible = publishedTestimonials().some((x) => x.id === t.id);
    assert.equal(
      visible,
      t.approval.status === PUBLISHABLE,
      `${t.id} is ${t.approval.status} but ${visible ? "is" : "is not"} on the page`,
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
  // Capture the length rather than hardcoding it: the point of this test is
  // that the source array is unchanged, not how many clients are in it, and a
  // literal here fails every time a testimonial is added.
  const before = TESTIMONIALS.length;
  const out = publishable(TESTIMONIALS);
  assert.notEqual(out, TESTIMONIALS as unknown);
  out.push({} as never);
  assert.equal(TESTIMONIALS.length, before, "mutating the gated list changed the source");
});

test("sectionReady counts approvals, not records", () => {
  const approved = publishedTestimonials().length;
  // True at the threshold, false one above it — whatever today's total is.
  assert.equal(sectionReady(TESTIMONIALS, approved), true);
  assert.equal(sectionReady(TESTIMONIALS, approved + 1), false);
  // And it counts approvals, not the length of the array: there are more
  // records than approvals whenever anything is a draft or withdrawn.
  assert.equal(sectionReady(TESTIMONIALS, TESTIMONIALS.length), TESTIMONIALS.length === approved);
});

test("initials never invent a face", () => {
  assert.equal(initialsOf("Sunil Sangal"), "SS");
  assert.equal(initialsOf("Dhruv Agarwal"), "DA");
  // Honorifics are not initials. "Shri Anand Kumar Agrawal" is A.A., not S.A.
  assert.equal(initialsOf("Shri Anand Kumar Agrawal"), "AA");
  assert.equal(initialsOf("Priya"), "PR");
});
