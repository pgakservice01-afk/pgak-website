import BuyerSolution from "@/components/b2b/Solution";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "Multi-Site CCTV: Camera-Feed Health Across Sites | PGAK",
  description: "Evaluate a repeatable way to notice unavailable camera feeds, assign ownership and confirm recovery. Verify central visibility and access for your setup.",
  path: "/multi-site-cctv-monitoring",
});
export default function Page() {
  return <BuyerSolution slug="multi-site-cctv-monitoring" />;
}
