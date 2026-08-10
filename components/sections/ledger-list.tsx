import { cn } from "@/lib/utils";

/*
 * The ledger list — hairline rows with a square bullet or a check. One
 * column reads as a ledger (border-b closes the run); two columns spread
 * checklists. Check tone goes leaf inside green bands.
 */
function CheckGlyph({ tone = "green" }: { tone?: "green" | "leaf" }) {
  return (
    <svg
      className={cn(
        "mt-1 size-4 shrink-0",
        tone === "leaf" ? "text-brand-mint" : "text-primary",
      )}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8.5 6 12l7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LedgerList({
  items,
  marker = "square",
  tone = "green",
  columns = 1,
  className,
}: {
  items: React.ReactNode[];
  marker?: "square" | "check";
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
            "flex gap-3 border-t border-border",
            marker === "square" && "items-start py-3",
            marker === "check" &&
              (columns === 2
                ? "py-4 leading-relaxed text-foreground"
                : "py-3"),
          )}
        >
          {marker === "square" ? (
            <span
              className="mt-[0.55em] size-2 shrink-0 rounded-[2px] bg-primary"
              aria-hidden="true"
            />
          ) : (
            <CheckGlyph tone={tone} />
          )}
          <span
            className={cn(
              marker === "check" && columns === 1 && "text-foreground",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
