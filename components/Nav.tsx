import Logo from "@/components/Logo";
/**
 * Every item is a real anchor in the server-rendered HTML, so the header
 * costs no JavaScript and a crawler reads it without executing anything.
 *
 * The b2b redesign cut this to five and took Industries, Features,
 * Calculators, Insights, Partners and Our story out of the header. Those
 * pages all still exist and still rank — dropping them from the nav left
 * them reachable only from the footer, and made a site with 120+ routes
 * look like a site with five. Restored, with the redesign's own Platform
 * and Resources kept beside them.
 *
 * Eleven fits: the row measures 818px inside 1232 at 1440, and at 1150 it
 * stops short of the actions rather than colliding.
 */
const links = [
  ["/solutions", "Solutions"],
  ["/industries", "Industries"],
  ["/features", "Features"],
  ["/platform", "Platform"],
  ["/pricing", "Pricing"],
  ["/calculators", "Calculators"],
  ["/resources", "Resources"],
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
