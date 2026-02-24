import React from "react";

import { PlanPriceType } from "@open-source-economy/api-types";

interface BillingToggleProps {
  billingCycle: PlanPriceType;
  onBillingCycleChange: (cycle: PlanPriceType) => void;
  savingsPercentage: number;
}

export function BillingToggle(props: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-3 relative">
      {/* Toggle */}
      <div className="inline-flex items-center gap-2 bg-card rounded-xl p-1.5 shadow-lg border-2 border-brand-neutral-400">
        <BillingToggleButton
          active={props.billingCycle === PlanPriceType.MONTHLY}
          onClick={() => props.onBillingCycleChange(PlanPriceType.MONTHLY)}
        >
          Monthly billing
        </BillingToggleButton>
        <BillingToggleButton
          active={props.billingCycle === PlanPriceType.ANNUALLY}
          onClick={() => props.onBillingCycleChange(PlanPriceType.ANNUALLY)}
        >
          Annual billing
        </BillingToggleButton>
      </div>
    </div>
  );
}

interface BillingToggleButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function BillingToggleButton(props: BillingToggleButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`px-8 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
        props.active
          ? "bg-gradient-to-r from-brand-accent to-brand-highlight text-white shadow-md"
          : "text-brand-neutral-700 hover:text-brand-neutral-900 hover:bg-brand-neutral-200"
      }`}
    >
      {props.children}
    </button>
  );
}
