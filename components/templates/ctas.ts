import type { Cta } from "@/components/sections";
import type { PackageHref, Service } from "@/content/types";

/*
 * The CTAs the page templates repeat. `source_page` is the page slug (resource
 * posts prefix theirs with `resource_`) so analytics can tell the new pages
 * apart.
 *
 * Which CTA leads the hero and closing band: pages where work starts with a
 * call and a quote lead with "Book a free call" and keep the fit check as a
 * text link. That is a service whose `howToStart.kind` is "quote", the use
 * cases under it, and the posts whose related page is or belongs to it. Every
 * other page leads with Free Fit Check.
 */
export function startsWithCall(service: Service): boolean {
  return service.howToStart.kind === "quote";
}

/** The hero or closing-band pair: one primary pill, the other as a text link. */
export function leadCtas(
  bookFirst: boolean,
  sourcePage: string,
  ctaLocation: string,
  arrow = false,
): { primary: Cta; secondary: Cta[] } {
  return bookFirst
    ? {
        primary: bookCallCta(sourcePage, ctaLocation, arrow),
        secondary: [fitCheckLinkCta(sourcePage, ctaLocation)],
      }
    : { primary: fitCheckCta(sourcePage, ctaLocation, arrow), secondary: [] };
}

export function fitCheckCta(sourcePage: string, ctaLocation: string, arrow = false): Cta {
  return {
    label: "Free Fit Check",
    arrow,
    href: "/fit-check",
    event: "fit_check_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

/* The fit check as a secondary text link, on pages that lead with the call. */
export function fitCheckLinkCta(sourcePage: string, ctaLocation: string): Cta {
  return {
    label: "Or see where AI fits your work",
    href: "/fit-check",
    event: "fit_check_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

export function aiStartersCta(sourcePage: string, ctaLocation: string): Cta {
  return {
    label: "See AI Starters",
    href: "/ai-starters",
    event: "ai_starters_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

/*
 * "Book a free call": the primary button on pages where work starts with a
 * call and a quote (see `startsWithCall`). Same event as every other /book
 * link on the site.
 */
export function bookCallCta(sourcePage: string, ctaLocation: string, arrow = false): Cta {
  return {
    label: "Book a free call",
    arrow,
    href: "/book",
    event: "booking_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

/*
 * A "How to start" package name linked to its page. Same event as every
 * other link to that page: fit check, audit, or AI Starters.
 */
const PACKAGE_LINK_EVENTS: Record<PackageHref, string> = {
  "/fit-check": "fit_check_cta_clicked",
  "/audit": "audit_cta_clicked",
  "/ai-starters": "ai_starters_cta_clicked",
};

export function packageLinkCta(
  href: PackageHref,
  sourcePage: string,
  ctaLocation: string,
): Omit<Cta, "label"> {
  return {
    href,
    event: PACKAGE_LINK_EVENTS[href],
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}
