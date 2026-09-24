import Logo from "@/components/Logo";

/**
 * Flat on purpose: every item is a real anchor in the server-rendered HTML,
 * so the nav costs no JavaScript and a crawler reads it without executing
 * anything. A dropdown would hide Industries behind a click for both.
 *
 * Industries sits directly after Solutions because it is the same content cut
 * the other way — Solutions by capability, Industries by sector. Someone who
 * thinks "I run a cold store" finds themselves in the second one.
 */
const links = [
  ["/solutions", "Solutions"],
  ["/industries", "Industries"],
  ["/features", "Features"],
  ["/pricing", "Pricing"],
  ["/calculators", "Calculators"],
  ["/insights", "Insights"],
  ["/partners", "Partners"],
  ["/our-story", "Our story"],
  ["/about", "Company"],
];
export default function Nav() {
  return (
    <header className="site-nav">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="nav-inner">
        <a href="/" aria-label="PGAK — home">
          <Logo className="text-[1.35rem]" />
        </a>
        <nav aria-label="Main" className="desktop-nav">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a href="/live" className="customer-login">
            Sign in
          </a>
          <a
            href="/book-demo"
            className="btn btn-primary"
            data-cta="nav-demo"
            data-intent="demo"
          >
            Request a demo
          </a>
        </div>
        <details className="mobile-nav">
          <summary>
            Menu <span aria-hidden="true">＋</span>
          </summary>
          <nav aria-label="Mobile">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            {/* Only what the shared list does not already carry. Our story
                and Partners moved into `links`, so repeating them here would
                print them twice in the mobile menu. */}
            <a href="/leadership">Leadership</a>
            <a href="/free-audit">Free camera audit</a>
            <a href="/contact">Contact</a>
            <a href="/live">Customer sign in</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
