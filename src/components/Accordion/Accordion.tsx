import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface Faq {
    id: number;
    question: string;
    answer: string;
  }
  
  interface AccordionProps {
    faqData: Faq[];
  }
  
  export const AccordionComponent = ({ faqData }: AccordionProps) => {
    return (
      <Accordion type="single"  collapsible className="w-full flex flex-col gap-3">
        {faqData.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={`item-${faq.id}`}
            className="bg-gray-100 dark:bg-foreground p-1 rounded-lg shadow px-3 dark:border-0"
          >
            <AccordionTrigger className="text-base font-medium dark:text-white">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className=" text-gray-600 dark:text-slate-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };
  