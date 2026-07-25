"use client";

import posthog from "posthog-js";

type LeadMethod = "contact_form" | "book_call";

let posthogReady = false;

/**
 * Init PostHog once on the client — only when a project token is configured.
 * Safe under static export: never runs at build time, no-ops without a token.
 */
export function initPostHog(): void {
  if (typeof window === "undefined" || posthogReady) return;
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return;
  posthog.init(token, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    defaults: "2025-05-24", // history-change pageviews for SPA navigation
    capture_exceptions: true,
  });
  posthogReady = true;
}

/** PostHog capture that no-ops when PostHog isn't configured. */
export function capture(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (!posthogReady) return;
  posthog.capture(event, properties);
}

/**
 * Fire a GA4 `generate_lead` conversion. gtag.js is loaded in the root
 * layout. Client-only and defensive: no-ops if gtag is unavailable.
 */
export function trackLead(method: LeadMethod): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "generate_lead", { method });
}
