import Logo from "@/components/Logo";
/**
 * Every item is a real anchor in the server-rendered HTML, so the header
 * costs no JavaScript and a crawler reads it without executing anything.
 *
 * Grouped 2026-09-26 at the owner's request: eleven top-level links became
 * four menus. Nothing was dropped — Industries, Features, Platform,
 * Calculators, Resources and Our story are still anchors in the HTML, now
 * inside a dropdown instead of beside it. (An earlier redesign cut the header
 * to five by deleting those links outright, which left 120+ ranking pages
 * reachable only from the footer; grouping keeps them one hover away and in
 * the crawlable header.)
 *
 * The dropdowns are CSS only (:hover and :focus-within), so keyboard users
 * open a menu by tabbing into it, and on touch the top label is itself a link
 * to the section's hub page.
 *
 * `overlay` is for pages that open on a full-bleed image or video: the bar
 * sits transparently on top of it instead of above it.
 */
type NavLink = readonly [href: string, label: string];

const groups: { label: string; href: string; items: NavLink[] }[] = [
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      ["/solutions", "Solutions"],
      ["/industries", "Industries"],
      ["/features", "Features"],
      ["/platform", "Platform"],
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    items: [
      ["/pricing", "Pricing"],
      ["/calculators", "Calculators"],
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    items: [
      ["/insights", "Insights"],
      ["/resources", "Resources"],
    ],
  },
  {
    label: "About us",
    href: "/about",
    items: [
      ["/our-story", "Our story"],
      ["/about", "Company"],
    ],
  },
];

export default function Nav({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "site-nav site-nav--overlay" : "site-nav"}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="nav-inner">
        <a href="/" aria-label="PGAK — home">
          <Logo className="text-[1.35rem]" />
        </a>
        <nav aria-label="Main" className="desktop-nav">
          {groups.map((g) => (
            <div key={g.label} className="nav-group">
              <a href={g.href} className="nav-group__top">
                {g.label}
                <span className="nav-group__caret" aria-hidden="true">
                  ▾
                </span>
              </a>
              <div className="nav-group__menu">
                {g.items.map(([href, label]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="nav-actions">
          <a href="/partners" className="nav-action-link">
            Partners
          </a>
          <a href="/live" className="nav-action-link">
            Sign in
          </a>
          <a
            href="/free-audit"
            className="btn btn-primary"
            data-cta="nav-camera-check"
          >
            Check my cameras
          </a>
        </div>
        <details className="mobile-nav">
          <summary>
            Menu <span aria-hidden="true">＋</span>
          </summary>
          <nav aria-label="Mobile">
            {groups.map((g) => (
              <div key={g.label} className="mobile-nav__group">
                <p className="mobile-nav__label">{g.label}</p>
                {g.items.map(([href, label]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            ))}
            <a href="/partners">Partners</a>
            <a href="/live">Customer sign in</a>
            <a href="/free-audit">Check my cameras</a>
            <a href="/contact">Support & contact</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
