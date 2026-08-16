"use client";

import * as React from "react";

import { initAnalytics } from "@/lib/analytics";

/** Arms GA + PostHog and keeps them on the consent state. Renders nothing. */
export function AnalyticsProvider() {
  React.useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
