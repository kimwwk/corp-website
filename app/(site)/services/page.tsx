import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Marker } from "@/components/marker";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";

/*
 * Services — Kim's copy on the Green Ledger foundation: P2 header, P13 price
 * slots (the paid tiers: audit | Build With You | Build For You, layout
 * restored from PR #11), then the P8 four-rung ladder as the sequence view.
 */
export const metadata: Metadata = {
  title: "Services — Kivov Digital",
  description:
    "Start with the workflow. A free Workflow Fit Check, a CAD $750 Workflow-First AI Audit, then Build With You at $1,250/mo or Build For You at $5,500 per project.",
  openGraph: {
    title: "Services — Kivov Digital",
    description:
      "Start with the workflow. A free Workflow Fit Check, a CAD $750 Workflow-First AI Audit, then Build With You or Build For You. Practical AI and automation for small & mid-sized businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const eyebrow =
  "font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase";
const h2 =
  "font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground";
const linkGreen =
  "inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary";
const linkLeaf =
  "inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-brand-mint decoration-2 underline-offset-[7px] transition-colors hover:text-caption";
const priceUnit =
  "font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase";
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
    eventProps: { source_page: "services", cta_location: "ladder" },
  },
  {
    featured: false,
    name: "Workflow-First AI Audit",
    desc: "A professional review of one priority workflow: map, bottlenecks, prioritized opportunities, recommendations, and a written 30-day action plan.",
    meta: "Founding $495",
    cta: "Explore the audit",
    href: "/audit",
    event: "audit_cta_clicked",
    eventProps: { source_page: "services", cta_location: "ladder" },
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

function Bullet({ tone = "green" }: { tone?: "green" | "leaf" }) {
  return (
    <span
      className={`mt-[0.55em] size-[7px] shrink-0 rounded-[2px] ${tone === "leaf" ? "bg-brand-mint" : "bg-primary"}`}
      aria-hidden="true"
    />
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* P2 — page header */}
      <section className="px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <p className={eyebrow}>Services</p>
          <h1 className="mt-6 max-w-[11em] font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground">
            Start with the <Marker>workflow</Marker>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Every business is different, but the starting point is the same.
            Before I recommend or build anything, I learn how your business
            currently operates. Then you choose how much of the work I take on.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              size="xl"
              className="rounded-full"
              render={
                <TrackedLink
                  href="/fit-check"
                  event="fit_check_cta_clicked"
                  eventProps={{ source_page: "services", cta_location: "hero" }}
                />
              }
            >
              Take the free fit check
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
            <TrackedLink
              href="/audit"
              event="audit_cta_clicked"
              eventProps={{ source_page: "services", cta_location: "hero" }}
              className={linkGreen}
            >
              Explore the audit
            </TrackedLink>
          </div>
        </Reveal>
      </section>

      {/* P13 — the paid tiers, side by side */}
      <section
        id="packages"
        className="scroll-mt-16 border-t border-border px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className={eyebrow}>Packages</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>
              Four ways to work together
            </h2>
            <p className="mt-5 max-w-3xl leading-relaxed">
              Most people start with the free fit check or the audit, then move
              into hands-on work once we both know where the real wins are.
            </p>
          </Reveal>

          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
            {/* 1. Workflow-First AI Audit — the highlighted paid entry */}
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-card p-7 ring-2 ring-primary/40">
                <p className={eyebrow}>Paid entry offer</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
                  Workflow-First AI Audit
                </h3>
                <p className="mt-4 flex items-baseline gap-2.5">
                  <span className="font-display text-4xl font-black text-foreground tabular-nums">
                    $495
                  </span>
                  <span className="font-display text-xl font-bold text-caption tabular-nums line-through decoration-[1.5px]">
                    $750
                  </span>
                  <span className={priceUnit}>CAD</span>
                </p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">
                  A professional review of one priority workflow: map,
                  bottlenecks, prioritized opportunities, recommendations, and
                  a written 30-day action plan.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Repetitive admin processes",
                    "Owner bottlenecks",
                    "Disconnected tools",
                    "Delayed follow-ups",
                    "Manual reporting",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Bullet />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Button
                    size="xl"
                    className="w-full rounded-full"
                    render={
                      <TrackedLink
                        href="/audit"
                        event="audit_cta_clicked"
                        eventProps={{
                          source_page: "services",
                          cta_location: "packages",
                        }}
                      />
                    }
                  >
                    Explore the audit
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* 2. Build With You */}
            <Reveal delay={60} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-card p-7 ring-1 ring-border">
                <p className="font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                  Ongoing
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
                  Build With You
                </h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-black text-foreground tabular-nums">
                    $1,250
                  </span>
                  <span className={priceUnit}>/ month</span>
                </p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">
                  Two 45-minute strategy calls a month — one every two weeks.
                  Each call, hands-on:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex gap-3 text-sm">
                    <Bullet />
                    <span>
                      <span className="font-medium text-foreground">
                        You screen-share your real workflows
                      </span>{" "}
                      — we watch how the work actually happens.
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <Bullet />
                    <span>
                      <span className="font-medium text-foreground">
                        You take away AI &amp; agent know-how
                      </span>{" "}
                      that&apos;s relevant to your business.
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <Bullet />
                    <span>
                      <span className="font-medium text-foreground">
                        You automate your repetitive workflow
                      </span>{" "}
                      in a way you can replicate without me.
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-sm leading-relaxed">
                  <span className="font-medium text-foreground">Best for:</span>{" "}
                  teams that want to stay hands-on and learn as we build.
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  <span className="font-medium text-foreground">
                    100% money-back guarantee
                  </span>{" "}
                  — if you&apos;re not satisfied with the results, you get a
                  full refund.
                </p>
                <p className="mt-3 text-xs text-caption">
                  Billed every 4 weeks — two bi-weekly calls.
                </p>
                <div className="mt-auto pt-6">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full rounded-full"
                    render={
                      <TrackedLink
                        href="/contact?interest=build-with-you"
                        event="service_inquiry_clicked"
                        eventProps={{ service_tier: "do_it_with_you" }}
                      />
                    }
                  >
                    Get in touch
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* 3. Build For You — the deep-green slot */}
            <Reveal delay={120} className="h-full">
              <div className="band-green flex h-full flex-col rounded-2xl bg-background p-7">
                <p className="font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                  Project work
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
                  Build For You
                </h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-black text-foreground tabular-nums">
                    $5,500
                  </span>
                  <span className={priceUnit}>/ project</span>
                </p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">
                  Every Build For You project begins with discovery or a
                  completed audit.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex gap-3 text-sm">
                    <Bullet tone="leaf" />
                    <span>
                      <span className="font-medium text-foreground">
                        One end-to-end workflow
                      </span>
                      , with up to roughly two core system integrations.
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <Bullet tone="leaf" />
                    <span>
                      <span className="font-medium text-foreground">
                        AI &amp; automation architecture
                      </span>{" "}
                      — implementation, testing, and exception handling
                      included.
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <Bullet tone="leaf" />
                    <span>
                      <span className="font-medium text-foreground">
                        Team handoff &amp; 30-day stabilization
                      </span>
                      , so it keeps running after I step back.
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-sm leading-relaxed">
                  <span className="font-medium text-foreground">Best for:</span>{" "}
                  teams that want the build handed over, not shared.
                </p>
                <p className="mt-3 text-xs text-caption">
                  Larger scopes quoted separately after discovery.
                </p>
                <div className="mt-auto pt-6">
                  <Button
                    size="xl"
                    className="w-full rounded-full hover:text-inkdeep"
                    render={
                      <TrackedLink
                        href="/book"
                        event="service_inquiry_clicked"
                        eventProps={{ service_tier: "do_it_for_you" }}
                      />
                    }
                  >
                    Book a call
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* P8 — the four-rung ladder: the sequence view */}
      <section className="border-t border-border">
        <Reveal className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-28">
          <p className={eyebrow}>Sequence</p>
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
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className={eyebrow}>Included</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>
              What&apos;s included, either way
            </h2>
            <p className="mt-5 max-w-3xl leading-relaxed">
              Both build packages, Build With You{" "}
              <span className="text-caption">and</span> Build For You, come
              with all three.
            </p>
          </Reveal>
          <div className="mt-8 border-b border-border">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 40}>
                <div className="grid gap-3 border-t border-border py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    {item.title}
                  </h3>
                  <div>
                    <p className="max-w-[52ch] leading-relaxed">{item.body}</p>
                    {item.note ? (
                      <p className="mt-2 max-w-[52ch] text-sm text-caption">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — hairline rows (accordion) */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className={eyebrow}>Questions</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>A few honest answers</h2>
            <p className="mt-5 max-w-3xl leading-relaxed">
              Anything else on your mind? Send me a note and I&apos;ll answer
              it straight.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Accordion className="mt-8 max-w-3xl border-y border-border">
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* P12 — closing band */}
      <section className="band-green relative overflow-hidden bg-background px-6 py-20 md:py-28">
        <div className="band-depth top-[-58%] left-[-12%]" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
            Start with the workflow
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.05] font-black tracking-tight text-balance text-foreground">
            Find out where work is getting stuck.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed font-medium text-foreground">
            Then decide what to fix.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              size="xl"
              className="rounded-full hover:text-inkdeep"
              render={
                <TrackedLink
                  href="/fit-check"
                  event="fit_check_cta_clicked"
                  eventProps={{
                    source_page: "services",
                    cta_location: "bottom_cta",
                  }}
                />
              }
            >
              Take the free fit check
            </Button>
            <TrackedLink
              href="/audit"
              event="audit_cta_clicked"
              eventProps={{
                source_page: "services",
                cta_location: "bottom_cta",
              }}
              className={linkLeaf}
            >
              Explore the AI audit
            </TrackedLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
