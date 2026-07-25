import type { Metadata } from "next";

import { FitCheck } from "@/components/fit-check";

export const metadata: Metadata = {
  title: "Free Workflow Fit Check — Kivov Digital",
  description:
    "Where is work getting stuck? A free three-minute check: eight questions, a high-level result, and one practical place to begin. No technical knowledge required.",
  openGraph: {
    title: "Free Workflow Fit Check — Kivov Digital",
    description:
      "Where is work getting stuck? A free three-minute check: eight questions, a high-level result, and one practical place to begin. No technical knowledge required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function FitCheckPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <FitCheck />
    </div>
  );
}
