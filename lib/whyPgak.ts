/**
 * Why PGAK — the reasons to choose this, for a buyer in India.
 *
 * ── Why these five, and not the usual four ──
 * The enterprise VMS vendors (Genetec and the rest) argue from: one unified
 * platform, proven performance with the world's most demanding organisations,
 * secure by design, and a trusted partner network. Three of those four are
 * claims PGAK cannot make truthfully today:
 *
 *   - "Unification" — PGAK reads existing cameras. It is not access control,
 *     intercom and ALPR in one console, and saying so would be false.
 *   - "Proven performance" — lib/reviews.ts is deliberately empty, the case
 *     studies are visibly labelled illustrative, and there is no original
 *     recording of the product working. A "trusted by" line would be invented.
 *   - "Trusted partner network" — who installs in which city is an open
 *     question in docs/seo/2026-09-22/CLAIMS_REGISTER.md (C2). Nothing here
 *     may lean on it until the owner settles it.
 *
 * So this is not that argument translated. It is the argument that is actually
 * true of PGAK, aimed at someone running a factory, warehouse or shop in
 * India, who usually already owns cameras and has been let down by whoever
 * installed them.
 *
 * ── The rule for editing this file ──
 * Every line must be traceable to something the product does or the company
 * is: lib/offer.ts, lib/buyerDecision.ts, lib/seo.ts, or the pricing page.
 * No accuracy percentages, no response times, no customer names, no coverage
 * promises, no "proven". If a claim needs the owner to confirm it, it does not
 * belong here — it belongs in the claims register until it is confirmed.
 */

export type WhyPoint = {
  /** Two or three words. The reason, not a feature name. */
  heading: string;
  /** The reason, in the buyer's terms. */
  body: string;
  /** What this is deliberately not claiming. Keeps the section honest. */
  limit?: string;
};

export const WHY_PGAK: WhyPoint[] = [
  {
    heading: "Your cameras stay",
    body:
      "Most vendors answer every problem with a new system. PGAK reads the CCTV you already paid for — mixed brands, older analogue, whatever your DVR or NVR is running — provided the stream can be reached and the camera can actually see the thing that matters. The usual outcome is that most of an estate is reusable and a handful of positions need moving.",
    limit:
      "A camera pointed at a roof cannot be fixed by software. Which of yours are usable is checked on your own feeds before anything is quoted.",
  },
  {
    heading: "Footage stays on your premises",
    body:
      "Detection runs on a processing unit installed at your site, not in somebody's cloud. Your recordings stay where they already are, and only the alerts you choose to receive leave the building. For a factory that would rather its shop floor were not uploaded anywhere, that is the difference between a system that can be approved and one that cannot.",
  },
  {
    heading: "You are told what it cannot do",
    body:
      "Every PGAK solution page carries a list of what the product does not do — where face recognition stops working, what a plate camera needs, what no analytics can recover if your recorder never kept the footage. Any vendor can tell you what their system detects. The list worth reading is the other one, and most quotations do not have it.",
  },
  {
    heading: "Per camera you switch on",
    body:
      "Billing is per camera per month, on the cameras you make intelligent — not on every camera you own. Hardware is quoted as its own line, so you can see what is one-off and what recurs. There is no published rate, because a single number printed on a web page is wrong for most people reading it; you get a quotation itemised against your site.",
    limit:
      "That means no instant price here. The calculators let you work out the numbers before anyone quotes you.",
  },
  {
    heading: "A Punjab company you can reach",
    body:
      "PGAK Innovations is registered in Ludhiana and builds the software it sells, so the people who answer the phone are the people who wrote it. Calls, WhatsApp and support run in English, Hindi and Punjabi. When the installer who wired your site stops answering — the most common complaint in this market — that matters more than a brochure.",
  },
];

/** The question this section answers, kept in one place for reuse. */
export const WHY_PGAK_HEADING = "Why PGAK";
export const WHY_PGAK_INTRO =
  "Five straight answers, and the limits that come with them.";
