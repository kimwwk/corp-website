import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  FileSearch,
  MessagesSquare,
  Presentation,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";

const steps = [
  {
    number: "01",
    icon: MessagesSquare,
    title: "A 45-minute conversation",
    description: "You talk, I listen. No prep required.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "I do the homework",
    description: "I find proven tools that fix your bottlenecks.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "You get a written report",
    description: "Quick wins, mapped by effort vs. impact.",
  },
  {
    number: "04",
    icon: Presentation,
    title: "A 30-minute walkthrough",
    description: "I show you exactly how to start.",
  },
];

/* The five time sinks named in the original copy, presented as a checklist. */
const timeSinks = [
  "Quoting and estimates",
  "Scheduling the team",
  "Chasing follow-ups",
  "Weekly reporting",
  "Answering the same questions, again and again",
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero: headline left, portrait right ───────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="rise lg:col-span-7">
            <Eyebrow className="mb-6 text-xs">Free AI Assessment</Eyebrow>

            <h1 className="font-display text-[2.75rem] leading-[1.06] font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.03]">
              Reclaim{" "}
              <em className="font-normal text-primary">5–10 hours a week</em>{" "}
              with AI that fits how you already work.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              A free 45-minute assessment. You get a written report of
              practical AI quick wins.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="xl"
                render={
                  <TrackedLink
                    href="/book"
                    event="assessment_cta_clicked"
                    eventProps={{ source_page: "home", cta_location: "hero" }}
                  />
                }
              >
                Book your free assessment
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                render={<Link href="#how-it-works" />}
                className="text-muted-foreground hover:text-foreground"
              >
                See how it works
              </Button>
            </div>

            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.15em] uppercase text-caption">
              <span>45-min call</span>
              <span aria-hidden="true" className="text-primary">
                ·
              </span>
              <span>Written report</span>
              <span aria-hidden="true" className="text-primary">
                ·
              </span>
              <span>No card, no commitment</span>
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

      {/* ── How it works: numbered editorial columns ──────────────── */}
      <section
        id="how-it-works"
        aria-label="How the free assessment works"
        className="scroll-mt-20 border-y border-border bg-card/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="How it works"
              title="One call. One report. Real hours back."
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
        </div>
      </section>

      {/* ── Who it's for: one line + time-sink checklist ──────────── */}
      <section
        aria-label="Who it's for"
        className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      >
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              index="02"
              eyebrow="Who it's for"
              title={
                <>
                  Built for owners who are busy{" "}
                  <em className="font-normal text-primary">in</em> the
                  business.
                </>
              }
            />
            <p className="mt-5 max-w-xl leading-relaxed">
              Teams of 5–50 losing their week to routine work. You don&apos;t
              need to be technical — that&apos;s my job.
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6">
            <Card className="ring-border [--card-spacing:--spacing(7)]">
              <CardContent>
                <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-caption">
                  Your week disappears into…
                </p>
                <ul className="mt-5 divide-y divide-border">
                  {timeSinks.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 py-3 text-sm text-foreground"
                    >
                      <CalendarClock
                        className="size-4 shrink-0 text-primary"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ── Founder: slim statement strip (portrait lives in hero) ── */}
      <section
        aria-label="Who you'll be talking to"
        className="border-y border-border bg-card/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Who you'll be talking to"
              title="There's one person behind this. Me."
            />
            <p className="mt-5 max-w-2xl leading-relaxed">
              Kim Wong — six years in corporate IT consulting at Deloitte and
              EY.
            </p>
            <p className="mt-3 font-display text-xl text-foreground italic">
              The assessment call is with me. So is the build.
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
        </div>
      </section>

      {/* ── Closing CTA: dark band ────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24">
        <Reveal>
          <div className="dark relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-inkdeep px-8 py-14 text-center md:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(110,231,183,0.10),transparent)]"
            />
            <div className="relative">
              <Eyebrow className="mb-5 text-xs text-brand-mint">
                Free · No card, no commitment
              </Eyebrow>
              <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-5xl">
                Find out where your hours are going —
                <br />
                <span className="font-normal italic text-white/70">
                  and how to get them back.
                </span>
              </h2>
              <Button
                size="xl"
                className="mt-8"
                render={
                  <TrackedLink
                    href="/book"
                    event="assessment_cta_clicked"
                    eventProps={{
                      source_page: "home",
                      cta_location: "bottom_cta",
                    }}
                  />
                }
              >
                Book your free assessment
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
