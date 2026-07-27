import Image from "next/image";
import {
  ArrowRight,
  Check,
  ClipboardList,
  FileSearch,
  Waypoints,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";

const badgeEyebrow = "font-mono text-[0.65rem] tracking-[0.15em] uppercase";

/* Slim credibility strip directly under the hero. */
const credibility = [
  "Founded by Kim Wong",
  "Former Deloitte & EY consultant",
  "Six years in software, systems & AI",
  "Enterprise experience, small-business focus",
];

/* The symptoms an owner recognises before they can name the cause. */
const frictionSigns = [
  "Leads aren't followed up consistently",
  "Quotes and proposals take too long",
  "The same information gets copied between tools",
  "Reports are rebuilt by hand every week",
  "Customers keep asking the same questions",
  "Important steps live in one person's head",
  "The owner has to approve or explain everything",
  "Subscriptions keep growing, but the work isn't getting easier",
];

const understand = [
  "What starts the work",
  "Who touches it",
  "Where information moves",
  "What gets delayed",
  "Which decisions need a person",
  "What repeats often enough to automate",
  "What should stay human",
];

const decide = [
  "Keep what you already have",
  "Configure it differently",
  "Connect existing systems",
  "Replace a poor-fit tool",
  "Add AI or automation",
  "Build something custom",
];

const steps = [
  {
    number: "01",
    icon: FileSearch,
    title: "Understand the work",
    description:
      "I review how the process runs today, including the steps nobody wrote down.",
  },
  {
    number: "02",
    icon: Waypoints,
    title: "Find the friction",
    description:
      "Repeated work, delays, missing information, unclear ownership, unnecessary handoffs.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Choose what fits",
    description:
      "The smallest practical fix. That may be a tool you already own, an integration, an AI agent, or custom software.",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Build and improve",
    description:
      "I build with your team or for them, with documentation and clear ownership throughout.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero: headline left, portrait right ───────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="rise lg:col-span-7">
            <Eyebrow className="mb-6 text-xs">
              Workflow-first AI · Toronto
            </Eyebrow>

            <h1 className="font-display text-[2.75rem] leading-[1.06] font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.03]">
              AI should{" "}
              <em className="font-normal text-primary">fit your business</em>,
              not force your business to fit the tool.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              I help small and mid-sized teams fix repetitive, disconnected
              workflows with practical AI, automation, integrations, and custom
              software. I start by understanding how the work actually happens,
              find where time and information get lost, and recommend or build
              the simplest system that solves the problem.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="xl"
                render={
                  <TrackedLink
                    href="/fit-check"
                    event="fit_check_cta_clicked"
                    eventProps={{ source_page: "home", cta_location: "hero" }}
                  />
                }
              >
                Find where work is getting stuck
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                render={
                  <TrackedLink
                    href="/audit"
                    event="audit_cta_clicked"
                    eventProps={{ source_page: "home", cta_location: "hero" }}
                  />
                }
                className="text-muted-foreground hover:text-foreground"
              >
                Explore the AI audit
              </Button>
            </div>

            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.15em] uppercase text-caption">
              <span>Three-minute check</span>
              <span aria-hidden="true" className="text-primary">
                ·
              </span>
              <span>No technical knowledge required</span>
              <span aria-hidden="true" className="text-primary">
                ·
              </span>
              <span>No call needed</span>
            </p>
          </div>

          <div className="rise [--rise-delay:140ms] lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 h-full w-full rounded-2xl bg-brand-soft"
              />
              <Image
                src="/kim-headshot.jpg"
                alt="Kim Wong, founder of Kivov Digital"
                width={614}
                height={1024}
                priority
                className="relative aspect-[4/5] w-full rounded-2xl object-cover object-[center_15%] ring-1 ring-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Credibility strip ─────────────────────────────────────── */}
      <section
        aria-label="Background"
        className="border-y border-border bg-card/60"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 py-5 text-center font-mono text-[0.7rem] tracking-[0.15em] uppercase text-caption">
          {credibility.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 ? (
                <span aria-hidden="true" className="text-primary">
                  ·
                </span>
              ) : null}
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Where the time goes ───────────────────────────────────── */}
      <section
        aria-label="Where the time goes"
        className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      >
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="Where the time goes"
              title="Your team is working hard. The workflow may be working against them."
            />
            <p className="mt-5 max-w-xl leading-relaxed">
              You may not need another platform. You may need to find out why:
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <Card className="ring-border [--card-spacing:--spacing(7)]">
              <CardContent>
                <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-caption">
                  Sound familiar?
                </p>
                <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {frictionSigns.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <p className="mt-10 max-w-2xl leading-relaxed">
            When work is unclear, disconnected, or dependent on one person,
            adding AI makes the problem move faster without solving it. I start
            with the workflow.
          </p>
        </Reveal>
      </section>

      {/* ── How I work: understand, then decide ───────────────────── */}
      <section
        aria-label="How I work"
        className="border-y border-border bg-card/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="How I work"
              title="I don't begin by selling you a tool."
            />
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                First I understand:
              </h3>
              <ul className="mt-5 divide-y divide-border border-t border-border">
                {understand.map((item) => (
                  <li key={item} className="py-3 text-sm text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                Then we decide whether to:
              </h3>
              <ul className="mt-5 divide-y divide-border border-t border-border">
                {decide.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-3 text-sm text-foreground"
                  >
                    <Check
                      className="size-4 shrink-0 text-primary"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The process: numbered editorial columns ────────────────── */}
      <section
        aria-label="The process"
        className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      >
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="The process"
            title="Understand, then fix. In that order."
          />
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 50}>
              <div className="group border-t-2 border-border pt-5 transition-colors duration-200 hover:border-primary">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-sm font-medium text-primary"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <step.icon
                    className="size-5 text-caption transition-colors duration-200 group-hover:text-primary"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Where to start: free check vs paid audit ──────────────── */}
      <section
        aria-label="Where to start"
        className="border-y border-border bg-card/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Where to start"
              title="Two ways in."
              lead="One takes three minutes and costs nothing. The other is real consulting work on one priority workflow."
            />
          </Reveal>

          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <Card className="h-full ring-2 ring-primary/40 [--card-spacing:--spacing(7)]">
                <CardContent className="flex h-full flex-col">
                  <Badge className={`${badgeEyebrow} self-start`}>Free</Badge>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                    Workflow Fit Check
                  </h3>
                  <p className="mt-5 border-t border-border pt-5 leading-relaxed">
                    Not sure where AI would help? In about three minutes, the
                    free check shows the type of workflow issue that may be
                    costing your team time, and one practical place to begin.
                  </p>
                  <div className="mt-auto pt-8">
                    <Button
                      size="xl"
                      className="w-full"
                      render={
                        <TrackedLink
                          href="/fit-check"
                          event="fit_check_cta_clicked"
                          eventProps={{
                            source_page: "home",
                            cta_location: "offers",
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

            <Reveal delay={80} className="h-full">
              <Card className="dark h-full bg-inkdeep ring-inkdeep [--card-spacing:--spacing(7)]">
                <CardContent className="flex h-full flex-col">
                  <Badge
                    variant="outline"
                    className={`${badgeEyebrow} self-start border-brand-mint/40 text-brand-mint`}
                  >
                    CAD $750 · Founding clients $495
                  </Badge>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                    Workflow-First AI Audit
                  </h3>
                  <p className="mt-5 border-t border-border pt-5 leading-relaxed text-muted-foreground">
                    Know something is off, but not sure what to fix? A
                    professional review of one priority workflow: a
                    current-state map, the bottlenecks, prioritized automation
                    opportunities, recommendations, and a written 30-day action
                    plan.
                  </p>
                  <div className="mt-auto pt-8">
                    <Button
                      size="xl"
                      className="w-full"
                      render={
                        <TrackedLink
                          href="/audit"
                          event="audit_cta_clicked"
                          eventProps={{
                            source_page: "home",
                            cta_location: "offers",
                          }}
                        />
                      }
                    >
                      Explore the audit
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Founder: slim statement strip (portrait lives in hero) ── */}
      <section
        aria-label="Who you'll be talking to"
        className="mx-auto max-w-6xl px-6 py-14 md:py-16"
      >
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Who you'll be talking to"
            title="There's one person behind this. Me."
          />
          <p className="mt-5 max-w-2xl leading-relaxed">
            Kim Wong. Six years in corporate IT consulting at Deloitte and EY.
          </p>
          <p className="mt-3 font-display text-xl text-foreground italic">
            Understand the work first. Use what fits. Build only what&apos;s
            missing.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <TrackedLink
              href="/about"
              event="founder_block_clicked"
              eventProps={{ destination: "about" }}
              className="rounded-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              More about me →
            </TrackedLink>
            <TrackedLink
              href="/services"
              event="founder_block_clicked"
              eventProps={{ destination: "services" }}
              className="rounded-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              How we work together →
            </TrackedLink>
          </div>
        </Reveal>
      </section>

      {/* ── Closing CTA: dark band ────────────────────────────────── */}
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
                Your business doesn&apos;t need more technology for
                technology&apos;s sake.
                <br />
                <span className="font-normal italic text-white/70">
                  It needs a system that makes the work easier, clearer, and
                  more reliable.
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
                      source_page: "home",
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
                    source_page: "home",
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
