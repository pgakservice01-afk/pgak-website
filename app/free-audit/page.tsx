import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import ReadinessAssessment from "@/components/b2b/ReadinessAssessment";
export const metadata = pageMeta({
  title: "Check your cameras before choosing AI analytics | PGAK",
  description:
    "Prepare a camera-readiness brief for your business. Get a useful checklist before sharing contact details. Technical compatibility is confirmed separately.",
  path: "/free-audit",
});
export default function Page() {
  return (
    <BuyerPage
      title="Check your cameras before choosing AI analytics"
      intro="Prepare a camera-readiness brief for your business. Get a useful checklist before sharing contact details. Technical compatibility is confirmed separately."
      path="/free-audit"
      eyebrow="CAMERA READINESS ASSESSMENT"
    >
      <ReadinessAssessment />
    </BuyerPage>
  );
}
