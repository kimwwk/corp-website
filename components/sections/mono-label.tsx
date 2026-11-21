import { cn } from "@/lib/utils";

/*
 * The mono label — eyebrows, kickers, support lines, price units. One recipe,
 * three inks: green on cream (eyebrow), caption (support / on green bands),
 * ink (list kickers). Tracking is always 0.14em at this size.
 *
 * `as="h2"` makes the label a heading with the identical look. Its one use is
 * the resource post's Short answer panel; everywhere else a section's eyebrow
 * sits above a real section h2.
 */
const tones = {
  green: "text-primary",
  caption: "text-caption",
  ink: "text-foreground",
} as const;

export function MonoLabel({
  tone = "green",
  as: Tag = "p",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  as?: "p" | "h2";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-xs font-medium tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
