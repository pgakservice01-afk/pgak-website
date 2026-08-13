/**
 * Recognises the gambling-spam URLs left behind by the WordPress compromise
 * that predates this Next.js site, so `middleware.ts` can answer them with
 * `410 Gone` instead of `404`.
 *
 * ── Background ──
 * Before the rebuild, pgak.co.in ran WordPress and was hacked into a
 * multilingual casino-spam farm: root-level posts in English, German, Italian,
 * French, Danish and Czech. The files are long gone — every one of those URLs
 * already 404s — but Google's index still holds them. On 2026-08-10 a
 * `site:pgak.co.in` query returned casino pages almost to the exclusion of the
 * real site, which is the biggest single drag on organic traffic here.
 *
 * 404 and 410 both lead to removal; 410 is the stronger signal, asserting the
 * resource is intentionally and permanently gone, so Google can drop it without
 * the confirming re-crawl a 404 usually earns.
 *
 * ── The design rule that matters ──
 * A false positive is far more costly than a false negative. Missing a spam URL
 * leaves an ordinary 404 — exactly what it returns today, so nothing is lost.
 * Wrongly matching a real page tells Google to forget it permanently. So every
 * pattern below is anchored to hyphen boundaries or requires a gambling
 * qualifier; none is a bare substring. `PROTECTED_ROOTS` is the backstop.
 */

/**
 * Live content roots. Nothing beneath them is ever eligible for a 410, however
 * a future article slug reads — an insights post about, say, betting-shop
 * security must not be able to delete itself from the index.
 */
const PROTECTED_ROOTS = [
  "/insights",
  "/features",
  "/solutions",
  "/trust",
  "/live",
  "/wall",
];

/**
 * TIER 1 — English gambling vocabulary that a legitimate page could also use.
 *
 * Casinos are a real surveillance vertical, so `/ai-cctv-for-casinos` is a page
 * PGAK could plausibly ship. Everything in this list is therefore gated behind
 * MIN_SLUG_HYPHENS as well.
 *
 * Two words needed extra care:
 *   `slots` — `/time-slot-booking` must stay a plain 404, so `slots` counts
 *             only next to a gambling qualifier (`online-slots`, `free-slots`).
 *   `reels` — `/instagram-reels` is a plausible future marketing page, so only
 *             the spam's actual title form `spinning-the-reels` is matched.
 */
const AMBIGUOUS_PATTERNS: readonly RegExp[] = [
  /\bcasino/i,
  /\bgambl/i, // gambling, gambler
  /\bwagering\b/i,
  /\bjackpot/i,
  /\broulette\b/i,
  /\bblackjack\b/i,
  /\bbaccarat\b/i,
  /(^|-)poker(-|$)/i,
  /(^|-)betting(-|$)/i,
  /(^|-)bookmaker(-|$)/i,
  /free-spins/i,
  /spinning-the-reels/i,
  /(^|-)(online|casino|free|video|classic|fruit|pokie|vegas)-slots?(-|$)/i,
  /(^|-)slots?-(online|casino|games?|bonus)(-|$)/i,
];

/**
 * TIER 2 — terms that can only ever be gambling spam on this domain.
 *
 * Foreign-language gambling words and betting-brand names. An AI-CCTV company
 * in Ludhiana will never ship a route containing `glucksspiel`, `bukmeker` or
 * `mostbet`, so these need no hyphen gate and are matched on sight.
 *
 * ⚠️ That exemption is the point. The gate was added to protect plausible
 * English routes, but it also blocked real spam that happened to be short:
 * `/mostbet-aviator-crash-game1354-2` has 4 hyphens and
 * `/1win-skacat-prilozenie-bukmekerskoi-kontory2019-2` has 5, so both slipped
 * under it. Splitting the vocabulary by ambiguity fixes that without weakening
 * the protection where it is actually needed.
 *
 * Sampled from the live Search Console index report on 2026-08-11 — the
 * injected farm turned out to span Russian, Swedish, Slovak, Polish and German
 * as well as the languages found in the first pass.
 */
const UNAMBIGUOUS_PATTERNS: readonly RegExp[] = [
  // ── German / Austrian / Swiss ──
  /spielautomat/i,
  /freispiele/i,
  /online-spiel/i,
  /gl(u|ü)cksspiel/i,
  // ── Italian ──
  /azzardo/i,
  /scommesse/i,
  // ── French ──
  /jeu-de-casino/i,
  /jeux-de-hasard/i,
  // ── Danish / Norwegian / Swedish ──
  /online-spil/i,
  /spilleautomat/i,
  /spelpaus/i,
  /utan-svensk-licens/i,
  // ── Czech / Slovak / Polish ──
  /synottip/i,
  /kasyno/i,
  /kasino/i,
  // ── Russian / Ukrainian (transliterated) ──
  /kazino/i,
  /bukmeker/i, // bukmekerskoi kontory = bookmaker's office
  /slotov/i, // genitive plural of "slots"
  /igrovye-avtomat/i, // slot machines
  /stavki-na-sport/i, // sports betting
  // ── Spanish ──
  /tragaperras/i,
  /(^|-)apuestas(-|$)/i,
  // ── Operator brands. Endless by nature; these are the ones actually
  //    observed in this domain's index. Add on sight, never speculatively. ──
  /casinia/i,
  /(^|-)1win(-|$)/i,
  /(^|-)1xbet(-|$)/i,
  /mostbet/i,
  /melbet/i,
  /parimatch/i,
  /spinmama/i,
  /pin-up-casino/i,
  /aviator-crash-game/i,
];

/**
 * Minimum hyphens before a path is even considered.
 *
 * The injected URLs are article *titles* turned into slugs; this site's routes
 * are short product, vertical and city slugs. That structural difference is
 * measurable and the gap is wide — measured 2026-08-10 over the 18 spam URLs
 * observed in Google and every route the site serves:
 *
 *   spam:  7 hyphens minimum (range 7-19)
 *   real:  3 hyphens maximum  (`/ai-cctv-for-warehouses`, `/ai-cctv-delhi-ncr`)
 *
 * 6 sits in that gap with a hyphen of headroom on each side. It exists to
 * protect plausible *future* routes that legitimately share the vocabulary —
 * `/ai-cctv-for-casinos` is an obvious one for a surveillance company, and
 * without this gate the `casino` pattern would have 410'd it.
 *
 * Biased deliberately: a spam URL that slips under the gate stays a 404, which
 * is what it returns today and costs nothing. A real page that trips the gate
 * would be dropped from Google permanently.
 */
const MIN_SLUG_HYPHENS = 6;

/** True when `pathname` is a leftover gambling-spam URL that should return 410. */
export function isSpamPath(pathname: string): boolean {
  if (
    PROTECTED_ROOTS.some(
      (root) => pathname === root || pathname.startsWith(`${root}/`),
    )
  ) {
    return false;
  }

  // Tier 2 needs no length gate — nothing legitimate here can contain these.
  if (UNAMBIGUOUS_PATTERNS.some((re) => re.test(pathname))) return true;

  // Tier 1 is English vocabulary a real page might share, so it must also look
  // like an article slug rather than a route slug.
  const hyphens = (pathname.match(/-/g) ?? []).length;
  if (hyphens < MIN_SLUG_HYPHENS) return false;

  return AMBIGUOUS_PATTERNS.some((re) => re.test(pathname));
}
