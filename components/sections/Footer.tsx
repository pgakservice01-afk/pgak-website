import Logo from "@/components/Logo";
import { BUSINESS } from "@/lib/seo";
const groups = [
  {
    title: "Explore",
    links: [
      ["/solutions", "Solutions"],
      ["/platform", "Platform & requirements"],
      ["/pricing", "Pricing & scope"],
      ["/resources", "Resources"],
      ["/areas-we-serve", "Service locations"],
    ],
  },
  {
    title: "Plan a project",
    links: [
      ["/free-audit", "Camera readiness assessment"],
      ["/book-demo", "Product demonstration"],
      ["/resources/evaluation-method", "Pilot test worksheet"],
      ["/roi-calculator", "Cost & benefit calculator"],
      ["/brochure", "Company brochure"],
    ],
  },
  {
    title: "Company & support",
    links: [
      ["/about", "About PGAK"],
      ["/contact", "Contact & support"],
      ["/partners", "Dealer / integrator enquiries"],
      ["/residential-security", "Residential security"],
      ["/live", "Customer sign in"],
    ],
  },
];
export default function Footer() {
  const a = BUSINESS.address;
  return (
    <footer id="contact" className="buyer-footer">
      <div className="buyer-wrap">
        <div className="buyer-footer-grid">
          <div>
            <a href="/" aria-label="PGAK Intelligent Security — home">
              <Logo variant="full" className="text-[1.5rem]" />
            </a>
            <p>
              AI video analytics for compatible existing CCTV. A clearer
              starting point for your business.
            </p>
            <address>
              {BUSINESS.legalName}
              <br />
              {a.street}, {a.area}
              <br />
              {a.locality}, {a.region} {a.postalCode}, India
            </address>
            <a href={`tel:${BUSINESS.phoneE164}`} data-cta="footer-phone">
              {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            <a href={BUSINESS.whatsapp} data-cta="footer-whatsapp">
              WhatsApp PGAK
            </a>
          </div>
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2>{g.title}</h2>
              {g.links.map(([href, label]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="buyer-footer-base">
          <span>© 2026 PGAK Innovations</span>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
