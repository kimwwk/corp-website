"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { capture } from "@/lib/analytics";

const products = [
  {
    title: "sprinting.run",
    description:
      "Periodization software for sprint coaches, with AI session planning built in.",
    status: "Live on Web",
    href: "https://sprinting.run",
    icon: "/sprinting-run-icon.png",
  },
  {
    title: "our-pot",
    description:
      "Household expense tracking. Say what you spent, review the entry, approve.",
    status: "Available on Android",
    href: "https://our-pot-site.kivov-digital.workers.dev/",
    icon: "/our-pot-icon.png",
  },
];

export function ShowcaseProducts() {
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
                <Image
                  src={product.icon}
                  alt={`${product.title} icon`}
                  width={64}
                  height={64}
                  className="size-16 shrink-0 rounded-xl"
                />
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
                    {product.description}
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
