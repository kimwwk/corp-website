import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Interlude } from "@/components/interlude";
import { Marker } from "@/components/marker";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CtaRow,
  MonoLabel,
  Section,
  StatementRows,
  Support,
} from "@/components/sections";
import { ShowcaseProducts } from "@/components/showcase-products";
import { cn } from "@/lib/utils";

/*
 * Showcase — proof surface (approved mockup v5, 2026-08-09). Cases lead with
 * outcome headlines from published posts; before → after delta + returned
 * numbers; products close as a co-build invitation.
 */

export const metadata: Metadata = {
  title: "Showcase — Kivov Digital",
  description: "Client systems in production, and what they returned.",
  openGraph: {
    title: "Showcase — Kivov Digital",
    description: "Client systems in production, and what they returned.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* Home steps-h3 recipe — the pull-line and ledger-row headings share it. */
const rowHeading =
  "font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl";

const cases = [
  {
    title: "Executive-assistant work",
    lead: (
      <>
        After every call, AI drafts the follow-up email{" "}
        <strong className="font-medium text-foreground">in your voice</strong>,
        ready to review and send. It never sends on its own.
      </>
    ),
    from: "15 to 30 minutes per follow-up",
    to: "a 2-minute review",
    stats: [
      { n: "89%", label: "Less time on follow-up" },
      { n: "208 hrs", label: "Back per year" },
      { n: "$6,240", label: "Back per year" },
    ],
    foot: "A worked example. Live build with a Toronto mortgage team.",
    pullLine: "The follow-up email is just the first thing we taught it.",
  },
  {
    title: "File and document management",
    lead: (
      <>
        Built for a $10M+ revenue company. Vendor invoices arrive as PDFs,
        every layout different. AI reads them, checks its own totals, and
        clean data goes into the ERP.
      </>
    ),
    from: "1 hour a day, typed by hand",
    to: "5 minutes of review",
    stats: [
      { n: "92%", label: "Less time on entry" },
      { n: "238 hrs", label: "Back per year" },
      { n: "$7,150", label: "Back per year" },
    ],
    foot: "A worked example at $30/hr. Not a quote.",
  },
];

const track = [
  {
    title: "Coaching cards for support calls",
    body: "Built on top of a CRM at a prior employer. As an agent talks, the next best card pops up from the company knowledge base. In production today.",
  },
  {
    title: "Conversational AI",
    body: "Agents that talk with your customers naturally, by text or voice: qualify, answer, book.",
  },
];

export default function ShowcasePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <Reveal className="mx-auto max-w-6xl">
          <MonoLabel>Showcase</MonoLabel>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground">
            Systems we&apos;ve built, <Marker>in use today</Marker>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Client systems in production, and what they returned.
          </p>
          <CtaRow
            primary={{
              label: "Free Fit Check",
              arrow: true,
              href: "/fit-check",
              event: "fit_check_cta_clicked",
              eventProps: { source_page: "showcase", cta_location: "hero" },
            }}
            secondary={{
              label: "Explore the full audit",
              href: "/audit",
              event: "audit_cta_clicked",
              eventProps: { source_page: "showcase", cta_location: "hero" },
            }}
          />
        </Reveal>
      </section>

      {/* Cases */}
      {cases.map((c, i) => (
        <Section
          key={c.title}
          flush={i === 0}
          eyebrow={`Case ${String(i + 1).padStart(2, "0")}`}
          title={c.title}
        >
          <p className="mt-5 max-w-3xl text-lg leading-relaxed">{c.lead}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border py-5">
            <span className="font-medium text-caption">{c.from}</span>
            <ArrowRight
              className="size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="rounded-lg bg-secondary px-4 py-1.5 font-semibold text-foreground">
              {c.to}
            </span>
          </div>
          <div className="grid border-b border-border md:grid-cols-3">
            {c.stats.map((s, j) => (
              <div
                key={s.label + j}
                className={cn(
                  "py-5",
                  j > 0 &&
                    "border-t border-border md:border-t-0 md:border-l md:pl-6",
                )}
              >
                <p className="font-display text-[clamp(1.55rem,3.4vw,2.5rem)] leading-[1.06] font-black tracking-tight text-primary tabular-nums">
                  {s.n}
                </p>
                <p className="mt-2 font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs font-medium text-caption">
            {c.foot}
          </p>
          {c.pullLine ? (
            <p className={`${rowHeading} mt-10 max-w-[30em]`}>{c.pullLine}</p>
          ) : null}
        </Section>
      ))}

      {/* Testimonial */}
      <Section eyebrow="What clients say">
        <figure className="mt-6">
          <blockquote>
            <p className="max-w-[24em] font-display text-[clamp(1.55rem,3.4vw,2.4rem)] leading-[1.16] font-extrabold tracking-tight text-foreground">
              “I love your work. You’re talented, easy to communicate with,
              and very professional. Looking forward to many more projects
              together.”
            </p>
          </blockquote>
          <figcaption className="mt-7 flex max-w-3xl flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-border pt-5">
            <span className="font-medium text-foreground">Yongling Zheng</span>
            <MonoLabel tone="caption">Founder, Webie</MonoLabel>
          </figcaption>
        </figure>
      </Section>

      {/* Interlude — Signature Language Bank */}
      <Interlude className="border-t border-border">
        We do not start with the software. We start with{" "}
        <Marker>your way</Marker>.
      </Interlude>

      {/* Before Kivov */}
      <Section
        staggered
        eyebrow="Track record"
        title="Built before Kivov. Still running."
      >
        <StatementRows rows={track} />
      </Section>

      {/* Product builds */}
      <Section eyebrow="Products" title="We ship products too.">
        <p className="mt-5 max-w-3xl text-lg leading-relaxed">
          We build premium, high-ticket websites.
        </p>
        <div className="mt-8">
          <ShowcaseProducts />
        </div>
      </Section>

      {/* Closing CTA band */}
      <Band title="Want this for one of your processes?" depth="top-left">
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          Start with one process that takes too much time or depends on one
          person. We will help you see what fits.
        </p>
        <CtaRow
          tone="band"
          primary={{
            label: "Take the Free Workflow Fit Check",
            arrow: true,
            href: "/fit-check",
            event: "fit_check_cta_clicked",
            eventProps: { source_page: "showcase", cta_location: "final_cta" },
          }}
        />
        <Support>Three minutes. No technical preparation.</Support>
      </Band>
    </>
  );
}
