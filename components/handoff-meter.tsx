"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * The services signature device: a You → Us gauge showing how much of the
 * work moves to Kivov at each engagement level. Custom CSS (globals.css)
 * because no shadcn primitive carries this meaning — Progress/Slider have
 * the wrong semantics. `stops` renders journey-rail dots (hero variant).
 */
export function HandoffMeter({
  toUs,
  stops,
  onDark = false,
  animateOnLoad = false,
  className,
}: {
  /** Percentage of the work that moves to us, e.g. 55 */
  toUs: number;
  /** Optional rail-stop positions (percentages), e.g. [8, 50, 92] */
  stops?: number[];
  onDark?: boolean;
  animateOnLoad?: boolean;
  className?: string;
}) {
  const [run, setRun] = React.useState(!animateOnLoad);

  React.useEffect(() => {
    if (!animateOnLoad) return;
    // Double rAF so the 0% start state paints before the sweep begins.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setRun(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [animateOnLoad]);

  return (
    <div
      role="img"
      aria-label={`Hand-off meter: about ${toUs}% of the work moves to us`}
      className={cn(
        "relative",
        animateOnLoad && "hero-meter",
        animateOnLoad && run && "run",
        className,
      )}
      style={{ "--to-us": `${toUs}%` } as React.CSSProperties}
    >
      <div className={cn("meter-track", onDark && "on-dark")}>
        <div
          className={cn(
            "meter-fill",
            onDark && "on-dark",
            animateOnLoad && "hero-fill",
          )}
        />
      </div>
      {stops?.map((stop) => (
        <div
          key={stop}
          className={cn("rail-stop", stop <= toUs && "reached")}
          style={{ left: `${stop}%` }}
          aria-hidden="true"
        />
      ))}
      <div
        className={cn(
          "meter-knob",
          onDark && "on-dark",
          animateOnLoad && "hero-knob",
        )}
      />
    </div>
  );
}
