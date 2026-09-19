import Logo from "@/components/Logo";
const links = [
  ["/solutions", "Solutions"],
  ["/platform", "Platform"],
  ["/pricing", "Pricing"],
  ["/resources", "Resources"],
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
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href="/free-audit">Check my cameras</a>
            <a href="/contact">Support & contact</a>
            <a href="/partners">Partner enquiries</a>
            <a href="/live">Customer sign in</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
