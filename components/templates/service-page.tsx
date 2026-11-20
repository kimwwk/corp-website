import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import {
  Band,
  CardGrid,
  CtaRow,
  FaqList,
  LedgerList,
  ProofSections,
  Section,
  StatementRows,
  StepRows,
  TestimonialGrid,
} from "@/components/sections";
import {
  aiPackagesCta,
  contactCta,
  leadCtas,
  packageLinkCta,
  startsWithCall,
} from "@/components/templates/ctas";
import { proofItems } from "@/content/proof";
import { servicePath } from "@/content/services";
import { testimonialsFor } from "@/content/testimonials";
import { isTodo, type Service } from "@/content/types";
import { getUseCaseBySlug, pathForUseCase } from "@/content/use-cases";
import { breadcrumbs, faqPage, service as serviceEntity } from "@/lib/seo";

/*
 * Service page template (/services/<slug>/). Section order is fixed by the
 * site-structure decision's "Page layouts": hero band · Sound familiar? ·
 * What's included · How it works · Use cases · Proof · Testimonial(s) · How
 * to start · Questions · closing band. Sections with no content (no use
 * cases, proof or testimonials for this service) are left out.
 *
 * How to start: a package line with an `href` links its package name to
 * that page (fit check, audit, AI packages); the "See AI packages" button
 * stays under the rows.
 *
 * Hero and closing band: quote services (Website Management, App Development)
 * lead with "Book a free call" and offer the fit check as a text link; package
 * services lead with Free Fit Check, plus "See AI packages" in the hero.
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
  const start = service.howToStart;
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
        <CtaRow
          tone="band"
          primary={hero.primary}
          secondary={[
            ...hero.secondary,
            ...(start.kind === "packages" ? [aiPackagesCta(src, "hero")] : []),
          ]}
        />
      </Band>

      {/* 2 — Sound familiar? */}
      <Section flush eyebrowAs="h2" eyebrow="Sound familiar?">
        <LedgerList items={service.problems} marker="check" columns={2} className="mt-8" />
      </Section>

      {/* 3 — What's included */}
      <Section staggered eyebrowAs="h2" eyebrow="What’s included">
        <StatementRows rows={service.included} />
      </Section>

      {/* 4 — How it works */}
      <Section staggered eyebrowAs="h2" eyebrow="How it works">
        <StepRows steps={service.steps} />
      </Section>

      {/* 5 — Use cases */}
      {cases.length ? (
        <Section staggered eyebrowAs="h2" eyebrow="Use cases">
          <CardGrid
            columns={cases.length >= 4 ? 4 : cases.length === 3 ? 3 : 2}
            cards={cases.map((u) => ({
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
          eyebrowAs="h2"
          eyebrow={quotes.length > 1 ? "Testimonials" : "Testimonial"}
        >
          <TestimonialGrid quotes={quotes} />
        </Section>
      ) : null}

      {/* 8 — How to start */}
      <Section staggered eyebrowAs="h2" eyebrow="How to start">
        {start.kind === "packages" ? (
          <>
            <StatementRows
              rows={start.lines.map((l) => ({
                title: l.package,
                body: l.line,
                link: l.href ? packageLinkCta(l.href, src, "how_to_start") : undefined,
              }))}
            />
            <Reveal>
              <CtaRow primary={aiPackagesCta(src, "how_to_start")} />
            </Reveal>
          </>
        ) : (
          <Reveal>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed">{start.line}</p>
            <CtaRow primary={contactCta(src, "how_to_start")} />
          </Reveal>
        )}
      </Section>

      {/* 9 — Questions */}
      {service.faqs.length ? (
        <Section staggered eyebrowAs="h2" eyebrow="Questions">
          <FaqList faqs={service.faqs} />
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
