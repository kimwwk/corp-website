import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * P2 — the cream page header for inner pages that open without a band
 * (overview pages, resource posts): eyebrow → page h1 → optional lead, then
 * any children (a date line, a CtaRow). The section after it is a cream
 * <Section>, which brings its own border-t.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  className,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("px-6 py-20 md:py-28", className)}>
      <Reveal className="mx-auto max-w-6xl">
        {eyebrow ? <MonoLabel>{eyebrow}</MonoLabel> : null}
        <h1
          className={cn(
            eyebrow && "mt-6",
            "font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground",
          )}
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{lead}</p>
        ) : null}
        {children}
      </Reveal>
    </section>
  );
}
