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
const EMBED_SRC = `${CALENDLY_URL}?hide_gdpr_banner=1&embed_type=Inline&embed_domain=kivov.ca`;

export function BookingWidget() {
  const frame = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    function onCalendlyMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as
        | { event?: unknown; payload?: { height?: unknown } }
        | null
        | undefined;
      // Calendly reports its content height; fit the iframe to it, so the
      // whole calendar shows at every width (no inner cut-off).
      if (data?.event === "calendly.page_height") {
        const height = Number.parseInt(String(data.payload?.height ?? ""), 10);
        if (frame.current && height > 0) frame.current.style.height = `${Math.max(height, 640)}px`;
        return;
      }
      // Fire the GA conversion when a visitor completes a booking in the iframe.
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
        Calendly renders its page single-column at every width we use (the
        old two-column layout no longer appears at ~1100px), so the iframe
        starts tall enough for the whole month everywhere, then follows the
        height Calendly reports (calendly.page_height, above). A short desktop
        height cut the calendar off above the bookable dates (round-6 review).
      */}
      <iframe
        ref={frame}
        src={EMBED_SRC}
        title="Schedule a meeting with Kivov Digital"
        loading="lazy"
        className="h-[1180px] w-full"
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
