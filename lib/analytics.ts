"use client";

import posthog from "posthog-js";

type LeadMethod = "contact_form" | "book_call" | "fit_check";

/** Shape of the consent state Termly's resource blocker exposes. */
type TermlyConsentState = Partial<
  Record<
    | "advertising"
    | "analytics"
    | "essential"
    | "performance"
    | "social_networking"
    | "unclassified",
    boolean
  >
>;

type TermlyConsentEvent = {
  categories?: string[];
  consentState?: TermlyConsentState;
};

type Termly = {
  getConsentState?: () => TermlyConsentState | undefined;
  on?: (
    event: "consent" | "initialized",
    handler: (data?: TermlyConsentEvent) => void,
  ) => void;
};

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const GA_ID = "G-9VVXS7BY20";
const TERMLY_POLL_MS = 200;
const TERMLY_POLL_LIMIT = 50; // ~10s, then assume Termly is blocked

let posthogReady = false;
let gaReady = false;
let consentWatchStarted = false;

function getTermly(): Termly | undefined {
  return (window as unknown as { Termly?: Termly }).Termly;
}

/**
 * True only when the visitor has accepted the analytics category. Reads the
 * live state first; the event payload is the fallback for the moment the
 * banner saves a choice.
 */
function analyticsGranted(event?: TermlyConsentEvent): boolean {
  if (getTermly()?.getConsentState?.()?.analytics === true) return true;
  if (event?.consentState?.analytics === true) return true;
  return event?.categories?.includes("analytics") === true;
}

/** Run `onReady` once Termly's API is on the page; give up if it never lands. */
function whenTermlyReady(onReady: (termly: Termly) => void): void {
  let tries = 0;
  const poll = () => {
    const termly = getTermly();
    if (termly?.getConsentState && termly.on) {
      onReady(termly);
      return;
    }
    if (++tries > TERMLY_POLL_LIMIT) return;
    window.setTimeout(poll, TERMLY_POLL_MS);
  };
  poll();
}

/**
 * Load gtag.js. Termly's auto-blocker cannot be trusted to win the race
 * against a `<Script>` tag now that it loads after hydration, so GA is not in
 * the layout at all — it starts here, after consent, or not at all.
 */
function startGoogleAnalytics(): void {
  if (gaReady) return;
  gaReady = true;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  // Termly defines gtag itself for Google Consent Mode; either definition
  // pushes the raw `arguments` object, so reuse whichever got there first.
  if (typeof w.gtag !== "function") {
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer?.push(arguments);
    };
  }
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(tag);
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
}

function startPostHog(): void {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (posthogReady || !token) return;
  posthog.init(token, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    defaults: "2025-05-24", // history-change pageviews for SPA navigation
    capture_exceptions: true,
  });
  posthogReady = true;
}

/**
 * Arm GA and PostHog on the client — only once Termly reports that the visitor
 * accepted analytics cookies. Neither tracker can be left to Termly's
 * auto-blocker: posthog-js is a bundled import it never sees, and gtag.js
 * would otherwise race the blocker's own script. Fails closed — no Termly, no
 * analytics. Safe under static export: never runs at build time.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined" || consentWatchStarted) return;
  consentWatchStarted = true;

  whenTermlyReady((termly) => {
    const sync = (event?: TermlyConsentEvent) => {
      if (!analyticsGranted(event)) return;
      startGoogleAnalytics();
      startPostHog();
    };
    sync(); // returning visitor whose choice is already stored
    termly.on?.("initialized", sync);
    termly.on?.("consent", sync);
  });
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
 * Fire a GA4 `generate_lead` conversion. gtag.js only exists once analytics
 * consent is given, so this no-ops for visitors who declined.
 */
export function trackLead(method: LeadMethod): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "generate_lead", { method });
}
