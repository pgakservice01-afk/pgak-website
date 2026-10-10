import Link from "next/link";

import { calculatorsForPage } from "@/lib/calc/registry";

/**
 * The calculators whose question a reader of this page is asking
 * (lib/calc/registry.ts: relatedPath and linkedFrom). Plain markup so it
 * inherits whichever page template it sits in.
 */
export default function CalculatorLinks({ path }: { path: string }) {
  const calcs = calculatorsForPage(path);
  if (calcs.length === 0) return null;
  return (
    <section aria-labelledby="calc-links-h">
      <h2 id="calc-links-h">Work out the numbers for your site</h2>
      <ul>
        {calcs.map((c) => (
          <li key={c.id}>
            <Link href={c.path!} className="text-link">
              {c.title}
            </Link>{" "}
            — {c.question}
          </li>
        ))}
      </ul>
    </section>
  );
}
