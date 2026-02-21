import React from "react";
import { CreditCard, ExternalLink, ReceiptText } from "lucide-react";
import { Button } from "../../../components/ui/forms/button";
import { PlanProductType, PlanPriceType } from "@open-source-economy/api-types";

interface ManageSubscriptionSectionProps {
  planName: string;
  billingCycle: PlanPriceType;
  onManageBilling: () => void;
  isLoading?: boolean;
}

export function ManageSubscriptionSection({ planName, billingCycle, onManageBilling, isLoading = false }: ManageSubscriptionSectionProps) {
  return (
    <div className="mb-12">
      <div className="bg-gradient-to-r from-brand-accent/5 to-brand-highlight/5 rounded-2xl border-2 border-brand-accent/20 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-highlight flex items-center justify-center shrink-0 shadow-lg">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-brand-neutral-900 text-xl font-mich">Manage Your Subscription</h2>
                <span className="px-2.5 py-0.5 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full uppercase tracking-wider border border-brand-accent/20">
                  Active
                </span>
              </div>
              <p className="text-brand-neutral-600">
                You are currently on the <span className="font-bold text-brand-neutral-800">{planName}</span> plan (billed{" "}
                {billingCycle === PlanPriceType.ANNUALLY ? "annually" : "monthly"}).
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button
              onClick={onManageBilling}
              loading={isLoading}
              className="bg-brand-neutral-900 hover:bg-brand-neutral-800 text-white gap-2 h-12 px-6 shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              Manage Billing & Invoices
            </Button>
          </div>
        </div>

        {/* Perks / Hint */}
        <div className="mt-8 pt-6 border-t border-brand-neutral-200 flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center gap-2 text-sm text-brand-neutral-500">
            <ReceiptText className="w-4 h-4" />
            <span>Download Invoice PDFs</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-neutral-500">
            <CreditCard className="w-4 h-4" />
            <span>Update Payment Method</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-neutral-500">
            <ExternalLink className="w-4 h-4" />
            <span>Cancel Anytime in Stripe Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
