import BuyerSolution from "@/components/b2b/Solution";
import { BUYER_SOLUTIONS } from "@/lib/b2b/solutions";
import { pageMeta } from "@/lib/seo";
const s = BUYER_SOLUTIONS["ai-intruder-detection"];
export const metadata = pageMeta({
  title: s.title + " | PGAK",
  // Written for the search snippet: s.intro ran to 203 characters and was
  // cut off, and the page sat at position 11 with a 0.8% CTR (90 days to 2 Oct).
  description:
    "Phone alerts with a snapshot when someone crosses a boundary you set, on the CCTV you already own. Tested on your own cameras before anything is quoted.",
  path: "/ai-intruder-detection",
});
export default function Page() {
  return <BuyerSolution slug="ai-intruder-detection" />;
}
