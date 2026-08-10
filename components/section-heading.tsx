import { cn } from "@/lib/utils";

/*
 * Editorial section header: mono index + hairline rule + eyebrow, then an
 * Archivo display headline and optional lead. Keeps a consistent rhythm
 * across sections.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  className,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <div className="mb-5 flex items-center gap-4">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
          {index}
        </span>
        <span className="h-px w-10 bg-primary/40" aria-hidden="true" />
        <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-caption">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-3xl leading-[1.08] font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
