import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Kivov Digital",
  description: "Cookie Policy for Kivov Digital.",
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <div>
      <h1 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        Cookie Policy
      </h1>
      <p className="mb-10 text-sm text-caption">Last updated: August 15, 2026</p>

      {/* Full Termly-generated policy, served as static HTML from /public. */}
      <iframe
        src="/cookies.html"
        title="Cookie Policy"
        className="h-screen w-full border-0 bg-white"
      />
    </div>
  );
}
