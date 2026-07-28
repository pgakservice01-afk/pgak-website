import type { Metadata, Viewport } from "next";
import { Sora, Fraunces } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Pixel from "@/components/Pixel";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import MobileActionBar from "@/components/MobileActionBar";
import { LangProvider } from "@/components/LangProvider";
import Preloader from "@/components/Preloader";
import AmbientFX from "@/components/AmbientFX";
import Interactions from "@/components/Interactions";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "PGAK — Intelligent Security That Acts Before It's Too Late",
  description:
    "PGAK turns ordinary cameras into intelligent guardians. AI that detects threats in seconds, cuts false alarms, and gives you real peace of mind — 24×7.",
  metadataBase: new URL("https://pgak.co.in"),
  openGraph: {
    title: "PGAK — Intelligent Security That Acts Before It's Too Late",
    description:
      "AI that turns the cameras you already own into intelligent guardians — detecting threats in seconds, cutting false alarms, 24×7.",
    url: "https://pgak.co.in",
    siteName: "PGAK",
    type: "website",
  },
  icons: {
    icon:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 22 C60 22 68 25 75 28 C77 29 78 30 78 33 L78 50 C78 66 66 78 50 84 C34 78 22 66 22 50 L22 33 C22 30 23 29 25 28 C32 25 40 22 50 22 Z' fill='none' stroke='%237CF5C4' stroke-width='5'/><g fill='%237CF5C4'><path d='M50 34 L63.9 42 L50 43.5 Z'/><path d='M63.9 42 L63.9 58 L55.6 46.8 Z'/><path d='M63.9 58 L50 66 L55.6 53.2 Z'/><path d='M50 66 L36.1 58 L50 56.5 Z'/><path d='M36.1 58 L36.1 42 L44.4 53.2 Z'/><path d='M36.1 42 L50 34 L44.4 46.8 Z'/></g></svg>",
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
    <html lang="en" className={`${sora.variable} ${fraunces.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('pgak-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();",
          }}
        />
        <LangProvider>
          <SmoothScroll />
          <Preloader />
          <AmbientFX />
          <Interactions />
          <ScrollProgress />
          {children}
          {/* keeps the last of the footer clear of the mobile action bar */}
          <div aria-hidden="true" className="h-16 md:hidden" />
          <WhatsAppButton />
          <MobileActionBar />
        </LangProvider>
        <Pixel />
        <Analytics />
      </body>
    </html>
  );
}
