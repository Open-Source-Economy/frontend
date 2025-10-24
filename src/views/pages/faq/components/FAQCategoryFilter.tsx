import React from "react";
import { faqData } from "src/views/pages/faq/data/faqData";
import { iconMap } from "../utils/iconMap";
import { cn } from "src/views/components/utils";

interface FAQCategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function FAQCategoryFilter({ selectedCategory, onCategoryChange }: FAQCategoryFilterProps) {
  const getButtonClasses = (isSelected: boolean) =>
    cn(
      "px-4 py-2 rounded-lg border transition-all",
      isSelected
        ? "bg-brand-accent border-brand-accent text-white"
        : "bg-brand-card-blue border-brand-neutral-300 text-brand-neutral-700 hover:border-brand-accent/50",
    );

  return (
    <section className="bg-brand-secondary py-6 border-b border-brand-neutral-300 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => onCategoryChange(null)} className={getButtonClasses(selectedCategory === null)}>
            All Topics
          </button>
          {faqData.map(category => {
            const Icon = iconMap[category.icon];
            const isSelected = selectedCategory === category.category;
            return (
              <button
                key={category.category}
                onClick={() => onCategoryChange(category.category)}
                className={cn(getButtonClasses(isSelected), "flex items-center gap-2")}
              >
                <Icon className="h-4 w-4" />
                <span>{category.category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
