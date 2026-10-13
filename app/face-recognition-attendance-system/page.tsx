import BuyerSolution from "@/components/b2b/Solution";
import { BUYER_SOLUTIONS } from "@/lib/b2b/solutions";
import { pageMeta } from "@/lib/seo";
const s = BUYER_SOLUTIONS["face-recognition-attendance-system"];
export const metadata = pageMeta({
  title: "Face Recognition Attendance on Existing CCTV | PGAK",
  description: s.intro,
  path: "/face-recognition-attendance-system",
});
export default function Page() {
  return <BuyerSolution slug="face-recognition-attendance-system" />;
}
