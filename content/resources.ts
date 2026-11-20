import type { ResourcePost, ResourceSlug } from "@/content/types";

/*
 * The three resource posts (/resources/<slug>/): posts from Kim's blog or
 * LinkedIn, each answering a question buyers ask. The full text lives here;
 * each post links to its LinkedIn original via `linkedinUrl` once known.
 */
export const resources: ResourcePost[] = [
  {
    slug: "generative-engine-optimization",
    name: "Generative engine optimization: how do I get ChatGPT to recommend my business?",
    shortName: "Generative engine optimization",
    keyword: "generative engine optimization",
    secondaryKeywords: [
      "answer engine optimization",
      "geo seo",
      "chatgpt seo",
      "how do i get chatgpt to recommend my business",
    ],
    title: "TODO(copy)",
    h1: "TODO(copy)",
    description: "TODO(copy)",
    date: "TODO(copy)",
    cardLine: "TODO(copy)",
    shortAnswer: "TODO(copy)",
    body: [
      { type: "h2", text: "TODO(copy)" },
      { type: "p", text: "TODO(copy)" },
    ],
    related: { kind: "use-case", slug: "local-seo" },
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "ai-automation",
    name: "AI automation for small business: what should I automate first?",
    shortName: "AI automation for small business",
    keyword: "ai automation",
    secondaryKeywords: [],
    title: "TODO(copy)",
    h1: "TODO(copy)",
    description: "TODO(copy)",
    date: "TODO(copy)",
    cardLine: "TODO(copy)",
    shortAnswer: "TODO(copy)",
    body: [
      { type: "h2", text: "TODO(copy)" },
      { type: "p", text: "TODO(copy)" },
    ],
    related: { kind: "service", slug: "ai-automation" },
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "wordpress-seo",
    name: "WordPress SEO: why isn't my WordPress site showing up on Google?",
    shortName: "WordPress SEO",
    keyword: "wordpress seo",
    secondaryKeywords: [],
    title: "TODO(copy)",
    h1: "TODO(copy)",
    description: "TODO(copy)",
    date: "TODO(copy)",
    cardLine: "TODO(copy)",
    shortAnswer: "TODO(copy)",
    body: [
      { type: "h2", text: "TODO(copy)" },
      { type: "p", text: "TODO(copy)" },
    ],
    related: { kind: "use-case", slug: "wordpress-support" },
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
];

export function getResource(slug: string): ResourcePost | undefined {
  return resources.find((r) => r.slug === slug);
}

export function resourcePath(slug: ResourceSlug) {
  return `/resources/${slug}`;
}
