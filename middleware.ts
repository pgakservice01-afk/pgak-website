import { NextResponse, type NextRequest } from "next/server";

import { isSpamPath } from "@/lib/spamUrls";
import { aiCrawlerName } from "@/lib/aiReferrers";

/**
 * Answers the leftover WordPress gambling-spam URLs with `410 Gone` so Google
 * drops them faster than a plain 404 would. The matching rules, the reasoning
 * and the safety argument all live in `lib/spamUrls.ts`; tests in
 * `lib/spamUrls.test.ts` (`npm run test:middleware`).
 *
 * The old site's *legitimate* URLs (`/about-us`, `/career-page`, …) never reach
 * this file: `next.config.mjs` 301s them to their new homes first.
 *
 * This is an accelerator, not the cure. The cure is Search Console — verify the
 * BARE `pgak.co.in` host, since that is where the spam is indexed, not `www.`
 * — then check Manual Actions and file a reconsideration request if one is
 * listed. See the "Hacked-WordPress spam cleanup" section of DEPLOY.md.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (isSpamPath(pathname, search)) {
    // No body: 410 is consumed by crawlers, and any human who lands here came
    // from a stale search result for content that was never ours.
    return new NextResponse(null, {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=86400",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  // ── AI crawler visibility ────────────────────────────────────────────────
  // An assistant can only cite a page its operator has actually fetched, and
  // no bot runs the GA4 tag, so this is the only place that fact is
  // observable. One line per fetch, prefixed so it can be filtered in the
  // Vercel runtime logs (`ai-crawl`) and counted per operator and per path.
  // A response header carries the same label for anyone reading a single
  // request; it is inert for browsers, which never match here.
  const crawler = aiCrawlerName(request.headers.get("user-agent"));
  if (crawler) {
    console.log(`ai-crawl operator="${crawler}" path="${pathname}"`);
    const response = NextResponse.next();
    response.headers.set("X-AI-Crawler", crawler);
    return response;
  }

  return NextResponse.next();
}

/**
 * Skips build assets, images, the SEO files and `/api/`, so this costs nothing
 * on the paths that serve real traffic. The trailing `.[ext]` clause is what
 * keeps every file in /public out of the middleware.
 *
 * `/api/` is excluded because no spam URL ever lived there — the WordPress
 * posts were all root-level — so running this on the lead route would burn an
 * invocation per submission to answer "not spam". Adding a term to a negative
 * lookahead can only make the middleware match less, never more, so it cannot
 * put a real page at risk.
 */
export const config = {
  matcher: ["/((?!api/|_next/|favicon|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
