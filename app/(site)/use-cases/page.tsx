import type { Metadata } from "next";

import { OverviewPage } from "@/components/templates/overview-page";
import { overviews } from "@/content/overviews";
import { services } from "@/content/services";
import { getUseCaseBySlug, pathForUseCase } from "@/content/use-cases";
import { pageMetadata } from "@/lib/seo";

/* Use cases overview: the use-case pages as cards, grouped by the service
   each one links back to. */
export const metadata: Metadata = pageMetadata({
  title: overviews.useCases.title,
  description: overviews.useCases.description,
  path: "/use-cases",
});

export default function UseCasesOverviewPage() {
  const groups = services
    .filter((s) => s.useCases.length > 0)
    .map((s) => ({
      label: s.name,
      cards: s.useCases.map(getUseCaseBySlug).map((u) => ({
        title: u.name,
        body: u.cardLine,
        href: pathForUseCase(u.slug),
        event: "use_case_card_clicked",
        eventProps: { source_page: "use-cases", use_case: u.slug },
      })),
    }));
  return (
    <OverviewPage
      overview={overviews.useCases}
      path="/use-cases"
      sourcePage="use-cases"
      groups={groups}
    />
  );
}
