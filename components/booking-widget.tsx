"use client";

import * as React from "react";

import { capture, trackLead } from "@/lib/analytics";

/*
 * Direct iframe embed. Calendly serves its scheduling page with
 * `x-frame-options: ALLOWALL`, so we don't need the widget.js script —
 * this renders in any browser, with or without JavaScript.
 */
const CALENDLY_URL = "https://calendly.com/kimwong-wwk/let-s-meet";
// `embed_domain` is required for Calendly to post booking events
// (calendly.event_scheduled) back to the parent window — that's what we
// listen for below to fire the GA4 `generate_lead` conversion.
const EMBED_SRC = `${CALENDLY_URL}?hide_gdpr_banner=1&embed_type=Inline&embed_domain=kivov.work`;

export function BookingWidget() {
  React.useEffect(() => {
    // Fire the GA conversion when a visitor completes a booking in the iframe.
    function onCalendlyMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: unknown } | null | undefined;
      if (data?.event === "calendly.event_scheduled") {
        trackLead("book_call");
        capture("assessment_booked", { method: "calendly" });
      }
    }
    window.addEventListener("message", onCalendlyMessage);
    return () => window.removeEventListener("message", onCalendlyMessage);
  }, []);

  return (
    <div>
      {/*
        Calendly switches to its two-column horizontal layout once the iframe
        is ≥ ~1000px wide; below that it renders single-column (tall). So we
        give it a short height on wide screens (two-column fits in ~700px)
        and a tall height on narrow/mobile screens (single-column needs room).
      */}
      <iframe
        src={EMBED_SRC}
        title="Schedule a meeting with Kivov Digital"
        loading="lazy"
        className="h-[1180px] w-full min-[1100px]:h-[720px]"
        style={{ minWidth: 320, border: 0 }}
      />
      <p className="mt-4 text-center text-sm text-caption">
        Calendar not loading?{" "}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          Open the scheduler in a new tab →
        </a>
      </p>
    </div>
  );
}
