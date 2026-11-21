import { CheckGlyph } from "@/components/sections/check-glyph";
import { cn } from "@/lib/utils";

/*
 * The ledger list — check rows: hairline rows, each opening with the check
 * glyph, text in ink (Home's pain-point list). One column reads as a ledger
 * (border-b closes the run); two columns spread checklists. The check goes
 * leaf inside green bands.
 */
export function LedgerList({
  items,
  tone = "green",
  columns = 1,
  className,
}: {
  items: React.ReactNode[];
  tone?: "green" | "leaf";
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        columns === 2
          ? "grid gap-x-12 md:grid-cols-2"
          : "border-b border-border",
        className,
      )}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            "flex gap-3 border-t border-border text-foreground",
            columns === 2 ? "py-4 leading-relaxed" : "py-3",
          )}
        >
          <CheckGlyph tone={tone} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
