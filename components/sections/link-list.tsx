import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/utils";

/*
 * Link list — the ledger list's linked twin: hairline rows, each one a
 * tracked link with a hover arrow, spread over 1–3 columns. The Home "Use
 * Cases" strip. Rows are ≥44px tall for touch.
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
            className="group flex min-h-11 items-center justify-between gap-4 rounded-sm py-4 font-semibold text-foreground transition-colors hover:text-primary"
          >
            {link.label}
            <span
              className="-translate-x-2 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100"
              aria-hidden="true"
            >
              →
            </span>
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}
