import { JsonLd } from "@/components/json-ld";
import {
  Band,
  CtaRow,
  FaqList,
  LedgerList,
  ProofSections,
  Section,
  StatementRows,
  StepRows,
} from "@/components/sections";
import { leadCtas, startsWithCall } from "@/components/templates/ctas";
import { RelatedReading } from "@/components/templates/related-reading";
import { proofItems } from "@/content/proof";
import { sectionHeadings } from "@/content/section-headings";
import { serviceBySlug, servicePath } from "@/content/services";
import { isTodo, type UseCase } from "@/content/types";
import { pathForUseCase } from "@/content/use-cases";
import { breadcrumbs, faqPage } from "@/lib/seo";

/*
 * Use-case page template (/use-cases/<slug>/). Section order is fixed by the
 * site-structure decision's "Page layouts": hero band · The problem · How we
 * set it up · extra section (only when the page has one, e.g. WordPress
 * website design) · Tool or done for you? (research pages only) · Proof (if
 * any) · Works with · Related reading (only when a resource post's `related`
 * is this use case) · Questions · closing band.
 *
 * Headings: every section is eyebrow → h2. The problem, How we set it up and
 * Questions take `useCase.headings`; Tool or done for you?, Works with and
 * Related reading use the shared strings in `content/section-headings.ts`.
 * Questions is a split section.
 *
 * CTAs: at most 2 per section (see ctas.ts). Use cases whose parent service
 * starts with a call and a quote (Website Management: WordPress Support, Law
 * Firm SEO & GEO) show "Book a free call" alone in the hero, and "Book a free
 * call" plus the link back to the parent service in the closing band. The
 * rest show "Free Fit Check" plus "Or book a free call" in both, with no
 * parent-service link.
 */
export function UseCasePage({ useCase }: { useCase: UseCase }) {
  const src = useCase.slug;
  const path = pathForUseCase(useCase.slug);
  const parent = serviceBySlug(useCase.parent);
  const proof = proofItems(useCase.proof);
  const bookFirst = startsWithCall(parent);
  const hero = leadCtas(bookFirst, src, "hero", true);
  const closing = leadCtas(bookFirst, src, "bottom_cta");
  const extra = useCase.extraSection;
  const h = useCase.headings;
  const faqsForLd = useCase.faqs
    .filter((f) => !isTodo(f.question) && !isTodo(f.answer))
    .map((f) => ({ question: f.question, text: f.answer }));

  const jsonLd = [
    breadcrumbs(path, useCase.name, [{ path: "/use-cases", name: "Use Cases" }]),
    ...(faqsForLd.length ? [faqPage(path, faqsForLd)] : []),
  ];

  return (
    <>
      <JsonLd graph={jsonLd} />

      {/* 1 — Hero band */}
      <Band
        hero="page"
        eyebrow={`Use Cases · ${useCase.name}`}
        title={useCase.h1}
        depth="bottom-right"
      >
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">{useCase.problemLine}</p>
        <CtaRow
          tone="band"
          primary={hero.primary}
          secondary={hero.secondary}
        />
      </Band>

      {/* 2 — The problem */}
      <Section flush eyebrow="The problem" title={h.problem}>
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
          {useCase.problem.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* 3 — How we set it up */}
      <Section staggered eyebrow="How we set it up" title={h.setup}>
        <StepRows steps={useCase.setup} />
      </Section>

      {/* 3b — Extra section (only when the page has one) */}
      {extra ? (
        <Section eyebrow={extra.eyebrow} title={extra.title}>
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
            {extra.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 4 — Tool or done for you? (research pages only) */}
      {useCase.toolOrDone ? (
        <Section
          staggered
          eyebrow="Tool or done for you?"
          title={sectionHeadings.toolOrDone}
        >
          <StatementRows
            rows={[
              { title: "Tool", body: useCase.toolOrDone.tool },
              { title: "Done for you", body: useCase.toolOrDone.doneForYou },
            ]}
          />
        </Section>
      ) : null}

      {/* 5 — Proof (if any) */}
      <ProofSections items={proof} sourcePage={src} />

      {/* 6 — Works with */}
      {useCase.worksWith.length ? (
        <Section eyebrow="Works with" title={sectionHeadings.worksWith}>
          <LedgerList items={useCase.worksWith} columns={2} className="mt-8" />
        </Section>
      ) : null}

      {/* 6b — Related reading (posts that point at this use case) */}
      <RelatedReading pages={[{ kind: "use-case", slug: useCase.slug }]} sourcePage={src} />

      {/* 7 — Questions */}
      {useCase.faqs.length ? (
        <Section staggered layout="split" eyebrow="FAQ" title={h.questions}>
          <FaqList split faqs={useCase.faqs} />
        </Section>
      ) : null}

      {/* 8 — Closing band: book-first pages add the link back to the parent service */}
      <Band title={useCase.closing.title} depth="top-left">
        {useCase.closing.lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            {useCase.closing.lead}
          </p>
        ) : null}
        <CtaRow
          tone="band"
          className="mt-10"
          primary={closing.primary}
          secondary={
            bookFirst
              ? [
                  {
                    label: parent.name,
                    href: servicePath(parent.slug),
                    event: "service_link_clicked",
                    eventProps: {
                      source_page: src,
                      cta_location: "bottom_cta",
                      service: parent.slug,
                    },
                  },
                ]
              : closing.secondary
          }
        />
      </Band>
    </>
  );
}
