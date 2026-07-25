import Nav from "@/components/Nav";
import ImageHero from "@/components/sections/ImageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import ProblemSolution from "@/components/sections/ProblemSolution";
import NumbersStrip from "@/components/sections/NumbersStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import SystemFlow from "@/components/sections/SystemFlow";
import LiveIntelligence from "@/components/sections/LiveIntelligence";
import Features from "@/components/sections/Features";
import FreeAudit from "@/components/sections/FreeAudit";
import GoogleReviews from "@/components/sections/GoogleReviews";
import CustomerTrust from "@/components/sections/CustomerTrust";
import RoiCalculator from "@/components/sections/RoiCalculator";
import InsightsTeaser from "@/components/sections/InsightsTeaser";
import FAQ from "@/components/sections/FAQ";
import DealerForm from "@/components/sections/DealerForm";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ImageHero />
        <TrustStrip />
        <ProblemSolution />
        <NumbersStrip />
        <HowItWorks />
        <SystemFlow />
        <LiveIntelligence />
        <Features />
        <FreeAudit />
        <GoogleReviews />
        <CustomerTrust />
        <RoiCalculator />
        <InsightsTeaser />
        <FAQ />
        <DealerForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
