import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ImageHero from "@/components/sections/ImageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import ProblemSolution from "@/components/sections/ProblemSolution";
import BeforeAfter from "@/components/sections/BeforeAfter";
import NumbersStrip from "@/components/sections/NumbersStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import SystemFlow from "@/components/sections/SystemFlow";
import LiveIntelligence from "@/components/sections/LiveIntelligence";
import Features from "@/components/sections/Features";
import FreeAudit from "@/components/sections/FreeAudit";
import GoogleReviews from "@/components/sections/GoogleReviews";
import CustomerTrust from "@/components/sections/CustomerTrust";
import ProtectedSites from "@/components/sections/ProtectedSites";
import RoiTeaser from "@/components/sections/RoiTeaser";
import InsightsTeaser from "@/components/sections/InsightsTeaser";
import HardwareGrid from "@/components/sections/HardwareGrid";
import FAQ from "@/components/sections/FAQ";
import DealerForm from "@/components/sections/DealerForm";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  faqSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/schema";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = pageMeta({
  title:
    "AI CCTV Camera for Business & Home in India | PGAK",
  description:
    "PGAK turns the CCTV cameras you already own into an AI security system — real-time intruder detection, face recognition and 90% fewer false alarms. Get your price on a call or WhatsApp.",
  path: "/",
  keywords: [
    "AI CCTV camera",
    "AI intruder detection",
    "smart security system",
    "business CCTV",
    "warehouse security",
    "AI security camera India",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: "/",
            name: "PGAK — AI CCTV and intelligent security",
            description:
              "AI security software that runs on your existing CCTV cameras: real-time intruder detection, face recognition and false-alarm filtering.",
          }),
          softwareApplicationSchema(),
          faqSchema(FAQS.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />
      <Nav />
      <main>
        <ImageHero />
        <TrustStrip />
        <ProblemSolution />
        <BeforeAfter />
        <NumbersStrip />
        <HowItWorks />
        <SystemFlow />
        <LiveIntelligence />
        <Features />
        {/* Right after Features: the reader has just learned what PGAK does
            and is now asking what it costs them and what comes back. */}
        <RoiTeaser />
        <FreeAudit />
        <GoogleReviews />
        <CustomerTrust />
        <ProtectedSites />
        <InsightsTeaser />
        <HardwareGrid />
        <FAQ />
        <DealerForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
