import type { Metadata } from "next";
import Link from "next/link";

import { BookingWidget } from "@/components/booking-widget";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "Book a Call — Kivov Digital",
  description:
    "Pick a time and we'll talk it through live on Zoom. If you're still exploring, start with the free Workflow Fit Check instead.",
  openGraph: {
    title: "Book a Call — Kivov Digital",
    description:
      "Pick a time and we'll talk it through live on Zoom. If you're still exploring, start with the free Workflow Fit Check instead.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BookPage() {
  /* Wider than the standard content column so the Calendly iframe clears
     ~1000px and renders its two-column horizontal layout. */
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mb-10 max-w-3xl">
        <Eyebrow className="mb-6 text-xs">Book a call</Eyebrow>
        <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Book a call.
        </h1>
        <p className="text-lg leading-relaxed">
          The fastest way to talk it through, live on Zoom. If you&apos;re
          exploring, start with the{" "}
          <Link
            href="/fit-check"
            className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            free fit check
          </Link>{" "}
          instead: you&apos;ll get further, faster.
        </p>
      </div>

      <BookingWidget />

      <div className="mt-12 max-w-3xl">
        <p className="text-sm text-caption">
          Prefer to write a few lines first instead?{" "}
          <Link
            href="/contact"
            className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Send an inquiry
          </Link>{" "}
          and I&apos;ll reply within one business day.
        </p>
      </div>
    </div>
  );
}
