import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * Green Ledger signature: full-width typographic interlude — one brand
 * statement set huge and centered between sections. Quiet sections follow it.
 */
export function Interlude({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-6 py-24 md:py-32", className)}>
      <Reveal className="mx-auto max-w-6xl text-center">
        <p className="mx-auto max-w-[16em] font-display text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.05] font-black tracking-[-0.02em] text-balance text-foreground">
          {children}
        </p>
      </Reveal>
    </section>
  );
}
