/**
 * The consent and approval gate for everything on this site that quotes,
 * photographs or names a real customer.
 *
 * WHY THIS FILE EXISTS
 * This repository has published invented proof twice before and had to delete
 * it both times: five named testimonials with star ratings (removed from
 * lib/trust.ts on 2026-09-02, confirmed by the owner not to be real customers)
 * and six AI-generated "installation photos" captioned as specific sites
 * (removed 2026-08-24). Both shipped because nothing in the code distinguished
 * "we wrote this down" from "this person agreed we could publish it".
 *
 * So that distinction is now a type, not a convention. A record carries its own
 * approval state, the rendering helpers below are the only way to read records,
 * and they refuse anything that is not explicitly approved. A draft cannot be
 * published by forgetting a filter, because there is no unfiltered accessor to
 * forget.
 *
 * WHAT "APPROVED" MEANS HERE
 * Not "the owner thinks they would be happy with it". It means a named person
 * at the client confirmed this exact wording, in writing, on a date, through a
 * channel that can be produced later if they ever say they did not. That is
 * what `Approval` records, and `approvalProblems()` refuses a record that
 * claims approval without them.
 *
 * India's Consumer Protection Act 2019 and the CCPA's 2022 guidelines on
 * misleading advertisements treat a fabricated endorsement as an unfair trade
 * practice, and a portrait or logo used without permission is a separate
 * problem again. The commercial risk and the ethical one point the same way.
 */

/**
 * The only four states a piece of customer proof can be in.
 *
 * Deliberately a union of string literals rather than a boolean: "approved"
 * and "not approved yet" are not opposites. `rejected` has to be visibly
 * different from `draft`, or a client who asked us not to publish something
 * looks identical to one we simply have not asked yet, and someone eventually
 * re-sends it.
 */
export type ApprovalStatus =
  | "draft"
  | "sent_for_approval"
  | "approved_for_publication"
  | "rejected";

/** The single value that may appear on the public site. */
export const PUBLISHABLE: ApprovalStatus = "approved_for_publication";

/**
 * The evidence behind an approval.
 *
 * Every field is required when the status is `approved_for_publication`,
 * because an approval nobody can produce later is not an approval. `source` is
 * where the confirmation lives — "WhatsApp message from +91…, 14 Oct 2026",
 * "email from dhruv@…", "signed consent form on file" — so that a year from
 * now the person who has to answer "did they agree to this?" can.
 */
export type Approval = {
  status: ApprovalStatus;
  /** ISO date the client confirmed. Empty until they have. */
  approvedOn: string;
  /** The person at the client who approved, by name. Not "their office". */
  approverName: string;
  /** Where the written confirmation can be found. */
  source: string;
  /** Separate permission: their face may be shown. */
  portraitPermission: boolean;
  /** Separate permission: their company mark may be shown. */
  logoPermission: boolean;
  /** Separate permission: photographs of their site may be shown. */
  sitePhotoPermission: boolean;
};

export const NO_APPROVAL: Approval = {
  status: "draft",
  approvedOn: "",
  approverName: "",
  source: "",
  portraitPermission: false,
  logoPermission: false,
  sitePhotoPermission: false,
};

/** Anything that carries an approval and can be gated. */
export type Consented = { approval: Approval };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Why a record must not be published, in plain words. Empty means it is safe.
 *
 * Used by the test suite rather than at render time: the gate below already
 * refuses anything unapproved, and this explains a record that *claims*
 * approval but cannot back it up — the failure mode where someone sets the
 * status by hand and leaves the evidence fields blank.
 */
export function approvalProblems(label: string, a: Approval): string[] {
  if (a.status !== PUBLISHABLE) return [];
  const problems: string[] = [];
  if (!ISO_DATE.test(a.approvedOn)) {
    problems.push(`${label}: approved but approvedOn is not an ISO date.`);
  }
  if (!a.approverName.trim()) {
    problems.push(`${label}: approved but no approver is named.`);
  }
  if (!a.source.trim()) {
    problems.push(`${label}: approved but no written source is recorded.`);
  }
  return problems;
}

/**
 * The gate. The only way to turn records into something renderable.
 *
 * Returns a NEW array so a caller cannot hold a reference back to the full
 * list, and takes the records as an argument rather than importing them, so
 * this module never needs to know what it is gating.
 */
export function publishable<T extends Consented>(records: readonly T[]): T[] {
  return records.filter((r) => r.approval.status === PUBLISHABLE);
}

/**
 * Whether a whole section may render at all.
 *
 * A testimonials section with one card looks worse than no section: a single
 * quote reads as the only customer who would say anything. The owner's brief
 * sets the floor at two, and it is enforced here rather than remembered.
 */
export function sectionReady<T extends Consented>(
  records: readonly T[],
  minimum = 2,
): boolean {
  return publishable(records).length >= minimum;
}
