import type { Metadata } from "next";
import SolutionPage from "@/components/solutions/SolutionPage";
import { getSolution } from "@/lib/solutions";
import { pageMeta } from "@/lib/seo";

const solution = getSolution("cctv-installation-company")!;

export const metadata: Metadata = pageMeta({
  title: solution.title,
  description: solution.description,
  path: `/${solution.slug}`,
  keywords: [solution.primaryKeyword, ...solution.relatedKeywords],
});

export default function Page() {
  return <SolutionPage solution={solution} />;
}
