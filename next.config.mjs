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
