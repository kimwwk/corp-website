import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TrackedExternalLink, TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

/*
 * The CTA row: one primary pill + optional secondary text link, wrapping with
 * the standard gaps. `tone="band"` switches to the on-green idiom (cream pill
 * darkens to inkdeep, leaf underline on the text link). One primary per
 * section — the second action is always the text link.
 */
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
  secondary?: Cta;
  className?: string;
}) {
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
      {secondary ? (
        <TrackedLink
          href={secondary.href}
          event={secondary.event}
          eventProps={secondary.eventProps}
          className={links[tone]}
        >
          {secondary.label}
        </TrackedLink>
      ) : null}
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
