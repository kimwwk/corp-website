import type { Metadata } from "next";
import Image from "next/image";

import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "About — Kivov Digital",
  description:
    "I'm Kim Wong. Six years in corporate IT consulting, most of it at Deloitte and EY. Now I build practical AI and automation for small businesses, from Toronto, Canada.",
  openGraph: {
    title: "About — Kivov Digital",
    description:
      "I'm Kim Wong. Six years in corporate IT consulting, most of it at Deloitte and EY. Now I build practical AI and automation for small businesses, from Toronto, Canada.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="md:flex md:items-start md:gap-12 lg:gap-16">
        {/* Portrait: stacked on mobile, sticky on the right on desktop. */}
        <div className="mb-10 md:sticky md:top-24 md:order-2 md:mb-0 md:ml-auto md:shrink-0">
          <Image
            src="/kim-headshot.jpg"
            alt="Kim Wong"
            width={576}
            height={768}
            priority
            className="aspect-[3/4] w-48 rounded-2xl object-cover object-[center_20%] ring-1 ring-border md:w-64 lg:w-80"
          />
        </div>

        {/* Intro + story */}
        <div className="max-w-2xl md:order-1 md:min-w-0">
          <Eyebrow className="mb-6 text-xs">About</Eyebrow>

          <h1 className="mb-10 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Hi, I&apos;m Kim Wong.
          </h1>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              I spent six years in corporate IT consulting, most of it at
              Deloitte and EY. Enterprise integration work: APIs, data
              migrations, the systems large companies run on. I worked out of
              Hong Kong first, then Toronto.
            </p>
            <p>
              Working at Deloitte and EY pushed me onto enterprise-scale
              projects I couldn&apos;t have imagined before. It wasn&apos;t
              just a career move. It changed me at the core. I left earlier
              this year to build Kivov.
            </p>
            <p>
              Every one of those companies could afford someone to look at how
              the work actually flows before buying software. Small businesses
              can&apos;t. So they buy the tool they&apos;re told is best, then
              bend their work around it. I work the other way round: figure
              out your flow first, then find or build the system that fits it.
            </p>
            <p>
              I run my own stack at home. My own AI agents, my own automation,
              my own data on my own hardware.
            </p>
          </div>

          <p className="mt-8 font-display text-xl text-foreground italic">
            I test most of what I recommend on myself first.
          </p>

          <div className="mt-12 border-t border-border pt-8">
            <dl className="flex flex-col gap-8 sm:flex-row">
              <div>
                <dt className="mb-1 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-caption">
                  Experience
                </dt>
                <dd className="font-medium text-foreground">
                  corporate IT consulting
                </dd>
              </div>
              <div>
                <dt className="mb-1 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-caption">
                  Based in
                </dt>
                <dd className="font-medium text-foreground">
                  Toronto, Canada
                </dd>
              </div>
            </dl>

            <p className="mt-8 text-sm text-caption">
              <a
                href="https://www.linkedin.com/in/kim-wong-wwk/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <a
                href="https://github.com/kimwwk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
