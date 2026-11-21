import { cardIcons } from "@/components/sections/card-icon";
import { cardLift, cardSurface } from "@/components/sections/card-surface";
import { LinkCueArrow, linkCueLabel } from "@/components/sections/link-cue";
import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import type { CardIcon } from "@/content/types";
import { cn } from "@/lib/utils";

/*
 * Card grid (vocabulary #5) — link cards on the card surface (card-surface.ts:
 * ring, resting shadow, and the hover lift). Top to bottom: an optional icon
 * tile (soft-green square, primary icon; it fills green on card hover), an
 * optional mono kicker, the row-heading title, one line, then the foot: a
 * hairline and the link cue (link-cue.tsx: "Learn more" in the linkGreen look
 * plus a primary arrow, visible at rest on every screen, since touch has no
 * hover). The foot is pinned to the bottom (`mt-auto`), so the hairlines and
 * cues in a row line up. The whole card is the one tracked CTA (card-grid
 * exception: one CTA per card, none of them filled-primary).
 *
 * Used for the Home services cards, overview pages, a service's use cases, a
 * post's related page and the "Related reading" posts on service and
 * use-case pages. One column keeps the prose measure (max-w-3xl), so a lone
 * card lines up with the text above it. Cards reveal with a 40ms stagger;
 * use inside a `staggered` Section.
 */
export type LinkCard = {
  title: React.ReactNode;
  body: React.ReactNode;
  href: string;
  event: string;
  eventProps?: Record<string, unknown>;
  /** The icon tile, by content key (card-icon.tsx). */
  icon?: CardIcon;
  kicker?: React.ReactNode;
  /** The cue's label; "Learn more" when omitted. */
  cta?: React.ReactNode;
};

const columnClasses = {
  1: "max-w-3xl",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export function CardGrid({
  cards,
  columns = 3,
  className,
}: {
  cards: LinkCard[];
  columns?: keyof typeof columnClasses;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "mt-10 grid items-stretch gap-5",
        columnClasses[columns],
        className,
      )}
    >
      {cards.map((card, i) => {
        const Icon = card.icon ? cardIcons[card.icon] : null;
        return (
          <li key={card.href}>
            <Reveal delay={i * 40} className="h-full">
              <TrackedLink
                href={card.href}
                event={card.event}
                eventProps={card.eventProps}
                className={cn(
                  "group flex h-full flex-col p-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:p-8",
                  cardSurface,
                  cardLift,
                )}
              >
                {Icon ? (
                  <span
                    className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:bg-primary group-hover:text-primary-foreground"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                ) : null}
                {card.kicker ? (
                  <MonoLabel tone="caption" className={cn(Icon && "mt-6")}>
                    {card.kicker}
                  </MonoLabel>
                ) : null}
                <h3
                  className={cn(
                    card.kicker ? "mt-3" : Icon && "mt-6",
                    "font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl",
                  )}
                >
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed">{card.body}</p>
                <span data-card-cue className="mt-auto block pt-6">
                  <span className="flex items-center gap-2 border-t border-border pt-6 font-semibold text-foreground">
                    <span className={linkCueLabel}>
                      {card.cta ?? "Learn more"}
                    </span>
                    <LinkCueArrow />
                  </span>
                </span>
              </TrackedLink>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
