import { NO_APPROVAL, publishable, sectionReady, type Approval, type ApprovalStatus } from "./consent.ts";

/**
 * Customer testimonials, and their approval state.
 *
 * ALL THREE RECORDS BELOW ARE DRAFTS. None of them renders on the live site.
 *
 * The wording was supplied by the owner on 2026-09-24 as text prepared FOR the
 * named clients to review — not as words those clients have said. That is a
 * real and important difference, and it is the whole reason this file is shaped
 * the way it is. A quote drafted on someone's behalf, published under their
 * name and job title, is a fabricated endorsement no matter how fairly it
 * represents what they think. The person has to see the exact sentence and
 * agree to it.
 *
 * So each record starts at `draft`, the homepage section is gated on two
 * APPROVED records, and until then the section does not render at all — no
 * placeholder cards, no "coming soon", nothing that hints at proof we do not
 * have yet.
 *
 * TO PUBLISH ONE
 *   1. Send the client the exact `quote` text below and ask them to confirm it
 *      in writing, or send back their own wording.
 *   2. Paste whatever they actually approved into `quote`. If they changed a
 *      word, their version wins.
 *   3. Fill `approval` completely: date, their name, and where the written
 *      confirmation lives (WhatsApp, email, signed form).
 *   4. Set the three permission booleans separately — agreeing to a quote is
 *      not agreeing to a photograph, and neither is agreeing to a logo.
 *   5. Set `status` to "approved_for_publication".
 *
 * The test in lib/proof/proof.test.ts fails the build if a record claims
 * approval without the evidence behind it.
 */

export type Testimonial = {
  /** Stable key. Never reused for a different client. */
  id: string;
  person: string;
  designation: string;
  company: string;
  /** Sector label shown beside the card. Descriptive, never a claimed result. */
  context: string;
  /**
   * The exact published sentence. Brief asks for 35–50 words, which is long
   * enough to say something specific and short enough that nobody skims past.
   */
  quote: string;
  /**
   * Approved portrait at /public/proof/clients/<id>.webp, 800×800 minimum.
   * Only ever a file the client sent us or let us take. Never a portrait
   * lifted from LinkedIn, Google or a company website — see the note in
   * lib/proof/consent.ts.
   */
  portrait?: string;
  /** Approved company mark, same rule. */
  logo?: string;
  approval: Approval;
};

/** Initials for the fallback avatar, so no face is ever invented. */
export function initialsOf(person: string): string {
  const words = person
    .replace(/^(Shri|Smt|Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sangal-constructions",
    person: "Sunil Sangal",
    designation: "Founder",
    company: "Sangal Constructions",
    context: "Construction and project execution",
    quote:
      "PGAK's approach was practical from the first discussion. Instead of suggesting a standard package, their team focused on how the site operates, where visibility matters and what can realistically be achieved with the existing CCTV setup. That clarity makes decision-making much easier.",
    // DRAFT — prepared for Sunil Sangal to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "hagerstone-international",
    person: "Dhruv Agarwal",
    designation: "Founder & Managing Director",
    company: "Hagerstone International",
    context: "Office design, build and project execution",
    quote:
      "What stands out about PGAK is the attention to real conditions on site. Their team discusses camera coverage, access points, lighting and the practical workflow behind security monitoring. It is a more responsible way to plan a system than simply selling features.",
    // DRAFT — prepared for Dhruv Agarwal to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "vedic-group",
    person: "Shri Anand Kumar Agrawal",
    designation: "Chairman",
    company: "Vedic Group of Institutions",
    context: "Education and institutional security planning",
    quote:
      "For an institution, security planning must be clear, responsible and workable for the people who manage the site every day. PGAK explained the process in a straightforward way — from reviewing camera coverage to deciding how the team should respond to important events.",
    // DRAFT — prepared for Shri Anand Kumar Agrawal to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
];

/** The only accessor the site may render from. */
export function publishedTestimonials(): Testimonial[] {
  return publishable(TESTIMONIALS);
}

/** Whether the homepage section may appear at all. Two approvals minimum. */
export function testimonialsReady(): boolean {
  return sectionReady(TESTIMONIALS, 2);
}

/** Counts for the internal readiness report. Never rendered publicly. */
export function testimonialPipeline(): Record<ApprovalStatus, number> {
  const counts: Record<ApprovalStatus, number> = {
    draft: 0,
    sent_for_approval: 0,
    approved_for_publication: 0,
    rejected: 0,
  };
  for (const t of TESTIMONIALS) counts[t.approval.status] += 1;
  return counts;
}
