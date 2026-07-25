import { cn } from "@/lib/utils";

/* Mono uppercase kicker used above headings (Kivov "eyebrow" style). */
export function Eyebrow({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-sm font-medium tracking-[0.2em] uppercase text-primary",
        className,
      )}
      {...props}
    />
  );
}
