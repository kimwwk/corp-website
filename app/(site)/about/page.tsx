import type { Metadata } from "next";
import Image from "next/image";

import { Marker } from "@/components/marker";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CtaRow,
  LedgerList,
  MonoLabel,
  Section,
} from "@/components/sections";

/*
 * About Kim — the identity page of the 002 split (report 2026-07-26): bio,
 * Kim's difference, and the Founder's point of view, with the green band
 * reserved for the founder's vision. Portrait and social links kept from the
 * original page.
 */
export const metadata: Metadata = {
  title: "About Kim — Kivov Digital",
  description:
    "Kim Wong is the founder of Kivov Digital and a former Deloitte and EY consultant with more than seven years of experience across software development, enterprise integrations, cloud architecture, AI, websites, portals, and custom systems.",
  openGraph: {
    title: "About Kim — Kivov Digital",
    description:
      "Kim Wong is the founder of Kivov Digital and a former Deloitte and EY consultant with more than seven years of experience across software development, enterprise integrations, cloud architecture, AI, websites, portals, and custom systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const thinkAbout = [
  "Who owns the information",
  "What the technology can access",
  "Where the data is stored",
  "Whether the business can change systems later",
  "How much control the company retains",
  "What should remain human",
  "What should never be automated",
];

export default function AboutPage() {
  return (
    <>
      {/* Page header + bio, portrait on the right */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Reveal>
            <MonoLabel>About Kim</MonoLabel>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground">
              Meet <Marker>Kim Wong</Marker>
            </h1>
            <MonoLabel className="mt-6">
              AI Systems Architect. Software Engineer. Practical Builder.
            </MonoLabel>
            <div className="mt-8 max-w-3xl space-y-4 leading-relaxed">
              <p>
                Kim Wong is the founder of Kivov Digital and a former Deloitte
                and EY consultant with more than seven years of experience
                across software development, enterprise integrations, cloud
                architecture, AI, websites, portals, and custom systems.
              </p>
              <p>
                Her career began with computer science and software development
                and expanded into hardware, cloud environments, architecture,
                enterprise consulting, and large-scale technology projects.
              </p>
              <p>
                She has worked in Hong Kong and Canada and contributed to
                projects involving: enterprise AI · agentic workflows · banking
                technology · public-sector systems · customer portals · API
                integrations · data migration · custom software · cloud
                environments.
              </p>
              <p className="font-medium text-foreground">
                But Kivov was not founded simply because Kim knows how to build
                technology. It was founded because she sees a different future.
              </p>
              <p>
                Kim believes people and businesses will increasingly have
                systems built around their own knowledge, workflows,
                preferences, and data.
              </p>
              <p>
                She left corporate consulting because she wanted to invest her
                time in building something she could own and use her experience
                to help other people create greater ownership in their
                businesses.
              </p>
              <p>
                Her goal is not to place AI everywhere. Her goal is to
                understand what is slowing people down, build what genuinely
                helps, and give them more time to do bigger things.
              </p>
            </div>

            {/* Facts + social links, kept from the original page */}
            <div className="mt-12 max-w-3xl border-t border-border pt-8">
              <dl className="flex flex-col gap-8 sm:flex-row sm:gap-14">
                <div>
                  <dt className="mb-1 font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                    Experience
                  </dt>
                  <dd className="font-medium text-foreground">
                    7+ years · Deloitte & EY
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                    Based in
                  </dt>
                  <dd className="font-medium text-foreground">
                    Toronto, Canada
                  </dd>
                </div>
              </dl>
              <p className="mt-8 text-sm">
                <a
                  href="https://www.linkedin.com/in/kim-wong-wwk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm font-medium underline-offset-[5px] transition-colors hover:text-foreground hover:underline hover:decoration-primary hover:decoration-2"
                >
                  LinkedIn
                </a>
                <span aria-hidden="true" className="mx-2 text-caption">
                  ·
                </span>
                <a
                  href="https://github.com/kimwwk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm font-medium underline-offset-[5px] transition-colors hover:text-foreground hover:underline hover:decoration-primary hover:decoration-2"
                >
                  GitHub
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative mx-auto w-full max-w-sm md:sticky md:top-24">
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 h-full w-full rounded-2xl bg-brand-soft"
              />
              <Image
                src="/kim-headshot.jpg"
                alt="Kim Wong"
                width={614}
                height={1024}
                priority
                className="relative w-full rounded-2xl ring-1 ring-border"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kim's difference */}
      <Section
        staggered
        eyebrow="Kim’s difference"
        title="Practical systems. Greater ownership."
      >
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="space-y-4 leading-relaxed">
              <p>Kim believes that the future is not only about using more AI.</p>
              <p>
                It is about businesses having systems that understand their
                way of working, reflect their knowledge, and help them
                operate with greater independence.
              </p>
              <p>
                She has built her own AI agents, financial tools, home
                automations, and technology environment around this belief.
              </p>
              <p>Her philosophy is:</p>
            </div>
            <blockquote className="mt-6 border-l-[0.35rem] border-primary pl-6 font-display text-[clamp(1.55rem,3.4vw,2.4rem)] leading-[1.16] font-extrabold tracking-tight text-foreground">
              <span className="block">My data is mine.</span>
              <span className="block">My workflow is mine.</span>
              <span className="block">The system should serve the work.</span>
            </blockquote>
          </Reveal>
          <Reveal delay={80}>
            <MonoLabel tone="ink">
              Kivov helps clients think carefully about
            </MonoLabel>
            <LedgerList items={thinkAbout} className="mt-4" />
            <p className="mt-6 font-medium text-foreground">
              You do not need to connect everything on the first day. You can
              start with one process, see what fits, and build from there.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Founder's point of view — green band */}
      <Band
        eyebrow="Founder’s point of view"
        title={
          <>
            Everyone will have their <Marker tone="leaf">own system</Marker>.
          </>
        }
        depth="top-right"
      >
        <div className="mt-6 max-w-3xl space-y-4 leading-relaxed">
          <p>
            Kim believes the future of AI will become increasingly personal
            and specific.
          </p>
          <p>
            Businesses will not simply subscribe to generic tools. They will
            build systems that understand: how they make decisions · how
            they communicate · how their team works · what information
            matters · what standards they follow · what they want to
            protect · what ‘done’ means inside their organization.
          </p>
          <p>
            That future does not have to begin with a large custom software
            project.
          </p>
        </div>
        <p className="mt-8 max-w-[24em] font-display text-[clamp(1.55rem,3.4vw,2.4rem)] leading-[1.16] font-extrabold tracking-tight text-foreground">
          It can begin with one workflow. One repeated task. One broken
          handoff. One place where your team knows there has to be a better
          way.
        </p>
        <CtaRow
          tone="band"
          className="mt-10"
          primary={{
            label: "Take the Free Workflow Fit Check",
            href: "/fit-check",
            event: "fit_check_cta_clicked",
            eventProps: { source_page: "about", cta_location: "founder_band" },
          }}
          secondary={{
            label: "Explore the AI Workflow Audit",
            href: "/audit",
            event: "audit_cta_clicked",
            eventProps: { source_page: "about", cta_location: "founder_band" },
          }}
        />
      </Band>
    </>
  );
}
