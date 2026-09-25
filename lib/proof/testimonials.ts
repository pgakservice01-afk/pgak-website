import { NO_APPROVAL, publishable, sectionReady, type Approval, type ApprovalStatus } from "./consent.ts";

/**
 * Customer testimonials, and their approval state.
 *
 * TEN RECORDS ARE LIVE. Vedic Group is `rejected` and is not.
 *
 * The wording is PGAK's, rewritten on 2026-09-25 around the capability each
 * client's business turns on, after an earlier draft described PGAK's manner
 * and got two job titles wrong. The owner then confirmed each client had agreed
 * to the final text.
 *
 * Every `source` says what that confirmation actually is: the owner's word,
 * dated, with nothing in writing behind it. That is deliberately unflattering.
 * If a client ever says "I never agreed to that", what this file can produce is
 * an attestation, not a message — and the person answering that question should
 * discover it here rather than mid-conversation. Collect a WhatsApp reply or an
 * email from each client when you can and replace the `source` with it; it is a
 * five-minute job that turns an assertion into evidence.
 *
 * Also unverified, and worth more than it sounds: the capability named in each
 * quote was matched to the client's line of business, not read off their
 * installation record. If Krishna Gases does not run number-plate recognition,
 * that quote is false whoever approved it.
 *
 * TO ADD OR CHANGE ONE
 *   1. Send the client the exact `quote` text and ask them to confirm it, or
 *      to send back their own wording.
 *   2. Paste whatever they actually approved into `quote`. If they changed a
 *      word, their version wins.
 *   3. Fill `approval` completely: date, their name, and where the confirmation
 *      lives (WhatsApp, email, signed form, or a call you can attest to).
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
    // No mark: the SVG Sangal publishes is a CorelDRAW export that draws its
    // wordmark with SVG Fonts, which no browser has supported since 2015 —
    // it renders as two stray red marks and nothing else. Ask them for a
    // PNG or an SVG with the text converted to outlines.
    quote:
      "Sites change every week, so the intrusion alerts mattered more to us than the recording did. PGAK tuned them to the hours when nobody should be on site, and the false-alarm filtering is why my supervisors stopped ignoring their phones.",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Sunil Sangal",
      source:
        "Sunil Sangal confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "hagerstone-international",
    person: "Dhruv Agarwal",
    designation: "Founder & Managing Director",
    company: "Hagerstone International",
    context: "Office design, build and project execution",
    logo: "/proof/clients/hagerstone-logo.png",
    quote:
      "We hand over finished offices, so clients ask what the cameras will actually do. Face recognition at reception and the attendance reporting are the two things they understand immediately, and both ran on the cameras already specified.",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Dhruv Agarwal",
      source:
        "Dhruv Agarwal confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "vedic-group",
    person: "Shri Anand Kumar Agrawal",
    designation: "Chairman",
    company: "Vedic Group of Institutions",
    context: "Education and institutional security planning",
    quote:
      "For an institution, security planning must be clear, responsible and workable for the people who manage the site every day. PGAK explained the process in a straightforward way — from reviewing camera coverage to deciding how the team should respond to important events.",
    // WITHDRAWN 2026-09-25 by the owner, who asked for this client to be left
    // off the site. Kept as a `rejected` record rather than deleted: that is
    // the difference between "we were told not to publish this" and "we have
    // not asked yet", and deleting it loses the instruction — the next person
    // to build a client list would simply add Vedic Group back.
    //
    // Not a rejection by Shri Anand Kumar Agrawal. He was never sent this.
    approval: { ...NO_APPROVAL, status: "rejected" },
  },
  {
    id: "dobuild-architects",
    person: "Harman",
    designation: "Owner",
    company: "Dobuild Architects",
    context: "Architecture and interior projects",
    logo: "/proof/clients/dobuild-logo.png",
    quote:
      "We plan buildings, so we notice when someone plans a camera layout properly. PGAK worked from the drawings, and the real-time intrusion alerts during construction caught the thing we had actually been worried about.",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Harman",
      source:
        "Harman confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "dilkash-traders",
    person: "Rajiv Mittal",
    designation: "Proprietor",
    company: "Dilkash Traders",
    context: "Retail and trading",
    logo: "/proof/clients/dilkash-logo.png",
    quote:
      "A shop floor is busy, and the cameras saw everything and told me nothing. The dwell-time alerts flag someone lingering where stock goes missing, and the false-alarm filtering means the ones that reach my phone are worth opening.",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Rajiv Mittal",
      source:
        "Rajiv Mittal confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "lumani-systems",
    person: "Mohit Kumar Singh",
    designation: "Chief Executive Officer",
    company: "Lumani Systems",
    context: "Aluminium windows and doors manufacturing",
    quote:
      "Our plant runs long shifts. The attendance automation took away the register at the gate, and the intrusion alerts cover the yard once the second shift ends — both on cameras we had already installed.",
    logo: "/proof/clients/lumani-logo.png",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Mohit Kumar Singh",
      source:
        "Mohit Kumar Singh confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "uv-techno",
    person: "Ashutosh Bansal",
    designation: "Director",
    company: "U.V. Techno",
    context: "Industrial manufacturing, Bathinda",
    quote:
      "The security alerts are the part we rely on. If somebody is in the yard outside working hours we hear about it while it is happening, instead of finding it in the footage the next morning when there is nothing left to do.",
    logo: "/proof/clients/uvtechno-logo.png",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Ashutosh Bansal",
      source:
        "Ashutosh Bansal confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "gebe-luxe",
    person: "Bhupesh",
    designation: "Director",
    company: "Gebe Luxe",
    context: "Luxury outdoor furniture",
    quote:
      "Stock sits in the open, so night cover was the whole question. PGAK set the intrusion alerts on the yard and filtered out the strays and headlights, and were honest about what the cameras would show after dark.",
    logo: "/proof/clients/gebe-logo.svg",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Bhupesh",
      source:
        "Bhupesh confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "krishna-gases",
    person: "Akshay",
    designation: "Owner",
    company: "Krishna Gases",
    context: "Industrial gases, Focal Point Ludhiana",
    logo: "/proof/clients/krishna-gases-logo.png",
    quote:
      "Cylinders move by vehicle, so which truck came in and when is the record that matters to us. The number-plate recognition gives us that automatically, instead of somebody writing it into a register at the gate.",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Akshay",
      source:
        "Akshay confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
  },
  {
    id: "thangamman",
    person: "Ponraj",
    designation: "Head of Human Resources",
    company: "Thangamman Fashions",
    context: "Garment manufacturing — workforce and attendance",
    logo: "/proof/clients/thangamman-logo.png",
    quote:
      "Attendance was the reason we called PGAK. The face recognition attendance has removed the queue at shift change and the manual register with it, and they were straightforward about where it still needs a fallback.",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Ponraj",
      source:
        "Ponraj confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
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
      "The assessment went camera by camera before anything was proposed. What we use daily is the intrusion alerting on the yard with the false triggers filtered out, so what reaches the team is worth acting on.",
    logo: "/proof/clients/winda-logo.webp",
    approval: {
      status: "approved_for_publication",
      approvedOn: "2026-09-25",
      approverName: "Puneet Garg",
      source:
        "Puneet Garg confirmed this wording to Aditya Mittal (PGAK) on 2026-09-25. Owner-attested; nothing in writing on file. Replace this with the message or email if one is ever obtained.",
      portraitPermission: false,
      logoPermission: true,
      sitePhotoPermission: false,
    },
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
