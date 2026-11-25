import BuyerSolution from "@/components/b2b/Solution";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "AI CCTV Evaluation for Factory Security Operations | PGAK",
  description: "Start with one factory workflow: gates, restricted areas, shift change or after-hours access. Define the event and the response before the analytics.",
  path: "/factory-security",
});
export default function Page() {
  return <BuyerSolution slug="factory-security" />;
}
