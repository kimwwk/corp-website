import { JsonLd } from "@/components/json-ld";
import {
  Band,
  CardGrid,
  CtaRow,
  MonoLabel,
  PageHeader,
  PostBody,
  Section,
  type LinkCard,
} from "@/components/sections";
import { bookCallCta, fitCheckCta } from "@/components/templates/ctas";
import { resourcePath } from "@/content/resources";
import { serviceBySlug, servicePath } from "@/content/services";
import type { ResourcePost, ServiceSlug } from "@/content/types";
import { getUseCaseBySlug, pathForUseCase } from "@/content/use-cases";
import { article, breadcrumbs } from "@/lib/seo";

/*
 * Resource post template (/resources/<slug>/). Section order is fixed by the
 * site-structure decision's "Page layouts": header (eyebrow, H1, date) ·
 * Short answer · Full post · Related service card · LinkedIn link (only when
 * the post has one) · closing band.
 *
 * Analytics: `source_page` is `resource_<slug>`, because a post can share its
 * slug with a service (`ai-automation`). Posts whose related page is, or
 * belongs to, Website Management also offer "Book a free call" in the closing
 * band.
 */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function formatDate(date: string) {
  if (!ISO_DATE.test(date)) return date;
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** The service a post's related page is, or belongs to. */
function relatedService(post: ResourcePost): ServiceSlug {
  return post.related.kind === "service"
    ? post.related.slug
    : getUseCaseBySlug(post.related.slug).parent;
}

function relatedCard(post: ResourcePost, sourcePage: string): LinkCard {
  const eventProps = {
    source_page: sourcePage,
    cta_location: "related",
    related: post.related.slug,
  };
  if (post.related.kind === "service") {
    const target = serviceBySlug(post.related.slug);
    return {
      kicker: "Services",
      title: target.name,
      body: target.cardLine,
      href: servicePath(target.slug),
      event: "service_card_clicked",
      eventProps,
    };
  }
  const target = getUseCaseBySlug(post.related.slug);
  return {
    kicker: "Use Cases",
    title: target.name,
    body: target.cardLine,
    href: pathForUseCase(target.slug),
    event: "use_case_card_clicked",
    eventProps,
  };
}

export function ResourcePostPage({ post }: { post: ResourcePost }) {
  const src = `resource_${post.slug}`;
  const path = resourcePath(post.slug);
  const bookCall = relatedService(post) === "website-management";
  const jsonLd = [
    breadcrumbs(path, post.name, [{ path: "/resources", name: "Resources" }]),
    article({
      path,
      headline: post.h1,
      description: post.description,
      datePublished: ISO_DATE.test(post.date) ? post.date : undefined,
    }),
  ];

  return (
    <>
      <JsonLd graph={jsonLd} />

      {/* 1 — Header */}
      <PageHeader eyebrow="Resources" title={post.h1}>
        <MonoLabel tone="caption" className="mt-6">
          {ISO_DATE.test(post.date) ? (
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          ) : (
            post.date
          )}
        </MonoLabel>
      </PageHeader>

      {/* 2 — Short answer */}
      <Section eyebrow="Short answer">
        <p className="mt-6 max-w-3xl text-lg leading-relaxed font-medium text-foreground">
          {post.shortAnswer}
        </p>
      </Section>

      {/* 3 — Full post */}
      <Section>
        <article>
          <PostBody blocks={post.body} className="mt-0" />
        </article>
      </Section>

      {/* 4 — Related service */}
      <Section staggered eyebrow="Related">
        <CardGrid columns={1} cards={[relatedCard(post, src)]} />
      </Section>

      {/* 5 — LinkedIn (only when the post has one) */}
      {post.linkedinUrl ? (
        <Section eyebrow="LinkedIn">
          <CtaRow
            className="mt-6"
            secondary={{
              label: "Read this post on LinkedIn",
              href: post.linkedinUrl,
              external: true,
              event: "linkedin_post_clicked",
              eventProps: { source_page: src, cta_location: "linkedin" },
            }}
          />
        </Section>
      ) : null}

      {/* 6 — Closing band */}
      <Band title={post.closing.title} depth="top-left">
        {post.closing.lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{post.closing.lead}</p>
        ) : null}
        <CtaRow
          tone="band"
          className="mt-10"
          primary={fitCheckCta(src, "bottom_cta")}
          secondary={bookCall ? bookCallCta(src, "bottom_cta") : undefined}
        />
      </Band>
    </>
  );
}
