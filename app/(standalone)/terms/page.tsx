import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Kivov Digital",
  description: "Terms of Use for Kivov Digital.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div>
      <h1 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        Terms of Use
      </h1>
      <p className="mb-10 text-sm text-caption">Last updated: May 1, 2026</p>

      {/* Mirrors the Nuxt /terms page, which shows a Coming Soon notice. */}
      <div className="max-w-none">
        <p className="text-base leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Coming Soon.</strong> This page
          will contain our terms of use.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-caption">
          Our terms of use are currently being prepared. Please check back
          soon for the complete terms governing use of our website and
          services.
        </p>
      </div>
    </div>
  );
}
