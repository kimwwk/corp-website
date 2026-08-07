"use client";

import * as React from "react";
import Link from "next/link";

import { capture } from "@/lib/analytics";

/**
 * next/link that fires a PostHog event on click. Composes into shadcn
 * components via the `render` prop, e.g.
 * `<Button render={<TrackedLink href="/book" event="…" />}>`.
 */
export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & {
  event: string;
  eventProps?: Record<string, unknown>;
}) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        onClick?.(e);
        capture(event, eventProps);
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
  onClick,
  ...props
}: React.ComponentProps<"a"> & {
  event: string;
  eventProps?: Record<string, unknown>;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        onClick?.(e);
        capture(event, eventProps);
      }}
    />
  );
}
