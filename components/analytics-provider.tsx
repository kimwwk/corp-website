"use client";

import * as React from "react";

import { initAnalytics } from "@/lib/analytics";

/** Arms GA + PostHog once Termly reports analytics consent. Renders nothing. */
export function AnalyticsProvider() {
  React.useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
