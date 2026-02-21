import React from "react";
import { Button } from "../ui/button";
import { CreditCard, FileText, Edit3, ExternalLink } from "lucide-react";
import { BenefitsSection } from "../ui/benefits-section";
import { ActionLink } from "../ui/action-link";
import { getTierColor, getTierBorderColor, getPlanName, getBillingDisplay } from "./utils/tierUtils";
import { PlanPriceType, PlanProductType } from "@open-source-economy/api-types";

interface SubscriptionCardProps {
  tier: PlanProductType;
  billing: PlanPriceType | null;
  commonBenefits: string[];
  tierBenefits: string[];
  onDownloadInvoices: () => void;
  onUpdatePayment: () => void;
  onManageSubscription: () => void;
}

export function SubscriptionCard({
  tier,
  billing,
  commonBenefits,
  tierBenefits,
  onDownloadInvoices,
  onUpdatePayment,
  onManageSubscription,
}: SubscriptionCardProps) {
  return (
    <div className={`bg-brand-secondary rounded-xl border ${getTierBorderColor(tier as any)} shadow-xl overflow-hidden`}>
      {/* Main Content Row */}
      <div className="flex items-center gap-6 p-6">
        {/* Icon */}
        <div className={`${getTierColor(tier as any)} rounded-xl p-4 flex-shrink-0`}>
          <CreditCard className="w-8 h-8 text-brand-secondary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-white">Manage Your Subscription</h3>
            <span className="px-2 py-0.5 bg-brand-success/20 border border-brand-success/40 rounded text-brand-success text-xs uppercase tracking-wider">
              Active
            </span>
          </div>
          <p className="text-brand-neutral-600 text-sm">
            You are currently on the <span className="text-white">{getPlanName(tier as any)}</span> plan (billed {getBillingDisplay(billing)}).
          </p>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <Button onClick={onManageSubscription} className="bg-brand-accent hover:bg-brand-accent-dark text-brand-secondary px-6">
            Customer Portal
          </Button>
        </div>
      </div>

      {/* Active Benefits Section */}
      <div className="px-6 pb-6 border-t border-brand-neutral-300/20 pt-6">
        <h4 className="text-white mb-4 text-sm uppercase tracking-wider">Active Benefits</h4>

        <div className="grid md:grid-cols-2 gap-6">
          <BenefitsSection title="Core Mission Benefits" benefits={commonBenefits} iconColor="accent" />

          <BenefitsSection title={`${getPlanName(tier as any)} Tier Benefits`} benefits={tierBenefits} iconColor={tier as any} />
        </div>
      </div>

      {/* Action Links Row */}
      <div className="px-6 pb-6 flex items-center justify-between gap-6 text-sm border-t border-brand-neutral-300/20 pt-4">
        <div className="flex items-center gap-6">
          <ActionLink icon={FileText} label="Download Invoice PDFs" onClick={onDownloadInvoices} />

          <ActionLink icon={Edit3} label="Update Payment Method" onClick={onUpdatePayment} />
        </div>

        <Button
          onClick={onManageSubscription}
          className="bg-brand-error/10 hover:bg-brand-error/20 border border-brand-error/30 hover:border-brand-error/50 text-brand-error hover:text-brand-error transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Cancel Subscription
        </Button>
      </div>
    </div>
  );
}
