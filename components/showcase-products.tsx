"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import type { Proof } from "@/content/types";
import { capture } from "@/lib/analytics";

/*
 * Product cards for the "Our product" proof items (content/proof.ts), shown
 * on App Development. Each card opens the product in a new tab.
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
          className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={() =>
            capture("showcase_product_clicked", {
              product_title: product.title,
              product_status: product.status,
            })
          }
        >
          <Card className="ring-border transition-all duration-200 [--card-spacing:--spacing(6)] group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-primary/40 motion-reduce:transform-none">
            <CardContent>
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
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <h2 className="text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                      {product.title}
                    </h2>
                    <span className="shrink-0 font-mono text-xs font-medium tracking-[0.14em] uppercase text-primary">
                      {product.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.body}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
