import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";
import { HandoffMeter } from "@/components/handoff-meter";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";

export const metadata: Metadata = {
  title: "Services — Kivov Digital",
  description:
    "Start with the workflow. A free Workflow Fit Check, a CAD $750 Workflow-First AI Audit, then Build With You at $1,000/mo or Build For You priced per project.",
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

const badgeEyebrow = "font-mono text-[0.65rem] tracking-[0.15em] uppercase";
const meterLabels =
  "mb-2 flex justify-between font-mono text-[0.6rem] tracking-[0.2em] uppercase";

/* The four stops on the journey rail, in order of how much I take on. */
const journey = [
  { label: "Fit check", price: "Free", align: "text-left" },
  { label: "Audit", price: "CAD $750", align: "text-center" },
  { label: "With you", price: "$1,000/mo", align: "text-center" },
  { label: "For you", price: "Per project", align: "text-right" },
];

const included = [
  {
    icon: MessageCircle,
    title: "Always-on between sessions",
    body: "Unlimited quick questions over text, so you're never stuck waiting for the next call.",
    note: "Quick async text so nothing leaves you hanging mid-week.",
  },
  {
    icon: Clock,
    title: "12 business-hour response SLA",
    body: "A guaranteed response window during business hours — you always know when you'll hear back.",
    note: null,
  },
  {
    icon: FileText,
    title: "A documentation hub of every transcript & note",
    body: "A quantified list of takeaways, action items, and decisions after every session.",
    note: "Notion by default, but I'll set it up wherever works for you.",
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
        the build to me, scoped per project. Every Build For You project starts
        with discovery or a completed audit.
      </p>
    ),
  },
  {
    value: "billing",
    question: "How does billing work on the monthly package?",
    answer: (
      <p>
        Build With You is $1,000, billed every 4 weeks — that covers your two
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

export default function ServicesPage() {
  return (
    <div>
      {/* ── Hero: thesis + journey rail with live pricing ─────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="rise lg:col-span-6">
            <Eyebrow className="mb-6 text-xs">Services</Eyebrow>
            <h1 className="font-display text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.02]">
              Start with the{" "}
              <em className="font-normal text-primary">workflow.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              Every business is different, but the starting point is the same.
              Before I recommend or build anything, I learn how your business
              currently operates. Then you choose how much of the work I take
              on.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="xl"
                render={
                  <TrackedLink
                    href="/fit-check"
                    event="fit_check_cta_clicked"
                    eventProps={{
                      source_page: "services",
                      cta_location: "hero",
                    }}
                  />
                }
              >
                Take the free fit check
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                render={
                  <TrackedLink
                    href="/audit"
                    event="audit_cta_clicked"
                    eventProps={{
                      source_page: "services",
                      cta_location: "hero",
                    }}
                  />
                }
                className="text-muted-foreground hover:text-foreground"
              >
                Explore the audit
              </Button>
            </div>
          </div>

          {/* Journey rail: the hand-off thesis doubles as a pricing preview */}
          <div className="rise [--rise-delay:150ms] lg:col-span-6">
            <Card className="ring-border shadow-[0_1px_0_rgba(16,20,26,.02),0_16px_40px_-24px_rgba(16,20,26,.22)] [--card-spacing:--spacing(7)]">
              <CardContent>
                <div className="mb-6 flex items-center justify-between">
                  <span className={`${badgeEyebrow} text-[0.7rem] text-caption`}>
                    Who holds the work
                  </span>
                  <span className={`${badgeEyebrow} text-[0.7rem] text-primary`}>
                    You&nbsp;→&nbsp;Me
                  </span>
                </div>

                <HandoffMeter toUs={90} stops={[6, 34, 62, 90]} animateOnLoad />

                <div className="mt-5 -mx-2 grid grid-cols-4 gap-1">
                  {journey.map((stop, i) => (
                    <a
                      key={stop.label}
                      href="#packages"
                      className={`rounded-lg p-2 transition-colors duration-200 hover:bg-muted ${stop.align}`}
                    >
                      <p
                        className={`font-mono text-[0.6rem] tracking-[0.12em] uppercase ${
                          i === 0 ? "text-primary" : "text-caption"
                        }`}
                      >
                        {stop.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground tabular-nums">
                        {stop.price}
                      </p>
                    </a>
                  ))}
                </div>

                <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">
                  The further along you go, the more of the work moves to me.
                  You decide how far, and you can move along it over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────────────── */}
      <section id="packages" className="scroll-mt-20 border-t border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Packages"
              title="Four ways to work together"
              lead="Most people start with the free fit check or the audit, then move into hands-on work once we both know where the real wins are."
            />
          </Reveal>

          {/* Row one: the two ways in */}
          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
            {/* 1. Workflow Fit Check (free) — the self-serve entry point */}
            <Reveal className="h-full">
              <Card className="relative h-full ring-2 ring-primary/40 [--card-spacing:--spacing(7)]">
                <CardContent className="flex h-full flex-col">
                  <div className="flex min-h-[8rem] flex-col items-start">
                    <Badge className={badgeEyebrow}>Start here</Badge>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                      Workflow Fit Check
                    </h3>
                    <div className="mt-auto flex items-baseline gap-2 pt-3">
                      <span className="font-display text-4xl font-semibold text-primary">
                        Free
                      </span>
                      <span className="text-sm text-caption">
                        Three minutes
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">
                    A three-minute questionnaire that identifies the type of
                    workflow issue you may be facing, and one practical place
                    to begin.
                  </p>

                  <p className="mt-5 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-caption">
                    Best for
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Early exploration",
                      "Owners who aren't sure where to start",
                      "Teams that need an initial direction",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-sm">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="mb-5">
                      <div className={`${meterLabels} text-caption`}>
                        <span>You</span>
                        <span>Me</span>
                      </div>
                      <HandoffMeter toUs={8} />
                    </div>
                    <Button
                      size="xl"
                      className="w-full"
                      render={
                        <TrackedLink
                          href="/fit-check"
                          event="fit_check_cta_clicked"
                          eventProps={{
                            source_page: "services",
                            cta_location: "packages",
                          }}
                        />
                      }
                    >
                      Take the free check
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* 2. Workflow-First AI Audit — the paid entry offer */}
            <Reveal delay={60} className="h-full">
              <Card className="h-full ring-border [--card-spacing:--spacing(7)]">
                <CardContent className="flex h-full flex-col">
                  <div className="flex min-h-[8rem] flex-col items-start">
                    <Badge variant="secondary" className={badgeEyebrow}>
                      Entry offer
                    </Badge>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                      Workflow-First AI Audit
                    </h3>
                    <div className="mt-auto flex items-baseline gap-2 pt-3">
                      <span className="font-display text-4xl font-semibold text-foreground tabular-nums">
                        CAD $750
                      </span>
                      <span className="text-sm text-caption">
                        Founding clients $495
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">
                    A professional review of one priority workflow: map,
                    bottlenecks, prioritized opportunities, recommendations, and
                    a written 30-day action plan.
                  </p>

                  <p className="mt-5 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-caption">
                    Best for
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Repetitive admin processes",
                      "Owner bottlenecks",
                      "Disconnected tools",
                      "Delayed follow-ups",
                      "Manual reporting",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-sm">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="mb-5">
                      <div className={`${meterLabels} text-caption`}>
                        <span>You</span>
                        <span>Me</span>
                      </div>
                      <HandoffMeter toUs={34} />
                    </div>
                    <Button
                      variant="outline"
                      size="xl"
                      className="w-full"
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
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Row two: the two build packages */}
          <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-2">
            {/* 3. Build With You */}
            <Reveal className="h-full">
              <Card className="h-full ring-border [--card-spacing:--spacing(7)]">
                <CardContent className="flex h-full flex-col">
                  <div className="flex min-h-[8rem] flex-col items-start">
                    <Badge variant="secondary" className={badgeEyebrow}>
                      Ongoing
                    </Badge>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                      Build With You
                    </h3>
                    <div className="mt-auto flex items-baseline gap-2 pt-3">
                      <span className="font-display text-4xl font-semibold text-foreground tabular-nums">
                        $1,000
                      </span>
                      <span className="text-sm text-caption">/ month</span>
                    </div>
                  </div>

                  <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">
                    Two 45-minute strategy calls a month — one every two
                    weeks. Each call, hands-on:
                  </p>
                  <ol className="mt-3 space-y-2.5">
                    <li className="flex gap-3 text-sm">
                      <span className="shrink-0 pt-0.5 font-mono text-xs text-primary">
                        01
                      </span>
                      <span>
                        <span className="font-medium text-foreground">
                          You screen-share your real workflows
                        </span>{" "}
                        — we watch how the work actually happens.
                      </span>
                    </li>
                    <li className="flex gap-3 text-sm">
                      <span className="shrink-0 pt-0.5 font-mono text-xs text-primary">
                        02
                      </span>
                      <span>
                        <span className="font-medium text-foreground">
                          We build custom Claude skills
                        </span>{" "}
                        around those workflows.
                      </span>
                    </li>
                    <li className="flex gap-3 text-sm">
                      <span className="shrink-0 pt-0.5 font-mono text-xs text-primary">
                        03
                      </span>
                      <span>
                        <span className="font-medium text-foreground">
                          We automate the repetitive parts
                        </span>{" "}
                        of your workflow.
                      </span>
                    </li>
                  </ol>

                  <p className="mt-5 text-sm text-caption">
                    <span className="font-medium text-foreground">
                      Best for:
                    </span>{" "}
                    teams with internal capacity that want to learn while
                    building.
                  </p>

                  <div className="mt-4 flex gap-3 rounded-xl bg-secondary p-3.5">
                    <ShieldCheck
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <p className="text-xs leading-relaxed text-secondary-foreground">
                      <span className="font-semibold">
                        100% money-back guarantee
                      </span>{" "}
                      — if you&apos;re not satisfied with the results, you get
                      a full refund.
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-caption">
                    Billed every 4 weeks — two bi-weekly calls.
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="mb-5">
                      <div className={`${meterLabels} text-caption`}>
                        <span>You</span>
                        <span>Me</span>
                      </div>
                      <HandoffMeter toUs={62} />
                    </div>
                    <Button
                      variant="outline"
                      size="xl"
                      className="w-full"
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
                </CardContent>
              </Card>
            </Reveal>

            {/* 4. Build For You — dark scope re-themes shadcn tokens */}
            <Reveal delay={60} className="h-full">
              <Card className="dark h-full bg-inkdeep text-sm ring-inkdeep [--card-spacing:--spacing(7)]">
                <CardContent className="flex h-full flex-col">
                  <div className="flex min-h-[8rem] flex-col items-start">
                    <Badge
                      variant="outline"
                      className={`${badgeEyebrow} border-brand-mint/40 text-brand-mint`}
                    >
                      Project work
                    </Badge>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                      Build For You
                    </h3>
                    <div className="mt-auto flex items-baseline gap-2 pt-3">
                      <span className="font-display text-4xl font-semibold text-foreground">
                        Per project
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                    Every Build For You project begins with discovery or a
                    completed audit. Two tracks come out of it:
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    <li className="flex gap-3 text-sm text-white/80">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-mint"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="font-medium text-foreground">
                          AI &amp; automation
                        </span>
                        , built around the workflow we mapped together.
                      </span>
                    </li>
                    <li className="flex gap-3 text-sm text-white/80">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-mint"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="font-medium text-foreground">
                          Custom software development
                        </span>
                        , when off-the-shelf won&apos;t fit.
                      </span>
                    </li>
                  </ul>

                  <p className="mt-5 text-sm text-caption">
                    <span className="font-medium text-foreground">
                      Best for:
                    </span>{" "}
                    teams that want the build handed over, not shared.
                  </p>

                  <p className="mt-3 text-xs text-caption">
                    Scoped and priced per project after discovery.
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="mb-5">
                      <div className={`${meterLabels} text-caption`}>
                        <span>You</span>
                        <span>Me</span>
                      </div>
                      <HandoffMeter toUs={90} onDark />
                    </div>
                    <Button
                      variant="outline"
                      size="xl"
                      className="w-full border-white/25 bg-transparent text-white hover:border-white/50 hover:bg-transparent hover:text-white"
                      render={
                        <TrackedLink
                          href="/contact?interest=build-for-you"
                          event="service_inquiry_clicked"
                          eventProps={{ service_tier: "do_it_for_you" }}
                        />
                      }
                    >
                      Get in touch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Shared benefits, attached to the two build packages */}
          <Reveal className="mt-14">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  What&apos;s included, either way
                </h3>
                <p className="mt-2">
                  Both build packages, Build With You{" "}
                  <span className="text-caption">and</span> Build For You, come
                  with all three.
                </p>
              </div>
              <Badge
                variant="secondary"
                className={`${badgeEyebrow} h-auto self-start px-3 py-1.5 md:self-auto`}
              >
                Both build packages
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {included.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <Card className="h-full ring-border transition-all duration-200 [--card-spacing:--spacing(6)] hover:-translate-y-0.5 hover:shadow-lg">
                    <CardContent>
                      <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-secondary">
                        <item.icon
                          className="size-5 text-primary"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="mb-1.5 font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                      {item.note ? (
                        <p className="mt-2 text-xs text-caption">{item.note}</p>
                      ) : null}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ: editorial split layout ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                index="02"
                eyebrow="Questions"
                title="A few honest answers"
              />
              <p className="mt-4 text-sm leading-relaxed">
                Anything else on your mind? Send me a note and I&apos;ll answer
                it straight.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <Accordion className="border-y border-border">
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────── */}
      <section className="px-6 pb-16 md:pb-24">
        <Reveal>
          <div className="dark relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-inkdeep px-8 py-14 text-center md:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(110,231,183,0.10),transparent)]"
            />
            <div className="relative">
              <Eyebrow className="mb-5 text-xs text-brand-mint">
                Start with the workflow
              </Eyebrow>
              <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-5xl">
                Find out where work is getting stuck.
                <br />
                <span className="font-normal italic text-white/70">
                  Then decide what to fix.
                </span>
              </h2>
              <Button
                size="xl"
                className="mt-8"
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
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <p className="mt-6 text-sm">
                <TrackedLink
                  href="/audit"
                  event="audit_cta_clicked"
                  eventProps={{
                    source_page: "services",
                    cta_location: "bottom_cta",
                  }}
                  className="rounded-sm font-medium text-brand-mint underline-offset-4 transition-colors hover:underline"
                >
                  Explore the AI audit →
                </TrackedLink>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
