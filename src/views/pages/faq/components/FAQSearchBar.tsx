import React from "react";
import { Search } from "lucide-react";

interface FAQSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function FAQSearchBar({ value, onChange }: FAQSearchBarProps) {
  return (
    <div className="relative max-w-lg mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-neutral-500" />
      <input
        type="text"
        placeholder="Search questions..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-brand-card-blue border border-brand-neutral-300 rounded-lg text-brand-neutral-900 placeholder:text-brand-neutral-500 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all"
      />
    </div>
  );
}
