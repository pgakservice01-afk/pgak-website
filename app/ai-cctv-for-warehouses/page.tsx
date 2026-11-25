import BuyerSolution from "@/components/b2b/Solution";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "AI CCTV Evaluation for Warehouses and Loading Bays | PGAK",
  description: "Assess loading bays, stock areas and after-hours approaches against how your warehouse really operates, including deliveries and legitimate work.",
  path: "/ai-cctv-for-warehouses",
});
export default function Page() {
  return <BuyerSolution slug="ai-cctv-for-warehouses" />;
}
