import Nav from "@/components/Nav";
import ImageHero from "@/components/sections/ImageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import SystemFlow from "@/components/sections/SystemFlow";
import LiveIntelligence from "@/components/sections/LiveIntelligence";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
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
        <HowItWorks />
        <SystemFlow />
        <LiveIntelligence />
        <Features />
        <Pricing />
        <FAQ />
        <DealerForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
