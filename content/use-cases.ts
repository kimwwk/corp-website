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
 *
 * Copy sources: adhoc_jobs/kivov_site_rebuild/facts/<slug>.md. Client work is
 * described without naming any client.
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
    title: "WordPress Support and Website Design in Toronto — Kivov Digital",
    description:
      "WordPress support in Toronto: fixes, updates, contact forms, tracking and Google listings, plus WordPress website design when the site needs more.",
    cardLine: "Fixes, updates and care for your WordPress site, plus design when it needs more.",
    h1: "WordPress support for Toronto businesses.",
    problemLine: "Your WordPress site runs, but no one is watching the parts that bring in clients.",
    problem: [
      "On one client's WordPress site, the contact-form emails ran through the previous developer's login and kept failing. The forms had no spam protection, calls from the website were not being counted, and every blog post showed up on Google as a cut-off sentence, because its description was empty.",
      "The site looked fine. The owner just could not see these parts. Looking after them is what WordPress support is for.",
    ],
    setup: [
      {
        title: "A quick review",
        body: "We go through the site, the hosting account and the plugins, and list what needs attention first.",
      },
      {
        title: "Fixes that matter",
        body: "Spam protection on forms, form emails that reach your inbox, tappable phone numbers, and descriptions Google can show.",
      },
      {
        title: "Tracking and listings",
        body: "Search Console, Bing Webmaster Tools, a submitted sitemap, and phone and email taps counted in Google Analytics.",
      },
      {
        title: "Ongoing updates",
        body: "New pages, posts and team changes, published and checked on the live site.",
      },
    ],
    extraSection: {
      eyebrow: "WordPress website design",
      title: "When the site needs more than support.",
      body: [
        "We also design WordPress websites. We start from what your clients need to find and do on the site, then design around it.",
        "Your domain and hosting stay in your company's name, so the site is always yours.",
      ],
    },
    proof: [],
    worksWith: [
      "WordPress",
      "GoDaddy",
      "Contact Form 7",
      "Cloudflare Turnstile",
      "WP Mail SMTP",
      "Google Site Kit",
      "Google Search Console",
      "Bing Webmaster Tools",
    ],
    faqs: [
      {
        question: "What if the old developer still has the logins?",
        answer:
          "We help you get access back, and move the hosting, domain and WordPress accounts into your company's name, so the site stays yours.",
      },
      {
        question: "Is WordPress still worth it in 2026?",
        answer:
          "For most small business sites, yes. It is easy to edit, it runs a large share of the web, and you own the site and its content. What matters more is that someone looks after it.",
      },
      {
        question: "Can ChatGPT build a WordPress website?",
        answer:
          "It can draft pages and code. The site still needs a theme, plugins, forms, tracking and a domain set up and tested together. We use AI to move faster on that work.",
      },
      {
        question: "How much does WordPress maintenance cost?",
        answer:
          "It depends on the site and how much changes each month. We quote after a free call, once we have seen the site.",
      },
    ],
    closing: {
      title: "Let's look at your WordPress site.",
      lead: "Book a free call and we will tell you what to fix first.",
    },
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
    title: "Local SEO Toronto and GEO for AI Search — Kivov Digital",
    description:
      "Local SEO in Toronto, plus GEO (also called AI SEO): helping Google and AI assistants like ChatGPT understand and recommend your business.",
    cardLine: "Help Google and AI assistants like ChatGPT understand what you do and who you serve.",
    h1: "Local SEO in Toronto, built for AI search too.",
    problemLine: "More customers now ask ChatGPT who to call. The answer depends on what AI can read about you.",
    problem: [
      "When someone asks an AI assistant for a recommendation, it searches the web by category: a place, a type of provider, an industry, sometimes a tool. Then it names the businesses whose sites answer that question clearly.",
      "In our own research into how AI assistants answer, the site they cited most often had one clear page per problem. That is GEO, generative engine optimization, also called AI SEO: making your business easy for AI to understand and recommend.",
      "Local SEO is the foundation underneath: your Google Business Profile, your reviews, and a site Google can index. GEO builds on it.",
    ],
    setup: [
      {
        title: "Google Business Profile",
        body: "Your profile description written around what you do and who you serve, and your reviews shown on your site.",
      },
      {
        title: "A site search engines can read",
        body: "Search Console and Bing Webmaster Tools set up, your sitemap submitted, and your business details added as structured data.",
      },
      {
        title: "One page per question",
        body: "Pages and Q&A sections that answer what your customers ask, in the words they use.",
      },
      {
        title: "Checking what AI says",
        body: "We ask AI assistants the questions your customers ask, and see whether your business comes up.",
      },
    ],
    proof: [],
    worksWith: [
      "Google Business Profile",
      "Google Search Console",
      "Bing Webmaster Tools",
      "Google Analytics",
      "ChatGPT",
      "Google AI Overviews",
      "WordPress",
    ],
    faqs: [
      {
        question: "Does local SEO still work?",
        answer:
          "Yes. Your Google Business Profile, your reviews and a site Google can index still decide who shows up nearby. The same groundwork is what AI assistants read when they recommend a business.",
      },
      {
        question: "What is AI SEO known as?",
        answer:
          "GEO, generative engine optimization, and sometimes AEO, answer engine optimization. They all mean helping AI assistants find, understand and recommend your business.",
      },
      {
        question: "What is an AI SEO agency?",
        answer:
          "A team that helps your business show up in AI answers as well as on Google. With us, that starts with your Google Business Profile, a site AI can read, and pages that answer your customers' questions.",
      },
      {
        question: "How much does local SEO cost?",
        answer:
          "We quote after a free call, once we have seen your site and your Google Business Profile.",
      },
    ],
    closing: {
      title: "Find out what AI says about you.",
      lead: "Book a free call and we will walk through your site and your Google listing.",
    },
  },
  {
    slug: "law-firm-seo",
    name: "Law Firm SEO & GEO",
    parent: "website-management",
    keyword: "law firm seo",
    secondaryKeywords: ["seo for lawyers", "law firm marketing"],
    title: "Law Firm SEO and GEO for AI Search — Kivov Digital",
    description:
      "Law firm SEO and GEO: a website, Google listing and content that help clients find your firm on Google and in AI assistants like ChatGPT.",
    cardLine: "Help clients find your firm on Google and in AI answers.",
    h1: "Law firm SEO for Google and AI search.",
    problemLine: "Clients look for a lawyer on Google, and more of them now ask ChatGPT.",
    problem: [
      "On a law firm client's site, the expertise was already there, in its posts and service pages. What it needed was the part Google and AI assistants read first: clear descriptions, a Google Business Profile that says what the firm does, and calls and emails that are counted.",
      "We write for that: the answer up front, with links to official sources so it can be checked. Legal content suits this well, with the lawyer's wording kept exactly as written.",
    ],
    setup: [
      {
        title: "Website fixes",
        body: "Spam protection on forms, form emails that arrive, and tappable phone numbers and email links, with every tap counted.",
      },
      {
        title: "Search and listings",
        body: "Search Console, Bing Webmaster Tools, a sitemap, structured business details, and a Google Business Profile description written around your practice.",
      },
      {
        title: "Posts and Q&A pages",
        body: "Your drafts published as written, with titles, descriptions, official-source links and links to your service pages.",
      },
      {
        title: "Reviews",
        body: "Your Google reviews shown on your site, and suspicious reviews appealed with evidence.",
      },
      {
        title: "Checking what AI says",
        body: "We ask AI assistants the questions your clients ask, and see whether your firm comes up.",
      },
      {
        title: "Monthly tracking",
        body: "A monthly tracker that follows enquiries back to traffic and visibility, so you can see what is working.",
      },
    ],
    proof: ["law-firm-work"],
    worksWith: [
      "WordPress",
      "Google Business Profile",
      "Google Search Console",
      "Bing Webmaster Tools",
      "Google Analytics",
      "ChatGPT",
    ],
    faqs: [
      {
        question: "How does a law firm get recommended by ChatGPT?",
        answer:
          "AI assistants recommend firms whose sites answer clients' questions clearly and cite reliable sources. Q&A pages for each practice area, a complete Google Business Profile and consistent business details all help.",
      },
      {
        question: "Who writes the legal content?",
        answer:
          "You provide it, for example a newsletter or your notes, and your wording stays exactly as written. Any legal question goes back to the lawyer. We handle the titles, descriptions, links and publishing.",
      },
      {
        question: "Who approves what goes live?",
        answer:
          "You do. Every title, description, post and Google Business Profile change goes live after you approve it, so it fits your firm and your professional conduct rules.",
      },
      {
        question: "Do the accounts stay in our name?",
        answer:
          "Yes. Your domain, hosting, Google Business Profile and Search Console stay in your firm's name.",
      },
    ],
    closing: {
      title: "Help clients find your firm.",
      lead: "Book a free call and we will walk through your site and your Google listing.",
    },
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
    title: "Invoice Automation for Vendor PDFs — Kivov Digital",
    description:
      "AI invoice automation: vendor PDFs read, checked and prepared as drafts for QuickBooks or your ERP, with a person approving every invoice.",
    cardLine: "Vendor invoice PDFs read by AI and entered as drafts for you to approve.",
    h1: "Invoice automation that reads every vendor's PDF.",
    problemLine: "Vendor invoices arrive as PDFs, every layout different, and someone types them in by hand.",
    problem: [
      "Every supplier sends a different layout. A template for each one means maintaining hundreds of templates, so the work falls back to typing.",
      "The one thing that has to be right is the supplier. A wrong supplier is a payment to the wrong company.",
    ],
    setup: [
      {
        title: "The PDF arrives",
        body: "Invoices land in your mailbox as usual, and are renamed and filed.",
      },
      {
        title: "AI reads every line",
        body: "Supplier, invoice number, date, totals, tax and each line item, checked against its own totals.",
      },
      {
        title: "Coded and matched",
        body: "Each line is coded to its expense account, and the invoice is matched to the right supplier.",
      },
      {
        title: "A draft for review",
        body: "A draft bill with the PDF attached, flagged green, yellow or red by confidence. Nothing posts without your click.",
      },
    ],
    toolOrDone: {
      tool: "If your invoices come from a few suppliers with the same layouts, the bill capture in your accounting software or an off-the-shelf accounts payable tool may be enough.",
      doneForYou:
        "When you have many suppliers, multi-line invoices and a system that is hard to connect, a reader built around your suppliers and your chart of accounts is worth building. It runs inside the system you already use.",
    },
    proof: ["file-and-document-management"],
    worksWith: [
      "QuickBooks Online",
      "ERP platforms",
      "Your invoice mailbox",
      "PDF invoices from any supplier",
    ],
    faqs: [
      {
        question: "Can AI do my QuickBooks?",
        answer:
          "AI can read your bills and prepare them for QuickBooks, with each line coded and the supplier matched. A person approves each one before it posts.",
      },
      {
        question: "Does QuickBooks have API integration?",
        answer:
          "Yes. QuickBooks Online has an API, which is how an automation reads and writes bills and transactions in your company file.",
      },
      {
        question: "Can QuickBooks automate invoicing?",
        answer:
          "QuickBooks can automate the invoices you send, like recurring invoices. The work we automate is the other side: the bills that arrive from your suppliers.",
      },
    ],
    closing: {
      title: "See where your invoice time goes.",
      lead: "The free fit check takes 3 minutes and shows you where to start.",
    },
  },
  {
    slug: "missed-call-text-back",
    name: "Missed Call Text Back",
    parent: "ai-automation",
    keyword: "missed call text back",
    secondaryKeywords: ["speed to lead"],
    title: "Missed Call Text Back on Your Business Number — Kivov Digital",
    description:
      "Missed call text back set up on the phone number you already have: callers get a text within seconds and can book a time.",
    cardLine: "Callers you miss get a text within seconds, on the number you already have.",
    h1: "Missed call text back, on the number you already have.",
    problemLine: "When you cannot pick up, the caller moves on to the next business on the list.",
    problem: [
      "Speed to lead is how fast a new enquiry hears back. For a call you miss, the fastest reply is a text within seconds: sorry we missed you, reply here or book a time.",
      "One missed call a week is 50 a year. When one job is worth thousands of dollars, each of those calls matters.",
    ],
    setup: [
      {
        title: "Keep your number",
        body: "Calls you cannot answer are forwarded from your existing number. Your customers call the same number as always.",
      },
      {
        title: "The text goes out",
        body: "Within seconds, the caller gets a text from your business with a way to reply and a link to book.",
      },
      {
        title: "Rules that feel human",
        body: "A short delay, business-hours rules, and one text even when someone redials 3 times.",
      },
      {
        title: "Texting registration",
        body: "We handle the registration Canadian carriers require for business texting. It takes 1 to 2 weeks.",
      },
    ],
    toolOrDone: {
      tool: "If you already use a business phone app or a CRM, missed call text back is often a setting you can switch on. A simple text template is enough for many businesses.",
      doneForYou:
        "When you want the reply to continue as a conversation, follow your hours and book into your calendar, it is worth having it set up. It runs on your number, and you own every rule.",
    },
    proof: [],
    worksWith: [
      "Your existing business number",
      "Twilio",
      "n8n",
      "GoHighLevel",
      "Your CRM",
    ],
    faqs: [
      {
        question: "What to text back after a missed call?",
        answer:
          "Keep it short and give one next step. For example: \"Sorry we missed you. Reply here or book a time.\"",
      },
      {
        question: "How much does missed call text back cost?",
        answer:
          "Many business phone apps and CRMs include it in their plans, and a custom setup costs little to run each month. For what a build with us costs, see AI Packages.",
      },
    ],
    closing: {
      title: "Text back the calls you cannot take.",
      lead: "The free fit check shows you where your leads are waiting.",
    },
  },
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    parent: "ai-automation",
    keyword: "ai receptionist for small business",
    secondaryKeywords: ["ai voice agent", "virtual receptionist toronto"],
    title: "AI Receptionist for Small Business — Kivov Digital",
    description:
      "An AI receptionist that answers your calls, follows your booking rules and books into your calendar, set up on the phone number you already have.",
    cardLine: "An AI voice agent that answers calls and books by your rules.",
    h1: "An AI receptionist for small business that follows your rules.",
    problemLine: "Answering the phone is the easy part. Booking the way your front desk does is what matters.",
    problem: [
      "Every business has booking rules that live in the front desk's head: lunch breaks, who does which job, how long each appointment takes, which gaps to avoid.",
      "An AI receptionist is useful when it follows those rules. In our test with a demo dental clinic, the agent turned down a lunch slot, offered 3 other times, checked the details once more, then booked.",
    ],
    setup: [
      {
        title: "Your rules, written down",
        body: "Hours, staff, services, appointment lengths and the gaps you want to avoid.",
      },
      {
        title: "Connected to your calendar",
        body: "The agent checks real availability before it offers a time, and books into your calendar.",
      },
      {
        title: "On your number",
        body: "Calls you cannot answer are forwarded from your existing number, so customers call the same number as always.",
      },
      {
        title: "Times people say",
        body: "It offers times the way people say them, like Thursday at 10 a.m., and confirms before it books.",
      },
    ],
    toolOrDone: {
      tool: "If your booking or practice software can already call and text customers, switching that on may be enough.",
      doneForYou:
        "When calls need your booking rules, or your software has no open connection, we build the connection and set the agent up around your rules.",
    },
    proof: ["conversational-ai"],
    worksWith: [
      "Your existing business number",
      "Twilio",
      "VAPI",
      "GoHighLevel calendars",
    ],
    faqs: [
      {
        question: "Is an AI receptionist worth it?",
        answer:
          "It is worth it when calls go unanswered at busy times and each booking matters. It works best when it follows your booking rules, not only answers the phone.",
      },
      {
        question: "What is an AI voice agent?",
        answer:
          "Software that holds a phone conversation in natural speech. An AI receptionist is a voice agent set up for your business: it answers questions, checks your calendar and books appointments.",
      },
      {
        question: "How much does an AI receptionist cost?",
        answer:
          "Ready-made tools charge a monthly fee. For what a build with us costs, see AI Packages.",
      },
    ],
    closing: {
      title: "Take bookings while you are busy.",
      lead: "The free fit check shows you where your calls and bookings get stuck.",
    },
  },
  {
    slug: "ai-follow-up-emails",
    name: "AI Follow-Up Emails",
    parent: "ai-automation",
    // No measured keyword: Kim kept this use case on 2026-11-20 without one.
    keyword: null,
    secondaryKeywords: [],
    title: "AI Follow-Up Emails After Every Client Call — Kivov Digital",
    description:
      "After every client call, AI drafts the follow-up email in your voice and files the documents. You review and send. It never sends on its own.",
    cardLine: "AI drafts the follow-up email after every call, in your voice, for you to send.",
    h1: "AI follow-up emails, drafted after every call.",
    problemLine: "A good follow-up takes 15 to 30 minutes, and it is the first thing to slip on a busy day.",
    problem: [
      "After a client call, someone has to write the recap, list the documents the client needs to send, and file everything in the right folder.",
      "A generic AI draft has no idea who you are, what you sell or how you sound.",
    ],
    setup: [
      {
        title: "A notetaker joins the call",
        body: "It summarizes the call in your own note format.",
      },
      {
        title: "AI drafts the email",
        body: "It picks the template for the client's stage and the documents they need, and writes the draft into your Gmail drafts.",
      },
      {
        title: "Files land in place",
        body: "The client's documents are filed in their folder in Google Drive.",
      },
      {
        title: "You review and send",
        body: "Drafts are written from examples of your past emails, so they sound like you. Every one waits for you to send it.",
      },
    ],
    proof: ["executive-assistant"],
    worksWith: ["Gmail", "Google Drive", "Google Calendar", "Google Meet"],
    faqs: [
      {
        question: "Does it send emails on its own?",
        answer: "Every email stays a draft until you review it and send it yourself.",
      },
      {
        question: "Will it sound like me?",
        answer:
          "It drafts from examples of your own past emails, so the tone and wording are yours.",
      },
      {
        question: "What do I need to do?",
        answer:
          "One thing: share about 10 past email threads that show how you write. We set up the rest.",
      },
    ],
    closing: {
      title: "Let AI draft the follow-up after every call.",
      lead: "The free fit check shows you where your follow-ups get stuck.",
    },
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

export function getUseCaseBySlug(slug: UseCaseSlug): UseCase {
  const found = getUseCase(slug);
  if (!found) throw new Error(`Unknown use-case slug: ${slug}`);
  return found;
}

export function pathForUseCase(slug: UseCaseSlug) {
  return `/use-cases/${slug}`;
}
