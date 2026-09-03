import { NextResponse, type NextRequest } from "next/server";

import { isSpamPath } from "@/lib/spamUrls";

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
