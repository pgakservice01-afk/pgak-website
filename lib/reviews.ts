/**
 * Google Reviews config — single place to keep the site's review data.
 *
 * IMPORTANT: only paste REAL reviews from your Google Business Profile here,
 * word for word. Never invent reviews — fake testimonials can get the GBP
 * suspended and destroy trust if a customer notices.
 *
 * How to fill this in (one-time, ~10 minutes):
 *   1. Create/claim your Google Business Profile at business.google.com
 *      (name: "PGAK Innovations Pvt. Ltd." — exactly as on the Certificate of
 *      Incorporation; category: Security system supplier).
 *   2. In the GBP dashboard, tap "Ask for reviews" — copy the short review
 *      link (looks like https://g.page/r/XXXXXXX/review) into reviewUrl.
 *   3. Put the profile's public Maps link into mapsUrl.
 *   4. As real reviews arrive, copy them into `reviews` below and update
 *      rating/count. Redeploy (git push) and the section upgrades itself
 *      from the "write a review" band to full review cards.
 *
 * Section behaviour (components/sections/GoogleReviews.tsx):
 *   - reviews present            → rating summary + review cards + links
 *   - only reviewUrl configured  → honest "be our first review" band
 *   - nothing configured         → section hidden entirely
 */

export type Review = {
  /** Reviewer's display name as shown on Google */
  name: string;
  /** 1–5 */
  stars: number;
  /** The review text, verbatim */
  text: string;
  /** e.g. "Factory owner, Ludhiana" — optional context you add */
  context?: string;
};

export const REVIEWS_CONFIG = {
  /** Direct "write a review" link from your Google Business Profile */
  reviewUrl: "",
  /** Public Google Maps link to the profile (for "read all reviews") */
  mapsUrl: "",
  /** Overall rating shown next to the stars, e.g. 5.0 */
  rating: 0,
  /** Total review count on Google, e.g. 12 */
  count: 0,
  /** Real reviews only — see note above */
  reviews: [] as Review[],
  // Example format (delete once real ones are in):
  // reviews: [
  //   {
  //     name: "Ramesh K.",
  //     stars: 5,
  //     text: "Alerts reach my phone in seconds. False alarms almost gone.",
  //     context: "Warehouse owner, Ludhiana",
  //   },
  // ],
};
