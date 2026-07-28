/**
 * Hero social-proof numbers (Amazon-style "trusted by N" + star rating).
 *
 * ⚠️ THESE ARE PLACEHOLDERS. Replace every value with your REAL figures before
 * launch — inflated or invented numbers destroy trust the moment a customer
 * checks Google, and can get a Google Business Profile suspended.
 *
 * Set any value to 0 to hide that pill entirely (nothing fake will show).
 *   - sitesProtected → the "N+ sites protected" pill
 *   - rating + ratingCount → the "★ 4.8 · N reviews" pill (use your real
 *     Google Business Profile rating; keep it in sync with lib/reviews.ts)
 */
export const SOCIAL_PROOF = {
  sitesProtected: 400, // e.g. real deployments — set your true count, or 0 to hide
  rating: 4.8, // your real Google rating (0 to hide)
  ratingCount: 120, // number of Google reviews behind that rating
};
