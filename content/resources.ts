import type { ResourcePost, ResourceSlug } from "@/content/types";

/*
 * The three resource posts (/resources/<slug>/): posts from Kim's blog or
 * LinkedIn, each answering a question buyers ask. The full text lives here;
 * each post links to its LinkedIn original via `linkedinUrl` once known.
 *
 * None of the three exists on LinkedIn yet (2026-11-20), so `linkedinUrl` is
 * left out until Kim posts them. Copy sources: adhoc_jobs/kivov_site_rebuild/
 * facts/<slug>.md. Client data is described without naming any client.
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
    title: "Generative Engine Optimization for Small Business — Kivov Digital",
    h1: "Generative engine optimization: how do I get ChatGPT to recommend my business?",
    description:
      "Generative engine optimization (GEO) for small businesses: how ChatGPT picks who to recommend, and what to put on your site so it can pick you.",
    date: "2026-11-20",
    cardLine: "How ChatGPT picks who to recommend, and what to put on your site so it can pick you.",
    shortAnswer:
      "Make your business easy for AI to file correctly. ChatGPT searches by category, like a place, a type of provider and an industry, then cites the pages that answer that exact question. One clear page per problem, in your customers' words, plus a complete Google Business Profile, gives it something to cite.",
    body: [
      { type: "h2", text: "What GEO is" },
      {
        type: "p",
        text: "Generative engine optimization, or GEO, is getting your business cited and recommended by AI assistants like ChatGPT, Gemini and Google's AI Overviews. It is also called AEO, answer engine optimization, or AI SEO, and people search for it as GEO SEO or ChatGPT SEO. SEO gets you ranked. GEO gets you mentioned in the answer.",
      },
      { type: "h2", text: "What ChatGPT does before it answers" },
      {
        type: "p",
        text: "We asked 5 AI assistants 12 questions a small business owner might ask, and read all 60 answers, along with the searches ChatGPT ran in the background before answering.",
      },
      {
        type: "p",
        text: "Those background searches were category words. Of 230 of them, 160 included a place and 46 named a tool. Something like \"Toronto local SEO agency for physiotherapy clinics\".",
      },
      {
        type: "p",
        text: "Then the AI recommends a type of provider, described by attributes, like \"a senior-led local studio\" or \"an owner-led web partner\". The businesses it names are the ones whose pages fit that description.",
      },
      { type: "h2", text: "One page per problem" },
      {
        type: "p",
        text: "One site was cited for 11 of the 12 questions. Each of its pages answered one need.",
      },
      {
        type: "p",
        text: "That is the pattern to copy. If your customers come to you with 3 different problems, give each one its own page, with the answer near the top and the area you serve in plain words.",
      },
      { type: "h2", text: "What to put in place" },
      {
        type: "ul",
        items: [
          "A Google Business Profile with a full description: what you do, who you serve and where.",
          "One page per service or problem, named in the words your customers use.",
          "Short Q&A sections that answer the questions customers actually ask.",
          "Links to official sources where they apply, so the answer can be checked.",
          "Your business details added to your site as structured data, so search engines read them the same way everywhere.",
        ],
      },
      { type: "h2", text: "Then ask the AI" },
      {
        type: "p",
        text: "AI answers change from one run to the next, so a single test proves little. Ask the questions your customers ask, several times, and note whether your business comes up and how it is described.",
      },
      {
        type: "p",
        text: "GEO builds on SEO. AI assistants read the same web Google indexes, so a site Google can read is still the foundation.",
      },
    ],
    related: { kind: "use-case", slug: "local-seo" },
    closing: {
      title: "Make your business easy to recommend.",
      lead: "Book a free call and we will check what AI says about your business.",
    },
  },
  {
    slug: "ai-automation",
    name: "AI automation for small business: what should I automate first?",
    shortName: "AI automation for small business",
    keyword: "ai automation",
    secondaryKeywords: [],
    title: "AI Automation: What Should You Automate First? — Kivov Digital",
    h1: "AI automation for small business: what should I automate first?",
    description:
      "What to automate first with AI in a small business: count how often a task happens and what it costs each time, then start with the biggest number.",
    date: "2026-11-20",
    cardLine: "Count how often a task happens and what it costs each time. Start with the biggest number.",
    shortAnswer:
      "Automate the task with the biggest number when you multiply how many times it happens by what it costs each time. That is usually work that repeats every day, follows the same steps, and sits close to the money, like the follow-up after a client call.",
    body: [
      { type: "h2", text: "2 numbers decide" },
      {
        type: "p",
        text: "Before you automate something, count how many times you will do it. 2 numbers decide if it is worth building: how many times it happens over the life of the business, and how much it costs each time. Multiply them.",
      },
      {
        type: "p",
        text: "One job we looked at comes up 8 times a year and takes half a day each time. That is 4 days a year, every year. That one was worth building.",
      },
      { type: "h2", text: "The first idea is not always the one" },
      {
        type: "p",
        text: "One client first wanted AI to draft replies in their inbox. When we looked at the inbox, most replies were one line. The task that repeated all day, the same way every time, was the follow-up after each client call.",
      },
      {
        type: "p",
        text: "That task was also the closest to revenue. A slow follow-up on a hot lead can cost the client, not just the time. So it became the first build: AI drafts the follow-up after every call, and a person reviews it and sends it.",
      },
      { type: "h2", text: "Count the variety too" },
      {
        type: "p",
        text: "For some work, the count alone misleads. 300 invoices from 200 suppliers take far more effort than 800 from 5, because every supplier's layout is different. When a task varies a lot, the variety counts as much as the volume.",
      },
      { type: "h2", text: "Good first candidates" },
      {
        type: "ul",
        items: [
          "Lead follow-up and follow-up emails",
          "Quotes or proposals",
          "Scheduling",
          "Data entry",
          "Invoices or approvals",
          "Reporting",
          "Customer questions",
        ],
      },
      { type: "h2", text: "When the answer is not yet" },
      {
        type: "p",
        text: "Sometimes the right first step is to fix the flow before automating it, because automating an unclear process creates more confusion. If you are not sure how often the work happens, track it for a few weeks first: how often it occurs, and what it costs each time.",
      },
    ],
    related: { kind: "service", slug: "ai-automation" },
    closing: {
      title: "Find your first workflow.",
      lead: "The free fit check takes 3 minutes and points to one practical place to begin.",
    },
  },
  {
    slug: "wordpress-seo",
    name: "WordPress SEO: why isn't my WordPress site showing up on Google?",
    shortName: "WordPress SEO",
    keyword: "wordpress seo",
    secondaryKeywords: [],
    title: "WordPress SEO: Why Isn't My Site on Google? — Kivov Digital",
    h1: "WordPress SEO: why isn't my WordPress site showing up on Google?",
    description:
      "WordPress SEO starts with what Google has actually indexed. How to check it in Search Console, and the WordPress leftovers that crowd out your real pages.",
    date: "2026-11-20",
    cardLine: "Check what Google actually indexed first. WordPress leftovers often crowd out your real pages.",
    shortAnswer:
      "Start by checking what Google has actually indexed, in Search Console's page indexing report. On one client's WordPress site, Google knew about 550 URLs and had indexed 43, most of the rest being leftover image pages. Clean those up, fix the basics, and request indexing for your key pages.",
    body: [
      { type: "h2", text: "Look before you change anything" },
      {
        type: "p",
        text: "Googling your own business is not a reliable check. Google adjusts results to your location and search history, so what you see is not what your customers see.",
      },
      {
        type: "p",
        text: "Search Console shows what Google actually has. Its page indexing report lists every URL Google knows about, and whether each one is indexed.",
      },
      { type: "h2", text: "What we found on one client's site" },
      {
        type: "p",
        text: "On one client's WordPress site, Google knew about 550 URLs. 43 were indexed. 455 were discovered but not indexed, and 414 of those were media attachment pages: the page WordPress creates for each image you upload.",
      },
      {
        type: "p",
        text: "Of the blog posts, 8 were indexed and 24 were not. The real pages were a small share of what Google was looking at.",
      },
      { type: "h2", text: "The WordPress leftovers to check" },
      {
        type: "ul",
        items: [
          "Media attachment pages, one for every uploaded image.",
          "A coming-soon or demo page from the theme, still published and still in the sitemap.",
          "A sitemap full of URLs you never meant to publish. One client's sitemap had 537 URLs, and 71 after cleanup.",
          "Lines in robots.txt that block images Google needs, like your logo.",
          "Your address in two forms, with and without www, in different places.",
        ],
      },
      { type: "h2", text: "Then fix the basics" },
      {
        type: "ul",
        items: [
          "Write a description for every post and page. Without one, Google shows a cut-off sentence from the page.",
          "Give each page exactly one H1.",
          "Submit a clean sitemap in Search Console and in Bing Webmaster Tools.",
          "For your key pages, run URL Inspection, and request indexing for any page that is not on Google.",
        ],
      },
      { type: "h2", text: "Give it time, and check properly" },
      {
        type: "p",
        text: "After a fix, wait about 4 weeks from the date Google last crawled the page. Then compare the 28 days before and after in Search Console's performance report, filtered to that exact URL.",
      },
    ],
    related: { kind: "use-case", slug: "wordpress-support" },
    closing: {
      title: "Want a second pair of eyes on your site?",
      lead: "Book a free call and we will look at your site together.",
    },
  },
];

export function getResource(slug: string): ResourcePost | undefined {
  return resources.find((r) => r.slug === slug);
}

export function resourcePath(slug: ResourceSlug) {
  return `/resources/${slug}`;
}
