import BuyerSolution from "@/components/b2b/Solution";
import { BUYER_SOLUTIONS } from "@/lib/b2b/solutions";
import { pageMeta } from "@/lib/seo";
const s = BUYER_SOLUTIONS["face-recognition-attendance-system"];
export const metadata = pageMeta({
  title: "Face recognition attendance system on existing CCTV | PGAK",
  description: "How face recognition attendance works on the entrance CCTV you already own: what the camera view needs, where it fails, and why a pilot comes first.",
  path: "/face-recognition-attendance-system",
});
export default function Page() {
  return <BuyerSolution slug="face-recognition-attendance-system" />;
}
