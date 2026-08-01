import { BUSINESS, RATING, SITE_NAME, SITE_URL, abs } from "@/lib/seo";

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
    logo: { "@type": "ImageObject", url: abs("/hero-landing.webp") },
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
    sameAs: [...BUSINESS.social],
    aggregateRating: aggregateRatingSchema(),
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

export function aggregateRatingSchema(): Json {
  return {
    "@type": "AggregateRating",
    ratingValue: RATING.value,
    reviewCount: RATING.count,
    bestRating: 5,
    worstRating: 1,
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
    aggregateRating: aggregateRatingSchema(),
    ...(opts.price
      ? {
          offers: {
            "@type": "Offer",
            price: opts.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: abs("/pricing"),
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
  image?: string;
}): Json {
  const url = abs(opts.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    url,
    mainEntityOfPage: url,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(opts.image ? { image: abs(opts.image) } : {}),
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

/** Wraps nodes in a single @graph document. */
export function graph(nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}
