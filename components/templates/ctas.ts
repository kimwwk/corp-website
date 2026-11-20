import type { Cta } from "@/components/sections";

/*
 * The CTAs the page templates repeat. Free Fit Check stays the main button on
 * every page; `source_page` is the page slug so analytics can tell the new
 * pages apart.
 */
export function fitCheckCta(sourcePage: string, ctaLocation: string, arrow = false): Cta {
  return {
    label: "Free Fit Check",
    arrow,
    href: "/fit-check",
    event: "fit_check_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

export function aiPackagesCta(sourcePage: string, ctaLocation: string): Cta {
  return {
    label: "See AI packages",
    href: "/ai-packages",
    event: "ai_packages_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}

export function contactCta(sourcePage: string, ctaLocation: string): Cta {
  return {
    label: "Contact us",
    href: "/contact",
    event: "contact_cta_clicked",
    eventProps: { source_page: sourcePage, cta_location: ctaLocation },
  };
}
