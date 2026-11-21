/*
 * The card surface — one recipe for every card on cream: radius, hairline
 * ring and a soft resting shadow. Link cards (CardGrid, ShowcaseProducts) add
 * `cardLift`: on hover the card rises 4px, its shadow deepens and the ring
 * turns green; translate and shadow ease over 200ms on the system curve, and
 * reduced motion keeps the card in place. PriceCard tones are their own
 * surfaces (price-card.tsx) on the same radius.
 */
export const cardSurface =
  "rounded-2xl bg-card ring-1 ring-border shadow-sm shadow-foreground/5";

export const cardLift =
  "transition-[translate,box-shadow] duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 hover:ring-primary/40 motion-reduce:hover:translate-y-0";
