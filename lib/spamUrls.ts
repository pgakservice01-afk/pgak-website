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
 * Re-measured 2026-09-03 from the Search Console page report (120 days): Google
 * still reported 454 URLs on the bare host against 22 real pages on `www.`, and
 * the bare host drew 4,669 impressions to the real site's 2,012 — almost all of
 * it casino queries. The vocabulary tiers below caught 181 of those 456; the
 * structural tier was added that day to take the rest without loosening the
 * vocabulary.
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
 * TIER 0 — structure, not vocabulary.
 *
 * Shapes that only the old WordPress install (and the farm that was injected
 * into it) ever produced. None of them can collide with a route this site
 * serves, so they need neither a hyphen gate nor a gambling word:
 *
 *   `/items/X290017919`   a fake product catalogue — 119 URLs in the 2026-09-03
 *                         report, every one a capital letter + 8–9 digits
 *   `/author/…` `/tag/…`  WordPress taxonomy and system paths; the site has no
 *   `/category/…` `/feed` RSS feed and no author pages (`/category/news` is
 *                         301'd to /insights in next.config before this runs)
 *   `/21752-2`            WordPress's numeric fallback slug for a post whose
 *                         title it could not slugify
 *   `-x27-`               the `&#x27;` apostrophe entity the spam generator
 *                         left in its slugs (`beginner-x27-s-guide-…`)
 *   non-ASCII paths       a Greek-language farm; every real route is ASCII
 *                         (Hindi is a UI toggle, never a URL)
 */
const STRUCTURAL_PATTERNS: readonly RegExp[] = [
  /^\/items\/[A-Za-z]\d{5,}(\/|$)/,
  /^\/(author|tag|category|page|comments|feed|wp-admin|wp-content|wp-includes|wp-json)(\/|$)/i,
  /\/feed\/?$/i,
  /^\/xmlrpc\.php$/i,
  /^\/\d{4,}-\d+\/?$/,
  /-x27-/,
  /%[89A-Fa-f][0-9A-Fa-f]/,
  // eslint-disable-next-line no-control-regex
  /[^\x00-\x7F]/,
];

/**
 * Root-level slugs with this many hyphens are article titles, not routes.
 *
 * Measured 2026-09-03: the longest real root-level route is
 * `/attendance-system-for-construction-sites` (4 hyphens); the spam that the
 * vocabulary tiers miss runs 7–19 (`/exploring-the-pros-and-cons-of-online-versus`,
 * `/securing-your-iot-devices-essential-strategies-for-18`). Two hyphens of
 * headroom on the real side. The rule is deliberately root-level only: long
 * titles live under /insights, which is protected wholesale, and a new
 * root-level page with seven or more hyphens is a naming mistake to fix, not a
 * page to ship.
 */
const ROOT_ARTICLE_MIN_HYPHENS = 7;

/**
 * TIER 1 — English gambling vocabulary that a legitimate page could also use.
 *
 * Casinos are a real surveillance vertical, so `/ai-cctv-for-casinos` is a page
 * PGAK could plausibly ship. Everything in this list is therefore gated: either
 * the slug is article-length (MIN_SLUG_HYPHENS) or it also carries one of the
 * CONTEXT_TOKENS that only appear in article titles (`best-…`, `…-guide`,
 * `online-…`). `/best-litecoin-casinos` has two hyphens and slipped the length
 * gate for a month; `best` is what identifies it.
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
  /(^|[-/])poker([-/]|$)/i,
  /(^|[-/])betting([-/]|$)/i,
  /(^|[-/])bookmakers?([-/]|$)/i,
  /free-spins/i,
  /spinning-the-reels/i,
  /(^|[-/])(online|casino|free|video|classic|fruit|pokie|vegas)-slots?([-/]|$)/i,
  /(^|[-/])slots?-(online|casino|games?|bonus|review)([-/]|$)/i,
];

/**
 * Words that put a tier-1 match beyond doubt whatever the slug length. They
 * are the vocabulary of listicles and how-to titles, which is what the farm
 * wrote; a product route never says `best`, `guide` or `beginners`.
 */
const CONTEXT_TOKENS =
  /(^|[-/])(online|best|top|guide|guides|tips|review|reviews|bonus|bonuses|free|players?|wins?|winning|winnings|payouts?|deposits?|withdrawals?|strateg(y|ies)|overview|beginners?|master|mastering|explore|exploring|understanding|world|thrills?|experiences?|myths|psychology|secrets?|ultimate|discover|litecoin|bitcoin|crypto|licensing|safety|anfanger|anfaenger|einsteiger|leitfaden|strategien|tipps)([-/]|$)/i;

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
 * Sampled from the live Search Console index report on 2026-08-11 and again on
 * 2026-09-03 — the injected farm turned out to span Russian, Swedish, Slovak,
 * Polish, German, Dutch, Norwegian, Turkish, Azerbaijani, Spanish and Greek as
 * well as the languages found in the first pass.
 */
const UNAMBIGUOUS_PATTERNS: readonly RegExp[] = [
  // ── German / Austrian / Swiss ──
  /spielautomat/i,
  /freispiele/i,
  /online-spiel/i,
  /gl(u|ü)cksspiel/i,
  /sportwetten/i,
  /(^|[-/])wetten([-/]|$)/i,
  // ── Italian ──
  /azzardo/i,
  /scommesse/i,
  // ── French ──
  /jeu-de-casino/i,
  /jeux-de-hasard/i,
  /jeux-en-ligne/i,
  // ── Danish / Norwegian / Swedish ──
  /online-spil/i,
  /spilleautomat/i,
  /spelpaus/i,
  /utan-svensk-licens/i,
  /pengespill/i,
  /(^|[-/])spillere([-/]|$)/i,
  // ── Dutch ──
  /gokken/i,
  /gokkast/i,
  // ── Czech / Slovak / Polish / Croatian ──
  /synottip/i,
  /kasyn/i, // kasyno, kasynie
  /kasin/i, // kasino, kasina, kasinach, kasinu
  /hazardn/i, // hazardní hry = gambling games
  /sazkov/i, // sázkové kanceláře = betting shops
  /bukmacher/i,
  /kockanj/i,
  // ── Russian / Ukrainian (transliterated) ──
  /kazino/i,
  /bukmeker/i, // bukmekerskoi kontory = bookmaker's office
  /slotov/i, // genitive plural of "slots"
  /igrovye-avtomat/i, // slot machines
  /stavki-na-sport/i, // sports betting
  /azartn/i, // azartnye = gambling
  // ── Spanish / Portuguese ──
  /tragaperras/i,
  /(^|[-/])apuestas([-/]|$)/i,
  /cassinos?([-/]|$)/i,
  /juegos?-de-azar/i,
  /(^|[-/])(el|del)-juego([-/]|$)/i,
  /(^|[-/])jugador(es)?([-/]|$)/i,
  /ganancias/i,
  // ── Turkish / Azerbaijani ──
  /kumarhane/i,
  /kumar-siteleri/i,
  /qumar/i,
  // ── English words with no non-gambling reading ──
  /(^|[-/])pokies([-/]|$)/i,
  /thepokies/i,
  /gamstop/i,
  /igaming/i,
  /bankroll/i,
  // ── Operator brands and game titles. Endless by nature; these are the ones
  //    actually observed in this domain's index. Add on sight, never
  //    speculatively. ──
  /casinia/i,
  /(^|[-/])1win([-/]|$)/i,
  /(^|[-/])1xbet([-/]|$)/i,
  /mostbet/i,
  /melbet/i,
  /parimatch/i,
  /spinmama/i,
  /(^|[-/])pin-?up([-/]|$)/i,
  /(^|[-/])pinco([-/]|$)/i,
  /(^|[-/])aviator([-/]|$)/i,
  /tipico/i,
  /interwetten/i,
  /betway/i,
  /olybet/i,
  /efbet/i,
  /vincispin/i,
  /betdaq/i,
  /boylesports/i,
  /mrgreen/i,
  /coolzino/i,
  /basswin/i,
  /legiano/i,
  /bankonbet/i,
  /galactic-wins/i,
  /(^|[-/])vbet([-/]|$)/i,
  /dudespin/i,
  /ozwin/i,
  /montecrypto/i,
  /rainbet/i,
  /betandreas/i,
  /chicken-road/i,
  /rabbit-road/i,
  /big-bass-bonanza/i,
  /sugar-rush-slots/i,
  /cashedcasino/i,
  /spielerlebnis/i,
  /bonuser/i,
  /stratejiler/i,
  // One steroid-spam post rode along with the casino farm.
  /turinabol/i,
];

/**
 * Minimum hyphens before a tier-1 word is enough on its own.
 *
 * The injected URLs are article *titles* turned into slugs; this site's routes
 * are short product, vertical and city slugs. That structural difference is
 * measurable and the gap is wide — measured 2026-08-10 over the 18 spam URLs
 * observed in Google and every route the site serves:
 *
 *   spam:  7 hyphens minimum (range 7-19)
 *   real:  4 hyphens maximum  (`/attendance-system-for-construction-sites`)
 *
 * 6 sits in that gap. It exists to protect plausible *future* routes that
 * legitimately share the vocabulary — `/ai-cctv-for-casinos` is an obvious one
 * for a surveillance company, and without this gate the `casino` pattern would
 * have 410'd it.
 *
 * Biased deliberately: a spam URL that slips under the gate stays a 404, which
 * is what it returns today and costs nothing. A real page that trips the gate
 * would be dropped from Google permanently.
 */
const MIN_SLUG_HYPHENS = 6;

/** `?p=20026` — WordPress's post-ID permalink. The farm's posts were reachable this way too. */
const WP_POST_ID_QUERY = /(^\?|&)p=\d+(&|$)/;

function isRootArticleSlug(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length !== 1) return false;
  return (segments[0].match(/-/g) ?? []).length >= ROOT_ARTICLE_MIN_HYPHENS;
}

/**
 * True when `pathname` (plus the optional `?query`) is a leftover WordPress or
 * gambling-spam URL that should return 410.
 */
export function isSpamPath(pathname: string, search = ""): boolean {
  if (
    PROTECTED_ROOTS.some(
      (root) => pathname === root || pathname.startsWith(`${root}/`),
    )
  ) {
    return false;
  }

  // WordPress post-ID permalinks, on any path — the site never reads `?p=`.
  if (search && WP_POST_ID_QUERY.test(search)) return true;

  // Tier 0 — shapes no real route can take.
  if (STRUCTURAL_PATTERNS.some((re) => re.test(pathname))) return true;
  if (isRootArticleSlug(pathname)) return true;

  // Tier 2 needs no length gate — nothing legitimate here can contain these.
  if (UNAMBIGUOUS_PATTERNS.some((re) => re.test(pathname))) return true;

  // Tier 1 is English vocabulary a real page might share, so it must also look
  // like an article: either long enough, or carrying a title-only word.
  if (!AMBIGUOUS_PATTERNS.some((re) => re.test(pathname))) return false;
  const hyphens = (pathname.match(/-/g) ?? []).length;
  return hyphens >= MIN_SLUG_HYPHENS || CONTEXT_TOKENS.test(pathname);
}
