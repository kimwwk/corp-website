import type { Service, ServiceSlug } from "@/content/types";

/*
 * The four service pages (/services/<slug>/). Keywords from the approved site
 * structure (adhoc_jobs/kivov_keyword_research/SITE-STRUCTURE-DECISION.md).
 * Only AI Packages shows prices: Website Management and App Development are
 * quoted after a free call.
 */
export const services: Service[] = [
  {
    slug: "ai-consulting",
    name: "AI Consulting",
    keyword: "ai consultant toronto",
    secondaryKeywords: [
      "ai consultancy",
      "ai consulting company",
      "ai consulting services",
    ],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    lead: "TODO(copy)",
    problems: ["TODO(copy)", "TODO(copy)", "TODO(copy)", "TODO(copy)"],
    included: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    steps: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    useCases: [],
    proof: [],
    howToStart: {
      kind: "packages",
      lines: [
        { package: "AI Workflow Audit", line: "TODO(copy)" },
        { package: "Build With You", line: "TODO(copy)" },
      ],
    },
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "website-management",
    name: "Website Management",
    keyword: "website maintenance toronto",
    secondaryKeywords: ["website redesign services", "website maintenance services"],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    lead: "TODO(copy)",
    problems: ["TODO(copy)", "TODO(copy)", "TODO(copy)", "TODO(copy)"],
    included: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    steps: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    useCases: ["wordpress-support", "local-seo", "law-firm-seo"],
    proof: [],
    howToStart: { kind: "quote", line: "TODO(copy)" },
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    keyword: "ai automation agency",
    secondaryKeywords: [
      "workflow automation",
      "business process automation",
      "lead follow up",
    ],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    lead: "TODO(copy)",
    problems: ["TODO(copy)", "TODO(copy)", "TODO(copy)", "TODO(copy)"],
    included: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    steps: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    useCases: [
      "invoice-automation",
      "missed-call-text-back",
      "ai-receptionist",
      "ai-follow-up-emails",
    ],
    proof: [],
    howToStart: {
      kind: "packages",
      lines: [{ package: "Build For You", line: "TODO(copy)" }],
    },
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "app-development",
    name: "App Development",
    keyword: "app development toronto",
    secondaryKeywords: [
      "app developers toronto",
      "mobile app development toronto",
      "ai app development",
      "rapid app development",
      "custom software development",
      "software development company toronto",
      "custom software development toronto",
    ],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    lead: "TODO(copy)",
    problems: ["TODO(copy)", "TODO(copy)", "TODO(copy)", "TODO(copy)"],
    included: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    steps: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    useCases: [],
    proof: ["sprinting-run", "our-pot"],
    howToStart: { kind: "quote", line: "TODO(copy)" },
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** For slugs typed as ServiceSlug, where a miss is a programming error. */
export function serviceBySlug(slug: ServiceSlug): Service {
  const found = getService(slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
}

export function servicePath(slug: ServiceSlug) {
  return `/services/${slug}`;
}
