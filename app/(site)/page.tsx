import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Interlude } from "@/components/interlude";
import { Marker } from "@/components/marker";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";

/*
 * Home — Green Ledger (Direction C). Conversion spine per the 002 split plan:
 * identity lives on /about, service depth on /services, offer detail on
 * /audit. Copy: Lindsay report 2026-07-26 with Kim's hero + CTA revisions.
 */

const eyebrow =
  "font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase";
const eyebrowOnGreen =
  "font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase";
const support =
  "font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase";
/* Quiet secondary CTA: underlined text link (leaf on green, green on cream). */
const linkLeaf =
  "inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-brand-mint decoration-2 underline-offset-[7px] transition-colors hover:text-caption";
const linkGreen =
  "inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary";
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

function Check({ tone = "green" }: { tone?: "green" | "leaf" }) {
  return (
    <svg
      className={`mt-1 size-4 shrink-0 ${tone === "leaf" ? "text-brand-mint" : "text-primary"}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8.5 6 12l7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero — deep green band */}
      <section className="band-green relative overflow-hidden bg-background px-6 py-20 md:py-28">
        <div
          className="band-depth right-[-14%] bottom-[-52%]"
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className={eyebrowOnGreen}>
            Workflow-First AI for Small Business · Toronto
          </p>
          <h1 className="mt-6 max-w-[11em] font-display text-[clamp(2.1rem,8vw,6rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground">
            Build the system that{" "}
            <Marker tone="leaf">fits your business</Marker>.
          </h1>
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
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              size="xl"
              className="rounded-full hover:text-inkdeep"
              render={
                <TrackedLink
                  href="/fit-check"
                  event="fit_check_cta_clicked"
                  eventProps={{ source_page: "home", cta_location: "hero" }}
                />
              }
            >
              Free Fit Check
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
            <TrackedLink
              href="/audit"
              event="audit_cta_clicked"
              eventProps={{ source_page: "home", cta_location: "hero" }}
              className={linkLeaf}
            >
              Explore the full audit
            </TrackedLink>
          </div>
          <p className={`${support} mt-8 block`}>
            Understand your workflow first. Choose the technology second.
          </p>
        </Reveal>
      </section>

      {/* Introduction */}
      <section className="px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <p className={eyebrow}>Introduction</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground">
            Start with your way of working.
          </h2>
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
              <p className="font-mono text-xs font-medium tracking-[0.14em] text-foreground uppercase">
                We look at
              </p>
              <ul className="mt-4 border-b border-border">
                {lookAt.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-border py-3"
                  >
                    <span
                      className="mt-[0.55em] size-2 shrink-0 rounded-[2px] bg-primary"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
        </Reveal>
      </section>

      {/* Pain points */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <p className={eyebrow}>Pain points</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground">
            Your team may not need another tool. You may need a better flow.
          </h2>
          <p className="mt-5 text-lg">Does any of this sound familiar?</p>
          <ul className="mt-8 grid gap-x-12 md:grid-cols-2">
            {painPoints.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-t border-border py-4 leading-relaxed text-foreground"
              >
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={`${bigLine} mt-12`}>
            Technology cannot fix a process that no one fully understands.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed">
            Before we automate anything, we help you understand your way.
          </p>
        </Reveal>
      </section>

      {/* Core philosophy */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <p className={eyebrow}>Core philosophy</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground">
            We do not force your business into a platform.
          </h2>
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
        </Reveal>
      </section>

      {/* Interlude — Signature Language Bank */}
      <Interlude className="border-t border-border">
        “Show me how the work <Marker>actually</Marker> happens.”
      </Interlude>

      {/* Fit Check — featured green band */}
      <section
        id="fit-check"
        className="band-green relative scroll-mt-16 overflow-hidden bg-background px-6 py-20 md:py-28"
      >
        <div className="band-depth top-[-58%] right-[-16%]" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className={eyebrowOnGreen}>Free Workflow Fit Check</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.05] font-black tracking-tight text-balance text-foreground">
            Where is work getting <Marker tone="leaf">stuck</Marker>?
          </h2>
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
            <ul className="content-start border-b border-border">
              {fitCheckOutcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-border py-3"
                >
                  <Check tone="leaf" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10">
            <Button
              size="xl"
              className="rounded-full hover:text-inkdeep"
              render={
                <TrackedLink
                  href="/fit-check"
                  event="fit_check_cta_clicked"
                  eventProps={{
                    source_page: "home",
                    cta_location: "fit_check_band",
                  }}
                />
              }
            >
              Take the Free Workflow Fit Check
            </Button>
            <p className={`${support} mt-6 block`}>
              Three minutes. No technical preparation. One practical place to
              begin.
            </p>
          </div>
        </Reveal>
      </section>

      {/* What Kivov helps you do — hairline statement rows */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className={eyebrow}>What Kivov helps you do</p>
          </Reveal>
          <div className="mt-8 border-b border-border">
            {helps.map((h, i) => (
              <Reveal key={h.title} delay={i * 40}>
                <div className="grid gap-3 border-t border-border py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    {h.title}
                  </h3>
                  <p className="max-w-[52ch] leading-relaxed">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audit — condensed, links out */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <p className={eyebrow}>AI Workflow Audit</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground">
            Before you invest in technology, understand the work.
          </h2>
          <p className="mt-6 max-w-3xl leading-relaxed">
            The AI Workflow Audit is a focused review of one important business
            process. Kim studies how the work moves today, identifies where
            time and information are being lost, and gives you a practical plan
            for improving it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              size="xl"
              className="rounded-full"
              render={
                <TrackedLink
                  href="/book"
                  event="audit_cta_clicked"
                  eventProps={{
                    source_page: "home",
                    cta_location: "audit_teaser",
                  }}
                />
              }
            >
              Book the AI Workflow Audit
            </Button>
            <TrackedLink
              href="/audit"
              event="audit_cta_clicked"
              eventProps={{
                source_page: "home",
                cta_location: "audit_teaser_secondary",
              }}
              className={linkGreen}
            >
              See what the audit includes
            </TrackedLink>
          </div>
        </Reveal>
      </section>

      {/* How it works — full-width hairline rows, huge numerals */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className={eyebrow}>How it works</p>
          </Reveal>
          <ol className="mt-8 border-t border-border">
            {steps.map((s, i) => (
              <li key={s.title} className="border-b border-border">
                <Reveal
                  delay={i * 40}
                  className="grid grid-cols-[minmax(2.4rem,3rem)_minmax(0,1fr)] gap-x-6 py-8 md:grid-cols-[minmax(3.4rem,6rem)_minmax(0,1fr)] md:gap-x-12 md:py-11"
                >
                  <p
                    className="font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-none font-black text-primary"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </p>
                  <div>
                    <h3 className="pt-1 font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[60ch] leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services teaser rows */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className={eyebrow}>Services</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground">
              Two ways to work together
            </h2>
          </Reveal>
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
        </div>
      </section>

      {/* About Kim — short founder block with the original portrait */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Reveal>
            <p className={eyebrow}>About Kim</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground">
              Meet Kim Wong
            </h2>
            <p className="mt-4 font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase">
              AI Systems Architect. Software Engineer. Practical Builder.
            </p>
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

      {/* Final CTA — green band, centered */}
      <section className="band-green relative overflow-hidden bg-background px-6 py-24 md:py-32">
        <div className="band-depth top-[-58%] left-[-12%]" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-6xl text-center">
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.05] font-black tracking-tight text-balance text-foreground">
            Start with one thing.
          </h2>
          <div className="mx-auto mt-7 max-w-2xl space-y-4 text-lg leading-relaxed">
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Button
              size="xl"
              className="rounded-full hover:text-inkdeep"
              render={
                <TrackedLink
                  href="/fit-check"
                  event="fit_check_cta_clicked"
                  eventProps={{
                    source_page: "home",
                    cta_location: "final_cta",
                  }}
                />
              }
            >
              Take the Free Workflow Fit Check
            </Button>
            <TrackedLink
              href="/book"
              event="audit_cta_clicked"
              eventProps={{ source_page: "home", cta_location: "final_cta" }}
              className={linkLeaf}
            >
              Book the AI Workflow Audit
            </TrackedLink>
          </div>
          <p className={`${support} mt-8 block`}>
            Understand the work. Use what fits. Build what is missing.
          </p>
        </Reveal>
      </section>
    </>
  );
}
