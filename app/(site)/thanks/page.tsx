import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";

/*
 * Post-payment landing — the Stripe payment link redirects here after a
 * successful checkout. Noindexed and deliberately absent from the sitemap.
 */
export const metadata: Metadata = {
  title: "Payment received — Kivov Digital",
  description: "Your AI Workflow Audit is booked.",
  robots: { index: false, follow: false },
};

const eyebrow =
  "font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase";
const support =
  "font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase";
const linkGreen =
  "inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary";

export default function ThanksPage() {
  return (
    <section className="px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-6xl">
        <p className={eyebrow}>Payment received</p>
        <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground">
          You’re booked in.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          Thank you — your AI Workflow Audit is confirmed. A receipt from
          Stripe is on its way to your inbox, and Kim will email you within
          one business day to set up the kickoff session.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">
          Want to get moving now? Pick a time for the kickoff call and we’ll
          take it from there.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button
            size="xl"
            className="rounded-full"
            render={
              <TrackedLink
                href="/book"
                event="booking_cta_clicked"
                eventProps={{ source_page: "thanks", cta_location: "hero" }}
              />
            }
          >
            Pick a kickoff time
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
          <TrackedLink
            href="/"
            event="home_cta_clicked"
            eventProps={{ source_page: "thanks", cta_location: "hero" }}
            className={linkGreen}
          >
            Back to the homepage
          </TrackedLink>
        </div>
        <p className={`${support} mt-8 block`}>
          One priority workflow · Written report · Yours to keep
        </p>
      </Reveal>
    </section>
  );
}
