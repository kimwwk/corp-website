import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CheckGlyph } from "@/components/sections/check-glyph";
import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import type { OfferCard } from "@/content/types";
import { cn } from "@/lib/utils";

/*
 * Price card — one offer: mono eyebrow, card name, price (+ optional
 * struck-through earlier price, a `<del>` after a screen-reader "Regular
 * price" label) and optional mono unit, a hairline, the intro line, check-row
 * bullets, then optional "Best for", guarantee and caption notes, with the
 * card's one CTA pinned to the foot (`mt-auto`), so cards in a row line their
 * buttons up. Not a link, so it never lifts on hover.
 *
 * Tones, from quiet to premium (a ladder reads left to right):
 * - "quiet": no fill, a hairline ring, no shadow; the cream page shows through.
 * - "highlight": the featured card, white with a green ring and a soft shadow;
 *   green eyebrow, and the surface's one filled pill.
 * - "deep": a green card (`band-green`, which re-themes every token inside)
 *   with the deepest shadow; leaf checks, and a filled pill darkens its text to
 *   inkdeep on hover.
 * One CTA per card, at most one filled pill per surface.
 *
 * The card fills its cell (`h-full`). `PriceLadder` sets a row of them as the
 * /ai-starters staircase; a lone card (a service page's "How to start") is
 * wrapped in `<Reveal>` by its caller, which sets the width (`max-w-xl`).
 */
export const priceCardTones = {
  quiet: "bg-transparent ring-1 ring-border",
  highlight: "bg-card ring-2 ring-primary/40 shadow-lg shadow-foreground/5",
  deep: "band-green bg-background",
} as const;

/* The deep card's shadow sits on a wrapper outside `band-green`: inside the
   band `foreground` is cream, so `shadow-foreground/10` on the card itself
   would cast a cream shadow on the cream page. */
const deepShadow = "shadow-xl shadow-foreground/10";

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

/*
 * The bullets: check rows at `text-sm` (`border-t border-border py-2.5`, the
 * check glyph first, leaf on green), a bold `lead` in `font-medium
 * text-foreground` before its text. Exported for the /audit hero price card.
 */
export function PriceBullets({
  bullets,
  tone = "green",
  className,
}: {
  bullets: OfferCard["bullets"];
  tone?: "green" | "leaf";
  className?: string;
}) {
  return (
    <ul className={cn("mt-4", className)}>
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-3 border-t border-border py-2.5 text-sm">
          <CheckGlyph tone={tone} className="mt-0.5" />
          <span>
            <Lead lead={b.lead} text={b.text} />
          </span>
        </li>
      ))}
    </ul>
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
  const card = (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl p-7",
        priceCardTones[tone],
        tone !== "deep" && className,
      )}
    >
      <MonoLabel tone={tone === "highlight" ? "green" : "caption"}>{eyebrow}</MonoLabel>
      <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
        {name}
      </h3>
      {/* The spaces between the parts are for the text content (crawlers,
          answer engines, copy-paste: "$495 Regular price $750 CAD"); the flex
          row drops them from the layout, so the gaps alone set the look. */}
      <p className={cn("mt-4 flex items-baseline", was ? "gap-2.5" : "gap-2")}>
        <span className="font-display text-4xl font-black text-foreground tabular-nums md:text-5xl">
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
      <PriceBullets bullets={bullets} tone={tone === "deep" ? "leaf" : "green"} />
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
  return tone === "deep" ? (
    <div className={cn("h-full rounded-2xl", deepShadow, className)}>{card}</div>
  ) : (
    card
  );
}

/*
 * The price ladder (/ai-starters): up to three cards side by side from `lg`,
 * quiet → highlight → deep, stepping up left to right (`lg:mt-16` /
 * `lg:mt-8` / `lg:mt-0`). The cells stretch to the row, so each card's top
 * steps while its foot and button stay level. Below `lg` they stack with no
 * offsets. Cards reveal with a 40ms stagger.
 */
const ladderSteps = ["lg:mt-16", "lg:mt-8", "lg:mt-0"] as const;

export function PriceLadder({
  cards,
  className,
}: {
  cards: OfferCard[];
  className?: string;
}) {
  const steps = ladderSteps.slice(ladderSteps.length - cards.length);
  return (
    <div className={cn("mt-10 grid items-stretch gap-5 lg:grid-cols-3", className)}>
      {cards.map((card, i) => (
        <Reveal key={card.name} delay={i * 40} className={steps[i]}>
          <PriceCard {...card} />
        </Reveal>
      ))}
    </div>
  );
}
