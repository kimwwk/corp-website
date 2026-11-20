import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * Testimonial grid — the multi-quote sibling of the pull-quote (vocabulary
 * #7), for real quotes long enough to need body type: each quote is a
 * <figure> on a hairline, paragraphs verbatim in ink, then the name and a
 * caption-mono role. Two columns when there is more than one; a single quote
 * keeps the prose measure. Each name follows its own quote (cells align to
 * the top, not to the taller quote beside them). Home shows every
 * testimonial, a service page its own — the same component on both. Use
 * inside a `staggered` Section.
 */
export type Quote = {
  name: React.ReactNode;
  role?: React.ReactNode;
  /** One string per paragraph, verbatim. */
  quote: string[];
};

export function TestimonialGrid({
  quotes,
  className,
}: {
  quotes: Quote[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-10 grid items-start gap-x-12 gap-y-12",
        quotes.length > 1 ? "md:grid-cols-2" : "max-w-3xl",
        className,
      )}
    >
      {quotes.map((q, i) => (
        <Reveal key={i} delay={(i % 2) * 40}>
          <figure className="border-t border-border pt-7">
            <blockquote className="space-y-4 leading-relaxed text-foreground">
              {q.quote.map((paragraph, j) => (
                <p key={j}>
                  {j === 0 ? "“" : null}
                  {paragraph}
                  {j === q.quote.length - 1 ? "”" : null}
                </p>
              ))}
            </blockquote>
            <figcaption className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pt-6">
              <span className="font-medium text-foreground">{q.name}</span>
              {q.role ? <MonoLabel tone="caption">{q.role}</MonoLabel> : null}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
