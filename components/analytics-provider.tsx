"use client";

import * as React from "react";

import { initPostHog } from "@/lib/analytics";

/** Boots PostHog on the client (token-gated). Renders nothing. */
export function AnalyticsProvider() {
  React.useEffect(() => {
    initPostHog();
  }, []);
  return null;
}
