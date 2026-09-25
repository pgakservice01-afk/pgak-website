import { NO_APPROVAL, publishable, sectionReady, type Approval, type ApprovalStatus } from "./consent.ts";

/**
 * Customer testimonials, and their approval state.
 *
 * ALL TEN RECORDS BELOW ARE DRAFTS. None of them renders on the live site.
 *
 * The first three were supplied by the owner on 2026-09-24. The remaining seven
 * were drafted on 2026-09-25 from a customer list the owner provided, who said
 * the clients "were really happy with our services" but had given no wording of
 * their own. So these are our sentences about their experience, which is
 * precisely the thing this file exists to keep off the site until each person
 * has read theirs and agreed to it.
 *
 * In both cases the wording is text prepared FOR the named clients to review —
 * not as words those clients have said. That is a
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
  /**
   * The individual who said it. Optional only because a client may prefer to
   * be quoted as the company; when it is absent the card is attributed to
   * `company` and somebody there still has to approve the wording.
   */
  person?: string;
  designation?: string;
  company: string;
  /**
   * A connection between this client and PGAK that a reader would want to know
   * about — a shared director, an investor, a family tie. Rendered with the
   * quote, never omitted, because an endorsement from a related party reads
   * differently once you know, and the reader is the one who gets to decide
   * whether it matters.
   */
  relationship?: string;
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

/**
 * A NOTE ON WINDA SYSTEMS
 *
 * It is the last record below, added at the owner's instruction. Its contact is
 * Puneet Garg, who is a PGAK founder (lib/people.ts), so it is not an
 * arm's-length customer: an endorsement from a company connected to your own
 * director is a different thing from one by a stranger who paid you.
 *
 * The owner asked for the company and its mark without the personal name. That
 * removes the name but not the connection, so the record carries a
 * `relationship` line that renders with the quote. Readers can then weigh it
 * for themselves, which is the only version of this that is honest — and it is
 * also the version that survives a competitor noticing.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sangal-constructions",
    person: "Sunil Sangal",
    designation: "Founder",
    company: "Sangal Constructions",
    context: "Construction and project execution",
    logo: "/proof/clients/sangal-logo.svg",
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
    logo: "/proof/clients/hagerstone-logo.png",
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
  {
    id: "dobuild-architects",
    person: "Harman",
    designation: "Principal Architect",
    company: "Dobuild Architects",
    context: "Architecture and interior projects",
    logo: "/proof/clients/dobuild-logo.png",
    quote:
      "We plan buildings, so we notice when someone plans a camera layout properly. PGAK worked from the drawings and the site rather than a product list, and were clear about which positions would work and which would not.",
    // DRAFT — prepared for Harman to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "dilkash-traders",
    person: "Rajiv Mittal",
    designation: "Proprietor",
    company: "Dilkash Traders",
    context: "Retail and trading",
    logo: "/proof/clients/dilkash-logo.png",
    quote:
      "A shop floor is busy and the cameras see everything and tell you nothing. PGAK set ours up so the alerts that reach my phone are the ones worth looking at, which is the part I had given up on.",
    // DRAFT — prepared for Rajiv Mittal to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "lumani-systems",
    person: "Mohit Kumar Singh",
    designation: "Chief Executive Officer",
    company: "Lumani Systems",
    context: "Aluminium windows and doors manufacturing",
    quote:
      "Our plant runs long shifts and material moves constantly. PGAK spent time understanding that before recommending anything, and worked with the cameras we already had rather than asking us to start again.",
    logo: "/proof/clients/lumani-logo.png",
    // DRAFT — prepared for Mohit Kumar Singh to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "uv-techno",
    person: "Ashutosh Bansal",
    designation: "Director",
    company: "U.V. Techno",
    context: "Industrial manufacturing, Bathinda",
    quote:
      "The useful part was being told plainly what the existing cameras could and could not do. We were given the limits before the benefits, which is not how these conversations usually go.",
    logo: "/proof/clients/uvtechno-logo.png",
    // DRAFT — prepared for Ashutosh Bansal to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "gebe-luxe",
    person: "Bhupesh",
    designation: "Director",
    company: "Gebe Luxe",
    context: "Luxury outdoor furniture",
    quote:
      "Stock sits in the open on our premises, so coverage and lighting matter more than camera count. PGAK checked both before proposing anything, and explained what we would and would not be able to see at night.",
    logo: "/proof/clients/gebe-logo.svg",
    // DRAFT — prepared for Bhupesh to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "krishna-gases",
    person: "Akshay",
    designation: "Manager",
    company: "Krishna Gases",
    context: "Industrial gases, Focal Point Ludhiana",
    logo: "/proof/clients/krishna-gases-logo.png",
    quote:
      "Ours is a site where who enters and when actually matters. PGAK were practical about what the cameras could confirm and how quickly, and did not promise more than the setup could deliver.",
    // DRAFT — prepared for Akshay to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "thangamman",
    person: "Ponraj",
    designation: "Head of Human Resources",
    company: "Thangamman Fashions",
    context: "Garment manufacturing — workforce and attendance",
    logo: "/proof/clients/thangamman-logo.png",
    quote:
      "Attendance was the reason we spoke to PGAK. They were straightforward about what face recognition handles well and where it needs a fallback, so we planned around the gaps instead of discovering them later.",
    // DRAFT — prepared for Ponraj to review. Not yet his words.
    approval: { ...NO_APPROVAL },
  },
  {
    id: "winda-systems",
    // Attributed to the company, not a person, at the owner's instruction on
    // 2026-09-25. See `relationship`: the contact here is a PGAK founder, so
    // this is a related party and the card says so. Whoever approves it must
    // still be someone at Winda who is accountable for the wording.
    company: "Winda Systems",
    context: "Aluminium window systems manufacturing",
    relationship:
      "Winda Systems is associated with a PGAK founder.",
    quote:
      "The assessment went camera by camera across the site before anything was proposed, and we were told plainly where the coverage was weak and what it would take to fix. That made the scope straightforward to agree internally.",
    logo: "/proof/clients/winda-logo.webp",
    // DRAFT — prepared for Winda Systems to review. Not yet their words.
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
