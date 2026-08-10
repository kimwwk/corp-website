import { cn } from "@/lib/utils";

/*
 * The mono label — eyebrows, kickers, support lines, price units. One recipe,
 * three inks: green on cream (eyebrow), caption (support / on green bands),
 * ink (list kickers). Tracking is always 0.14em at this size.
 */
const tones = {
  green: "text-primary",
  caption: "text-caption",
  ink: "text-foreground",
} as const;

export function MonoLabel({
  tone = "green",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
