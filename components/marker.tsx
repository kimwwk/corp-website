import { cn } from "@/lib/utils";

/*
 * Green Ledger signature: hand-drawn marker underline beneath a word or short
 * phrase. Draws once when a wrapping <Reveal> gains .in (CSS in globals.css);
 * static under reduced motion. tone="leaf" on green bands, "green" on cream.
 */
export function Marker({
  children,
  tone = "green",
  className,
}: {
  children: React.ReactNode;
  tone?: "green" | "leaf";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-block whitespace-nowrap [isolation:isolate]",
        className,
      )}
    >
      {children}
      {/* -z-10 + isolation: the stroke draws BEHIND the glyphs, so descenders
          stay clean (per prototype foundation). */}
      <svg
        className={cn(
          "marker-draw absolute right-[-2.5%] bottom-[-0.1em] left-[-2.5%] -z-10 h-[0.26em] w-[105%]",
          tone === "leaf" ? "text-brand-mint" : "text-primary",
        )}
        viewBox="0 0 240 18"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M5 13 C 55 16, 105 6, 148 10 S 225 9, 236 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          pathLength="1"
        />
      </svg>
    </span>
  );
}
