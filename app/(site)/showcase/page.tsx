import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShowcaseProducts } from "@/components/showcase-products";

export const metadata: Metadata = {
  title: "Showcase — Kivov Digital",
  description:
    "Applications we have built. AI-powered tools designed to be practical, fast, and useful.",
  openGraph: {
    title: "Showcase — Kivov Digital",
    description:
      "Applications we have built. AI-powered tools designed to be practical, fast, and useful.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ShowcasePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-6 font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase">
          Showcase
        </p>
        <h1 className="mb-4 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-foreground">
          Applications we&apos;ve built
        </h1>
        <p className="text-lg leading-relaxed">
          Practical AI-powered tools, shipped and in use today.
        </p>
      </div>

      <ShowcaseProducts />

      <div className="mt-12 max-w-3xl border-t border-border pt-8">
        <p className="mb-4">
          More applications in development. Want to talk about a project?
        </p>
        <Button size="xl" className="rounded-full" render={<Link href="/contact" />}>
          Get in touch
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
