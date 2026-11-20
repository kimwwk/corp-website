import type { Service, ServiceSlug } from "@/content/types";

/*
 * The four service pages (/services/<slug>/). Keywords from the approved site
 * structure (adhoc_jobs/kivov_keyword_research/SITE-STRUCTURE-DECISION.md).
 * Only AI Packages shows prices: Website Management and App Development are
 * quoted after a free call.
 *
 * Copy sources: adhoc_jobs/kivov_site_rebuild/facts/<slug>.md. Every claim
 * here traces to live site copy, a case study or a job record listed there.
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
    title: "AI Consultant in Toronto for Small Business — Kivov Digital",
    description:
      "Workflow-first AI consulting in Toronto. We map how your work happens, find where time is lost, and recommend what fits. Start with a free fit check.",
    cardLine: "Find where AI fits in your business before you spend on tools.",
    h1: "An AI consultant in Toronto who starts with your workflow.",
    lead: "Before we recommend any tool, we learn how your business actually runs. Then we show you where AI fits and what to do first.",
    problems: [
      "You know AI could help, but you are not sure where it belongs.",
      "The owner has become the approval point for everything.",
      "You are paying for software the team barely uses.",
      "Follow-ups get delayed when the business gets busy.",
    ],
    included: [
      {
        title: "Workflow mapping",
        body: "A live session where you show us how one process runs today: what starts it, who is involved, where the information lives.",
      },
      {
        title: "Where time is lost",
        body: "The steps that repeat, wait, or depend too heavily on one person.",
      },
      {
        title: "What fits, in plain language",
        body: "What to keep, connect, replace or build, with privacy and data access thought through.",
      },
      {
        title: "A written plan you keep",
        body: "A prioritized action plan, yours whether or not we work together afterwards.",
      },
      {
        title: "Coaching while you build",
        body: "When your team wants to build it themselves, we build Claude skills and automations alongside them, every two weeks.",
      },
    ],
    steps: [
      {
        title: "Show us how the work happens",
        body: "Walk us through one process. No technical knowledge needed.",
      },
      {
        title: "We find the friction",
        body: "Where time, information or decisions get stuck.",
      },
      {
        title: "We determine what fits",
        body: "Sometimes it is a tool you already pay for. Sometimes it is an automation or an AI agent.",
      },
      {
        title: "You receive a practical plan",
        body: "Clear next steps, in order, so you know what to do first.",
      },
    ],
    useCases: [],
    proof: [],
    howToStart: {
      kind: "packages",
      lines: [
        {
          package: "Workflow Fit Check",
          line: "Free, 3 minutes. Start here while you are still identifying the problem.",
        },
        {
          package: "AI Workflow Audit",
          line: "For when you already know which process needs attention and want a professional recommendation.",
        },
        {
          package: "Build With You",
          line: "Two strategy calls a month while your team builds, with text support in between.",
        },
      ],
    },
    faqs: [
      {
        question: "What does an AI consultant do?",
        answer:
          "An AI consultant helps you decide where AI belongs in your business and how to put it to work. With us, that starts with one workflow: we map how it runs today, find where time is lost, and recommend what to keep, connect, replace or build.",
      },
      {
        question: "How much does an AI consultant cost?",
        answer:
          "Our consulting packages and their prices are on the AI Packages page. The Workflow Fit Check is free.",
      },
      {
        question: "What does AI consulting mean?",
        answer:
          "Getting help to decide where AI fits your business, and then putting it in place. We understand your workflow first and choose the technology second.",
      },
    ],
    closing: {
      title: "Start with one workflow.",
      lead: "The free fit check takes 3 minutes and gives you one practical place to begin.",
    },
  },
  {
    slug: "website-management",
    name: "Website Management",
    keyword: "website maintenance toronto",
    secondaryKeywords: ["website redesign services", "website maintenance services"],
    title: "Website Management and Maintenance in Toronto — Kivov Digital",
    description:
      "We manage and maintain your website on WordPress, Wix, Squarespace, Shopify, GoDaddy or Webflow, plus your domain, hosting and Google Business Profile.",
    cardLine: "Your website, domain and Google listing, kept current, with forms and tracking that work.",
    h1: "Website management for Toronto businesses.",
    lead: "We look after your website, your domain and your Google Business Profile, so your business stays current, easy to find and easy to contact.",
    problems: [
      "Messages from the contact form stop arriving, and no one notices.",
      "Spam comes in through the contact form.",
      "Calls from the website are not being counted.",
      "Your posts show up on Google as a cut-off sentence.",
      "The person who built the site has moved on.",
    ],
    included: [
      {
        title: "Updates and fixes",
        body: "Page edits, new pages, team and service updates, and fixes when something breaks.",
      },
      {
        title: "Forms that reach you",
        body: "Spam protection on your contact forms, and form emails that arrive in your inbox.",
      },
      {
        title: "Search Console and tracking",
        body: "Google Search Console, Bing Webmaster Tools and your sitemap set up, with phone and email taps counted.",
      },
      {
        title: "Google Business Profile",
        body: "Your profile description written and kept current, and your Google reviews shown on your site.",
      },
      {
        title: "Domain and hosting",
        body: "Your domain and hosting accounts kept in your company's name, and DNS handled when something moves.",
      },
      {
        title: "Ready for AI search",
        body: "Your site set up so Google and AI assistants can read who you are and what you do.",
      },
    ],
    steps: [
      {
        title: "Show us the site",
        body: "Share access and tell us what the site should be doing for your business.",
      },
      {
        title: "We find the friction",
        body: "Forms, tracking, search listings, slow updates: where enquiries get stuck.",
      },
      {
        title: "We decide what fits",
        body: "Fix what is there, add what is missing, or plan a redesign when the site has outgrown itself.",
      },
      {
        title: "We manage it",
        body: "Ongoing changes every month, so the site stays current.",
      },
    ],
    useCases: ["wordpress-support", "local-seo", "law-firm-seo"],
    proof: [],
    howToStart: {
      kind: "quote",
      line: "Every website starts with a free call. Get in touch, and you get a quote once we have seen the site.",
    },
    faqs: [
      {
        question: "Can I hire someone to manage my website?",
        answer:
          "Yes. We manage websites on WordPress, Wix, Squarespace, Shopify, GoDaddy and Webflow, along with the domain, hosting accounts and Google Business Profile around them.",
      },
      {
        question: "How much does website maintenance cost?",
        answer:
          "It depends on the platform and how much changes each month. We quote after a free call, once we have seen the site.",
      },
      {
        question: "Can AI redesign my existing website?",
        answer:
          "AI can speed up a redesign. The decisions that matter, what the site says and who it is for, stay with you, and we build around them.",
      },
    ],
    closing: {
      title: "Let's look at your site together.",
      lead: "Book a free call and we will walk through your site together.",
    },
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
    title: "AI Automation Agency in Toronto — Kivov Digital",
    description:
      "AI automation for Toronto small businesses, built inside the tools you already use. Your team approves before anything goes out.",
    cardLine: "Hand the repetitive work to AI, inside the tools your team already uses.",
    h1: "An AI automation agency for the way your team already works.",
    lead: "We take one workflow, like follow-up emails or vendor invoices, and automate it inside the tools you already use. A person reviews and approves before anything is sent or posted.",
    problems: [
      "You are copying the same information between platforms.",
      "Follow-ups get delayed when the business gets busy.",
      "Invoices and PDFs are typed in by hand.",
      "Calls you miss turn into clients you never hear from.",
    ],
    included: [
      {
        title: "One workflow, end to end",
        body: "Architecture, build, testing, exception handling and team handoff.",
      },
      {
        title: "Built on what you have",
        body: "We connect the systems you already use before suggesting anything new.",
      },
      {
        title: "A person approves",
        body: "Drafts wait for review. Nothing posts or sends without a click.",
      },
      {
        title: "30 days of stabilization",
        body: "After launch we watch it run and fix what comes up.",
      },
    ],
    steps: [
      {
        title: "Show us the work",
        body: "Share your screen and walk us through the process as it runs today.",
      },
      {
        title: "We find the friction",
        body: "The steps that repeat, wait, or get typed twice.",
      },
      {
        title: "We decide what fits",
        body: "Reconfigure a tool you have, connect two systems, add an automation or build an AI agent.",
      },
      {
        title: "We build and hand it over",
        body: "Tested, documented and handed to your team, with 30 days of stabilization.",
      },
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
      lines: [
        {
          package: "AI Workflow Audit",
          line: "Not sure which workflow to automate first? Start here.",
        },
        {
          package: "Build For You",
          line: "One workflow built for you at a flat project price, starting with discovery or a completed audit.",
        },
      ],
    },
    faqs: [
      {
        question: "What is an AI automation company?",
        answer:
          "A company that sets up AI to handle repetitive work in your business, like drafting emails, reading documents or answering calls. We build inside the tools you already use, and a person approves the output.",
      },
      {
        question: "What are some processes that can be automated?",
        answer:
          "Lead follow-up, quotes, scheduling, data entry, invoices and approvals, reporting and customer questions are the most common. The best first one is the work that happens most often and costs the most each time.",
      },
      {
        question: "Can ChatGPT create workflows?",
        answer:
          "ChatGPT can help you think a workflow through. Running one every day needs it connected to your email, calendar or accounting system, with checks along the way. That connection is the part we build.",
      },
      {
        question: "What is the best workflow automation platform?",
        answer:
          "Often the one you already pay for. We check what your current tools can do before adding anything new.",
      },
    ],
    closing: {
      title: "Pick one workflow to start.",
      lead: "The free fit check shows you where your work gets stuck.",
    },
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
    title: "App Development in Toronto, Fast With AI — Kivov Digital",
    description:
      "Web and mobile app development in Toronto. We build fast with AI, and every project starts with a discovery session so the first version is the right one.",
    cardLine: "Web and mobile apps built fast with AI, always starting with discovery.",
    h1: "App development in Toronto, fast with AI.",
    lead: "We use AI to build quickly, and every project starts with a discovery session, so the first thing we build is what your business needs.",
    problems: [
      "You have an idea for an app and no tech person.",
      "Off-the-shelf software almost fits, but not quite.",
      "You need something to show customers before every feature is built.",
      "Your app has bugs and no one to fix them.",
    ],
    included: [
      {
        title: "Discovery first",
        body: "We agree on the users, the screens and the first version before we quote.",
      },
      {
        title: "Web and mobile",
        body: "Web apps, and Android apps released on Google Play.",
      },
      {
        title: "A version you can sell with",
        body: "A first version good enough to put in front of customers, then features as you need them.",
      },
      {
        title: "Fixes to the app you have",
        body: "Bugs, payment flows and UX improvements, shipped to your live app.",
      },
    ],
    steps: [
      {
        title: "Show us the idea",
        body: "Who uses it, what they need to do, and what exists today.",
      },
      {
        title: "Discovery session",
        body: "We agree on the screens and the first version together.",
      },
      {
        title: "We decide what fits",
        body: "Sometimes an existing tool already fits. Sometimes a custom app is the right investment.",
      },
      {
        title: "We build",
        body: "Fast with AI, with a working version early so you can try it.",
      },
    ],
    useCases: [],
    proof: ["sprinting-run", "our-pot"],
    howToStart: {
      kind: "quote",
      line: "Every app starts with a free call. Get in touch, and you get a quote after the discovery session.",
    },
    faqs: [
      {
        question: "Can ChatGPT build me an app?",
        answer:
          "It can write pieces of one. A working app also needs the right screens, data, logins and payments, tested together. We use AI to build those faster, and start with discovery so it is the right app.",
      },
      {
        question: "How much does it cost to have someone develop an app?",
        answer:
          "It depends on the screens and features in the first version. We quote after a discovery session, so the price matches what you need.",
      },
      {
        question: "What is a custom software developer?",
        answer:
          "Someone who builds software for your business specifically. We check what already exists first, use what fits, and build what is missing.",
      },
    ],
    closing: {
      title: "Have an idea for an app?",
      lead: "Book a free call and tell us about your idea.",
    },
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
