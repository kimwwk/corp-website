"use client";

import * as React from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Loader2 } from "lucide-react";

import { TrackedExternalLink } from "@/components/tracked-link";
import { cardSurface } from "@/components/sections";
import { capture, trackLead } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/*
 * Cal.com inline embed (the official React wrapper, which loads Cal.com's
 * embed.js). The embed sizes its iframe to the booker's content, so the whole
 * month shows at every width with no inner scrollbar.
 */
const CAL_LINK = "kim-wong/free-30-min-discovery-call";
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

/* Until Cal.com says the booker is ready, a loading panel holds the
   calendar's place, with the new-tab link in view from the first second: a
   visitor never has to scroll to find a way out if the embed stalls. */
type LoadState = "loading" | "slow" | "ready" | "failed";
const SLOW_AFTER_MS = 6000;

const linkClass =
  "rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary";

export function BookingWidget({ sourcePage = "book" }: { sourcePage?: string }) {
  const [load, setLoad] = React.useState<LoadState>("loading");

  React.useEffect(() => {
    let cancelled = false;
    const slow = window.setTimeout(
      () => setLoad((s) => (s === "loading" ? "slow" : s)),
      SLOW_AFTER_MS,
    );
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
      cal("on", { action: "linkReady", callback: () => setLoad("ready") });
      cal("on", { action: "linkFailed", callback: () => setLoad("failed") });
      // Fire the GA conversion when a visitor completes a booking in the embed.
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          trackLead("book_call", sourcePage);
          capture("assessment_booked", { method: "cal.com", source_page: sourcePage });
        },
      });
    })();
    return () => {
      cancelled = true;
      window.clearTimeout(slow);
    };
  }, [sourcePage]);

  const ready = load === "ready";

  return (
    <div>
      <div className="relative min-h-[560px]">
        <Cal
          namespace={NAMESPACE}
          calLink={CAL_LINK}
          config={{ layout: "month_view", theme: "light" }}
          className={cn(
            "w-full overflow-hidden transition-opacity duration-300 motion-reduce:transition-none",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
        {ready ? null : (
          <div className="absolute inset-0" role="status" aria-live="polite">
            <div
              className={cn(
                cardSurface,
                "flex h-full max-h-[560px] flex-col items-center gap-3 px-6 pt-16 text-center md:pt-24",
              )}
            >
              {load === "failed" ? null : (
                <Loader2
                  className="size-6 animate-spin text-primary motion-reduce:animate-none"
                  aria-hidden="true"
                />
              )}
              <p className="font-medium text-foreground">
                {load === "failed"
                  ? "The calendar didn't load."
                  : load === "slow"
                    ? "Still loading the calendar…"
                    : "Loading available times…"}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {load === "failed" || load === "slow" ? "You can " : "Not showing? "}
                <TrackedExternalLink
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="booking_new_tab_clicked"
                  eventProps={{ source_page: sourcePage, state: load, cta_location: "loading_panel" }}
                  ga={{
                    event: "booking_new_tab",
                    params: { source_page: sourcePage, cta_location: "loading_panel" },
                  }}
                  className={linkClass}
                >
                  open it in a new tab
                </TrackedExternalLink>
                .
              </p>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-sm text-caption">
        Prefer a full page?{" "}
        <TrackedExternalLink
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          event="booking_new_tab_clicked"
          eventProps={{ source_page: sourcePage, cta_location: "caption" }}
          ga={{
            event: "booking_new_tab",
            params: { source_page: sourcePage, cta_location: "caption" },
          }}
          className={linkClass}
        >
          Open the calendar in a new tab
        </TrackedExternalLink>
        . Use Claude?{" "}
        <TrackedExternalLink
          href={ASSISTANT_URL}
          target="_blank"
          rel="noopener noreferrer"
          event="booking_assistant_clicked"
          eventProps={{ source_page: sourcePage, assistant: "claude" }}
          ga={{ event: "booking_via_claude", params: { source_page: sourcePage } }}
          className={linkClass}
        >
          Book through Claude
        </TrackedExternalLink>{" "}
        (it connects Cal.com).
      </p>
    </div>
  );
}
