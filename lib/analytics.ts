"use client";

import posthog from "posthog-js";

import { analyticsAllowed, onConsentChange } from "@/lib/consent";

type LeadMethod = "contact_form" | "book_call" | "fit_check";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const GA_ID = "G-9VVXS7BY20";
/**
 * PostHog project token. Public by design — write-only, and it ships in the
 * client bundle either way, exactly like `GA_ID` above. Hardcoded because this
 * is a static export: `NEXT_PUBLIC_*` is inlined at build time, so an unset
 * variable disabled analytics silently for the life of the site. Overridable
 * at build time, same shape as `WEBHOOK_URL` in lib/webhook.ts.
 */
const POSTHOG_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  "phc_sgWaoA5Cz7bpWdBXKVspZ3Ped8MtpvuGXmniEzvxWGK2";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
/** GA4's session cookie is `_ga_` + the measurement ID without its `G-`. */
const GA_COOKIES = ["_ga", `_ga_${GA_ID.slice(2)}`, "_gid"];

let posthogReady = false;
let gaReady = false;
let consentWatchStarted = false;

/**
 * Load gtag.js. GA is deliberately not a `<Script>` in the layout: keeping the
 * injection here is what makes "no analytics until consent allows it" a fact
 * of control flow rather than a race between two script tags.
 */
function startGoogleAnalytics(): void {
  // Clears the kill switch `stopAnalytics()` sets — without this, a visitor who
  // declines and then accepts again stays untracked for the rest of the session.
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  const w = window as GtagWindow;
  if (gaReady) {
    w.gtag?.("config", GA_ID); // re-consented mid-session: resume with a page_view
    return;
  }
  gaReady = true;
  w.dataLayer = w.dataLayer || [];
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
  if (posthogReady) {
    posthog.opt_in_capturing(); // re-consented mid-session: resume capturing
    return;
  }
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_HOST,
    defaults: "2025-05-24", // history-change pageviews for SPA navigation
    capture_exceptions: true,
  });
  posthogReady = true;
}

/**
 * Stop collecting after an opt-out: GA's documented kill switch, its cookies
 * dropped, PostHog told to stand down. The gtag script itself stays loaded —
 * `ga-disable-*` is what makes it inert.
 */
function stopAnalytics(): void {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  // Deleting a cookie needs an exact domain match, and GA writes to the highest
  // registrable domain — `.kivov.work` even when served from a subdomain. So
  // clear every scope from the current host upwards; the ones the browser
  // rejects (public suffixes) are no-ops.
  const labels = window.location.hostname.split(".");
  const scopes = [""];
  for (let i = 0; i < labels.length - 1; i++) {
    const domain = labels.slice(i).join(".");
    scopes.push(`; domain=${domain}`, `; domain=.${domain}`);
  }
  for (const name of GA_COOKIES) {
    for (const scope of scopes) {
      document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
    }
  }
  if (posthogReady) posthog.opt_out_capturing();
}

/**
 * Arm GA and PostHog on the client, and keep them in step with the visitor's
 * choice for the rest of the session. Consent state lives in `lib/consent.ts`;
 * this module only ever reacts to it. Safe under static export: never runs at
 * build time.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined" || consentWatchStarted) return;
  consentWatchStarted = true;

  const sync = () => {
    if (analyticsAllowed()) {
      startGoogleAnalytics();
      startPostHog();
    } else {
      stopAnalytics();
    }
  };
  sync();
  onConsentChange(sync);
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
