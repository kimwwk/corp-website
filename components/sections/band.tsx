import { MonoLabel } from "@/components/sections/mono-label";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * S1 / S3 / S6 — the deep-green band: `band-green` shell, optional forest
 * ring (`depth`), Reveal, container. `hero` sets the home-hero h1 scale;
 * everything else gets the feature h2. `breathe` is the roomier closing-band
 * padding (home). Bands never take border-t — the color change separates.
 */
const depths = {
  "bottom-right": "right-[-14%] bottom-[-52%]",
  "top-right": "top-[-58%] right-[-16%]",
  "top-left": "top-[-58%] left-[-12%]",
} as const;

export function Band({
  id,
  eyebrow,
  title,
  hero = false,
  breathe = false,
  depth,
  className,
  children,
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  hero?: boolean;
  breathe?: boolean;
  depth?: keyof typeof depths;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "band-green relative overflow-hidden bg-background px-6",
        breathe ? "py-24 md:py-32" : "py-20 md:py-28",
        id && "scroll-mt-16",
        className,
      )}
    >
      {depth ? (
        <div className={cn("band-depth", depths[depth])} aria-hidden="true" />
      ) : null}
      <Reveal className="relative mx-auto max-w-6xl">
        {eyebrow ? <MonoLabel tone="caption">{eyebrow}</MonoLabel> : null}
        {title ? (
          hero ? (
            <h1
              className={cn(
                eyebrow && "mt-6",
                "max-w-[11em] font-display text-[clamp(2.1rem,8vw,6rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground",
              )}
            >
              {title}
            </h1>
          ) : (
            <h2
              className={cn(
                eyebrow && "mt-5",
                "max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.05] font-black tracking-tight text-balance text-foreground",
              )}
            >
              {title}
            </h2>
          )
        ) : null}
        {children}
      </Reveal>
    </section>
  );
}
