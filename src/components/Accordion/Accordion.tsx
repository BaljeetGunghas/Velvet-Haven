"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

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
    <Accordion type="single" collapsible className="w-full flex flex-col gap-3 sm:gap-4">
      {faqData.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          viewport={{ once: true }}
        >
          <AccordionItem
            value={`item-${faq.id}`}
            className="
              group
              border border-gray-200 dark:border-slate-700
              bg-white dark:bg-slate-800
              rounded-xl
              px-5 sm:px-6 lg:px-7
              py-4 sm:py-5
              shadow-sm
              hover:shadow-md
              dark:hover:shadow-lg dark:hover:shadow-primary-green/10
              transition-all
              duration-300
              overflow-hidden
            "
          >
            {/* Trigger */}
            <AccordionTrigger
              className="
                flex
                items-center
                justify-between
                w-full
                gap-3
                py-0
                text-left
                text-sm sm:text-base lg:text-lg
                font-semibold
                text-gray-900 dark:text-white
                hover:text-primary-green dark:hover:text-accent-gold
                transition-colors
                duration-200
              "
            >
              <span className="flex-1 break-words">{faq.question}</span>
            </AccordionTrigger>

            {/* Content */}
            <AccordionContent
              className="
                text-sm sm:text-base
                leading-relaxed
                text-gray-600 dark:text-gray-300
                pt-4
                border-t border-gray-200 dark:border-slate-700
                break-words
              "
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
};
