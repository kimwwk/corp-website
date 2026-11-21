"use client";

import Image from "next/image";

import { cardLift, cardSurface } from "@/components/sections/card-surface";
import type { Proof } from "@/content/types";
import { cn } from "@/lib/utils";
import { capture } from "@/lib/analytics";

/*
 * Product cards for the "Our product" proof items (content/proof.ts), shown
 * on App Development. Each card is a link card on the shared card surface
 * (card-surface.ts: ring, resting shadow, hover lift) and opens the product
 * in a new tab.
 */
export function ShowcaseProducts({ products }: { products: Proof[] }) {
  return (
    <div className="grid max-w-3xl gap-6">
      {products.map((product) => (
        <a
          key={product.title}
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Learn more about ${product.title}`}
          className={cn(
            "group block p-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            cardSurface,
            cardLift,
          )}
          onClick={() =>
            capture("showcase_product_clicked", {
              product_title: product.title,
              product_status: product.status,
            })
          }
        >
          <div className="flex items-start gap-5">
            {product.icon ? (
              <Image
                src={product.icon}
                alt={`${product.title} icon`}
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-xl"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              {/* Below `sm` the badge takes its own line under the name
                  (side by side, a narrow card clipped it and squeezed the
                  name); the name never breaks ("our-pot", not "our-" / "pot"). */}
              <div className="mb-2 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-xl font-semibold whitespace-nowrap text-foreground transition-colors duration-200 group-hover:text-primary">
                  {product.title}
                </h3>
                <span className="shrink-0 font-mono text-xs font-medium tracking-[0.14em] uppercase text-primary">
                  {product.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.body}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
