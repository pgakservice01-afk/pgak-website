"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Pixel from "@/components/Pixel";
import { afterPagePaint } from "@/lib/after-page-paint";

export default function DeferredAnalytics({
  gaIds,
  clarityId,
}: {
  gaIds: readonly string[];
  clarityId?: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => afterPagePaint(() => setReady(true)), []);
  if (!ready) return null;
  return (
    <>
      <Pixel />
      <Analytics />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${gaIds.map((id) => `gtag('config', '${id}');`).join("\n")}`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaIds[0]}`}
        strategy="lazyOnload"
      />
      {clarityId && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
