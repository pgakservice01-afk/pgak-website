import type { Metadata, Viewport } from "next";
import { Sora, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
const GTM_ID = "GTM-MKZWLS7J";
// Keep preview/local QA out of production acquisition and lead metrics.
const ANALYTICS_ENABLED = process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
import { Analytics } from "@vercel/analytics/next";
import Pixel from "@/components/Pixel";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import MobileActionBar from "@/components/MobileActionBar";
import { LangProvider } from "@/components/LangProvider";
import AmbientFX from "@/components/AmbientFX";
import Interactions from "@/components/Interactions";
import SmoothScroll from "@/components/SmoothScroll";
import ConversionEvents from "@/components/ConversionEvents";
import LeadAttribution from "@/components/LeadAttribution";
import ChatBot from "@/components/ChatBot";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import StickyDemoCTA from "@/components/StickyDemoCTA";
import MarketingOverlays from "@/components/MarketingOverlays";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/** Optional — set NEXT_PUBLIC_CLARITY_ID in .env to enable Microsoft Clarity. */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  // Per-page titles win; this template gives any page that forgets one a
  // sensible, branded fallback instead of a bare string.
  title: {
    default: "PGAK — AI CCTV That Acts Before It's Too Late",
    template: "%s",
  },
  description:
    "PGAK turns ordinary cameras into intelligent guardians. AI that detects threats in seconds, cuts false alarms, and gives you real peace of mind — 24×7.",
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
  themeColor: "#0a1014",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${fraunces.variable}`}>
      <head>
        {/* Warm up the third-party origins the page will hit anyway. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Site-wide structured data: Organization/LocalBusiness + WebSite.
            Per-page WebPage, Service, FAQ and Breadcrumb nodes reference these
            by @id, so the whole site resolves into one graph. */}
        <JsonLd nodes={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        {/* Google Tag Manager (noscript) — immediately after opening <body> */}
        {ANALYTICS_ENABLED && <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>}

        {/* Google Tag Manager — lazyOnload keeps its 165KB chain out of the
            LCP-critical window; the dataLayer stub below still queues early
            events until it arrives. */}
        {ANALYTICS_ENABLED && <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>}

        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('pgak-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();",
          }}
        />
        <LangProvider>
          <SmoothScroll />
          <LeadAttribution />
          <ConversionEvents />
          <AmbientFX />
          <Interactions />
          <ScrollProgress />
          {children}
          {/* Marketing furniture only — none of it on /live, /wall or
              /billing, where a customer is signing in, watching cameras or
              paying (see components/MarketingOverlays). */}
          <MarketingOverlays>
            {/* keeps the last of the footer clear of the mobile action bar */}
            <div aria-hidden="true" className="h-16 md:hidden" />
            <WhatsAppButton />
            <MobileActionBar />
            <ChatBot />
            <BackToTop />
            <StickyDemoCTA />
          </MarketingOverlays>
        </LangProvider>
        {ANALYTICS_ENABLED && <Pixel />}
        {ANALYTICS_ENABLED && <Analytics />}

        {ANALYTICS_ENABLED && <>
        {/* Google tag (GA4) — one loader, one `config` per property. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_IDS[0]}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${GA_IDS.map((id) => `gtag('config', '${id}');`).join("\n")}`}
        </Script>
        </>}

        {/* Microsoft Clarity — behaviour analytics. Only loads when the env
            var is set, so local and preview builds stay out of the data. */}
        {ANALYTICS_ENABLED && CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        )}


      </body>
    </html>
  );
}
