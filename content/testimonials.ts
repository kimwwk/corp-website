import type { ServiceSlug, Testimonial } from "@/content/types";

/*
 * Public testimonials only, quoted verbatim (spelling and punctuation as
 * published). Sources: context-infrastructure/contexts/kivov/testimonials/*.md
 * (LinkedIn recommendations scraped 2026-11-20) and, for Yongling Zheng, the
 * quote as it ran on the former /showcase page.
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
    role: "Founder, Webie",
    quote: [
      "I love your work. You’re talented, easy to communicate with, and very professional. Looking forward to many more projects together.",
    ],
    source: { channel: "Kivov Digital /showcase page (as published)" },
    relationship: "Founder, Webie",
    services: ["app-development"],
  },
  {
    id: "alan-kong",
    name: "Alan Kong",
    role: "TODO(copy)",
    quote: [
      "I’ve really enjoyed working with Kim. She’s technically strong, reliable, and just very easy to work with.",
      "One thing I really appreciate is how quickly she gets things done. If she commits to a deadline, you can count on her to deliver, and she does it without compromising on quality. She’s thoughtful, detail-oriented, and very practical when it comes to solving problems.",
      "I’d be very happy to work with Kim again and would have no hesitation recommending her to anyone looking for a dependable and capable developer.",
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
    role: "TODO(copy)",
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
    role: "TODO(copy)",
    quote: [
      "I had the pleasure of working with Kim as her tech lead. What sets her apart is how fluidly she moves between business and technical worlds — she understands the “why” behind requirements as well as the “how” of implementation, which makes her a trusted translator between stakeholders and the dev team.",
      "She’s also been a driving force behind AI adoption on our team, leading GitHub Copilot enablement across the group and contributing to shared agents and tooling that others now rely on daily. She actively pushes the team to work smarter with it, while still holding the line on solid engineering practices.",
      "On top of all that, she’s a generous mentor to junior engineers and delivers reliably end-to-end. Kim is exactly the kind of engineer who makes a team better just by being on it.",
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
    role: "TODO(copy)",
    quote: [
      "I had the pleasure of working with Kim on several projects, where she acted as a developer responsible for code development in our cloud environments. Her technical knowledge is exceptional. Just as importantly, Kim is someone who I and the teams truly enjoy working with. She's collaborative and always willing to help others succeed. She consistently made our team stronger, and I'd happily work with her again.",
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
    role: "TODO(copy)",
    quote: [
      "I connected with Kim through School of Mentors, and from the very first conversation, I could tell she genuinely cares about helping people grow. Since then, she has been someone I can always count on. Whenever I'm building something new or working through a challenge, she's there to listen, ask the right questions, and give me honest, thoughtful feedback.",
      "What stands out most about Kim is how available and supportive she is, not just once or twice, but consistently. She makes time to connect whenever I need it, and she always brings real insight, not just encouragement. On top of all that, she's building her own company, Kivov, and even hosted her first live event, so she truly understands what it takes to build something from the ground up.",
      "I'm grateful to know her and to have her in my corner. Anyone lucky enough to work with or learn from Kim will benefit from her generosity, her honesty, and her genuine desire to see others succeed.",
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
