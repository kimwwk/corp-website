import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Kivov Digital",
  description: "Privacy Policy for Kivov Digital.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div>
      <h1 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        Privacy Policy
      </h1>
      <p className="mb-10 text-sm text-caption">Last updated: June 20, 2026</p>

      {/* Full Termly-generated policy, served as static HTML from /public. */}
      <iframe
        src="/privacy.html"
        title="Privacy Policy"
        className="h-screen w-full border-0 bg-white"
      />
    </div>
  );
}
