import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Link cue — how a link that is not running text shows it is a link at rest
 * (touch has no hover): its label in linkGreen's underline, then a primary
 * arrow. Inside a `group` link, the label turns green on hover and the arrow
 * nudges right; neither is ever hidden until hover. Used by CardGrid's
 * "Learn more", every LinkList row and Home's "Two ways to work together"
 * rows (there the label is the row heading and the arrow scales with it).
 */
export const linkCueLabel =
  "underline decoration-primary decoration-2 underline-offset-[7px] transition-colors duration-200 group-hover:text-primary";

export function LinkCueArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "size-4 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
        className,
      )}
      aria-hidden="true"
    />
  );
}
