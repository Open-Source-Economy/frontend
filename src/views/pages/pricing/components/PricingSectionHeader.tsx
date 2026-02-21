import React from "react";
import { BillingToggle } from "./BillingToggle";
import { PlanPriceType } from "@open-source-economy/api-types";

interface PricingSectionHeaderProps {
  billingCycle: PlanPriceType;
  onBillingCycleChange: (cycle: PlanPriceType) => void;
  savingsPercentage: number;
}

export function PricingSectionHeader({ billingCycle, onBillingCycleChange, savingsPercentage }: PricingSectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-brand-neutral-900 mb-4">Simple, Transparent Pricing</h1>
      <p className="text-brand-neutral-600 max-w-2xl mx-auto mb-8">
        Purchase service credits that work across all projects on the platform. Use your credits for bug fixes, features, consultancy, and support from top open
        source maintainers.
      </p>

      <BillingToggle billingCycle={billingCycle} onBillingCycleChange={onBillingCycleChange} savingsPercentage={savingsPercentage} />
    </div>
  );
}
