"use client";

import * as React from "react";
import Link from "next/link";

import { capture, gaEvent } from "@/lib/analytics";

/* Optional GA4 event sent with the PostHog one. */
type GaEvent = { event: string; params?: Record<string, unknown> };

/**
 * next/link that fires a PostHog event on click, and a GA4 event when `ga`
 * is given. Composes into shadcn
 * components via the `render` prop, e.g.
 * `<Button render={<TrackedLink href="/book" event="…" />}>`.
 */
export function TrackedLink({
  event,
  eventProps,
  ga,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & {
  event: string;
  eventProps?: Record<string, unknown>;
  ga?: GaEvent;
}) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        onClick?.(e);
        capture(event, eventProps);
        if (ga) gaEvent(ga.event, ga.params);
      }}
    />
  );
}

/**
 * Anchor variant for external destinations (e.g. the Stripe payment link).
 * Same PostHog capture, but a plain <a> — next/link's prefetching only
 * applies to internal routes.
 */
export function TrackedExternalLink({
  event,
  eventProps,
  ga,
  onClick,
  ...props
}: React.ComponentProps<"a"> & {
  event: string;
  eventProps?: Record<string, unknown>;
  ga?: GaEvent;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        onClick?.(e);
        capture(event, eventProps);
        if (ga) gaEvent(ga.event, ga.params);
      }}
    />
  );
}
