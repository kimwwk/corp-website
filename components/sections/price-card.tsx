import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MonoLabel } from "@/components/sections/mono-label";
import { TrackedLink } from "@/components/tracked-link";
import type { OfferCard } from "@/content/types";
import { cn } from "@/lib/utils";

/*
 * Price card — one offer: mono eyebrow, card name, price (+ optional
 * struck-through earlier price, a `<del>` after a screen-reader "Regular
 * price" label) and optional mono unit, a hairline, the intro line,
 * square-bullet list, then optional "Best for", guarantee and caption notes,
 * with the card's one CTA pinned to the foot (`mt-auto`), so cards in a row
 * line their buttons up.
 *
 * Tones: "plain" (`ring-1 ring-border`), "highlight" (`ring-2 ring-primary/40`,
 * green eyebrow; the featured card) and "deep" (`band-green`, which re-themes
 * every token inside; leaf bullets, and the filled pill darkens its text to
 * inkdeep on hover). One CTA per card, at most one filled pill per surface.
 *
 * The card fills its cell (`h-full`); the caller wraps it in `<Reveal>` and
 * sets the grid or width. Used on /ai-starters (three across) and a service
 * page's "How to start" (one card, `max-w-xl`).
 */
const tones = {
  plain: "bg-card ring-1 ring-border",
  highlight: "bg-card ring-2 ring-primary/40",
  deep: "band-green bg-background",
} as const;

/* Bold lead + its text: a space between, unless the text opens with punctuation. */
function Lead({ lead, text }: { lead?: string; text: string }) {
  if (!lead) return <>{text}</>;
  return (
    <>
      <span className="font-medium text-foreground">{lead}</span>
      {/^[,.;:]/.test(text) ? "" : " "}
      {text}
    </>
  );
}

export function PriceCard({
  tone,
  eyebrow,
  name,
  price,
  was,
  unit,
  intro,
  bullets,
  bestFor,
  guarantee,
  notes,
  cta,
  className,
}: OfferCard & { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col rounded-2xl p-7", tones[tone], className)}>
      <MonoLabel tone={tone === "highlight" ? "green" : "caption"}>{eyebrow}</MonoLabel>
      <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
        {name}
      </h3>
      {/* The spaces between the parts are for the text content (crawlers,
          answer engines, copy-paste: "$495 Regular price $750 CAD"); the flex
          row drops them from the layout, so the gaps alone set the look. */}
      <p className={cn("mt-4 flex items-baseline", was ? "gap-2.5" : "gap-2")}>
        <span className="font-display text-4xl font-black text-foreground tabular-nums">
          {price}
        </span>
        {was ? (
          <>
            {" "}
            <span className="sr-only">Regular price </span>
            <del className="font-display text-xl font-bold text-caption tabular-nums line-through decoration-[1.5px]">
              {was}
            </del>
          </>
        ) : null}
        {unit ? (
          <>
            {" "}
            <span className="font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
              {unit}
            </span>
          </>
        ) : null}
      </p>
      <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed">{intro}</p>
      <ul className="mt-4 space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span
              className={cn(
                "mt-[0.55em] size-[7px] shrink-0 rounded-[2px]",
                tone === "deep" ? "bg-brand-mint" : "bg-primary",
              )}
              aria-hidden="true"
            />
            <span>
              <Lead lead={b.lead} text={b.text} />
            </span>
          </li>
        ))}
      </ul>
      {bestFor ? (
        <p className="mt-4 text-sm leading-relaxed">
          <Lead lead="Best for:" text={bestFor} />
        </p>
      ) : null}
      {guarantee ? (
        <p className="mt-3 text-sm leading-relaxed">
          <Lead lead={guarantee.lead} text={guarantee.text} />
        </p>
      ) : null}
      {notes?.map((note, i) => (
        <p key={i} className="mt-3 text-xs text-caption">
          {note}
        </p>
      ))}
      <div className="mt-auto pt-6">
        <Button
          variant={cta.style === "outline" ? "outline" : "default"}
          size="xl"
          className={cn(
            "w-full rounded-full",
            tone === "deep" && cta.style === "filled" && "hover:text-inkdeep",
          )}
          render={
            <TrackedLink href={cta.href} event={cta.event} eventProps={cta.eventProps} />
          }
        >
          {cta.label}
          {cta.arrow ? <ArrowRight data-icon="inline-end" aria-hidden="true" /> : null}
        </Button>
      </div>
    </div>
  );
}
