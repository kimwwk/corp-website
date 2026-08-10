import type { Metadata } from "next";

import { BookingWidget } from "@/components/booking-widget";
import { TrackedLink } from "@/components/tracked-link";

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
        <p className="mb-6 font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase">
          Book a call
        </p>
        <h1 className="mb-4 font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-foreground">
          Book a call.
        </h1>
        <p className="text-lg leading-relaxed">
          The fastest way to talk it through, live on Zoom. If you&apos;re
          exploring, start with the{" "}
          <TrackedLink
            href="/fit-check"
            event="fit_check_cta_clicked"
            eventProps={{ source_page: "book", cta_location: "intro" }}
            className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            free fit check
          </TrackedLink>{" "}
          instead: you&apos;ll get further, faster.
        </p>
      </div>

      <BookingWidget />

      <div className="mt-12 max-w-3xl">
        <p className="text-sm text-caption">
          Prefer to write a few lines first instead?{" "}
          <TrackedLink
            href="/contact"
            event="contact_cta_clicked"
            eventProps={{ source_page: "book", cta_location: "footer_note" }}
            className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            Send an inquiry
          </TrackedLink>{" "}
          and I&apos;ll reply within one business day.
        </p>
      </div>
    </div>
  );
}
