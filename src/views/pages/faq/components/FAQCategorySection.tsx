import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "src/views/components/ui/accordion";
import type { FAQCategory } from "src/views/pages/faq/data/faqData";
import { iconMap } from "../utils/iconMap";

interface FAQCategorySectionProps {
  category: FAQCategory;
  categoryIndex: number;
}

export function FAQCategorySection({ category, categoryIndex }: FAQCategorySectionProps) {
  const Icon = iconMap[category.icon];
  const categoryId = category.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="scroll-mt-20" id={categoryId}>
      {/* Category Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
            <Icon className="h-5 w-5 text-brand-accent" />
          </div>
          <h2 className="text-brand-neutral-900">{category.category}</h2>
        </div>
        <p className="text-brand-neutral-600 ml-13">{category.description}</p>
      </div>

      {/* Questions Accordion */}
      <Accordion type="single" collapsible className="space-y-3">
        {category.questions.map((faq, qIdx) => (
          <AccordionItem
            key={qIdx}
            value={`${categoryIndex}-${qIdx}`}
            className="bg-brand-card-blue border border-brand-neutral-300 rounded-lg overflow-hidden hover:border-brand-accent/50 transition-colors"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline text-left">
              <span className="text-brand-neutral-900 pr-4 font-medium">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-brand-neutral-700">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
