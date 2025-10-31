import React from "react";
import { DollarSign, Edit2 } from "lucide-react";

interface ServiceRateDialogContentProps {
  currency: string;
  baseRate: number;
}

/**
 * ServiceRateDialogContent - Dialog content explaining base vs custom service rates
 * Used in ServiceModal to provide detailed information about rate options
 */
export const ServiceRateDialogContent: React.FC<ServiceRateDialogContentProps> = ({ currency, baseRate }) => {
  return (
    <div className="space-y-4">
      {/* Base Rate Option */}
      <div className="p-4 bg-brand-card-blue/30 rounded-lg border border-brand-neutral-300/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-brand-accent/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-brand-accent" />
          </div>
          <h5 className="text-sm text-brand-neutral-900">Base Rate</h5>
        </div>
        <p className="text-xs text-brand-neutral-700 leading-relaxed">
          Use your standard hourly rate from Step 4 ({currency}
          {baseRate}/hr) for straightforward services that match your typical workload.
        </p>
      </div>

      {/* Custom Rate Option */}
      <div className="p-4 bg-brand-card-blue/30 rounded-lg border border-brand-accent/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-brand-highlight/10 flex items-center justify-center">
            <Edit2 className="w-4 h-4 text-brand-highlight" />
          </div>
          <h5 className="text-sm text-brand-neutral-900">Custom Rate</h5>
        </div>
        <p className="text-xs text-brand-neutral-700 leading-relaxed mb-2">
          Set a different rate for services that require specialized expertise, have higher complexity, or are in higher demand.
        </p>
        <div className="text-xs text-brand-neutral-600 space-y-1">
          <p>
            • <strong>Higher rates:</strong> Complex integrations, architecture reviews, security audits
          </p>
          <p>
            • <strong>Lower rates:</strong> Quick consultations, code reviews, documentation
          </p>
        </div>
      </div>
    </div>
  );
};
