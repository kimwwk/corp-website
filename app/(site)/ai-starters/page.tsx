import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AUDIT_PRICE } from "@/lib/payments";
import { breadcrumbs, faqPage, pageMetadata, service } from "@/lib/seo";

import { Marker } from "@/components/marker";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CtaRow,
  FaqList,
  MonoLabel,
  PriceLadder,
  Section,
  StatementRows,
} from "@/components/sections";
import { TrackedLink } from "@/components/tracked-link";
import { servicePath } from "@/content/services";
import type { OfferCard, ServiceSlug } from "@/content/types";

/*
 * AI Starters (the price cards that lived on /services until 2026-11-20) —
 * Kim's copy on the Green Ledger foundation: P2 header, P13 price slots
 * (Fit Check | audit | Build With You, as a PriceLadder), then the P8 three-rung
 * ladder as the sequence view. One line under the cards links AI Consulting
 * (the service all three belong to) and the AI Automation page, where Build
 * For You lives.
 */
export const metadata: Metadata = pageMetadata({
  title: "AI Starters — Kivov Digital",
  description:
    "Start with the workflow: a free Workflow Fit Check, the Workflow-First AI Audit at a founding price of CAD $495, or Build With You at $1,250 a month.",
  path: "/ai-starters",
  socialDescription:
    "Start with the workflow: a free Workflow Fit Check, the Workflow-First AI Audit, or Build With You. Practical AI and automation for small & mid-sized businesses.",
});

const h2 =
  "font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground";
const rungMeta =
  "font-mono text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap";
const rungArrow =
  "ml-2 inline-block -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100";

/* The three rungs, in order of how much of the work I take on. */
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
];

/* Plain-text answers: FaqList renders them and the FAQPage JSON-LD reads them. */
const faqs = [
  {
    question: "What does the free fit check include?",
    answer:
      "A high-level result: the type of workflow issue you likely have and one practical recommendation. It doesn't include a call, custom research, or a written report. That's what the audit is for.",
  },
  {
    question: "Why is the audit paid?",
    answer:
      "Because it's real consulting work: a mapping session, analysis, a written report, and a walkthrough. Charging for it means you get my full attention on one workflow, and a deliverable you keep whether or not we work together afterwards. And if you hire Kivov for implementation within 30 days, CAD $500 of the standard fee is credited toward the project.",
  },
  {
    question: "What do we actually build in Build With You?",
    answer:
      "Whatever the workflow needs. On our calls we build custom Claude skills around the workflows you screen-share, automate the repetitive parts, and bring in off-the-shelf tools when one already solves the problem. There's no fixed menu — if your workflow calls for something else, that's what we build.",
  },
  {
    question: "How does billing work on the monthly package?",
    answer:
      "Build With You is $1,250, billed every 4 weeks — that covers your two bi-weekly strategy calls plus always-on text support and your documentation hub in between.",
  },
  {
    question: "What does “always-on between sessions” actually mean?",
    answer:
      "Between calls you can text me quick questions and get unstuck fast, within a 12 business-hour SLA, so a small blocker never sits for two weeks waiting for the next session.",
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

/* The price cards, left to right: quiet → featured → deep, the ladder
   stepping up (PriceLadder). */
const cards: OfferCard[] = [
  {
    tone: "quiet",
    eyebrow: "Free · 3 min",
    name: "Workflow Fit Check",
    price: "$0",
    intro:
      "A three-minute questionnaire that identifies the type of workflow issue you may be facing, and one practical place to begin.",
    bullets: [
      { text: "Eight questions, no technical knowledge required" },
      { text: "The type of workflow issue you likely have" },
      { text: "One practical place to begin" },
    ],
    cta: {
      label: "Take the free check",
      href: "/fit-check",
      event: "fit_check_cta_clicked",
      eventProps: { source_page: "ai-starters", cta_location: "packages" },
      style: "outline",
    },
  },
  {
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
  {
    tone: "deep",
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
];

/* A service-page link in the line under the cards (inline prose links,
   linkInline). */
function ServiceLink({
  slug,
  children,
}: {
  slug: ServiceSlug;
  children: React.ReactNode;
}) {
  return (
    <TrackedLink
      href={servicePath(slug)}
      event="service_link_clicked"
      eventProps={{
        source_page: "ai-starters",
        cta_location: "packages",
        service: slug,
      }}
      className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
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
  faqPage(
    "/ai-starters",
    faqs.map((f) => ({ question: f.question, text: f.answer })),
  ),
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
        title="Three ways to start"
        lead="Most people start with the free fit check or the audit, then move into hands-on work once we both know where the real wins are."
      >
        <PriceLadder cards={cards} />
        <Reveal>
          <p className="mt-8 text-sm">
            These three are part of{" "}
            <ServiceLink slug="ai-consulting">AI Consulting</ServiceLink>. Want
            the whole workflow built for you?{" "}
            <ServiceLink slug="ai-automation">
              Build For You is on the AI Automation page →
            </ServiceLink>
          </p>
        </Reveal>
      </Section>

      {/* P8 — the three-rung ladder: the sequence view */}
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

      {/* P6 — what's included with Build With You */}
      <Section
        flush
        staggered
        eyebrow="Included"
        title="What’s included with Build With You"
        lead="Build With You comes with all three."
      >
        <StatementRows rows={included} />
      </Section>

      {/* FAQ — hairline rows (accordion) */}
      <Section
        staggered
        layout="split"
        eyebrow="Questions"
        title="A few honest answers"
        lead={
          <>
            Anything else on your mind? Send me a note and I&apos;ll answer
            it straight.
          </>
        }
      >
        <FaqList split faqs={faqs} />
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
