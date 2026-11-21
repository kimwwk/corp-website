import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * S2 — the standard cream section: shell, border-t separator, Reveal,
 * max-w-6xl container, then eyebrow → h2 → optional lead. Every section with
 * an eyebrow carries a title: the eyebrow is the label above the h2, never a
 * heading on its own. `flush` drops the border-t (first section after a band
 * or interlude). `staggered` reveals only the header here so children can
 * carry their own <Reveal delay={…}> rows.
 *
 * `layout="split"`: from `lg`, a 12-column grid with the header in columns
 * 1–5 (sticky under the site header) and the children in columns 6–12; below
 * `lg` it stacks like the default. Every FAQ section uses it.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  layout = "stack",
  flush = false,
  staggered = false,
  className,
  children,
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  layout?: "stack" | "split";
  flush?: boolean;
  staggered?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const header = (
    <>
      {eyebrow ? <MonoLabel>{eyebrow}</MonoLabel> : null}
      {title ? (
        <h2
          className={cn(
            eyebrow && "mt-5",
            "max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground",
          )}
        >
          {title}
        </h2>
      ) : null}
      {lead ? <p className="mt-5 max-w-3xl text-lg leading-relaxed">{lead}</p> : null}
    </>
  );
  const shell = cn(
    "px-6 py-20 md:py-28",
    id && "scroll-mt-16",
    !flush && "border-t border-border",
    className,
  );

  if (layout === "split") {
    return (
      <section id={id} className={shell}>
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            {header}
          </Reveal>
          {staggered ? (
            <div className="lg:col-span-7">{children}</div>
          ) : (
            <Reveal className="lg:col-span-7">{children}</Reveal>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={shell}>
      {staggered ? (
        <div className="mx-auto max-w-6xl">
          <Reveal>{header}</Reveal>
          {children}
        </div>
      ) : (
        <Reveal className="mx-auto max-w-6xl">
          {header}
          {children}
        </Reveal>
      )}
    </section>
  );
}
