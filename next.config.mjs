/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The scrollytelling canvas + animations are the focus; don't let lint warnings
  // block a production build. Type-checking still runs.
  eslint: { ignoreDuringBuilds: true },

  // Gzip/Brotli at the Next layer. Vercel and most CDNs compress at the edge
  // anyway, but this covers self-hosted `next start` deployments too.
  compress: true,

  // Don't advertise the framework version to scanners.
  poweredByHeader: false,

  // Canonicalisation: one URL shape per page, so crawlers never see /about
  // and /about/ as two documents.
  trailingSlash: false,

  images: {
    // AVIF first, WebP fallback. next/image negotiates per request, so a
    // browser supporting neither still gets the original file.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimised variants are immutable — cache for a year.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  async rewrites() {
    // Dev-only, opt-in: proxy the cloud API through the dev server so the
    // camera wall is testable on localhost. The prod API's CORS allowlist is
    // (rightly) locked to https://pgak.co.in, so a localhost tab can't call it
    // directly — set PGAK_DEV_API_PROXY=1 and NEXT_PUBLIC_PGAK_API=/pgak-api in
    // .env.local and the wall works locally against real cameras. Off (the
    // default) this returns no rewrites and prod behaviour is untouched.
    if (process.env.NODE_ENV === "development" && process.env.PGAK_DEV_API_PROXY) {
      return [
        {
          source: "/pgak-api/:path*",
          destination: "https://cloud.pgak.co.in/api/v1/:path*",
        },
      ];
    }
    return [];
  },

  async redirects() {
    return [
      // Case studies moved under /insights. These URLs were live and in the
      // sitemap, so they get permanent redirects rather than 404s — that
      // preserves any link equity and doesn't break shared links.
      {
        source: "/case-studies",
        destination: "/insights/case-studies",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/insights/case-studies/:slug",
        permanent: true,
      },
    ];
  },

  async headers() {
    const oneYearImmutable = "public, max-age=31536000, immutable";
    const isDev = process.env.NODE_ENV === "development";

    return [
      {
        // Security headers on every response.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Only meaningful over HTTPS; harmless otherwise. Keeps every
          // subsequent visit on TLS without a redirect hop.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // REPORT-ONLY on purpose: this policy is a measurement, not a
          // control. It mirrors what the site actually loads today (GTM/GA4,
          // Meta pixel, Clarity, Vercel insights, inline theme/analytics
          // snippets). Watch the browser console for violations across a real
          // week before switching the key to Content-Security-Policy —
          // enforcing an untested policy silently breaks analytics or the map
          // embed for every visitor at once.
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.clarity.ms https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://c.clarity.ms",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://vitals.vercel-insights.com",
              "frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.google.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              // No `upgrade-insecure-requests` here: it is ignored in a
              // report-only policy and Chrome logs an Issues-panel error for
              // it, which costs Lighthouse best-practices points. Add it when
              // this policy is switched to enforcing.
            ].join("; "),
          },
        ],
      },
      // ── Long-lived caching, PRODUCTION ONLY ──────────────────────────────
      // Both rules below are unsafe in dev. `next dev` serves chunks under
      // stable, unhashed names (static/chunks/app/contact/page.js), so an
      // `immutable` header pins a pre-edit bundle in the browser for a year —
      // the server then renders new markup against a stale client bundle and
      // React throws a hydration mismatch that survives normal reloads.
      // In production every filename carries a content hash, so pinning is
      // both safe and exactly what you want.
      ...(isDev
        ? []
        : [
            {
              // Static media in /public. Effectively content-addressed by
              // filename, so rename the file when the asset itself changes.
              source:
                "/:path*.(png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|webm|woff2)",
              headers: [{ key: "Cache-Control", value: oneYearImmutable }],
            },
            {
              source: "/_next/static/:path*",
              headers: [{ key: "Cache-Control", value: oneYearImmutable }],
            },
          ]),
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
