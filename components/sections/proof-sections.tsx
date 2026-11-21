import { ArrowRight } from "lucide-react";

import { CtaRow } from "@/components/sections/cta-row";
import { Section } from "@/components/sections/section";
import { ShowcaseProducts } from "@/components/showcase-products";
import { sectionHeadings } from "@/content/section-headings";
import type { Proof } from "@/content/types";
import { cn } from "@/lib/utils";

/*
 * Proof — the labelled items from content/proof.ts (the former /showcase case
 * recipe). Each item is a cream Section: its label as the eyebrow (Client
 * build, Track record, Our product, Demo, Capability; never "Case Study"),
 * the title as h2, the body as a lead, then the optional before → after
 * delta, stat row, mono footnote and pull-line. "Our product" items render
 * together as one Section of ShowcaseProducts cards, under the shared h2
 * `sectionHeadings.ourProducts`.
 */
const rowHeading =
  "font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl";

function ProofSection({
  item,
  flush,
  sourcePage,
}: {
  item: Proof;
  flush: boolean;
  sourcePage: string;
}) {
  const hasDelta = Boolean(item.from && item.to);
  return (
    <Section flush={flush} eyebrow={item.label} title={item.title} lead={item.body}>
      {hasDelta ? (
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border py-5">
          <span className="font-medium text-caption">{item.from}</span>
          {/* The arrow travels with the "after" pill, so a narrow screen wraps
              the pair together instead of leaving the arrow pointing at space. */}
          <span className="flex items-center gap-x-5">
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
            <span className="rounded-lg bg-secondary px-4 py-1.5 font-semibold text-foreground">
              {item.to}
            </span>
          </span>
        </div>
      ) : null}
      {item.stats?.length ? (
        <div
          className={cn(
            "grid border-b border-border md:grid-cols-3",
            !hasDelta && "mt-7 border-t",
          )}
        >
          {item.stats.map((s, j) => (
            <div
              key={s.label + j}
              className={cn(
                "py-5",
                j > 0 && "border-t border-border md:border-t-0 md:border-l md:pl-6",
              )}
            >
              <p className="font-display text-[clamp(1.55rem,3.4vw,2.5rem)] leading-[1.06] font-black tracking-tight text-primary tabular-nums">
                {s.n}
              </p>
              <p className="mt-2 font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {item.foot ? (
        <p className="mt-4 font-mono text-xs font-medium text-caption">{item.foot}</p>
      ) : null}
      {item.pullLine ? (
        <p className={`${rowHeading} mt-10 max-w-[30em]`}>{item.pullLine}</p>
      ) : null}
      {item.href ? (
        <CtaRow
          secondary={{
            label: item.title,
            href: item.href,
            external: /^https?:/.test(item.href),
            event: "proof_link_clicked",
            eventProps: { source_page: sourcePage, proof_id: item.id },
          }}
        />
      ) : null}
    </Section>
  );
}

export function ProofSections({
  items,
  sourcePage,
  flushFirst = false,
}: {
  items: Proof[];
  /** The page slug, for analytics. */
  sourcePage: string;
  /** Drop the first section's border-t (when it follows a band). */
  flushFirst?: boolean;
}) {
  const products = items.filter((p) => p.label === "Our product");
  const others = items.filter((p) => p.label !== "Our product");
  return (
    <>
      {others.map((item, i) => (
        <ProofSection
          key={item.id}
          item={item}
          flush={flushFirst && i === 0}
          sourcePage={sourcePage}
        />
      ))}
      {products.length ? (
        <Section
          flush={flushFirst && others.length === 0}
          eyebrow="Our product"
          title={sectionHeadings.ourProducts}
        >
          <div className="mt-8">
            <ShowcaseProducts products={products} />
          </div>
        </Section>
      ) : null}
    </>
  );
}
