import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
export default function BuyerPage({
  title,
  intro,
  path,
  eyebrow = "TECHNICAL BUYER GUIDE",
  children,
}: {
  title: string;
  intro: string;
  path: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  const trail = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <Nav />
      <JsonLd
        nodes={[
          breadcrumbSchema(trail),
          webPageSchema({ path, name: title, description: intro }),
        ]}
      />
      <main id="main-content" className="buyer-page">
        <div className="buyer-wrap">
          <Breadcrumbs trail={trail} />
          <header className="buyer-page-head">
            <p className="kicker">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="buyer-lede">{intro}</p>
          </header>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
export function BuyerCTA({
  label = "Check my cameras",
  href = "/free-audit",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <aside className="buyer-cta">
      <div>
        <p className="kicker">A USEFUL NEXT STEP</p>
        <h2>Start with the site you have.</h2>
        <p>Prepare a camera brief, then request a technical conversation.</p>
      </div>
      <a href={href} className="btn btn-primary" data-cta="buyer-next-step">
        {label} <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
