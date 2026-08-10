import type { Metadata } from "next";
import { Check as CheckIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CtaRow,
  LedgerList,
  MonoLabel,
  Section,
  StepRows,
  Support,
} from "@/components/sections";
import { AUDIT_PAYMENT_URL } from "@/lib/payments";

/*
 * AI Workflow Audit — the paid entry offer (002 split, report 2026-07-26)
 * merged with the original page's pricing: the price card, founding-client
 * price, and the $500 implementation credit stay.
 */
export const metadata: Metadata = {
  title: "AI Workflow Audit — Kivov Digital",
  description:
    "Before you invest in technology, understand the work. A focused review of one priority business process, with a practical plan for improving it: CAD $750, founding clients $495.",
  openGraph: {
    title: "AI Workflow Audit — Kivov Digital",
    description:
      "Before you invest in technology, understand the work. A focused review of one priority business process, with a practical plan for improving it: CAD $750, founding clients $495.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const h2 =
  "font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground";

const designedFor = [
  "a clearer process",
  "better documentation",
  "a system integration",
  "an automation",
  "an AI agent",
  "different software",
  "a custom-built solution",
];

const includes = [
  "A pre-audit business questionnaire",
  "A live workflow-mapping session",
  "Review of one priority process",
  "Identification of delays and bottlenecks",
  "Analysis of repeated manual work",
  "Review of the tools currently involved",
  "AI and automation opportunities",
  "Recommendations on what to keep, connect, replace, or build",
  "Privacy, access, and data considerations",
  "Identification of what should not be automated",
  "A prioritized written action plan",
  "A walkthrough of the recommendations",
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

export default function AuditPage() {
  return (
    <>
      {/* Hero — cream, price card right */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <MonoLabel>Paid entry offer</MonoLabel>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground">
              AI Workflow Audit
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium text-foreground">
              Before you invest in technology, understand the work.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed">
              The AI Workflow Audit is a focused review of one important
              business process. Kim studies how the work moves today,
              identifies where time and information are being lost, and gives
              you a practical plan for improving it.
            </p>
            <CtaRow
              primary={{
                label: "Get your audit",
                arrow: true,
                external: true,
                href: AUDIT_PAYMENT_URL,
                event: "audit_booking_clicked",
                eventProps: {
                  source_page: "audit",
                  cta_location: "hero",
                  destination: "stripe_payment_link",
                },
              }}
              secondary={{
                label: "See what the audit includes",
                href: "#includes",
                event: "audit_cta_clicked",
                eventProps: {
                  source_page: "audit",
                  cta_location: "hero_secondary",
                },
              }}
            />
            <Support>
              One priority workflow · Written report · Yours to keep
            </Support>
          </Reveal>

          {/* Price card — the numbers stated plainly */}
          <Reveal delay={120} className="lg:col-span-5">
            <Card className="ring-2 ring-primary/40 shadow-[0_1px_0_rgba(23,32,27,.02),0_16px_40px_-24px_rgba(23,32,27,.22)] [--card-spacing:--spacing(7)]">
              <CardContent>
                <MonoLabel>The audit</MonoLabel>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-5xl font-black text-foreground tabular-nums">
                    $495
                  </span>
                  <span className="font-display text-2xl font-bold text-caption tabular-nums line-through decoration-2">
                    $750
                  </span>
                  <span className="font-mono text-xs tracking-[0.14em] text-caption uppercase">
                    CAD
                  </span>
                </div>
                <p className="mt-4 border-t border-border pt-4 leading-relaxed">
                  <span className="font-medium text-foreground">
                    Founding-client price
                  </span>{" "}
                  for the first five audit clients.
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  <li className="flex gap-3 text-sm">
                    <CheckIcon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>One priority workflow, mapped end to end</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <CheckIcon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>A written report and a prioritized action plan</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <CheckIcon
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
          </Reveal>
        </div>
      </section>

      {/* Who it is for */}
      <Section eyebrow="Who it's for">
        <p className="mt-6 max-w-3xl text-lg leading-relaxed font-medium text-foreground">
          This is designed for business owners who know something is slowing
          the company down but are not yet sure whether they need:
        </p>
        <LedgerList items={designedFor} className="mt-8 grid max-w-3xl" />
      </Section>

      {/* What the audit includes */}
      <Section id="includes" eyebrow="What you get" title="Your audit includes">
        <LedgerList items={includes} marker="check" columns={2} className="mt-8" />
      </Section>

      {/* How it works — full-width hairline rows, huge numerals */}
      <Section staggered eyebrow="How it works">
        <StepRows steps={steps} />
      </Section>

      {/* Scope, credit, founding price */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <MonoLabel>Scope</MonoLabel>
            <h2 className={`${h2} mt-5 max-w-3xl`}>
              What the audit covers, and what it won’t pretend.
            </h2>
            <p className="mt-6 max-w-3xl leading-relaxed">
              The audit covers one primary workflow. More departments or
              workflows can be reviewed through a second audit or a larger
              engagement. And if the honest answer is that nothing here is
              worth automating yet, the report says that too.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
            <Reveal>
              <div className="border-t border-border pt-6">
                <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                  CAD $500 credited back
                </h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed">
                  Hire Kivov for an implementation project within 30 days of
                  your audit and CAD $500 of the standard audit fee is credited
                  toward a qualifying project.
                </p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <div className="border-t border-border pt-6">
                <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                  Founding-client price
                </h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed">
                  The founding-client price of CAD $495 applies to the first
                  five audit clients, in exchange for permission to ask for
                  feedback and a testimonial.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What should I do first? */}
      <Section eyebrow="Where to start" title="What should I do first?">
        <p className="mt-6 max-w-3xl leading-relaxed">
          Start with the free Workflow Fit Check when you are still
          identifying the problem. Choose the AI Workflow Audit when you
          already know which process needs attention and want a professional
          recommendation.
        </p>
      </Section>

      {/* Closing — green band */}
      <Band title="Stop guessing where the time goes." depth="top-left">
        <CtaRow
          tone="band"
          className="mt-10"
          primary={{
            label: "Get your audit — $495",
            external: true,
            href: AUDIT_PAYMENT_URL,
            event: "audit_booking_clicked",
            eventProps: {
              source_page: "audit",
              cta_location: "bottom_cta",
              destination: "stripe_payment_link",
            },
          }}
          secondary={{
            label: "Take the Free Workflow Fit Check",
            href: "/fit-check",
            event: "fit_check_cta_clicked",
            eventProps: { source_page: "audit", cta_location: "bottom_cta" },
          }}
        />
        <Support>
          Understand your workflow first. Choose the technology second.
        </Support>
      </Band>
    </>
  );
}
