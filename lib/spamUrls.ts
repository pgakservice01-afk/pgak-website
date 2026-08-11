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
 * Vocabulary unique to the injected content. Whole words or distinctive foreign
 * stems only.
 *
 * Two words needed care because they have innocent English uses:
 *   `slots` — `/time-slot-booking` must stay a plain 404, so `slots` counts
 *             only next to a gambling qualifier (`online-slots`, `free-slots`).
 *   `reels` — `/instagram-reels` is a plausible future marketing page, so only
 *             the spam's actual title form `spinning-the-reels` is matched.
 */
const SPAM_PATTERNS: readonly RegExp[] = [
  // ── English ──
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
  // ── German / Austrian / Swiss ──
  /spielautomat/i,
  /freispiele/i,
  /online-spiel/i,
  // ── Italian ──
  /azzardo/i,
  /scommesse/i,
  // ── French ──
  /jeu-de-casino/i,
  /jeux-de-hasard/i,
  /casinia/i,
  // ── Danish / Norwegian / Swedish ──
  /online-spil/i,
  /spilleautomat/i,
  // ── Czech / Polish ──
  /synottip/i,
  /kasyno/i,
  /kasino/i,
  // ── Spanish ──
  /tragaperras/i,
  /(^|-)apuestas(-|$)/i,
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

  const hyphens = (pathname.match(/-/g) ?? []).length;
  if (hyphens < MIN_SLUG_HYPHENS) return false;

  return SPAM_PATTERNS.some((re) => re.test(pathname));
}
