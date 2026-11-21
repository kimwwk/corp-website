import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CardGrid,
  CtaRow,
  FaqList,
  LedgerList,
  PriceCard,
  ProofSections,
  Section,
  StatementRows,
  StepRows,
  TestimonialGrid,
} from "@/components/sections";
import {
  aiStartersCta,
  bookCallCta,
  leadCtas,
  startsWithCall,
} from "@/components/templates/ctas";
import { RelatedReading } from "@/components/templates/related-reading";
import { proofItems } from "@/content/proof";
import { sectionHeadings } from "@/content/section-headings";
import { servicePath } from "@/content/services";
import { testimonialsFor } from "@/content/testimonials";
import { isTodo, type OfferCard, type Service } from "@/content/types";
import { getUseCaseBySlug, pathForUseCase } from "@/content/use-cases";
import { breadcrumbs, faqPage, service as serviceEntity } from "@/lib/seo";

/* An offer's visible price as its Service entity's Offer (Google wants the
   schema price to match the page): "$5,500" + "/ project" → 5500, "project". */
function offerPrice(card: OfferCard): { price?: number; unitText?: string } {
  const digits = card.price.replace(/[^\d.]/g, "");
  if (!digits) return {};
  return { price: Number(digits), unitText: card.unit?.replace(/^\/\s*/, "") || undefined };
}

/*
 * Service page template (/services/<slug>/). Section order is fixed by the
 * site-structure decision's "Page layouts": hero band · Pain points ·
 * What's included · How it works · Use cases · Proof · Testimonial(s) · How
 * to start · Related reading · Questions · closing band. Sections with no
 * content (no use cases, proof, testimonials or posts for this service) are
 * left out. Related reading lists the resource posts whose `related` is this
 * service or one of its use cases.
 *
 * Headings: every section is eyebrow → h2 (→ lead). The h2s come from
 * `service.headings`; Pain points' lead, Testimonial(s) and Related reading
 * use the shared strings in `content/section-headings.ts`. Questions is a
 * split section.
 *
 * CTAs: at most 2 per section (see ctas.ts).
 * - Hero and closing band: quote services (Website Management, App
 *   Development) show "Book a free call" alone; package services (AI
 *   Consulting, AI Automation) show "Free Fit Check" plus "Or book a free
 *   call".
 * - How to start keeps one CTA. Package services list their packages as
 *   plain row headings (no row links), then either the service's own price
 *   card's button (`howToStart.offer`: AI Automation's Build For You) or the
 *   "See AI Starters" button (AI Consulting). Quote services show their line
 *   as the section lead and "Book a free call".
 */
export function ServicePage({ service }: { service: Service }) {
  const src = service.slug;
  const bookFirst = startsWithCall(service);
  const hero = leadCtas(bookFirst, src, "hero", true);
  const closing = leadCtas(bookFirst, src, "bottom_cta");
  const path = servicePath(service.slug);
  const cases = service.useCases.map(getUseCaseBySlug);
  const proof = proofItems(service.proof);
  const quotes = testimonialsFor(service.slug);
  const h = service.headings;
  if (cases.length && !h.useCases) {
    throw new Error(`Service ${service.slug} lists use cases but has no headings.useCases`);
  }
  const start = service.howToStart;
  const offer = start.kind === "packages" ? start.offer : undefined;
  const faqsForLd = service.faqs
    .filter((f) => !isTodo(f.question) && !isTodo(f.answer))
    .map((f) => ({ question: f.question, text: f.answer }));

  const jsonLd = [
    breadcrumbs(path, service.name, [{ path: "/services", name: "Services" }]),
    serviceEntity({
      name: service.name,
      description: service.description,
      path,
      serviceType: service.name,
      ...(offer ? offerPrice(offer) : {}),
    }),
    ...(faqsForLd.length ? [faqPage(path, faqsForLd)] : []),
  ];

  return (
    <>
      <JsonLd graph={jsonLd} />

      {/* 1 — Hero band */}
      <Band
        hero="page"
        eyebrow={`Services · ${service.name}`}
        title={service.h1}
        depth="bottom-right"
      >
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">{service.lead}</p>
        <CtaRow tone="band" primary={hero.primary} secondary={hero.secondary} />
      </Band>

      {/* 2 — Pain points */}
      <Section
        flush
        eyebrow="Pain points"
        title={h.painPoints}
        lead={sectionHeadings.painPointsLead}
      >
        <LedgerList items={service.problems} columns={2} className="mt-8" />
      </Section>

      {/* 3 — What's included */}
      <Section staggered eyebrow="What’s included" title={h.included}>
        <StatementRows rows={service.included} />
      </Section>

      {/* 4 — How it works */}
      <Section staggered eyebrow="How it works" title={h.howItWorks}>
        <StepRows steps={service.steps} />
      </Section>

      {/* 5 — Use cases */}
      {cases.length ? (
        <Section staggered eyebrow="Use cases" title={h.useCases}>
          <CardGrid
            columns={cases.length >= 4 ? 4 : cases.length === 3 ? 3 : 2}
            cards={cases.map((u) => ({
              icon: u.icon,
              title: u.name,
              body: u.cardLine,
              href: pathForUseCase(u.slug),
              event: "use_case_card_clicked",
              eventProps: { source_page: src, use_case: u.slug },
            }))}
          />
        </Section>
      ) : null}

      {/* 6 — Proof */}
      <ProofSections items={proof} sourcePage={src} />

      {/* 7 — Testimonial(s) */}
      {quotes.length ? (
        <Section
          staggered
          eyebrow={quotes.length > 1 ? "Testimonials" : "Testimonial"}
          title={sectionHeadings.testimonials}
        >
          <TestimonialGrid quotes={quotes} />
        </Section>
      ) : null}

      {/* 8 — How to start */}
      <Section
        staggered
        eyebrow="How to start"
        title={h.howToStart}
        lead={start.kind === "quote" ? start.line : undefined}
      >
        {start.kind === "packages" ? (
          <>
            <StatementRows
              rows={start.lines.map((l) => ({ title: l.package, body: l.line }))}
            />
            {offer ? (
              <Reveal className="mt-10 max-w-xl">
                <PriceCard {...offer} />
              </Reveal>
            ) : (
              <Reveal>
                <CtaRow primary={aiStartersCta(src, "how_to_start")} />
              </Reveal>
            )}
          </>
        ) : (
          <Reveal>
            <CtaRow primary={bookCallCta(src, "how_to_start")} />
          </Reveal>
        )}
      </Section>

      {/* 8b — Related reading (posts that point at this service or its use cases) */}
      <RelatedReading
        pages={[
          { kind: "service", slug: service.slug },
          ...service.useCases.map((slug) => ({ kind: "use-case" as const, slug })),
        ]}
        sourcePage={src}
      />

      {/* 9 — Questions */}
      {service.faqs.length ? (
        <Section staggered layout="split" eyebrow="FAQ" title={h.questions}>
          <FaqList split faqs={service.faqs} />
        </Section>
      ) : null}

      {/* 10 — Closing band */}
      <Band title={service.closing.title} depth="top-left">
        {service.closing.lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            {service.closing.lead}
          </p>
        ) : null}
        <CtaRow
          tone="band"
          className="mt-10"
          primary={closing.primary}
          secondary={closing.secondary}
        />
      </Band>
    </>
  );
}
