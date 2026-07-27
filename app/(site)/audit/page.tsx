import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Coins, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";

export const metadata: Metadata = {
  title: "Workflow-First AI Audit — Kivov Digital",
  description:
    "Before recommending a tool or building an automation, I study how the work actually moves through your business. A professional review of one priority workflow: CAD $750, founding clients $495.",
  openGraph: {
    title: "Workflow-First AI Audit — Kivov Digital",
    description:
      "Before recommending a tool or building an automation, I study how the work actually moves through your business. A professional review of one priority workflow: CAD $750, founding clients $495.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const badgeEyebrow = "font-mono text-[0.65rem] tracking-[0.15em] uppercase";

const included = [
  "Pre-audit intake",
  "Review of one priority workflow",
  "A 60-minute workflow-mapping session",
  "A current-state process map",
  "Bottlenecks and manual handoffs, identified",
  "Three to five prioritized AI or automation opportunities",
  "Keep, connect, replace, or build recommendations",
  "Estimated impact and implementation effort",
  "Data, access, and privacy considerations",
  "What should not be automated",
  "A 30-day action plan",
  "A written audit report",
  "A 45-minute report walkthrough",
];

const steps = [
  {
    number: "01",
    title: "Intake",
    description:
      "A short questionnaire about the business and the one workflow to review.",
  },
  {
    number: "02",
    title: "Mapping session",
    description: "60 minutes, live. We map the workflow together.",
  },
  {
    number: "03",
    title: "Written report",
    description:
      "The map, the bottlenecks, the recommendations, the 30-day plan.",
  },
  {
    number: "04",
    title: "Walkthrough",
    description: "45 minutes, live. What to do first, and why.",
  },
];

export default function AuditPage() {
  return (
    <div>
      {/* ── Hero: the offer left, the price card right ─────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="rise lg:col-span-7">
            <Eyebrow className="mb-6 text-xs">The paid entry point</Eyebrow>
            <h1 className="font-display text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.02]">
              Workflow-First{" "}
              <em className="font-normal text-primary">AI Audit</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              Before I recommend a tool or build an automation, I study how the
              work actually moves through your business. The audit finds where
              time, information, and opportunities are being lost, and gives
              you a practical plan for improving one priority workflow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="xl"
                render={
                  <TrackedLink
                    href="/contact?interest=audit"
                    event="audit_booking_clicked"
                    eventProps={{ source_page: "audit", cta_location: "hero" }}
                  />
                }
              >
                Book your audit
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                render={
                  <TrackedLink
                    href="/fit-check"
                    event="fit_check_cta_clicked"
                    eventProps={{ source_page: "audit", cta_location: "hero" }}
                  />
                }
                className="text-muted-foreground hover:text-foreground"
              >
                Not sure yet? Take the free check
              </Button>
            </div>

            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.15em] uppercase text-caption">
              <span>One priority workflow</span>
              <span aria-hidden="true" className="text-primary">
                ·
              </span>
              <span>Written report</span>
              <span aria-hidden="true" className="text-primary">
                ·
              </span>
              <span>Yours to keep</span>
            </p>
          </div>

          {/* Price card: the numbers stated plainly */}
          <div className="rise [--rise-delay:150ms] lg:col-span-5">
            <Card className="ring-2 ring-primary/40 shadow-[0_1px_0_rgba(16,20,26,.02),0_16px_40px_-24px_rgba(16,20,26,.22)] [--card-spacing:--spacing(7)]">
              <CardContent>
                <Badge className={badgeEyebrow}>The audit</Badge>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold text-foreground tabular-nums">
                    $750
                  </span>
                  <span className="text-sm text-caption">CAD</span>
                </div>
                <p className="mt-4 border-t border-border pt-4 leading-relaxed">
                  <span className="font-medium text-foreground">
                    Founding-client price CAD $495
                  </span>{" "}
                  for the first five audit clients.
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  <li className="flex gap-3 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>One priority workflow, mapped end to end</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>A written report and a 30-day action plan</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>
                      CAD $500 credited toward implementation within 30 days
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── What's included ───────────────────────────────────────── */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="What's included"
              title="Everything the audit puts in your hands."
              lead="One workflow, studied properly, written down."
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="How it works"
            title="Four steps, start to finish."
          />
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 50}>
              <div className="group border-t-2 border-border pt-5 transition-colors duration-200 hover:border-primary">
                <span
                  className="font-mono text-sm font-medium text-primary"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
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

      {/* ── Scope, credit, founding price ─────────────────────────── */}
      <section className="border-t border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                index="03"
                eyebrow="Scope"
                title="What the audit covers, and what it won't pretend."
              />
              <p className="mt-5 leading-relaxed">
                The audit covers one primary workflow. More departments or
                workflows can be reviewed through a second audit or a larger
                engagement. And if the honest answer is that nothing here is
                worth automating yet, the report says that too.
              </p>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="h-full ring-border [--card-spacing:--spacing(6)]">
                  <CardContent>
                    <div
                      className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-secondary"
                      aria-hidden="true"
                    >
                      <Coins className="size-5 text-primary" strokeWidth={1.8} />
                    </div>
                    <h3 className="mb-1.5 font-semibold text-foreground">
                      CAD $500 credited back
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Hire Kivov for an implementation project within 30 days
                      of your audit and CAD $500 of the standard audit fee is
                      credited toward a qualifying project.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full ring-border [--card-spacing:--spacing(6)]">
                  <CardContent>
                    <div
                      className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-secondary"
                      aria-hidden="true"
                    >
                      <ShieldCheck
                        className="size-5 text-primary"
                        strokeWidth={1.8}
                      />
                    </div>
                    <h3 className="mb-1.5 font-semibold text-foreground">
                      Founding-client price
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      The founding-client price of CAD $495 applies to the
                      first five audit clients, in exchange for permission to
                      ask for feedback and a testimonial.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          </div>
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
                One workflow, properly understood
              </Eyebrow>
              <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-5xl">
                Stop guessing where the time goes.
              </h2>
              <Button
                size="xl"
                className="mt-8"
                render={
                  <TrackedLink
                    href="/contact?interest=audit"
                    event="audit_booking_clicked"
                    eventProps={{
                      source_page: "audit",
                      cta_location: "bottom_cta",
                    }}
                  />
                }
              >
                Book your audit
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <p className="mt-6 text-sm text-white/70">
                Or{" "}
                <Link
                  href="/fit-check"
                  className="rounded-sm font-medium text-brand-mint underline-offset-4 transition-colors hover:underline"
                >
                  take the free fit check
                </Link>{" "}
                first.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
