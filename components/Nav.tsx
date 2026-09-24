import Logo from "@/components/Logo";

const links = [
  ["/solutions", "Solutions"],
  ["/features", "Features"],
  ["/pricing", "Pricing"],
  ["/calculators", "Calculators"],
  ["/insights", "Insights"],
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
            <a href="/free-audit">Free camera audit</a>
            <a href="/contact">Contact</a>
            <a href="/live">Customer sign in</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
