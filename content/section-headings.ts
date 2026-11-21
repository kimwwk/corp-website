import { homeSections } from "@/content/home";

/*
 * Section h2s the page templates share: the same string on every page that
 * has the section. Per-page headings live on each entry's `headings`
 * (services.ts, use-cases.ts); the /use-cases group titles in overviews.ts.
 */
export const sectionHeadings = {
  /** Lead under every Pain points h2 (service pages and Home). */
  painPointsLead: "Does any of this sound familiar?",
  /** Service pages' Testimonial(s): the same title as Home's. */
  testimonials: homeSections.testimonials.title,
  /** Use-case pages. */
  toolOrDone: "Sometimes a tool is enough. Here is how to tell.",
  worksWith: "The tools it works with.",
  /** Service and use-case pages. */
  relatedReading: "Related questions, answered.",
  /** Resource posts. */
  postRelated: "Want this done for your business?",
  postLinkedIn: "Join the conversation on LinkedIn.",
  /** Proof: the "Our product" group (App Development). */
  ourProducts: "Products we have built.",
};
