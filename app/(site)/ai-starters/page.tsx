import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AUDIT_PRICE } from "@/lib/payments";
import { breadcrumbs, faqPage, pageMetadata, service } from "@/lib/seo";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Marker } from "@/components/marker";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CtaRow,
  MonoLabel,
  PriceCard,
  Section,
  StatementRows,
} from "@/components/sections";
import { TrackedLink } from "@/components/tracked-link";
import { serviceBySlug, servicePath } from "@/content/services";
import type { OfferCard, ServiceSlug } from "@/content/types";

/*
 * AI Starters (the price cards that lived on /services until 2026-11-20) —
 * Kim's copy on the Green Ledger foundation: P2 header, P13 price slots (the paid
 * tiers: audit | Build With You | Build For You, layout restored from PR #11),
 * then the P8 four-rung ladder as the sequence view. Each paid card links
 * back to its service page.
 */
export const metadata: Metadata = pageMetadata({
  title: "AI Starters — Kivov Digital",
  description:
    "Start with the workflow. A free Workflow Fit Check, a CAD $750 Workflow-First AI Audit, then Build With You at $1,250/mo or Build For You at $5,500 per project.",
  path: "/ai-starters",
  socialDescription:
    "Start with the workflow. A free Workflow Fit Check, a CAD $750 Workflow-First AI Audit, then Build With You or Build For You. Practical AI and automation for small & mid-sized businesses.",
});

const h2 =
  "font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground";
const rungMeta =
  "font-mono text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap";
const rungArrow =
  "ml-2 inline-block -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100";

/* The four rungs, in order of how much of the work I take on. */
const rungs = [
  {
    featured: true,
    name: "Workflow Fit Check",
    desc: "A three-minute questionnaire that identifies the type of workflow issue you may be facing, and one practical place to begin.",
    meta: "Free · 3 min",
    cta: "Take the free check",
    href: "/fit-check",
    event: "fit_check_cta_clicked",
    eventProps: { source_page: "ai-starters", cta_location: "ladder" },
  },
  {
    featured: false,
    name: "Workflow-First AI Audit",
    desc: "A professional review of one priority workflow: map, bottlenecks, prioritized opportunities, recommendations, and a written 30-day action plan.",
    meta: "Founding $495",
    cta: "Explore the audit",
    href: "/audit",
    event: "audit_cta_clicked",
    eventProps: { source_page: "ai-starters", cta_location: "ladder" },
  },
  {
    featured: false,
    name: "Build With You",
    desc: "Two 45-minute strategy calls a month — one every two weeks, hands-on, with always-on text support in between.",
    meta: "$1,250 / mo",
    cta: "Get in touch",
    href: "/contact?interest=build-with-you",
    event: "service_inquiry_clicked",
    eventProps: { service_tier: "do_it_with_you" },
  },
  {
    featured: false,
    name: "Build For You",
    desc: "One workflow taken end-to-end — architecture, implementation, testing, team handoff, and a 30-day stabilization period. Begins with discovery or a completed audit.",
    meta: "$5,500 / project",
    cta: "Book a call",
    href: "/book",
    event: "service_inquiry_clicked",
    eventProps: { service_tier: "do_it_for_you" },
  },
];

const faqs = [
  {
    value: "fit-check",
    // Plain-text twin of `answer` for the FAQPage JSON-LD — keep in sync.
    text: "A high-level result: the type of workflow issue you likely have and one practical recommendation. It doesn't include a call, custom research, or a written report. That's what the audit is for.",
    question: "What does the free fit check include?",
    answer: (
      <p>
        A high-level result: the type of workflow issue you likely have and one
        practical recommendation. It doesn&apos;t include a call, custom
        research, or a written report. That&apos;s what the audit is for.
      </p>
    ),
  },
  {
    value: "why-paid",
    // Plain-text twin of `answer` for the FAQPage JSON-LD — keep in sync.
    text: "Because it's real consulting work: a mapping session, analysis, a written report, and a walkthrough. Charging for it means you get my full attention on one workflow, and a deliverable you keep whether or not we work together afterwards. And if you hire Kivov for implementation within 30 days, CAD $500 of the standard fee is credited toward the project.",
    question: "Why is the audit paid?",
    answer: (
      <p>
        Because it&apos;s real consulting work: a mapping session, analysis, a
        written report, and a walkthrough. Charging for it means you get my
        full attention on one workflow, and a deliverable you keep whether or
        not we work together afterwards. And if you hire Kivov for
        implementation within 30 days, CAD $500 of the standard fee is credited
        toward the project.
      </p>
    ),
  },
  {
    value: "with-vs-for",
    // Plain-text twin of `answer` for the FAQPage JSON-LD — keep in sync.
    text: "Build With You keeps you in the driver's seat: we coach, build Claude skills, and automate alongside your team on a monthly rhythm. Build For You hands the build to me — one workflow taken end-to-end at a flat project price. Every Build For You project starts with discovery or a completed audit.",
    question: "What's the difference between “with you” and “for you”?",
    answer: (
      <p>
        <span className="font-medium text-foreground">Build With You</span>{" "}
        keeps you in the driver&apos;s seat: we coach, build Claude skills, and
        automate alongside your team on a monthly rhythm.{" "}
        <span className="font-medium text-foreground">Build For You</span> hands
        the build to me — one workflow taken end-to-end at a flat project
        price. Every Build For You project starts with discovery or a
        completed audit.
      </p>
    ),
  },
  {
    value: "with-you-build",
    // Plain-text twin of `answer` for the FAQPage JSON-LD — keep in sync.
    text: "Whatever the workflow needs. On our calls we build custom Claude skills around the workflows you screen-share, automate the repetitive parts, and bring in off-the-shelf tools when one already solves the problem. There's no fixed menu — if your workflow calls for something else, that's what we build.",
    question: "What do we actually build in Build With You?",
    answer: (
      <p>
        Whatever the workflow needs. On our calls we build custom Claude
        skills around the workflows you screen-share, automate the repetitive
        parts, and bring in off-the-shelf tools when one already solves the
        problem. There&apos;s no fixed menu — if your workflow calls for
        something else, that&apos;s what we build.
      </p>
    ),
  },
  {
    value: "for-you-scope",
    // Plain-text twin of `answer` for the FAQPage JSON-LD — keep in sync.
    text: "Every Build For You project begins with discovery or a completed audit. Two tracks come out of it: AI & automation, built around the workflow we mapped together, and custom software development, when off-the-shelf won't fit. The package covers the first track: one end-to-end workflow with up to roughly two core system integrations — AI and automation architecture, implementation, testing, exception handling, team handoff, and a 30-day stabilization period. Custom software builds, or anything bigger than one workflow, are scoped and quoted separately after discovery.",
    question: "What does the Build For You package actually cover?",
    answer: (
      <p>
        Every Build For You project begins with discovery or a completed
        audit. Two tracks come out of it:{" "}
        <span className="font-medium text-foreground">AI &amp; automation</span>
        , built around the workflow we mapped together, and{" "}
        <span className="font-medium text-foreground">
          custom software development
        </span>
        , when off-the-shelf won&apos;t fit. The package covers the first
        track: one end-to-end workflow with up to roughly two core system
        integrations — AI and automation architecture, implementation,
        testing, exception handling, team handoff, and a 30-day stabilization
        period. Custom software builds, or anything bigger than one workflow,
        are scoped and quoted separately after discovery.
      </p>
    ),
  },
  {
    value: "billing",
    // Plain-text twin of `answer` for the FAQPage JSON-LD — keep in sync.
    text: "Build With You is $1,250, billed every 4 weeks — that covers your two bi-weekly strategy calls plus always-on text support and your documentation hub in between.",
    question: "How does billing work on the monthly package?",
    answer: (
      <p>
        Build With You is $1,250, billed every 4 weeks — that covers your two
        bi-weekly strategy calls plus always-on text support and your
        documentation hub in between.
      </p>
    ),
  },
  {
    value: "always-on",
    // Plain-text twin of `answer` for the FAQPage JSON-LD — keep in sync.
    text: "Between calls you can text me quick questions and get unstuck fast, within a 12 business-hour SLA, so a small blocker never sits for two weeks waiting for the next session.",
    question: "What does “always-on between sessions” actually mean?",
    answer: (
      <p>
        Between calls you can text me quick questions and get unstuck fast,
        within a 12 business-hour SLA, so a small blocker never sits for two
        weeks waiting for the next session.
      </p>
    ),
  },
];

const included = [
  {
    title: "Always-on between sessions",
    body: "Unlimited quick questions over text, so you're never stuck waiting for the next call.",
    note: "Quick async text so nothing leaves you hanging mid-week.",
  },
  {
    title: "12 business-hour response SLA",
    body: "A guaranteed response window during business hours — you always know when you'll hear back.",
    note: null,
  },
  {
    title: "A documentation hub of every transcript & note",
    body: "A quantified list of takeaways, action items, and decisions after every session.",
    note: "Notion by default, but I'll set it up wherever works for you.",
  },
];

/* The price cards, left to right, each with the service page it links back to. */
const cards: { card: OfferCard; service: ServiceSlug }[] = [
  {
    service: "ai-consulting",
    card: {
      tone: "highlight",
      eyebrow: "Paid entry offer",
      name: "Workflow-First AI Audit",
      price: "$495",
      was: "$750",
      unit: "CAD",
      intro:
        "A professional review of one priority workflow: map, bottlenecks, prioritized opportunities, recommendations, and a written 30-day action plan.",
      bullets: [
        { text: "Repetitive admin processes" },
        { text: "Owner bottlenecks" },
        { text: "Disconnected tools" },
        { text: "Delayed follow-ups" },
        { text: "Manual reporting" },
      ],
      cta: {
        label: "Explore the audit",
        href: "/audit",
        event: "audit_cta_clicked",
        eventProps: { source_page: "ai-starters", cta_location: "packages" },
        style: "filled",
        arrow: true,
      },
    },
  },
  {
    service: "ai-consulting",
    card: {
      tone: "plain",
      eyebrow: "Ongoing",
      name: "Build With You",
      price: "$1,250",
      unit: "/ month",
      intro:
        "Two 45-minute strategy calls a month — one every two weeks. Each call, hands-on:",
      bullets: [
        {
          lead: "You screen-share your real workflows",
          text: "— we watch how the work actually happens.",
        },
        {
          lead: "You take away AI & agent know-how",
          text: "that's relevant to your business.",
        },
        {
          lead: "You automate your repetitive workflow",
          text: "in a way you can replicate without me.",
        },
      ],
      bestFor: "teams that want to stay hands-on and learn as we build.",
      guarantee: {
        lead: "100% money-back guarantee",
        text: "— if you're not satisfied with the results, you get a full refund.",
      },
      notes: ["Billed every 4 weeks — two bi-weekly calls."],
      cta: {
        label: "Get in touch",
        href: "/contact?interest=build-with-you",
        event: "service_inquiry_clicked",
        eventProps: { service_tier: "do_it_with_you" },
        style: "outline",
      },
    },
  },
  {
    service: "ai-automation",
    card: {
      tone: "deep",
      eyebrow: "Project work",
      name: "Build For You",
      price: "$5,500",
      unit: "/ project",
      intro: "Every Build For You project begins with discovery or a completed audit.",
      bullets: [
        {
          lead: "One end-to-end workflow",
          text: ", with up to roughly two core system integrations.",
        },
        {
          lead: "AI & automation architecture",
          text: "— implementation, testing, and exception handling included.",
        },
        {
          lead: "Team handoff & 30-day stabilization",
          text: ", so it keeps running after I step back.",
        },
      ],
      bestFor: "teams that want the build handed over, not shared.",
      notes: ["Larger scopes quoted separately after discovery."],
      cta: {
        label: "Book a call",
        href: "/book",
        event: "service_inquiry_clicked",
        eventProps: { service_tier: "do_it_for_you" },
        style: "filled",
      },
    },
  },
];

/* The small text link on each card back to its service page (PriceCard's
   `serviceLink` slot, which sets its size and spacing). */
function ServiceLink({ slug }: { slug: ServiceSlug }) {
  const target = serviceBySlug(slug);
  return (
    <TrackedLink
      href={servicePath(slug)}
      event="service_link_clicked"
      eventProps={{
        source_page: "ai-starters",
        cta_location: "packages",
        service: slug,
      }}
      className="inline-flex min-h-6 items-center rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {target.name} →
    </TrackedLink>
  );
}

/* Structured data: the service ladder as priced Offers, plus the FAQ. Rung
   names/descriptions come from `rungs`; the audit uses the founding price checkout
   actually charges (AUDIT_PRICE.current). */
const servicesJsonLd = [
  breadcrumbs("/ai-starters", "AI Starters"),
  service({
    name: "Workflow Fit Check",
    description: rungs[0].desc,
    path: "/fit-check",
    price: 0,
  }),
  service({
    name: "Workflow-First AI Audit",
    description: rungs[1].desc,
    path: "/audit",
    price: AUDIT_PRICE.current,
  }),
  service({
    name: "Build With You",
    description: rungs[2].desc,
    path: "/ai-starters",
    price: 1250,
    unitText: "4 weeks",
  }),
  service({
    name: "Build For You",
    description: rungs[3].desc,
    path: "/ai-starters",
    price: 5500,
    unitText: "project",
  }),
  faqPage("/ai-starters", faqs),
];

export default function AiStartersPage() {
  return (
    <>
      <JsonLd graph={servicesJsonLd} />
      {/* P2 — page header */}
      <section className="px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <MonoLabel>AI Starters</MonoLabel>
          <h1 className="mt-6 max-w-[11em] font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground">
            Start with the <Marker>workflow</Marker>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Every business is different, but the starting point is the same.
            Before I recommend or build anything, I learn how your business
            currently operates. Then you choose how much of the work I take on.
          </p>
          <CtaRow
            primary={{
              label: "Take the free fit check",
              arrow: true,
              href: "/fit-check",
              event: "fit_check_cta_clicked",
              eventProps: { source_page: "ai-starters", cta_location: "hero" },
            }}
            secondary={{
              label: "Explore the audit",
              href: "/audit",
              event: "audit_cta_clicked",
              eventProps: { source_page: "ai-starters", cta_location: "hero" },
            }}
          />
        </Reveal>
      </section>

      {/* P13 — the paid tiers, side by side */}
      <Section
        id="packages"
        staggered
        eyebrow="Packages"
        title="Four ways to work together"
        lead="Most people start with the free fit check or the audit, then move into hands-on work once we both know where the real wins are."
      >
        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {cards.map(({ card, service }, i) => (
            <Reveal key={card.name} delay={i * 40} className="h-full">
              <PriceCard {...card} serviceLink={<ServiceLink slug={service} />} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* P8 — the four-rung ladder: the sequence view */}
      <section className="border-t border-border">
        <Reveal className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-28">
          <MonoLabel>Sequence</MonoLabel>
          <h2 className={`${h2} mt-5 max-w-3xl`}>A real sequence, in order</h2>
          <p className="mt-5 max-w-3xl leading-relaxed">
            The further along you go, the more of the work moves to me. You
            decide how far, and you can move along it over time.
          </p>
        </Reveal>
        <div className="border-t border-border">
          {rungs.map((r) => (
            <Reveal key={r.name}>
              <TrackedLink
                href={r.href}
                event={r.event}
                eventProps={r.eventProps}
                className={
                  r.featured
                    ? "band-green group block bg-background transition-colors hover:bg-inkdeep"
                    : "group block border-b border-border bg-background transition-colors hover:bg-card"
                }
              >
                <div className="mx-auto grid max-w-6xl gap-x-10 px-6 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:py-11">
                  <div>
                    <h3 className="font-display text-[clamp(1.55rem,3.4vw,2.5rem)] leading-[1.06] font-extrabold tracking-tight text-foreground">
                      {r.name}
                    </h3>
                    <p className="mt-2 max-w-[46em] leading-relaxed">{r.desc}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 md:mt-1 md:flex-col md:items-end md:justify-start md:gap-y-4">
                    <p className={`${rungMeta} text-foreground`}>{r.meta}</p>
                    <p
                      className={`${rungMeta} ${r.featured ? "text-caption" : "text-primary"}`}
                    >
                      {r.cta}
                      <span className={rungArrow} aria-hidden="true">
                        →
                      </span>
                    </p>
                  </div>
                </div>
              </TrackedLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* P6 — what's included, either way */}
      <Section
        flush
        staggered
        eyebrow="Included"
        title={<>What&apos;s included, either way</>}
        lead={
          <>
            Both build packages, Build With You{" "}
            <span className="text-caption">and</span> Build For You, come
            with all three.
          </>
        }
      >
        <StatementRows rows={included} />
      </Section>

      {/* FAQ — hairline rows (accordion) */}
      <Section
        staggered
        eyebrow="Questions"
        title="A few honest answers"
        lead={
          <>
            Anything else on your mind? Send me a note and I&apos;ll answer
            it straight.
          </>
        }
      >
        <Reveal delay={80}>
          {/* hiddenUntilFound: closed answers stay in the HTML (see FaqList). */}
          <Accordion hiddenUntilFound className="mt-8 max-w-3xl border-y border-border">
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value}>
                <AccordionTrigger className="gap-4 py-5 text-base font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      {/* P12 — closing band */}
      <Band
        eyebrow="Start with the workflow"
        title="Find out where work is getting stuck."
        depth="top-left"
      >
        <p className="mt-5 max-w-2xl text-lg leading-relaxed font-medium text-foreground">
          Then decide what to fix.
        </p>
        <CtaRow
          tone="band"
          className="mt-10"
          primary={{
            label: "Take the free fit check",
            href: "/fit-check",
            event: "fit_check_cta_clicked",
            eventProps: {
              source_page: "ai-starters",
              cta_location: "bottom_cta",
            },
          }}
          secondary={{
            label: "Explore the AI audit",
            href: "/audit",
            event: "audit_cta_clicked",
            eventProps: {
              source_page: "ai-starters",
              cta_location: "bottom_cta",
            },
          }}
        />
      </Band>
    </>
  );
}
