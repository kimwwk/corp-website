import type { Metadata } from "next";

import { OverviewPage } from "@/components/templates/overview-page";
import { overviews } from "@/content/overviews";
import { resourceIcon, resourcePath, resources } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

/* Resources overview: the posts as cards. */
export const metadata: Metadata = pageMetadata({
  title: overviews.resources.title,
  description: overviews.resources.description,
  path: "/resources",
});

export default function ResourcesOverviewPage() {
  return (
    <OverviewPage
      overview={overviews.resources}
      path="/resources"
      sourcePage="resources"
      groups={[
        {
          label: overviews.resources.cardsLabel ?? overviews.resources.eyebrow,
          cards: resources.map((r) => ({
            icon: resourceIcon,
            title: r.name,
            body: r.cardLine,
            href: resourcePath(r.slug),
            event: "resource_card_clicked",
            eventProps: { source_page: "resources", resource: r.slug },
          })),
        },
      ]}
    />
  );
}
