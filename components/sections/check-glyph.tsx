import { cn } from "@/lib/utils";

/*
 * The check glyph — the one bullet on the site. Every list row starts with it
 * (LedgerList rows, PriceCard bullets). Green on cream, leaf inside green
 * bands. `mt-1` sits it on a 17px line; rows in `text-sm` pass `mt-0.5`.
 */
export function CheckGlyph({
  tone = "green",
  className,
}: {
  tone?: "green" | "leaf";
  className?: string;
}) {
  return (
    <svg
      className={cn(
        "mt-1 size-4 shrink-0",
        tone === "leaf" ? "text-brand-mint" : "text-primary",
        className,
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
