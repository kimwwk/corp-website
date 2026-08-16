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
 * Bottom cookie notice.
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
      className="rise fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-6 py-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm text-muted-foreground">
          {"We use cookies to see how the site is used, so we can make it better. Analytics is currently "}
          <span className="font-medium text-foreground">
            {allowed ? "on" : "off"}
          </span>
          {". You can change that any time — the details are in our "}
          <Link
            href="/cookies"
            className="rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            Cookie Policy
          </Link>
          {"."}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            onClick={() => choose("denied")}
          >
            Decline
          </Button>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => choose("granted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
