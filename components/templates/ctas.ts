import type { Cta } from "@/components/sections";
import type { Service } from "@/content/types";

/*
 * The CTAs the page templates repeat. `source_page` is the page slug (resource
 * posts prefix theirs with `resource_`) so analytics can tell the new pages
 * apart.
 *
 * At most 2 CTAs per section, the second only when it is relevant to this
 * page's reader (look and feel round 1). Which CTA leads the hero and closing
 * band:
 * - Pages where work starts with a call and a quote show "Book a free call"
 *   alone: a service whose `howToStart.kind` is "quote" (Website Management,
 *   App Development), the use cases under it, and the posts whose related
 *   page is or belongs to it. The fit check is an AI questionnaire, so it
 *   is not offered to a website or app buyer.
 * - Every other page leads with "Free Fit Check" and offers "Or book a free
 *   call" as a text link, so a reader who wants to talk always has a way to.
 */
export function startsWithCall(service: Service): boolean {
  return service.howToStart.kind === "quote";
}

/** The hero or closing-band CTAs: one primary pill, plus the call as a text
    link on fit-check-led pages. */
export function leadCtas(
  bookFirst: boolean,
  sourcePage: string,
  ctaLocation: string,
  arrow = false,
): { primary: Cta; secondary: Cta[] } {
  return bookFirst
    ? { primary: bookCallCta(sourcePage, ctaLocation, arrow), secondary: [] }
    : {
        primary: fitCheckCta(sourcePage, ctaLocation, arrow),
        secondary: [bookCallLinkCta(sourcePage, ctaLocation)],
      };
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

/* "See AI Starters": AI Consulting's one "How to start" CTA. */
export function aiStartersCta(sourcePage: string, ctaLocation: string): Cta {
  return {
    label: "See AI Starters",
    href: "/ai-starters",
    event: "ai_starters_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

/* The call as a secondary text link, on pages that lead with the fit check. */
export function bookCallLinkCta(sourcePage: string, ctaLocation: string): Cta {
  return {
    label: "Or book a free call",
    href: "/book",
    event: "booking_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

/*
 * "Book a free call": the primary button on pages where work starts with a
 * call and a quote (see `startsWithCall`), and their "How to start". Same
 * event as every other /book link on the site.
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
