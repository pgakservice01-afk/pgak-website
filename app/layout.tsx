import type { Metadata, Viewport } from "next";

import "./globals.css";
import "./premium.css";
import "./buyer.css";

/**
 * GA4 measurement IDs, in order. Every one of them receives the same hits.
 *
 * ⚠️ Google's setup screen warns "Don't add more than one Google tag to each
 * page" — that rule is about loading `gtag.js` more than once, not about how
 * many properties it reports to. So there is still exactly ONE loader script
 * below (keyed to the first id), and each additional property is added with
 * its own `gtag('config', …)` call. That is Google's supported way to send one
 * page's traffic to several properties, and it avoids the duplicated pageviews
 * a second loader would cause.
 *
 * To retire a property, delete its id here — nothing else needs to change.
 */
// Single canonical GA4 property (owner-confirmed 2026-08-21). The old
// duplicate G-MBYGPSVJ1Z was double-counting every visit.
const GA_IDS = ["G-6EMP9HSR2F"] as const;
// GTM-MKZWLS7J contained only the same GA4 config (verified 2026-09-19).
// Use the direct GA4 loader below once, avoiding a redundant container.
// Keep preview/local QA out of production acquisition and lead metrics.
const ANALYTICS_ENABLED =
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
import MobileActions from "@/components/b2b/MobileActions";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import { FB_PIXEL_ID } from "@/lib/fbpixel";
import ConversionEvents from "@/components/ConversionEvents";
import MarketingOverlays from "@/components/MarketingOverlays";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";
import LeadAttribution from "@/components/LeadAttribution";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/** Optional — set NEXT_PUBLIC_CLARITY_ID in .env to enable Microsoft Clarity. */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  // Per-page titles win; this template gives any page that forgets one a
  // sensible, branded fallback instead of a bare string.
  title: {
    default: "PGAK — AI Video Analytics for Existing CCTV",
    template: "%s",
  },
  description:
    "AI video analytics for existing CCTV cameras. Explore intrusion detection, face recognition, attendance and alerts for your business with PGAK.",
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons come from the app/ file convention (favicon.ico, icon.svg,
  // apple-icon.png) rather than an inline data: URI. Google will only show a
  // favicon in search results if it can fetch one from a real, crawlable URL —
  // a data: URI is not one, and /favicon.ico used to 404.
  verification: {
    google: "EBIxU99YdM09R42PROsbpLHwUx42qP9mpkKp2wHUC7A",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" data-theme="light">
      <head>
        {/* Warm up the third-party origins the page will hit anyway. */}
        {ANALYTICS_ENABLED && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        {ANALYTICS_ENABLED && (
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        )}
        {/* Site-wide structured data: Organization/LocalBusiness + WebSite.
            Per-page WebPage, Service, FAQ and Breadcrumb nodes reference these
            by @id, so the whole site resolves into one graph. */}
        <JsonLd nodes={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        <>
          <LeadAttribution />
          <ConversionEvents />
          {children}
          {/* Mobile keeps the b2b action bar, which hides itself when a lead
              form is already on screen. Desktop keeps the floating WhatsApp
              button, which the 19 Sep redesign left unmounted.

              Both, not one: `.buyer-mobile-actions` is display:none until the
              mobile breakpoint and the float is `hidden md:flex`, so they
              never appear together. Mounting only MobileActions would leave
              desktop with no persistent way to message.

              MarketingOverlays keeps the float off /live, /wall and /billing,
              where a customer is signing in or paying rather than being sold
              to; MobileActions does its own check for the same routes. */}
          <MarketingOverlays>
            <WhatsAppButton />
          </MarketingOverlays>
          <MobileActions />
        </>
        {ANALYTICS_ENABLED && (
          <DeferredAnalytics gaIds={GA_IDS} clarityId={CLARITY_ID} />
        )}
        {ANALYTICS_ENABLED && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" />`,
            }}
          />
        )}
      </body>
    </html>
  );
}
