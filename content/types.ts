/*
 * Content types for the service, use-case and resource pages. Copy lives in
 * the sibling files (`services.ts`, `use-cases.ts`, …) and the templates in
 * `components/templates/` render it, so copy changes never touch layout code.
 *
 * Any copy field not written yet holds the literal string "TODO(copy)".
 * `isTodo()` lets templates keep those placeholders out of structured data.
 */

export const TODO_MARKER = "TODO(copy)";

/** True while a copy field still holds the "TODO(copy)" placeholder. */
export function isTodo(value: string | undefined | null): boolean {
  return value == null || value.includes(TODO_MARKER);
}

export type ServiceSlug =
  | "ai-consulting"
  | "website-management"
  | "ai-automation"
  | "app-development";

export type UseCaseSlug =
  | "wordpress-support"
  | "local-seo"
  | "law-firm-seo"
  | "invoice-automation"
  | "missed-call-text-back"
  | "ai-receptionist"
  | "ai-follow-up-emails";

export type ResourceSlug =
  | "generative-engine-optimization"
  | "ai-automation"
  | "wordpress-seo";

export type ProofId =
  | "executive-assistant"
  | "file-and-document-management"
  | "law-firm-work"
  | "conversational-ai"
  | "sprinting-run"
  | "our-pot";

export type TestimonialId =
  | "yongling-zheng"
  | "alan-kong"
  | "michaelangelo-agbodike"
  | "joyce-yan"
  | "matthew-obrian"
  | "abdou-rakib-abente";

/** Every proof item carries exactly one of these labels. Never "Case Study". */
export type ProofLabel =
  | "Client build"
  | "Track record"
  | "Our product"
  | "Demo"
  | "Capability";

export type Proof = {
  id: ProofId;
  label: ProofLabel;
  title: string;
  body: string;
  /** Before → after delta row (the client-build recipe). */
  from?: string;
  to?: string;
  stats?: { n: string; label: string }[];
  /** Small mono footnote under the stats, e.g. "A worked example …". */
  foot?: string;
  /** Closing pull-line under the item. */
  pullLine?: string;
  href?: string;
  /** "Our product" items only: status line and icon, rendered by ShowcaseProducts. */
  status?: string;
  icon?: string;
};

export type Faq = { question: string; answer: string };

/** Pages a "How to start" package line can link to. Each has its own click
    event (see `packageLinkCta` in components/templates/ctas.ts). */
export type PackageHref = "/fit-check" | "/audit" | "/ai-packages";

export type Testimonial = {
  id: TestimonialId;
  name: string;
  /** Caption shown under the name. */
  role: string;
  /** The quote, verbatim from its source, one string per paragraph. */
  quote: string[];
  /** Where the quote was published. Public sources only. */
  source: { channel: string; url?: string; date?: string };
  /** How the person knows Kim, per the site-structure decision. Not rendered. */
  relationship: string;
  /** Service pages it appears on. Every testimonial also appears on Home. Never About. */
  services: ServiceSlug[];
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Primary keyword. The title tag must contain it. */
  keyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  /** One sentence for the cards on Home and /services. */
  cardLine: string;
  h1: string;
  lead: string;
  /** "Sound familiar?": 4–6 problems this service fixes. */
  problems: string[];
  /** "What's included": one row each. */
  included: { title: string; body: string }[];
  /** "How it works": 4 steps. */
  steps: { title: string; body: string }[];
  useCases: UseCaseSlug[];
  proof: ProofId[];
  /** "How to start": packages (one line each, links to /ai-packages) or a quote after a free call.
      A line's optional `href` links its package name to that package's page. */
  howToStart:
    | { kind: "packages"; lines: { package: string; line: string; href?: PackageHref }[] }
    | { kind: "quote"; line: string };
  /** Up to 5. */
  faqs: Faq[];
  closing: { title: string; lead?: string };
};

export type UseCase = {
  slug: UseCaseSlug;
  name: string;
  parent: ServiceSlug;
  /** Primary keyword, or null when none was measured (AI Follow-Up Emails). */
  keyword: string | null;
  secondaryKeywords: string[];
  title: string;
  description: string;
  cardLine: string;
  h1: string;
  /** The problem in one line, under the H1. */
  problemLine: string;
  /** "The problem": paragraphs. */
  problem: string[];
  /** "How we set it up": steps, using the tools the business already has. */
  setup: { title: string; body: string }[];
  /** "Tool or done for you?": research pages only. */
  toolOrDone?: { tool: string; doneForYou: string };
  /** One extra section after "How we set it up", e.g. WordPress website design. */
  extraSection?: { eyebrow: string; title: string; body: string[] };
  proof: ProofId[];
  /** "Works with": the tools it connects to. */
  worksWith: string[];
  /** Up to 5. */
  faqs: Faq[];
  closing: { title: string; lead?: string };
};

export type Block =
  | { type: "h2" | "p"; text: string }
  | { type: "ul"; items: string[] };

export type ResourcePost = {
  slug: ResourceSlug;
  /** The post's name in the site outline. */
  name: string;
  /** Short label for the footer and nav lists. */
  shortName: string;
  /** Primary keyword. The title tag must contain it. */
  keyword: string;
  secondaryKeywords: string[];
  title: string;
  h1: string;
  description: string;
  /** Publication date, ISO format (YYYY-MM-DD). */
  date: string;
  cardLine: string;
  /** The answer in 2–3 sentences, before the full post. */
  shortAnswer: string;
  body: Block[];
  related: { kind: "service"; slug: ServiceSlug } | { kind: "use-case"; slug: UseCaseSlug };
  linkedinUrl?: string;
  closing: { title: string; lead?: string };
};

/** Copy for an overview page (/services, /use-cases, /resources). */
export type Overview = {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  /** Eyebrow (h2) over a single, ungrouped card section (/services, /resources). */
  cardsLabel?: string;
  closing: { title: string; lead?: string };
};
