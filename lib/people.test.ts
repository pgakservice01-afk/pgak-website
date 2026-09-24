import { test } from "node:test";
import assert from "node:assert/strict";

import { AUTHOR, LEADERSHIP } from "./seo.ts";
import { PEOPLE, bylineAuthor, founders, peopleProblems } from "./people.ts";

/**
 * Run with:  node --test lib/people.test.ts
 *
 * This is a page about named, real people, published to win a stranger's
 * trust. The failure that matters is not a broken link — it is publishing
 * something about a person that is not true. These tests guard the two ways
 * that happened before: a credential with nothing behind it, and the same role
 * stated differently in three files.
 */
test("every person is safe to publish", () => {
  assert.deepEqual(peopleProblems(), []);
});

test("the company has founders, and the CEO is not silently one of them", () => {
  const names = founders().map((p) => p.name);
  assert.deepEqual(names, ["Puneet Garg", "Ankur Kaplesh"]);
  assert.equal(
    founders().some((p) => p.name === "Aditya Mittal"),
    false,
    "Aditya Mittal is CEO and did not found the company — see lib/people.ts"
  );
});

test("the article byline agrees with PEOPLE", () => {
  const person = bylineAuthor();
  assert.equal(AUTHOR.name, person.name);
  assert.ok(
    AUTHOR.jobTitle.startsWith(person.role),
    `byline says "${AUTHOR.jobTitle}" but PEOPLE says "${person.role}" — these drifted once already`
  );
});

test("LEADERSHIP is derived from PEOPLE, not a second hand-kept copy", () => {
  assert.deepEqual(
    LEADERSHIP.map((p) => `${p.name}|${p.role}`),
    PEOPLE.map((p) => `${p.name}|${p.role}`)
  );
});

test("a person with credentials always has a source a reader can open", () => {
  for (const p of PEOPLE) {
    if (p.credentials.length === 0) continue;
    assert.ok(p.source?.startsWith("https://"), `${p.slug}: credentials with no checkable source`);
  }
});
