import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * FAQ — hairline accordion rows (the /ai-packages recipe): question in ink,
 * answer in body copy, capped at the prose measure. Plain-text answers, so
 * the same strings feed the FAQPage JSON-LD. Use inside a `staggered`
 * Section ("Questions").
 *
 * `hiddenUntilFound` keeps closed answers in the DOM (server HTML ships them
 * `hidden`; after hydration they become `hidden="until-found"`), so crawlers
 * read every answer and find-in-page opens the matching one. They still look
 * closed: the hidden panel takes no space.
 */
export function FaqList({
  faqs,
  className,
}: {
  faqs: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <Reveal delay={80}>
      <Accordion
        hiddenUntilFound
        className={cn("mt-8 max-w-3xl border-y border-border", className)}
      >
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  );
}
