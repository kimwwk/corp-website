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
 * band. Cards come in groups; /use-cases passes one group per parent
 * service, the others a single unlabelled group.
 */
export type CardGroup = { label?: string; cards: LinkCard[] };

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
      {groups.map((group, i) => (
        <Section key={group.label ?? i} staggered eyebrow={group.label}>
          <CardGrid
            columns={group.cards.length >= 4 ? 4 : group.cards.length === 3 ? 3 : 2}
            cards={group.cards}
            className={group.label ? undefined : "mt-0"}
          />
        </Section>
      ))}

      {/* 3 — Closing band */}
      <Band title={overview.closing.title} depth="top-left">
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
