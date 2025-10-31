import React from "react";
import { Info } from "lucide-react";
import { PricingStructureDialog } from "./PricingStructureDialog";

export const PricingInfoBanner: React.FC = () => {
  return (
    <div className="flex items-start gap-2 p-3 bg-brand-neutral-200/50 rounded-lg border border-brand-neutral-300/30">
      <Info className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <p className="text-xs text-brand-neutral-600">
          The enterprise will pay more than your service rate. We'll work to negotiate the best rate for you to maximize both your income and ecosystem
          contributions.
        </p>
        <PricingStructureDialog />
      </div>
    </div>
  );
};
