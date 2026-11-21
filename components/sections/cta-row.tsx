import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TrackedExternalLink, TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

/*
 * The CTA row: one primary pill + optional secondary text link(s), wrapping
 * with the standard gaps. `tone="band"` switches to the on-green idiom (cream
 * pill darkens to inkdeep, leaf underline on the text link). One primary per
 * section — every other action is a text link — and at most 2 actions in
 * all: the second only when it is relevant to this page's reader. The row
 * throws at build time past 2. `secondary` takes one link or a list, rendered
 * in order. An `external` secondary opens in a new tab (e.g. a LinkedIn
 * original).
 */
const MAX_ACTIONS = 2;
export type Cta = {
  label: React.ReactNode;
  href: string;
  event: string;
  eventProps?: Record<string, unknown>;
  external?: boolean;
  arrow?: boolean;
};

const links = {
  cream:
    "inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary",
  band: "inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-brand-mint decoration-2 underline-offset-[7px] transition-colors hover:text-caption",
} as const;

export function CtaRow({
  tone = "cream",
  primary,
  secondary,
  className,
}: {
  tone?: keyof typeof links;
  primary?: Cta;
  secondary?: Cta | Cta[];
  className?: string;
}) {
  const secondaries = secondary ? (Array.isArray(secondary) ? secondary : [secondary]) : [];
  if ((primary ? 1 : 0) + secondaries.length > MAX_ACTIONS) {
    throw new Error(`CtaRow: at most ${MAX_ACTIONS} CTAs per section`);
  }
  return (
    <div
      className={cn("mt-9 flex flex-wrap items-center gap-x-8 gap-y-4", className)}
    >
      {primary ? (
        <Button
          size="xl"
          className={cn("rounded-full", tone === "band" && "hover:text-inkdeep")}
          render={
            primary.external ? (
              <TrackedExternalLink
                href={primary.href}
                event={primary.event}
                eventProps={primary.eventProps}
              />
            ) : (
              <TrackedLink
                href={primary.href}
                event={primary.event}
                eventProps={primary.eventProps}
              />
            )
          }
        >
          {primary.label}
          {primary.arrow ? (
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          ) : null}
        </Button>
      ) : null}
      {secondaries.map((link) =>
        link.external ? (
          <TrackedExternalLink
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            event={link.event}
            eventProps={link.eventProps}
            className={links[tone]}
          >
            {link.label}
          </TrackedExternalLink>
        ) : (
          <TrackedLink
            key={link.href}
            href={link.href}
            event={link.event}
            eventProps={link.eventProps}
            className={links[tone]}
          >
            {link.label}
          </TrackedLink>
        ),
      )}
    </div>
  );
}

/* The mono support line that closes a CTA block. */
export function Support({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "mt-8 block font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
