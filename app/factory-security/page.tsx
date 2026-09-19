import BuyerSolution from "@/components/b2b/Solution";
import { BUYER_SOLUTIONS } from "@/lib/b2b/solutions";
import { pageMeta } from "@/lib/seo";
const s = BUYER_SOLUTIONS["factory-security"];
export const metadata = pageMeta({
  title: s.title + " | PGAK",
  description: s.intro,
  path: "/factory-security",
});
export default function Page() {
  return <BuyerSolution slug="factory-security" />;
}
