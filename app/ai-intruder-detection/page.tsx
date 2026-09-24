import BuyerSolution from "@/components/b2b/Solution";
import { BUYER_SOLUTIONS } from "@/lib/b2b/solutions";
import { pageMeta } from "@/lib/seo";
const s = BUYER_SOLUTIONS["ai-intruder-detection"];
export const metadata = pageMeta({
  title: s.title + " | PGAK",
  description: s.intro,
  path: "/ai-intruder-detection",
});
export default function Page() {
  return <BuyerSolution slug="ai-intruder-detection" />;
}
