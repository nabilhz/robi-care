import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type GovernanceQuestion = {
  question: string;
  answer: string;
};

type GovernanceFaqProps = {
  items: GovernanceQuestion[];
};

/**
 * Governance questions answered in a single-open accordion. Each answer is
 * plain prose so the review-before-use position stays unambiguous. Items sit on
 * dark navy card surfaces with thin subtle borders and a cyan accent rule.
 */
export function GovernanceFaq({ items }: GovernanceFaqProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`governance-${index}`}
          className="overflow-hidden rounded-xl border-hairline bg-card px-5 shadow-subtle md:px-6"
        >
          <AccordionTrigger
            data-ocid={`governance.faq.item.${index + 1}`}
            className="py-5 text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline md:text-lg"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="border-t border-hairline pb-5 pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
