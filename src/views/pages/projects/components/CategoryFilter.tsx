import React from "react";
import { Check } from "lucide-react";
import { ProjectCategory } from "@open-source-economy/api-types";

interface CategoryFilterProps {
  selectedCategory: ProjectCategory | null;
  onSelectCategory: (category: ProjectCategory | null) => void;
  className?: string;
}

export function CategoryFilter(props: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${props.className ?? ""}`}>
      <button
        onClick={() => props.onSelectCategory(null)}
        className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-lg border text-sm transition-all duration-200 ${
          props.selectedCategory === null
            ? "bg-brand-accent text-white border-brand-accent"
            : "bg-background border-border hover:border-brand-accent/50 text-foreground hover:bg-card"
        }`}
      >
        {props.selectedCategory === null && <Check className="w-3.5 h-3.5" />}
        <span>All Projects</span>
      </button>

      {Object.values(ProjectCategory)
        .sort()
        .map(category => (
          <button
            key={category}
            onClick={() => props.onSelectCategory(category)}
            className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-lg border text-sm transition-all duration-200 ${
              props.selectedCategory === category
                ? "bg-brand-accent text-white border-brand-accent"
                : "bg-background border-border hover:border-brand-accent/50 text-foreground hover:bg-card"
            }`}
          >
            {props.selectedCategory === category && <Check className="w-3.5 h-3.5" />}
            <span>{category}</span>
          </button>
        ))}
    </div>
  );
}
