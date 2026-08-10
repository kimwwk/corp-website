import { Reveal } from "@/components/reveal";

/*
 * Step rows — the "How it works" ledger: huge primary numerals over hairline
 * rows (home + audit share this shape). Numerals use the registered step
 * scale. Use inside a `staggered` Section.
 */
export function StepRows({
  steps,
}: {
  steps: { title: React.ReactNode; body: React.ReactNode }[];
}) {
  return (
    <ol className="mt-8 border-t border-border">
      {steps.map((step, i) => (
        <li key={i} className="border-b border-border">
          <Reveal
            delay={i * 40}
            className="grid grid-cols-[minmax(2.4rem,3rem)_minmax(0,1fr)] gap-x-6 py-8 md:grid-cols-[minmax(3.4rem,6rem)_minmax(0,1fr)] md:gap-x-12 md:py-11"
          >
            <p
              className="font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-none font-black text-primary"
              aria-hidden="true"
            >
              {i + 1}
            </p>
            <div>
              <h3 className="pt-1 font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[60ch] leading-relaxed">{step.body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
