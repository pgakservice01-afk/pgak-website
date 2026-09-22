/**
 * One source for how the site describes hardware on a PGAK deployment.
 *
 * The product reuses compatible existing cameras, but detection runs on an
 * on-site edge device (see lib/solutions.ts, lib/faq.ts, lib/schema.ts), and
 * camera suitability, stream access and network are confirmed at assessment.
 * Copy must therefore never say "no hardware" or "nothing is installed" as an
 * absolute. Reuse these strings instead of writing new variants; change the
 * wording here once the owner approves a different, substantiated statement.
 */

/** Short form for tight UI (chat answers, brochure lines). */
export const HARDWARE_NOTE =
  "Compatible cameras you already own are reused; any on-site processing hardware is confirmed and quoted before you commit.";

/** Hindi short form — keep in step with HARDWARE_NOTE. */
export const HARDWARE_NOTE_HI =
  "आपके मौजूदा संगत कैमरों का ही उपयोग होता है; साइट पर किसी प्रोसेसिंग हार्डवेयर की ज़रूरत हो तो वह आपके निर्णय से पहले पुष्टि करके कोटेशन में लिखा जाता है।";

/** Long form for FAQ answers. */
export const HARDWARE_NOTE_LONG =
  "Compatible cameras and recorders you already own are reused wherever they are suitable. Detection runs on an on-site processing unit, and camera suitability, stream access, processing hardware and network are all confirmed at the assessment — with anything extra itemised in the quote before you commit.";
