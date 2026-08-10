import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Interlude } from "@/components/interlude";
import { Marker } from "@/components/marker";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CtaRow,
  LedgerList,
  MonoLabel,
  Section,
  StatementRows,
  StepRows,
  Support,
} from "@/components/sections";
import { TrackedLink } from "@/components/tracked-link";

/*
 * Home — Green Ledger (Direction C). Conversion spine per the 002 split plan:
 * identity lives on /about, service depth on /services, offer detail on
 * /audit. Copy: Lindsay report 2026-07-26 with Kim's hero + CTA revisions.
 * Composed from the section kit (components/sections/).
 */

/* Display pull-line (.big-line in the Direction C sample). */
const bigLine =
  "max-w-[24em] font-display text-[clamp(1.55rem,3.4vw,2.4rem)] leading-[1.16] font-extrabold tracking-tight text-foreground";

const lookAt = [
  "What starts the process",
  "Who is involved",
  "Where information is stored",
  "What gets repeated",
  "What gets delayed",
  "Where decisions are made",
  "What depends too heavily on one person",
  "What your current tools already do well",
];

const painPoints = [
  "You are copying the same information between multiple platforms.",
  "Follow-ups get delayed when the business gets busy.",
  "Important processes live inside one person’s head.",
  "Your team repeatedly asks the same questions.",
  "Reports have to be rebuilt manually.",
  "Customers wait because information is difficult to find.",
  "You are paying for software the team barely uses.",
  "The owner has become the approval point for everything.",
  "You know AI could help, but you do not know where it belongs.",
  "Your current system does not reflect how your business actually works.",
];

const fitCheckOutcomes = [
  "Clarifying the workflow",
  "Connecting your existing tools",
  "Automating repeated work",
  "Reducing dependence on the owner",
  "Building a more tailored system",
  "Leaving the process alone for now",
];

const helps = [
  {
    title: "Understand the work",
    body: "We begin with how your business actually operates, including the informal steps, decisions, and workarounds that may not be documented.",
  },
  {
    title: "Find where time is being lost",
    body: "We identify repetitive tasks, delays, unnecessary handoffs, disconnected information, and work that depends too heavily on one person.",
  },
  {
    title: "Use what already fits",
    body: "We review your existing tools before recommending something new. If a tool already works for your situation, we use it. There is no point reinventing the wheel.",
  },
  {
    title: "Build what is missing",
    body: "When the right solution does not exist, Kivov can design AI agents, automations, integrations, websites, portals, or custom software around your workflow.",
  },
  {
    title: "Help your team do bigger things",
    body: "The goal is not simply to complete tasks faster. The goal is to remove work that keeps people from focusing on customers, decisions, creativity, and growth.",
  },
];

const steps = [
  {
    title: "Show us how the work happens",
    body: "You walk Kim through one process as it operates today. No polished presentation is required. The real process is more useful than the perfect version.",
  },
  {
    title: "We find the friction",
    body: "We look for: repeated work · manual copying · delayed decisions · missing information · unclear ownership · too many handoffs · poor-fit technology · tasks that depend on the same person.",
  },
  {
    title: "We determine what fits",
    body: "Kivov evaluates whether the best next step is to: keep the current process · clarify or document it · reconfigure an existing tool · connect two or more systems · add an automation · build an AI agent · create a custom application.",
  },
  {
    title: "You receive a practical plan",
    body: "You leave with clear priorities, not a list of random AI tools. You will understand: what to address first · what may save meaningful time · what could create new problems · what level of effort may be required · what Kivov can help implement · what your team can handle internally.",
  },
];

const services = [
  {
    title: "Build With You",
    lead: "For teams that want to remain actively involved in the work.",
    note: "This is not traditional coaching. We build things with you.",
  },
  {
    title: "Build For You",
    lead: "For businesses that want Kivov to design and implement the solution.",
    note: "Every project begins with understanding how the work happens. We do not build technology first and ask questions later.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — deep green band */}
      <Band
        hero
        eyebrow="Workflow-First AI for Small Business · Toronto"
        title={
          <>
            Build the system that <Marker tone="leaf">fits your business</Marker>.
          </>
        }
        depth="bottom-right"
      >
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          Kivov Digital helps growing businesses understand how their work
          actually happens, identify where time and information are being
          lost, and build practical AI systems around the way their people
          already work.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed font-medium text-foreground">
          We use what fits. We connect what already works. We build what is
          missing.
        </p>
        <CtaRow
          tone="band"
          primary={{
            label: "Free Fit Check",
            arrow: true,
            href: "/fit-check",
            event: "fit_check_cta_clicked",
            eventProps: { source_page: "home", cta_location: "hero" },
          }}
          secondary={{
            label: "Explore the full audit",
            href: "/audit",
            event: "audit_cta_clicked",
            eventProps: { source_page: "home", cta_location: "hero" },
          }}
        />
        <Support>
          Understand your workflow first. Choose the technology second.
        </Support>
      </Band>

      {/* Introduction */}
      <Section flush eyebrow="Introduction" title="Start with your way of working.">
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed">
            <p>Most businesses are introduced to technology in the wrong order.</p>
            <p>
              They are told to choose a platform, purchase another tool, or
              add AI before anyone takes the time to understand how their
              business actually operates.
            </p>
            <p>Then the business has to change its process to fit the technology.</p>
            <p className="font-medium text-foreground">
              We believe it should work the other way around.
            </p>
            <p>At Kivov Digital, we study how the work moves first.</p>
          </div>
          <div>
            <MonoLabel tone="ink">We look at</MonoLabel>
            <LedgerList items={lookAt} className="mt-4" />
          </div>
        </div>
        <p className="mt-10 max-w-3xl leading-relaxed">
          Then we help you decide what to keep, connect, improve, automate, or
          build.
        </p>
        <p className={`${bigLine} mt-5`}>
          Because your system should fit you. You should not have to fit the
          system.
        </p>
      </Section>

      {/* Pain points */}
      <Section
        eyebrow="Pain points"
        title="Your team may not need another tool. You may need a better flow."
      >
        <p className="mt-5 text-lg">Does any of this sound familiar?</p>
        <LedgerList items={painPoints} marker="check" columns={2} className="mt-8" />
        <p className={`${bigLine} mt-12`}>
          Technology cannot fix a process that no one fully understands.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed">
          Before we automate anything, we help you understand your way.
        </p>
      </Section>

      {/* Core philosophy */}
      <Section
        eyebrow="Core philosophy"
        title="We do not force your business into a platform."
      >
        <p className="mt-6">Kim’s approach is straightforward:</p>
        <blockquote className="mt-6 max-w-[24em] border-l-[0.35rem] border-primary pl-6 font-display text-[clamp(1.55rem,3.4vw,2.4rem)] leading-[1.16] font-extrabold tracking-tight text-foreground">
          “I have to figure out my way first before I use the system.”
        </blockquote>
        <div className="mt-8 max-w-3xl space-y-4 leading-relaxed">
          <p>
            That means Kivov does not begin by recommending a particular
            platform.
          </p>
          <p>
            We first understand: your workflow · your people · your
            priorities · your existing technology · your data · your decision
            points · your exceptions · your goals.
          </p>
          <p>Then we identify the simplest practical solution.</p>
          <p>
            Sometimes an existing tool already fits. Sometimes your current
            tools need to be connected. Sometimes the process needs to be
            clarified before it is automated. Sometimes a custom system is
            the right investment.
          </p>
          <p>
            There is no point reinventing the wheel when the right solution
            already exists.
          </p>
          <p className="font-medium text-foreground">
            But there is also no reason to force your company into a system
            that was not built for the way you work.
          </p>
        </div>
      </Section>

      {/* Interlude — Signature Language Bank */}
      <Interlude className="border-t border-border">
        “Show me how the work <Marker>actually</Marker> happens.”
      </Interlude>

      {/* Fit Check — featured green band */}
      <Band
        id="fit-check"
        eyebrow="Free Workflow Fit Check"
        title={
          <>
            Where is work getting <Marker tone="leaf">stuck</Marker>?
          </>
        }
        depth="top-right"
      >
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed">
            <p>
              Take the free Workflow Fit Check to identify where repetitive
              work, disconnected tools, or unclear processes may be costing
              your business time.
            </p>
            <p>
              In approximately three minutes, you will get a high-level
              result showing whether your strongest opportunity may be:
            </p>
            <p className="font-medium text-foreground">
              You do not need to understand AI. You only need to tell us how
              the work happens today.
            </p>
          </div>
          <LedgerList
            items={fitCheckOutcomes}
            marker="check"
            tone="leaf"
            className="content-start"
          />
        </div>
        <CtaRow
          tone="band"
          className="mt-10"
          primary={{
            label: "Take the Free Workflow Fit Check",
            href: "/fit-check",
            event: "fit_check_cta_clicked",
            eventProps: { source_page: "home", cta_location: "fit_check_band" },
          }}
        />
        <Support className="mt-6">
          Three minutes. No technical preparation. One practical place to
          begin.
        </Support>
      </Band>

      {/* What Kivov helps you do — hairline statement rows */}
      <Section flush staggered eyebrow="What Kivov helps you do">
        <StatementRows rows={helps} />
      </Section>

      {/* Audit — condensed, links out */}
      <Section
        eyebrow="AI Workflow Audit"
        title="Before you invest in technology, understand the work."
      >
        <p className="mt-6 max-w-3xl leading-relaxed">
          The AI Workflow Audit is a focused review of one important business
          process. Kim studies how the work moves today, identifies where
          time and information are being lost, and gives you a practical plan
          for improving it.
        </p>
        <CtaRow
          primary={{
            label: "Book the AI Workflow Audit",
            href: "/book",
            event: "audit_cta_clicked",
            eventProps: { source_page: "home", cta_location: "audit_teaser" },
          }}
          secondary={{
            label: "See what the audit includes",
            href: "/audit",
            event: "audit_cta_clicked",
            eventProps: {
              source_page: "home",
              cta_location: "audit_teaser_secondary",
            },
          }}
        />
      </Section>

      {/* How it works — full-width hairline rows, huge numerals */}
      <Section staggered eyebrow="How it works">
        <StepRows steps={steps} />
      </Section>

      {/* Services teaser rows */}
      <Section staggered eyebrow="Services" title="Two ways to work together">
        <div className="mt-8 border-b border-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <TrackedLink
                href="/services"
                event="services_teaser_clicked"
                eventProps={{ service: s.title }}
                className="group grid gap-4 border-t border-border py-10 transition-colors hover:bg-card md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-12 md:py-12"
              >
                <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.06] font-extrabold tracking-tight text-foreground">
                  {s.title}
                  <span
                    className="ml-3 inline-block -translate-x-2 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </h3>
                <div>
                  <p className="max-w-[30ch] font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                    {s.lead}
                  </p>
                  <p className="mt-4 max-w-[56ch] font-medium text-foreground">
                    {s.note}
                  </p>
                </div>
              </TrackedLink>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* About Kim — short founder block with the original portrait */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Reveal>
            <MonoLabel>About Kim</MonoLabel>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground">
              Meet Kim Wong
            </h2>
            <MonoLabel className="mt-4">
              AI Systems Architect. Software Engineer. Practical Builder.
            </MonoLabel>
            <p className="mt-5 max-w-3xl leading-relaxed">
              Kim Wong is the founder of Kivov Digital and a former Deloitte and
              EY consultant with more than seven years of experience across
              software development, enterprise integrations, cloud architecture,
              AI, websites, portals, and custom systems.
            </p>
            <div className="mt-8">
              <Button
                size="xl"
                className="rounded-full"
                render={
                  <TrackedLink
                    href="/about"
                    event="founder_block_clicked"
                    eventProps={{ destination: "about" }}
                  />
                }
              >
                Learn More About Kim
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
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
                className="relative aspect-[4/5] w-full rounded-2xl object-cover object-[center_15%] ring-1 ring-border"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interlude — Signature Language Bank */}
      <Interlude className="border-t border-border">
        “You do not need AI everywhere. You need it in the{" "}
        <Marker>right place</Marker>.”
      </Interlude>

      {/* Final CTA — green band, left-aligned like every closing band */}
      <Band breathe title="Start with one thing." depth="top-left">
        <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed">
          <p>
            You do not have to change every system in your business. You do
            not have to connect all of your data. You do not have to
            understand every new AI tool.
          </p>
          <p>
            Start with one process that takes too much time, creates too much
            confusion, or depends too heavily on one person.
          </p>
          <p className="font-medium text-foreground">
            We will help you understand the way it works today and determine
            what fits next.
          </p>
        </div>
        <CtaRow
          tone="band"
          className="mt-10"
          primary={{
            label: "Take the Free Workflow Fit Check",
            href: "/fit-check",
            event: "fit_check_cta_clicked",
            eventProps: { source_page: "home", cta_location: "final_cta" },
          }}
          secondary={{
            label: "Book the AI Workflow Audit",
            href: "/book",
            event: "audit_cta_clicked",
            eventProps: { source_page: "home", cta_location: "final_cta" },
          }}
        />
        <Support>
          Understand the work. Use what fits. Build what is missing.
        </Support>
      </Band>
    </>
  );
}
