import type { ServiceSlug, Testimonial } from "@/content/types";

/*
 * Public testimonials only. Each `quote` is a short excerpt, a few whole
 * sentences that fit the pages it appears on, copied verbatim (spelling and
 * punctuation as published). The full texts are in
 * context-infrastructure/contexts/kivov/testimonials/*.md (LinkedIn
 * recommendations scraped 2026-11-20) and, for Yongling Zheng, the quote as it
 * ran on the former /showcase page.
 *
 * `caption` names where the quote was published ("From LinkedIn", "From Google
 * reviews"). A quote with no public review source keeps the person's company
 * and role (Yongling Zheng). Kim's rule, 2026-11-20.
 *
 * Never add: private messages (files marked `site_use: never`: Lindsay Watson,
 * Chris Molder) or Xinyuan Qiao (a dog-sitting recommendation).
 * Every testimonial appears on Home; `services` lists the service pages it
 * also appears on. Testimonials never appear on About.
 */
export const testimonials: Testimonial[] = [
  {
    id: "yongling-zheng",
    name: "Yongling Zheng",
    caption: "Founder, Webie",
    quote: [
      "I love your work. You’re talented, easy to communicate with, and very professional.",
    ],
    source: { channel: "Kivov Digital /showcase page (as published)" },
    relationship: "Founder, Webie",
    services: ["app-development"],
  },
  {
    id: "alan-kong",
    name: "Alan Kong",
    caption: "From LinkedIn",
    quote: [
      "One thing I really appreciate is how quickly she gets things done. If she commits to a deadline, you can count on her to deliver, and she does it without compromising on quality.",
    ],
    source: {
      channel: "LinkedIn recommendation",
      url: "https://www.linkedin.com/in/kim-wong-wwk/",
      date: "2026-09-07",
    },
    relationship: "client (LinkedIn)",
    services: ["app-development"],
  },
  {
    id: "michaelangelo-agbodike",
    name: "Michaelangelo Agbodike",
    caption: "From LinkedIn",
    quote: [
      "Kim really help me gain clarity on how to automate my workflow for my content creation and gave me brilliant insight on how to make it easier and more efficient which saves me a lot of time now than it did originally.",
    ],
    source: {
      channel: "LinkedIn recommendation",
      url: "https://www.linkedin.com/in/kim-wong-wwk/",
      date: "2026-08-28",
    },
    relationship: "client (LinkedIn)",
    services: ["ai-automation"],
  },
  {
    id: "joyce-yan",
    name: "Joyce Yan",
    caption: "From LinkedIn",
    quote: [
      "She’s also been a driving force behind AI adoption on our team, leading GitHub Copilot enablement across the group and contributing to shared agents and tooling that others now rely on daily. She actively pushes the team to work smarter with it, while still holding the line on solid engineering practices.",
    ],
    source: {
      channel: "LinkedIn recommendation",
      url: "https://www.linkedin.com/in/kim-wong-wwk/",
      date: "2026-07-12",
    },
    relationship: "Kim's former tech lead (LinkedIn)",
    services: ["ai-consulting"],
  },
  {
    id: "matthew-obrian",
    name: "Matthew O'Brian",
    caption: "From LinkedIn",
    quote: [
      "Her technical knowledge is exceptional. Just as importantly, Kim is someone who I and the teams truly enjoy working with.",
    ],
    source: {
      channel: "LinkedIn recommendation",
      url: "https://www.linkedin.com/in/kim-wong-wwk/",
      date: "2026-07-10",
    },
    relationship: "former senior colleague (LinkedIn)",
    services: [],
  },
  {
    id: "abdou-rakib-abente",
    name: "Abdou Rakib Abente",
    caption: "From LinkedIn",
    quote: [
      "Whenever I'm building something new or working through a challenge, she's there to listen, ask the right questions, and give me honest, thoughtful feedback.",
    ],
    source: {
      channel: "LinkedIn recommendation",
      url: "https://www.linkedin.com/in/kim-wong-wwk/",
      date: "2026-07-27",
    },
    relationship: "mentee through School of Mentors (LinkedIn)",
    services: [],
  },
];

/** The testimonials shown on a service page, in the order above. */
export function testimonialsFor(service: ServiceSlug): Testimonial[] {
  return testimonials.filter((t) => t.services.includes(service));
}
