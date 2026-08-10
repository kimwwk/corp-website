import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * S2 — the standard cream section: shell, border-t separator, Reveal,
 * max-w-6xl container, then eyebrow → h2 → lead. `flush` drops the border-t
 * (first section after a band or interlude). `staggered` reveals only the
 * header here so children can carry their own <Reveal delay={…}> rows.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  flush = false,
  staggered = false,
  className,
  children,
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lead?: React.ReactNode;
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
      {lead ? <p className="mt-5 max-w-3xl leading-relaxed">{lead}</p> : null}
    </>
  );
  return (
    <section
      id={id}
      className={cn(
        "px-6 py-20 md:py-28",
        id && "scroll-mt-16",
        !flush && "border-t border-border",
        className,
      )}
    >
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
