import { Reveal } from "@/components/reveal";

/*
 * Statement rows — the title-left / body-right hairline rows ("What Kivov
 * helps you do", services "Included", showcase "Track record"). Rows reveal
 * with a 40ms stagger; use inside a `staggered` Section.
 */
export function StatementRows({
  rows,
}: {
  rows: { title: React.ReactNode; body: React.ReactNode; note?: React.ReactNode | null }[];
}) {
  return (
    <div className="mt-8 border-b border-border">
      {rows.map((row, i) => (
        <Reveal key={i} delay={i * 40}>
          <div className="grid gap-3 border-t border-border py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
            <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
              {row.title}
            </h3>
            <div>
              <p className="max-w-[52ch] leading-relaxed">{row.body}</p>
              {row.note ? (
                <p className="mt-2 max-w-[52ch] text-sm text-caption">
                  {row.note}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
