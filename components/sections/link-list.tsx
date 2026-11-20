import { LinkCueArrow, linkCueLabel } from "@/components/sections/link-cue";
import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

/*
 * Link list — the ledger list's linked twin: hairline rows, each one a
 * tracked link spread over 1–3 columns. The Home "Use Cases" strip. Each
 * name shows the link cue at rest (link-cue.tsx: linkGreen underline plus a
 * primary arrow), since touch has no hover. Rows are ≥44px tall for touch.
 */
export type ListLink = {
  label: React.ReactNode;
  href: string;
  event: string;
  eventProps?: Record<string, unknown>;
};

const columnClasses = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
} as const;

export function LinkList({
  links,
  columns = 3,
  className,
}: {
  links: ListLink[];
  columns?: keyof typeof columnClasses;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "mt-8 grid gap-x-12 border-b border-border",
        columnClasses[columns],
        className,
      )}
    >
      {links.map((link) => (
        <li key={link.href} className="border-t border-border">
          <TrackedLink
            href={link.href}
            event={link.event}
            eventProps={link.eventProps}
            className="group flex min-h-11 items-center gap-2 rounded-sm py-4 font-semibold text-foreground"
          >
            <span className={linkCueLabel}>{link.label}</span>
            <LinkCueArrow />
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}
