import { LedgerList } from "@/components/sections/ledger-list";
import type { Block } from "@/content/types";
import { cn } from "@/lib/utils";

/*
 * Post body — a resource post's full text from typed blocks, held to the
 * prose measure (max-w-3xl). Subheads are h2 in the row-heading recipe (the
 * same scale as StatementRows/StepRows titles — not a new size); lists are
 * LedgerList check rows.
 */
export function PostBody({
  blocks,
  className,
}: {
  blocks: Block[];
  className?: string;
}) {
  return (
    <div className={cn("mt-8 max-w-3xl", className)}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className={cn(
                i > 0 && "mt-12",
                "font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl",
              )}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return <LedgerList key={i} items={block.items} className="mt-5" />;
        }
        return (
          <p key={i} className={cn(i > 0 && "mt-5", "leading-relaxed")}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
