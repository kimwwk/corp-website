import type { Overview } from "@/content/types";

/* Copy for the three overview pages: /services, /use-cases, /resources. */
export const overviews: Record<"services" | "useCases" | "resources", Overview> = {
  services: {
    title: "Services: AI, Websites and Apps for Small Business — Kivov Digital",
    description: "Kivov Digital's 4 services for Toronto small businesses: AI consulting, website management, AI automation and app development.",
    eyebrow: "Services",
    h1: "What we do.",
    lead: "4 services, each starting with how your business works today.",
    cardsLabel: "Our services",
    closing: { title: "Not sure where to start?", lead: "The free fit check takes 3 minutes and gives you one practical place to begin." },
  },
  useCases: {
    title: "Use Cases: AI Automation and Website Work — Kivov Digital",
    description: "Specific problems we solve: WordPress support, SEO and GEO for law firms, invoice automation, AI receptionists and follow-up emails.",
    eyebrow: "Use Cases",
    h1: "Specific problems we solve.",
    lead: "Each one belongs to a service, and each is set up around the tools you already have.",
    groupTitles: {
      "website-management": "Get found, and keep the site working.",
      "ai-automation": "Let AI take on the repetitive work.",
    },
    closing: { title: "Have a different problem in mind?", lead: "Take the free fit check. It covers lead follow-up, scheduling, data entry, invoices, reporting and more." },
  },
  resources: {
    title: "Resources: Answers for Small Business Owners — Kivov Digital",
    description: "Answers to the questions small business owners ask about AI automation, GEO and WordPress SEO.",
    eyebrow: "Resources",
    h1: "Answers to the questions owners ask.",
    lead: "Each post answers one question, with what we found in real work.",
    cardsLabel: "Posts",
    closing: { title: "Have a question about your own business?", lead: "The free fit check takes 3 minutes and gives you one practical place to begin." },
  },
};
