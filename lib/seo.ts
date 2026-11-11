import type { Metadata } from "next";

/* Single source of truth for SEO / GEO / AEO signals.
   - `pageMetadata()` builds every page's <head> so canonical, og:url,
     og:image and twitter tags never drift (Next shallow-merges metadata, so a
     page-level `openGraph` silently drops anything the root layout set).
   - The schema.org entities below feed the JSON-LD graph that search
     engines and AI answer engines use to understand who Kivov is. */

export const SITE_URL = "https://kivov.work";
export const SITE_NAME = "Kivov Digital";
export const OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "Kivov Digital — Workflow-First AI for Small Business",
};

/** Absolute URL for a site path. Paths use trailing slashes to match
    `trailingSlash: true` — non-slash URLs 308-redirect. */
export function absoluteUrl(path: string) {
  if (path === "" || path === "/") return `${SITE_URL}/`;
  const clean = path.replace(/^\/|\/$/g, "");
  return `${SITE_URL}/${clean}/`;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Site path, e.g. "/audit". Use "/" for home. */
  path: string;
  /** Optional og/twitter description when it should differ from the meta one. */
  socialDescription?: string;
  robots?: Metadata["robots"];
};

export function pageMetadata({
  title,
  description,
  path,
  socialDescription,
  robots,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const social = socialDescription ?? description;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: social,
      url,
      siteName: SITE_NAME,
      locale: "en_CA",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: social,
      creator: "@kimwong_wwk",
      images: [OG_IMAGE.url],
    },
    ...(robots ? { robots } : {}),
  };
}

/* ---------- schema.org entities ---------- */

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#kim-wong`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Profiles that confirm the entity (same URLs as the footer / Popl card).
const ORG_SAME_AS = [
  "https://www.linkedin.com/company/kivov",
  "https://www.facebook.com/profile.php?id=61591254942653",
  "https://www.youtube.com/@kivov-digital",
];
const PERSON_SAME_AS = [
  "https://www.linkedin.com/in/kim-wong-wwk/",
  "https://x.com/kimwong_wwk",
];

export const organization = {
  "@type": ["ProfessionalService", "Organization"],
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "Kivov",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-square-light-theme-kivov-digital.png`,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description:
    "Kivov Digital is a Toronto-based workflow-first AI consultancy for small and mid-sized businesses. It maps how work actually happens, finds where time is lost, and builds practical AI and automation systems around the way teams already work.",
  slogan: "Build the system that fits your business.",
  email: "hello@kivov.work",
  founder: { "@id": PERSON_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Toronto" },
    { "@type": "Country", name: "Canada" },
  ],
  currenciesAccepted: "CAD",
  knowsAbout: [
    "AI workflow automation",
    "Business process mapping",
    "AI adoption for small business",
    "Claude skills and AI assistants",
    "Systems integration",
    "Custom software development",
  ],
  sameAs: ORG_SAME_AS,
};

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Kim Wong",
  jobTitle: "Founder",
  worksFor: { "@id": ORG_ID },
  url: absoluteUrl("/about"),
  image: `${SITE_URL}/kim-headshot.jpg`,
  description:
    "Founder of Kivov Digital and former Deloitte and EY consultant with 7+ years across software development, enterprise integrations, cloud architecture, AI, and custom systems.",
  homeLocation: { "@type": "City", name: "Toronto" },
  knowsAbout: [
    "AI workflow automation",
    "Enterprise integrations",
    "Cloud architecture",
    "Software development",
  ],
  sameAs: PERSON_SAME_AS,
};

export const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-CA",
};

/** A schema.org Service offered by Kivov, priced in CAD. */
export function service({
  name,
  description,
  path,
  price,
  unitText,
}: {
  name: string;
  description: string;
  path: string;
  price: number;
  unitText?: string;
}) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    description,
    serviceType: "AI workflow consulting",
    provider: { "@id": ORG_ID },
    areaServed: organization.areaServed,
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      ...(unitText
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: price.toFixed(2),
              priceCurrency: "CAD",
              unitText,
            },
          }
        : {}),
    },
  };
}

export function faqPage(path: string, items: { question: string; text: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map(({ question, text }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
}

export function breadcrumbs(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}
