import Link from "next/link";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted
 * separately via `breadcrumbSchema()` so the markup stays clean.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.82rem] text-ink-faint">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-soft">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.path}
                    className="transition-colors hover:text-accent"
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="opacity-50">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
