import type { UseCase, UseCaseSlug } from "@/content/types";

/*
 * The seven use-case pages (/use-cases/<slug>/), each linking back to its
 * parent service. Keywords and proof placement from the approved site
 * structure (SITE-STRUCTURE-DECISION.md). AI Chatbot for Website is paused:
 * not built, not linked.
 *
 * `toolOrDone` is present only on the pages whose searchers are mostly
 * shopping for software (Missed Call Text Back, Invoice Automation, AI
 * Receptionist). Whether the section ships at all is still Kim's call.
 */
export const useCases: UseCase[] = [
  {
    slug: "wordpress-support",
    name: "WordPress Support",
    parent: "website-management",
    keyword: "wordpress support toronto",
    secondaryKeywords: [
      "wordpress website design toronto",
      "wordpress developer toronto",
      "wordpress hacked",
      "wordpress migration",
      "wordpress support",
      "wordpress help",
      "wordpress maintenance services",
      "wordpress maintenance toronto",
      "wordpress emergency support",
    ],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    problemLine: "TODO(copy)",
    problem: ["TODO(copy)"],
    setup: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    proof: [],
    worksWith: ["TODO(copy)"],
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "local-seo",
    name: "Local SEO & GEO",
    parent: "website-management",
    keyword: "local seo toronto",
    secondaryKeywords: [
      "seo toronto",
      "ai seo",
      "ai seo agency",
      "ai seo services",
      "geo agency",
      "geo services",
    ],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    problemLine: "TODO(copy)",
    problem: ["TODO(copy)"],
    setup: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    proof: [],
    worksWith: ["TODO(copy)"],
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "law-firm-seo",
    name: "Law Firm SEO & GEO",
    parent: "website-management",
    keyword: "law firm seo",
    secondaryKeywords: ["seo for lawyers", "law firm marketing"],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    problemLine: "TODO(copy)",
    problem: ["TODO(copy)"],
    setup: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    proof: ["law-firm-work"],
    worksWith: ["TODO(copy)"],
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "invoice-automation",
    name: "Invoice Automation",
    parent: "ai-automation",
    keyword: "invoice automation",
    secondaryKeywords: [
      "accounts payable automation",
      "quickbooks integration",
      "quickbooks automation",
    ],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    problemLine: "TODO(copy)",
    problem: ["TODO(copy)"],
    setup: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    toolOrDone: { tool: "TODO(copy)", doneForYou: "TODO(copy)" },
    proof: ["file-and-document-management"],
    worksWith: ["TODO(copy)"],
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "missed-call-text-back",
    name: "Missed Call Text Back",
    parent: "ai-automation",
    keyword: "missed call text back",
    secondaryKeywords: ["speed to lead"],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    problemLine: "TODO(copy)",
    problem: ["TODO(copy)"],
    setup: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    toolOrDone: { tool: "TODO(copy)", doneForYou: "TODO(copy)" },
    proof: [],
    worksWith: ["TODO(copy)"],
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    parent: "ai-automation",
    keyword: "ai receptionist for small business",
    secondaryKeywords: ["ai voice agent", "virtual receptionist toronto"],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    problemLine: "TODO(copy)",
    problem: ["TODO(copy)"],
    setup: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    toolOrDone: { tool: "TODO(copy)", doneForYou: "TODO(copy)" },
    proof: ["conversational-ai"],
    worksWith: ["TODO(copy)"],
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
  {
    slug: "ai-follow-up-emails",
    name: "AI Follow-Up Emails",
    parent: "ai-automation",
    // No measured keyword: Kim kept this use case on 2026-11-20 without one.
    keyword: null,
    secondaryKeywords: [],
    title: "TODO(copy)",
    description: "TODO(copy)",
    cardLine: "TODO(copy)",
    h1: "TODO(copy)",
    problemLine: "TODO(copy)",
    problem: ["TODO(copy)"],
    setup: [
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
      { title: "TODO(copy)", body: "TODO(copy)" },
    ],
    proof: ["executive-assistant"],
    worksWith: ["TODO(copy)"],
    faqs: [{ question: "TODO(copy)", answer: "TODO(copy)" }],
    closing: { title: "TODO(copy)", lead: "TODO(copy)" },
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

export function useCaseBySlug(slug: UseCaseSlug): UseCase {
  const found = getUseCase(slug);
  if (!found) throw new Error(`Unknown use-case slug: ${slug}`);
  return found;
}

export function useCasePath(slug: UseCaseSlug) {
  return `/use-cases/${slug}`;
}
