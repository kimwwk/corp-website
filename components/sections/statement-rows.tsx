import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";

/*
 * Statement rows — the title-left / body-right hairline rows ("What Kivov
 * helps you do", ai-packages "Included", service "What's included"). Rows reveal
 * with a 40ms stagger; use inside a `staggered` Section.
 *
 * A row with a `link` renders its title as a tracked link (service "How to
 * start": each package name links to its page): the heading keeps its type,
 * plus linkGreen's underline and hover.
 */
export type StatementRow = {
  title: React.ReactNode;
  body: React.ReactNode;
  note?: React.ReactNode | null;
  link?: { href: string; event: string; eventProps?: Record<string, unknown> };
};

const titleLink =
  "rounded-sm underline decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary";

export function StatementRows({ rows }: { rows: StatementRow[] }) {
  return (
    <div className="mt-8 border-b border-border">
      {rows.map((row, i) => (
        <Reveal key={i} delay={i * 40}>
          <div className="grid gap-3 border-t border-border py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
            <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
              {row.link ? (
                <TrackedLink
                  href={row.link.href}
                  event={row.link.event}
                  eventProps={row.link.eventProps}
                  className={titleLink}
                >
                  {row.title}
                </TrackedLink>
              ) : (
                row.title
              )}
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
