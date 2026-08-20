import { test } from "node:test";
import assert from "node:assert/strict";

import { isSpamPath } from "./spamUrls.ts";

/**
 * Run with:  npm run test:middleware
 *
 * Node strips the types natively (>= 22.6), so this costs the project no test
 * runner and no dependency.
 *
 * The stakes are asymmetric: a missed spam URL is a harmless 404, but a wrongly
 * matched real URL returns 410 and tells Google to drop a live page for good.
 * The "must never match" list is therefore the important half of this file, and
 * it should grow whenever a new route or article slug lands.
 */

/**
 * Real URLs observed in Google's index for pgak.co.in on 2026-08-10, copied
 * verbatim from the search results rather than invented.
 */
const SPAM_URLS = [
  "/spinning-the-reels-a-beginners-guide-to-online-casinos-in-australia-4",
  "/spinning-the-reels-your-beginners-guide-to-online-casinos-in-canada",
  "/spinning-the-reels-and-winning-your-beginners-guide-to-synottip-in-the-czech-republic",
  "/decoding-the-australian-online-gambling-landscape-a-deep-dive-for-industry-analysts-2",
  "/decoding-the-digital-dice-your-guide-to-trustworthy-online-casino-reviews",
  "/decoding-the-digital-dice-navigating-the-nuances-of-modern-gambling",
  "/decoding-the-canadian-online-casino-landscape-a-deep-dive-for-industry-analysts",
  "/get-ready-to-roll-your-beginners-guide-to-online-casino-table-games-in-ireland",
  "/level-up-your-game-navigating-the-ever-changing-world-of-online-gambling-in-canada",
  "/discover-the-thrills-of-aztec-paradise-a-comprehensive-review-of-playing-casino-online-in-english-for-uk-players",
  "/il-gioco-dazzardo-online-strategie-avanzate-per-il-giocatore-esperto",
  "/decouvrez-le-meilleur-jeu-de-casinia-casino-pour-les-joueurs-francais",
  "/online-spil-i-danmark-en-analyse-for-brancheanalytikere",
  "/online-gambling-i-danmark-en-analyse-for-fremtidens-vaekst",
  "/die-kunst-des-spiels-strategien-und-trends-fur-osterreichische-online-casino-enthusiasten",
  "/die-kunst-des-strategischen-spiels-mehr-als-nur-gluck-im-online-casino",
  "/swiss-casino-evolution-analyzing-internationales-casino-fur-einsteiger-aus-der-schweiz-mit-modernen-spielautomaten-fur-moderne-online-spieler-variante-15",
  "/whos-pulling-the-strings-unmasking-the-game-providers-behind-your-favourite-online-slots",
];

/** Every route the site actually serves, from app/sitemap.ts plus /live + /wall. */
const REAL_ROUTES = [
  "/",
  "/about",
  "/areas-we-serve",
  "/brochure",
  "/contact",
  "/features",
  "/pricing",
  "/privacy",
  "/roi-calculator",
  "/solutions",
  "/insights",
  "/insights/case-studies",
  "/live",
  "/wall",
  "/trust/reviews",
  "/trust/photos",
  "/trust/videos",
  "/ai-intruder-detection",
  "/ai-cctv-for-warehouses",
  "/ai-cctv-for-offices",
  "/factory-security",
  "/retail-shop-security",
  "/residential-security",
  "/school-security",
  "/hospital-security",
  "/smart-perimeter-protection",
  "/ai-cctv-ludhiana",
  "/ai-cctv-delhi-ncr",
  "/ai-cctv-gurugram",
  "/ai-cctv-noida",
  "/ai-cctv-mumbai",
  "/ai-cctv-bengaluru",
  "/ai-cctv-jaipur",
  // Punjab cluster, added 2026-08-14. `mandi-gobindgarh` and
  // `chandigarh-mohali` carry 4 hyphens each — inside the tier-1 gate's
  // headroom (6), and this list is what proves they stay safe.
  "/ai-cctv-jalandhar",
  "/ai-cctv-amritsar",
  "/ai-cctv-chandigarh-mohali",
  "/ai-cctv-patiala",
  "/ai-cctv-bathinda",
  "/ai-cctv-mandi-gobindgarh",
  "/ai-cctv-khanna",
  "/ai-cctv-moga",
  "/ai-cctv-hoshiarpur",
  "/ai-cctv-batala",
  "/features/face-recognition",
  "/features/false-alarm-filtering",
  "/features/intrusion-alerts",
  "/features/attendance-automation",
  "/features/loitering-detection",
  "/features/vehicle-and-anpr",
  "/insights/case-studies/warehouse-shrinkage-ludhiana",
  "/insights/case-studies/retail-false-alarms-jaipur",
  "/insights/case-studies/factory-gate-attendance-coimbatore",
  "/insights/case-studies/housing-society-gate-log",
  "/insights/ai-cctv-price-in-india-what-it-should-cost",
  "/insights/how-does-ai-intruder-detection-work",
  "/insights/best-ai-cctv-camera-for-warehouses-india",
  "/insights/face-recognition-attendance-vs-biometric-machine",
  "/insights/stop-threats-before-they-happen",
  "/insights/nobody-can-watch-120-camera-feeds",
  "/insights/1000-alerts-only-one-is-real",
  "/insights/ai-cctv-for-small-shops-worth-it",
  "/insights/where-to-place-cctv-cameras-for-ai-detection",
  "/insights/how-many-of-your-cameras-can-actually-recognize-a-face",
  "/insights/why-biometric-attendance-machines-fail-at-the-factory-gate",
  "/insights/your-dvr-records-the-theft-it-doesnt-stop-it",
];

/**
 * Plausible future pages that share vocabulary with the spam. `/time-slot-*`
 * is here because an earlier draft matched a bare `slot` and did return 410
 * for it — the exact false positive this list exists to prevent.
 */
const INNOCENT_LOOKALIKES = [
  "/time-slot-booking",
  "/time-slots",
  "/booking-slots",
  "/demo-slots",
  "/instagram-reels",
  "/video-reels",
  // Casinos are a real surveillance vertical, so these are pages PGAK could
  // plausibly ship. Both tripped the `casino` pattern before the hyphen gate.
  "/ai-cctv-for-casinos",
  "/ai-cctv-for-hotels-and-casinos",
  "/casino-security",
  "/insights/cctv-for-betting-shops",
  "/insights/casino-floor-surveillance",
  "/features/slot-machine-monitoring",
];

test("410s every gambling-spam URL found in Google's index", () => {
  for (const url of SPAM_URLS) {
    assert.equal(isSpamPath(url), true, `should be spam: ${url}`);
  }
});

test("never matches a route the site actually serves", () => {
  for (const url of REAL_ROUTES) {
    assert.equal(isSpamPath(url), false, `must NOT be spam: ${url}`);
  }
});

test("never matches innocent pages that share spam vocabulary", () => {
  for (const url of INNOCENT_LOOKALIKES) {
    assert.equal(isSpamPath(url), false, `must NOT be spam: ${url}`);
  }
});

test("protected content roots are immune regardless of slug", () => {
  // Even a slug made entirely of spam vocabulary is safe under a live root.
  assert.equal(
    isSpamPath("/insights/the-online-casino-gambling-slots-poker-guide"),
    false,
  );
  assert.equal(isSpamPath("/features/casino"), false);
  // ...but the identical slug at the root is spam.
  assert.equal(
    isSpamPath("/the-online-casino-gambling-slots-poker-guide"),
    true,
  );
});

/**
 * A second wave, read off the live Search Console index report on 2026-08-11.
 * The farm turned out to span Russian, Swedish, Slovak, Polish and German too.
 * Copied verbatim from the report, not invented.
 */
const SPAM_URLS_ROUND_2 = [
  "/1win-skacat-prilozenie-bukmekerskoi-kontory2019-2",
  "/onlain-2026-goda-bolsoi-vybor-slotov-i-bonusov1340",
  "/kazino-oficialnyi-sait-pin-up-casino-vxodi-i-igrai5041",
  "/online-casino-utan-svensk-licens-casino-utan-spelpaus1585",
  "/mostbet-aviator-crash-game1354-2",
  "/anpassungen-und-spannung-beim-glucksspiel-mit-chicken-road",
  "/ako-si-vybrat-spolahlive-zahranicne-online-kasino-zo-slovenska",
  "/spinmama-casino-szybkie-obroty-i-natychmiastowe-wy",
];

test("410s the second wave found in Search Console", () => {
  for (const url of SPAM_URLS_ROUND_2) {
    assert.equal(isSpamPath(url), true, `should be spam: ${url}`);
  }
});

test("unambiguous foreign/brand terms bypass the hyphen gate", () => {
  // The gate exists to protect plausible ENGLISH routes. It was also blocking
  // short spam: these two have 4 and 5 hyphens and were missed before tier 2.
  assert.equal(isSpamPath("/mostbet-aviator-crash-game1354-2"), true);
  assert.equal(
    isSpamPath("/1win-skacat-prilozenie-bukmekerskoi-kontory2019-2"),
    true,
  );
  // ...while ambiguous English vocabulary is still gated.
  assert.equal(isSpamPath("/ai-cctv-for-hotels-and-casinos"), false);
});

test("short route-shaped slugs are exempt even with spam vocabulary", () => {
  // The hyphen gate, stated directly: length is what separates an article slug
  // from a route slug. Five hyphens is still route-shaped; seven is not.
  assert.equal(isSpamPath("/ai-cctv-for-hotels-and-casinos"), false); // 5
  assert.equal(isSpamPath("/a-guide-to-online-casino-games-for-you"), true); // 8
});
