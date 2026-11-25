"use client";

import * as React from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

import { TrackedExternalLink } from "@/components/tracked-link";
import { capture, trackLead } from "@/lib/analytics";

/*
 * Cal.com inline embed (the official React wrapper, which loads Cal.com's
 * embed.js). The embed sizes its iframe to the booker's content, so the whole
 * month shows at every width with no inner scrollbar.
 */
const CAL_LINK = "kim-wong/30min";
const CAL_URL = `https://cal.com/${CAL_LINK}`;
const NAMESPACE = "book-call";

/* Opens Claude with the Cal.com connector and this event, for visitors who
   book through an AI assistant (Cal.com's "Book using assistant" link). */
const ASSISTANT_URL = `https://claude.ai/new?q=${encodeURIComponent(
  `If not added, add mcp.cal.com/mcp, then book ${CAL_LINK}`,
)}`;

/*
 * The booker lives in Cal.com's iframe, so our CSS can't reach it. Its colours
 * come from the site's own tokens (app/globals.css), read at runtime and
 * passed in as Cal.com's CSS variables.
 */
function brandVars(): Record<string, string> {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string) => css.getPropertyValue(name).trim();
  return {
    "cal-brand": token("--primary"),
    "cal-brand-emphasis": token("--primary-hover"),
    "cal-brand-text": token("--primary-foreground"),
    "cal-text-emphasis": token("--foreground"),
    "cal-text": token("--muted-foreground"),
    "cal-text-subtle": token("--caption"),
    "cal-bg": token("--card"),
    "cal-bg-subtle": token("--muted"),
    "cal-bg-emphasis": token("--secondary"),
    "cal-border": token("--border"),
    "cal-border-subtle": token("--border"),
    "cal-border-booker": token("--border"),
  };
}

export function BookingWidget() {
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      const vars = brandVars();
      cal("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: { light: vars, dark: vars },
      });
      // Fire the GA conversion when a visitor completes a booking in the embed.
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          trackLead("book_call");
          capture("assessment_booked", { method: "cal.com" });
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <Cal
        namespace={NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: "month_view", theme: "light" }}
        className="min-h-[560px] w-full overflow-hidden"
      />
      <p className="mt-4 text-center text-sm text-caption">
        Calendar not loading?{" "}
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
        >
          Open it in a new tab
        </a>
        . Use Claude?{" "}
        <TrackedExternalLink
          href={ASSISTANT_URL}
          target="_blank"
          rel="noopener noreferrer"
          event="booking_assistant_clicked"
          eventProps={{ source_page: "book", assistant: "claude" }}
          className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
        >
          Book through Claude
        </TrackedExternalLink>{" "}
        (it connects Cal.com).
      </p>
    </div>
  );
}
