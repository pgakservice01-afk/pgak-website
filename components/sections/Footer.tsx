import Logo from "@/components/Logo";

const COLS = [
  {
    h: "Explore",
    links: [
      { t: "How it works", href: "#how" },
      { t: "Features", href: "#features" },
      { t: "FAQ", href: "#faq" },
    ],
  },
  {
    h: "Get started",
    links: [
      { t: "Book a demo", href: "#demo" },
      { t: "Find a dealer", href: "#dealer" },
      { t: "Contact us", href: "#contact" },
    ],
  },
  {
    h: "Contact",
    links: [
      { t: "+91 62839 93600", href: "tel:+916283993600" },
      { t: "Pgakinnovation@gmail.com", href: "mailto:Pgakinnovation@gmail.com" },
      {
        t: "Instagram",
        href: "https://www.instagram.com/pgakinnovation/",
        ext: true,
      },
      { t: "WhatsApp", href: "https://wa.me/916283993600", ext: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-bg-2 pb-8 pt-16">
      <div className="wrap">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label="PGAK — home" className="mb-4 inline-flex">
              <Logo variant="full" className="text-[1.5rem]" />
            </a>
            <p className="max-w-[280px] text-[0.92rem] text-ink-soft">
              Intelligent security that acts before it&rsquo;s too late. PGAK
              turns the cameras you already own into AI-powered guardians — for
              homes, businesses and beyond.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.h}>
              <h5 className="mb-4 text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
                {c.h}
              </h5>
              {c.links.map((l) => (
                <a
                  key={l.t}
                  href={l.href}
                  {...("ext" in l && l.ext
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                  className="block py-1.5 text-[0.92rem] text-ink-soft transition-colors hover:text-accent"
                >
                  {l.t}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3.5 border-t border-line pt-6 text-[0.84rem] text-ink-faint">
          <span>© 2026 PGAK. All rights reserved.</span>
          <span className="flex gap-5">
            <a href="#" className="hover:text-ink-soft">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-ink-soft">
              Terms of Use
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
