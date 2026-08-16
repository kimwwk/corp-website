"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  analyticsAllowed,
  hasChosen,
  onConsentChange,
  onOpenPreferences,
  setConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Compact cookie banner, centred at the bottom of the viewport.
 *
 * Copy is Termly's standard consent message, with two clauses changed to match
 * how this site actually behaves: it is opt-out (non-essential cookies run
 * until declined, so "with your consent, we may also use" would be untrue),
 * and the preference control is the footer link, not a "Preferences" button.
 *
 * The visitor's choice lives in localStorage, which the server cannot know, so
 * both reads go through `useSyncExternalStore` with a server snapshot that
 * renders nothing. That keeps the markup and the first client render identical
 * — no hydration mismatch, which is the failure that sank the third-party
 * consent script this replaced.
 */
export function CookieConsent() {
  const chosen = React.useSyncExternalStore(
    onConsentChange,
    hasChosen,
    () => true,
  );
  const allowed = React.useSyncExternalStore(
    onConsentChange,
    analyticsAllowed,
    () => false,
  );
  // Footer link re-opens the notice after a choice has been made.
  const [reopened, setReopened] = React.useState(false);
  React.useEffect(() => onOpenPreferences(() => setReopened(true)), []);

  if (chosen && !reopened) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setReopened(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="rise fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-xl bg-card p-5 shadow-lg ring-1 ring-foreground/10 sm:bottom-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {
              "We use essential cookies to make our site work. We also use non-essential cookies to improve user experience and analyze website traffic. By continuing to use our site, you agree to our website's cookie use as described in our "
            }
            <Link
              href="/cookies"
              className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              Cookie Policy
            </Link>
            {
              ". You may change or withdraw your consent at any time by clicking the “Consent Preferences” link in the footer."
            }
          </p>
          {chosen && (
            <p className="mt-3 font-mono text-xs font-medium tracking-[0.14em] text-caption uppercase">
              Analytics is currently {allowed ? "on" : "off"}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-3">
          <Button
            size="lg"
            variant="outline"
            className="min-h-11 flex-1 rounded-full px-5 sm:flex-none"
            onClick={() => choose("denied")}
          >
            Decline
          </Button>
          <Button
            size="lg"
            className="min-h-11 flex-1 rounded-full px-5 sm:flex-none"
            onClick={() => choose("granted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
