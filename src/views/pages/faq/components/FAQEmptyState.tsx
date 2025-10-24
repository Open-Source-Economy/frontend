import React from "react";
import { Search } from "lucide-react";

export function FAQEmptyState() {
  return (
    <div className="text-center py-16">
      <Search className="h-12 w-12 text-brand-neutral-500 mx-auto mb-4" />
      <h3 className="text-brand-neutral-900 text-xl mb-2">No questions found</h3>
      <p className="text-brand-neutral-600">Try adjusting your search or filter to find what you're looking for.</p>
    </div>
  );
}
