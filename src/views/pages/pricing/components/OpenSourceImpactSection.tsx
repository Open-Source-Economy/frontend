import React from "react";
import { Leaf } from "lucide-react";

interface OpenSourceImpactSectionProps {
  title: string;
}

export function OpenSourceImpactSection({ title }: OpenSourceImpactSectionProps) {
  return (
    <div className="bg-gradient-to-br from-brand-accent/5 to-brand-highlight/5 rounded-lg p-4 border border-brand-accent/20">
      <div className="flex items-center gap-2 mb-2">
        <Leaf className="w-4 h-4 text-brand-accent shrink-0" />
        <h4 className="text-brand-accent">{title}</h4>
      </div>
      <p className="text-xs text-brand-neutral-600 mb-3">When you use credits, funds flow through the entire dependency chain:</p>
      <div className="space-y-2 mb-3">
        <div className="flex items-start gap-2 text-xs text-brand-neutral-700">
          <Leaf className="w-3.5 h-3.5 text-brand-accent/60 shrink-0 mt-0.5" />
          <span>
            <span className="text-brand-accent">Your project's maintainer</span> receives direct payment for the service
          </span>
        </div>
        <div className="flex items-start gap-2 text-xs text-brand-neutral-700">
          <Leaf className="w-3.5 h-3.5 text-brand-accent/60 shrink-0 mt-0.5" />
          <span>
            <span className="text-brand-accent">All dependencies</span> that project relies on get funded automatically
          </span>
        </div>
      </div>
    </div>
  );
}
