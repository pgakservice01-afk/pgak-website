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
  // Added 2026-09-03: the attendance and platform solutions, the lead pages,
  // and Coimbatore. `attendance-system-for-construction-sites` is the longest
  // real route on the site (4 hyphens) — it is what pins the structural gate.
  "/free-audit",
  "/cctv-buying-checklist",
  "/biometric-attendance",
  "/face-recognition-attendance-system",
  "/cctv-installation-company",
  "/video-analytics-software",
  "/attendance-system-for-factories",
  "/attendance-system-for-warehouses",
  "/attendance-system-for-offices",
  "/attendance-system-for-schools",
  "/attendance-system-for-construction-sites",
  "/ai-cctv-coimbatore",
  "/terms",
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

/**
 * Third wave, 2026-09-03: the Search Console page report (120 days) listed 456
 * legacy URLs and the two vocabulary tiers matched 181. These are copied
 * verbatim from the 271 misses, one or two per new rule.
 */
const SPAM_URLS_ROUND_3 = [
  // tier 0 — structure
  "/items/X290017919",
  "/items/B189114747",
  "/author/admin",
  "/tag/ai-agency",
  "/category/111",
  "/ctimaiyytd-qumarn-tsiri-cmiyytimizd-nlr-dyiir-pin/feed",
  "/21752-2",
  "/24477-2",
  "/beginner-x27-s-guide-to-navigating-the-world-of-2",
  "/apercu-complet-des-enjeux-du-jeu-d-x27-argent-en-5",
  "/%CF%84%CE%B9-%CE%B5%CE%AF%CE%BD%CE%B1%CE%B9-%CE%BF%CE%B9-%CE%BA%CE%BF%CF%85%CE%BB%CE%BF%CF%87%CE%AD%CF%81%CE%B7%CE%B4%CE%B5%CF%82-cluster-pays",
  "/τι-είναι-οι-κουλοχέρηδες-cluster-pays",
  // tier 0 — root-level article-length slugs with no gambling word at all
  "/exploring-the-pros-and-cons-of-online-versus",
  "/securing-your-iot-devices-essential-strategies-for-18",
  // tier 1 + context token (short slugs the length gate missed)
  "/best-litecoin-casinos",
  "/online-casino-plattformen-und-generation-z",
  "/explore-the-complete-overview-of-gambling",
  "/understanding-the-psychology-of-gambling-insights",
  "/glory-online-casino-safety-and-licensing1792",
  "/advanced-betting-guide-discover-efbet-casino",
  // tier 2 — new languages
  "/tipico-sportwetten-schweiz-ein-umfassender-leitfaden-fur-erfahrene-spieler",
  "/interwetten-dart-wetten-angebot-ein-umfassender-leitfaden-fur-schweizer-spieler",
  "/betway-bankuberweisung-osterreich-ein-umfassender-leitfaden",
  "/estrategias-de-guest-posting-para-websites-de-cassinos",
  "/platobne-metody-ktore-ponuka-olybet-casino",
  "/zahranicni-sazkove-kancelare-vse-co-potrebujete-vedet",
  "/ako-dlho-trvaju-vybery-v-europskych-kasinach-2",
  "/jake-strategie-pouit-pi-hrani-hazardnich-her",
  "/tipy-pro-zodpovedne-hrani-a-spravu-bankrollu-na-rollinocasino",
  "/casual-spins-and-clear-layouts-make-pokies-easy-to-enjoy-on-any-device",
  "/top-bookmakers-not-on-gamstop-for-united-kingdom-players-seeking-other-options",
  "/the-changing-landscape-of-igaming-in-2026-insights-and-trends",
  "/gokken-een-complete-gids-voor-beginners-en-experts-2",
  "/ontdek-verborgen-geheimen-van-gokkasten",
  "/hvem-styrer-pengespillene-i-norge-en-guide-for-spillere",
  "/2026-samye-perspektivnye-ploshhadki-dlia-liubitelei-azartnyx",
  "/guia-completa-de-los-juegos-de-azar-mas-populares-2",
  "/tecnicas-avanzadas-para-maximizar-tus-ganancias-en-30",
  "/kumar-siteleri-trkiye-canl-krupiyeli-oyunlar-sunan-online-kumar",
  "/kumarhanelerin-kulturel-etki-alanndaki-rolu-pinco",
  "/descubre-chicken-road-la-nueva-sensacion-en-juegos-7",
  "/aviator-platformas-n-n-konseptual-i-cmal-nec-i-l-6693",
  "/the-evolution-of-gaming-technology-how-pin-up",
  "/ozwin-casino-australia-game-collection86",
  "/big-bass-bonanza-slot-slot-review6847",
  "/thepokies-quickfire-play-for-australian-slot-enthu",
  "/dosificacion-de-peptidos-con-turinabol-beligas-guia-completa",
  "/w-jaki-sposob-znane-osobistoci-wpywaj-na-wiat-gier",
];

test("410s the third wave found in Search Console", () => {
  for (const url of SPAM_URLS_ROUND_3) {
    assert.equal(isSpamPath(url), true, `should be spam: ${url}`);
  }
});

/**
 * The old WordPress site's own pages. next.config.mjs 301s every one of these
 * before the middleware runs, but they must be safe here too — a redirect that
 * is ever removed must fall back to a 404, never a 410.
 */
const LEGACY_REAL_PAGES = [
  "/career-page",
  "/career/innovation",
  "/about-us",
  "/contact-us",
  "/home-01-one-page",
  "/home-06",
  "/landing-page-2-0",
  "/terms-conditions",
  "/privacy-policy",
  "/shipping-delivery-policy",
  "/shop",
  "/our-blog-01",
  "/our-projects3",
  "/celebrating-remarkable-journeys-success-stories",
  "/service/custom-ai-software-development",
  "/service/ai-integration-advisory",
];

test("never matches the old site's real pages", () => {
  for (const url of LEGACY_REAL_PAGES) {
    assert.equal(isSpamPath(url), false, `must NOT be spam: ${url}`);
  }
});

test("structural gate: root-level slugs stay safe up to six hyphens", () => {
  // Six hyphens at the root is still a route (headroom over the real maximum
  // of four); seven is an article title and 410s even with no gambling word.
  assert.equal(isSpamPath("/attendance-system-for-small-businesses-in-india"), false); // 6
  assert.equal(isSpamPath("/how-we-count-people-at-the-factory-gate"), true); // 7
  // Nested paths are exempt from the length rule entirely.
  assert.equal(isSpamPath("/trust/reviews/how-we-count-people-at-the-factory-gate"), false);
  assert.equal(isSpamPath("/insights/how-we-count-people-at-the-factory-gate"), false);
});

test("context tokens are gated to tier-1 vocabulary, not standalone", () => {
  // `best`/`guide` on their own are ordinary words; only next to `casino`,
  // `gambling` etc. do they settle a short slug.
  assert.equal(isSpamPath("/best-cctv-camera-for-shops"), false);
  assert.equal(isSpamPath("/cctv-buying-guide"), false);
  assert.equal(isSpamPath("/ai-cctv-for-casinos"), false);
  assert.equal(isSpamPath("/casino-security"), false);
  assert.equal(isSpamPath("/best-casino-security-guide"), true);
});

test("tier-2 brand words do not swallow ordinary names", () => {
  // `kumar` is an Indian surname before it is Turkish for gambling, so only the
  // compound forms observed in the index are matched.
  assert.equal(isSpamPath("/team/rajesh-kumar"), false);
  assert.equal(isSpamPath("/rajesh-kumar"), false);
  assert.equal(isSpamPath("/kumarhanelerin-kulturel-etki-alanndaki-rolu-pinco"), true);
});

test("WordPress post-ID query strings are spam on any path", () => {
  assert.equal(isSpamPath("/", "?p=20026"), true);
  assert.equal(isSpamPath("/", "?utm_source=x&p=25024"), true);
  assert.equal(isSpamPath("/", "?p=abc"), false);
  assert.equal(isSpamPath("/", ""), false);
  assert.equal(isSpamPath("/pricing", "?utm_source=tradeindia&utm_medium=listing"), false);
  assert.equal(isSpamPath("/?p=1", ""), false); // the query is not part of the pathname
  // Protected roots win even over the query rule.
  assert.equal(isSpamPath("/insights", "?p=1"), false);
});
