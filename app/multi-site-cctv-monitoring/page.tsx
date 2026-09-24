import BuyerSolution from "@/components/b2b/Solution";
import { BUYER_SOLUTIONS } from "@/lib/b2b/solutions";
import { pageMeta } from "@/lib/seo";
const s = BUYER_SOLUTIONS["multi-site-cctv-monitoring"];
export const metadata = pageMeta({
  title: s.title + " | PGAK",
  description: s.intro,
  path: "/multi-site-cctv-monitoring",
});
export default function Page() {
  return <BuyerSolution slug="multi-site-cctv-monitoring" />;
}
