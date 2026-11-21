import { CardGrid, Section } from "@/components/sections";
import { resourceIcon, resourcePath, resourcesRelatedTo } from "@/content/resources";
import { sectionHeadings } from "@/content/section-headings";
import type { ResourcePost } from "@/content/types";

/*
 * "Related reading" on service and use-case pages: a card for each resource
 * post whose `related` field points at one of `pages` (title + cardLine, the
 * CardGrid link cue). A use-case page passes itself; a service page passes
 * itself and its use cases, so a post about a use case also shows on its
 * service. Each post once. Nothing renders when no post points here. Placed
 * just before the FAQ, under the shared h2 (`sectionHeadings`). Tracked
 * like the /resources cards (`resource_card_clicked`), with
 * `cta_location: "related_reading"`.
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
    <Section staggered eyebrow="Related reading" title={sectionHeadings.relatedReading}>
      <CardGrid
        columns={posts.length === 1 ? 1 : posts.length === 2 ? 2 : 3}
        cards={posts.map((post) => ({
          icon: resourceIcon,
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
