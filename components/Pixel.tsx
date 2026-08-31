"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FB_PIXEL_ID } from "@/lib/fbpixel";

/**
 * Meta (Facebook / Instagram) Pixel.
 *
 * Loads the base pixel once and fires a PageView on first load (inline) plus on
 * every client-side route change. Conversion events (e.g. "Lead") are fired
 * from the relevant component via fbTrack() in @/lib/fbpixel.
 */
export default function Pixel() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      // The initial PageView is already fired by the inline init below.
      isFirstLoad.current = false;
      return;
    }
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname]);

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      {/* Raw HTML on purpose: as a JSX <img>, React hoists a
          <link rel="preload" as="image"> for this 1×1 tracking pixel into the
          head, which burns an early-priority connection during the LCP window
          and makes Chrome warn "preloaded but not used". The noscript body is
          only ever parsed by browsers with JS disabled, so it must not be
          preloaded for everyone else. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" />`,
        }}
      />
    </>
  );
}
