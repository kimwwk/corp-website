import { JsonLd } from "@/components/json-ld";
import {
  Band,
  CardGrid,
  CtaRow,
  PageHeader,
  Section,
  type LinkCard,
} from "@/components/sections";
import { fitCheckCta } from "@/components/templates/ctas";
import type { Overview } from "@/content/types";
import { breadcrumbs } from "@/lib/seo";

/*
 * Overview page template (/services, /use-cases, /resources): header (H1 and
 * a one-line lead) · cards (one per page: name, one sentence, link) · closing
 * band. Cards come in groups:
 * - /use-cases passes one group per parent service, each with a `title`: the
 *   service name is the eyebrow over that h2.
 * - /services and /resources pass a single group with no `title`: its cards
 *   follow the page header directly (no border, no visible header), and its
 *   `label` is an sr-only h2, so the outline stays H1 → H2 → H3.
 */
export type CardGroup = { label: string; title?: string; cards: LinkCard[] };

function columnsFor(count: number) {
  return count >= 4 ? 4 : count === 3 ? 3 : 2;
}

export function OverviewPage({
  overview,
  path,
  sourcePage,
  groups,
}: {
  overview: Overview;
  path: string;
  sourcePage: string;
  groups: CardGroup[];
}) {
  return (
    <>
      <JsonLd graph={[breadcrumbs(path, overview.eyebrow)]} />

      {/* 1 — Header */}
      <PageHeader eyebrow={overview.eyebrow} title={overview.h1} lead={overview.lead} />

      {/* 2 — Cards */}
      {groups.map((group, i) =>
        group.title ? (
          <Section key={group.label} staggered eyebrow={group.label} title={group.title}>
            <CardGrid columns={columnsFor(group.cards.length)} cards={group.cards} />
          </Section>
        ) : (
          <Section key={group.label} staggered flush={i === 0} className="pt-0 md:pt-0">
            <h2 className="sr-only">{group.label}</h2>
            <CardGrid
              columns={columnsFor(group.cards.length)}
              cards={group.cards}
              className="mt-0"
            />
          </Section>
        ),
      )}

      {/* 3 — Closing band */}
      <Band eyebrow="Next step" title={overview.closing.title} depth="top-left">
        {overview.closing.lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            {overview.closing.lead}
          </p>
        ) : null}
        <CtaRow
          tone="band"
          className="mt-10"
          primary={fitCheckCta(sourcePage, "bottom_cta")}
        />
      </Band>
    </>
  );
}
