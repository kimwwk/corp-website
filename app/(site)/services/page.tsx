import type { Metadata } from "next";

import { OverviewPage } from "@/components/templates/overview-page";
import { overviews } from "@/content/overviews";
import { servicePath, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

/* Services overview: the four service pages as cards. The price cards that
   used to live here are on /ai-packages. */
export const metadata: Metadata = pageMetadata({
  title: overviews.services.title,
  description: overviews.services.description,
  path: "/services",
});

export default function ServicesOverviewPage() {
  return (
    <OverviewPage
      overview={overviews.services}
      path="/services"
      sourcePage="services"
      groups={[
        {
          label: overviews.services.cardsLabel,
          cards: services.map((s) => ({
            title: s.name,
            body: s.cardLine,
            href: servicePath(s.slug),
            event: "service_card_clicked",
            eventProps: { source_page: "services", service: s.slug },
          })),
        },
      ]}
    />
  );
}
