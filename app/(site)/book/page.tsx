import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { BookingWidget } from "@/components/booking-widget";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "Book Your Free AI Assessment — Kivov Digital",
  description:
    "Pick a time that works — weekdays 10am–4pm ET, starting tomorrow. A free 45-minute call about how your business runs, then a written report of practical AI quick wins.",
  openGraph: {
    title: "Book Your Free AI Assessment — Kivov Digital",
    description:
      "Pick a time that works — weekdays 10am–4pm ET, starting tomorrow. A free 45-minute call about how your business runs, then a written report of practical AI quick wins.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const walkAway = [
  "A written report of practical AI quick wins",
  "Recommendations mapped by effort vs. impact",
  "The hours each fix gives back to your team",
  "A 30-minute walkthrough call to get you started",
];

export default function BookPage() {
  /* Wider than the standard content column so the Calendly iframe clears
     ~1000px and renders its two-column horizontal layout. */
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mb-10 max-w-3xl">
        <Eyebrow className="mb-6 text-xs">Book Your Assessment</Eyebrow>
        <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Pick a time. We&apos;ll do the rest.
        </h1>
        <p className="text-lg leading-relaxed">
          45 minutes live, on Zoom, about how your business actually runs.
          Free, no card, no commitment. Within 48 hours you&apos;ll have your
          written report.
        </p>
      </div>

      <BookingWidget />

      {/* Benefits live below the scheduler, so the calendar leads. */}
      <ul className="mt-12 grid max-w-3xl gap-x-8 gap-y-3 sm:grid-cols-2">
        {walkAway.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Check
              className="mt-0.5 size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 max-w-3xl">
        <p className="text-sm text-caption">
          Prefer to write a few lines first instead?{" "}
          <Link
            href="/contact"
            className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Send an inquiry
          </Link>{" "}
          — we reply within one business day.
        </p>
      </div>
    </div>
  );
}
