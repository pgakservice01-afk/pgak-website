import { AUTHOR, BUSINESS, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, abs } from "@/lib/seo";

/**
 * JSON-LD builders. Every schema node gets a stable `@id` so Google can link
 * them into one graph (Organization ← WebSite ← WebPage ← BreadcrumbList)
 * instead of treating each page as an unrelated island.
 */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: abs("/logo.png"),
      width: 512,
      height: 512,
    },
    image: abs("/hero-landing.webp"),
    description:
      "PGAK builds AI CCTV software that turns existing security cameras into intelligent guardians — real-time intruder detection, face recognition and false-alarm filtering for homes, warehouses, factories, offices and retail across India.",
    foundingDate: BUSINESS.founded,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      // Google expects building + street + neighbourhood in streetAddress;
      // only the city belongs in addressLocality.
      streetAddress: `${BUSINESS.address.street}, ${BUSINESS.address.area}`,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHours: BUSINESS.openingHours,
    areaServed: { "@type": "Country", name: "India" },
    // Spells out *how* to reach support and in which languages — the detail
    // assistants quote when someone asks "how do I contact PGAK".
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Punjabi"],
    },
    sameAs: [...BUSINESS.social],
    founder: {
      "@type": "Person",
      name: AUTHOR.name,
      jobTitle: AUTHOR.jobTitle,
      url: AUTHOR.url,
      sameAs: [...AUTHOR.sameAs],
    },
    // No aggregateRating here: Google treats ratings a business publishes
    // about itself as self-serving (ineligible), and we only markup figures
    // that real, visible reviews back. Reinstate from GBP data via
    // lib/reviews.ts once genuine Google reviews exist.
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/insights?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}): Json {
  const url = abs(opts.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[]
): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  path: string;
  /** Monthly price per camera in INR. */
  price?: number;
  category?: string;
}): Json {
  return {
    "@type": "Product",
    "@id": `${abs(opts.path)}#product`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    brand: { "@id": ORG_ID },
    category: opts.category ?? "AI video surveillance software",
    image: abs("/hero-landing.webp"),
    ...(opts.price
      ? {
          offers: {
            "@type": "Offer",
            price: opts.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: abs("/pricing"),
            // Rolling 12-month validity so the offer never reads as stale;
            // the flat rate has not changed since launch.
            priceValidUntil: priceValidUntil(),
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: opts.price,
              priceCurrency: "INR",
              unitText: "per camera per month",
            },
          },
        }
      : {}),
  };
}

/** One year out, YYYY-MM-DD — computed at build time. */
function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

/**
 * ⚠️ Currently unused, and `price` must stay empty if it is wired back up:
 * PGAK quotes on a call or WhatsApp and publishes no rate on any page, so an
 * OfferCatalog carrying prices would describe content the page doesn't show.
 *
 * The visible pricing tiers as an OfferCatalog, so the plan structure on
 * /pricing (Home / Office / Enterprise) is machine-readable rather than a
 * single flat Offer standing in for three.
 */
export function offerCatalogSchema(
  tiers: { name: string; description: string; price?: number }[]
): Json {
  return {
    "@type": "OfferCatalog",
    "@id": `${abs("/pricing")}#offers`,
    name: "PGAK plans",
    url: abs("/pricing"),
    itemListElement: tiers.map((t) => ({
      "@type": "Offer",
      name: t.name,
      description: t.description,
      url: abs("/pricing"),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      ...(t.price
        ? {
            price: t.price,
            priceValidUntil: priceValidUntil(),
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: t.price,
              priceCurrency: "INR",
              unitText: "per camera per month",
            },
          }
        : {}),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}): Json {
  return {
    "@type": "Service",
    "@id": `${abs(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { "@id": ORG_ID },
    serviceType: "AI video surveillance",
    areaServed: opts.areaServed
      ? { "@type": "Place", name: opts.areaServed }
      : { "@type": "Country", name: "India" },
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  /** Real last-edit date; falls back to datePublished. */
  dateModified?: string;
  image?: string;
  /** "Article" for case studies; defaults to BlogPosting. */
  type?: "BlogPosting" | "Article";
}): Json {
  const url = abs(opts.path);
  return {
    "@type": opts.type ?? "BlogPosting",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    url,
    mainEntityOfPage: url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      jobTitle: AUTHOR.jobTitle,
      url: AUTHOR.url,
      sameAs: [...AUTHOR.sameAs],
      worksFor: { "@id": ORG_ID },
    },
    publisher: { "@id": ORG_ID },
    // Google requires an image for Article rich results; every post gets at
    // least the site's 1200×630 OG card.
    image: abs(opts.image ?? DEFAULT_OG_IMAGE),
  };
}

export function reviewSchema(
  reviews: { name: string; text: string; stars: number }[]
): Json[] {
  return reviews.map((r) => ({
    "@type": "Review",
    itemReviewed: { "@id": ORG_ID },
    author: { "@type": "Person", name: r.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.stars,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.text,
  }));
}

/**
 * The product itself, as a SoftwareApplication entity.
 *
 * Complements the Product node on the homepage rather than repeating it:
 * Product carries the commercial offer, this one tells search and AI answer
 * engines *what the software is* — category, the platforms it runs on and what
 * it can actually do. That feature list is what gets quoted when someone asks
 * an assistant "what does PGAK do", so every line here must be a capability
 * the shipped product really has.
 */
export function softwareApplicationSchema(): Json {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "PGAK AI Security Intelligence",
    url: SITE_URL,
    applicationCategory: "SecurityApplication",
    applicationSubCategory: "Video Surveillance & Analytics",
    // The edge device runs Linux on site; people use the product through the
    // mobile apps and the web dashboard.
    operatingSystem: "Web, Android, iOS, Linux (on-site edge device)",
    description:
      "An AI layer that retrofits existing CCTV, DVR and NVR systems to deliver real-time perimeter protection, instant intruder alerts and human/vehicle classification — without replacing a single camera.",
    image: abs("/hero-landing.webp"),
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    // Deliberately no `offers`: pricing is quoted on a call or WhatsApp, and
    // structured data must never publish a figure the page itself doesn't
    // show. /pricing explains what drives the number instead.
    featureList: [
      "Real-time intruder alerts in under three seconds",
      "False-alarm filtering for pets, shadows, wind and headlights",
      "Works with existing analog, IP, DVR and NVR cameras over RTSP",
      "Face recognition: known staff and family versus unknown visitors",
      "Mobile app and multi-site web dashboard",
    ],
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}
