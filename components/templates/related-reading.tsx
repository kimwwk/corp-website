import { CardGrid, Section } from "@/components/sections";
import { resourcePath, resourcesRelatedTo } from "@/content/resources";
import type { ResourcePost } from "@/content/types";

/*
 * "Related reading" on service and use-case pages: a card for each resource
 * post whose `related` field points at one of `pages` (title + cardLine, the
 * CardGrid link cue). A use-case page passes itself; a service page passes
 * itself and its use cases, so a post about a use case also shows on its
 * service. Each post once. Nothing renders when no post points here. Placed
 * just before "Questions". Tracked like the /resources cards
 * (`resource_card_clicked`), with `cta_location: "related_reading"`.
 */
export function RelatedReading({
  pages,
  sourcePage,
}: {
  pages: ResourcePost["related"][];
  sourcePage: string;
}) {
  const posts = resourcesRelatedTo(pages);
  if (!posts.length) return null;
  return (
    <Section staggered eyebrowAs="h2" eyebrow="Related reading">
      <CardGrid
        columns={posts.length === 1 ? 1 : posts.length === 2 ? 2 : 3}
        cards={posts.map((post) => ({
          title: post.name,
          body: post.cardLine,
          href: resourcePath(post.slug),
          event: "resource_card_clicked",
          eventProps: {
            source_page: sourcePage,
            cta_location: "related_reading",
            resource: post.slug,
          },
        }))}
      />
    </Section>
  );
}
