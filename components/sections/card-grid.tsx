import { LinkCueArrow, linkCueLabel } from "@/components/sections/link-cue";
import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

/*
 * Card grid (vocabulary #5) — link cards: optional mono kicker, row-heading
 * title, one line, and the link cue at the foot (link-cue.tsx): "Learn more"
 * in the linkGreen look plus a primary arrow, visible at rest on every screen
 * (touch has no hover). On hover the label turns green and the arrow nudges
 * right. The
 * whole card is the one tracked CTA (card-grid exception: one CTA per card,
 * none of them filled-primary). Used for the Home services cards, overview
 * pages, a service's use cases, a post's related page and the "Related
 * reading" posts on service and use-case pages. One column keeps the prose
 * measure (max-w-3xl), so a lone card lines up with the text above it. Cards
 * reveal with a 40ms stagger; use inside a `staggered` Section.
 */
export type LinkCard = {
  title: React.ReactNode;
  body: React.ReactNode;
  href: string;
  event: string;
  eventProps?: Record<string, unknown>;
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
      {cards.map((card, i) => (
        <li key={card.href}>
          <Reveal delay={i * 40} className="h-full">
            <TrackedLink
              href={card.href}
              event={card.event}
              eventProps={card.eventProps}
              className="group flex h-full flex-col rounded-2xl bg-card p-7 ring-1 ring-border transition-shadow duration-200 outline-none hover:ring-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {card.kicker ? (
                <MonoLabel tone="caption">{card.kicker}</MonoLabel>
              ) : null}
              <h3
                className={cn(
                  card.kicker && "mt-3",
                  "font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl",
                )}
              >
                {card.title}
              </h3>
              <p className="mt-3 leading-relaxed">{card.body}</p>
              <span
                data-card-cue
                className="mt-auto flex items-center gap-2 pt-6 font-semibold text-foreground"
              >
                <span className={linkCueLabel}>
                  {card.cta ?? "Learn more"}
                </span>
                <LinkCueArrow />
              </span>
            </TrackedLink>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
