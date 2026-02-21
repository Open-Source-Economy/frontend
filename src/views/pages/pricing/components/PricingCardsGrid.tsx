import React from "react";
import { PricingCard } from "./PricingCard";
import { PlanOption } from "./types";
import { getPlanButtonState } from "./utils";
import { PlanPriceType, PlanProductType } from "@open-source-economy/api-types";

interface PricingCardsGridProps {
  plans: PlanOption[];
  billingCycle: PlanPriceType;
  currentPlanTier: PlanProductType | null;
  currentPlanBilling: PlanPriceType;
  onPlanClick: (planId: PlanProductType) => void;
}

export function PricingCardsGrid({ plans, billingCycle, currentPlanTier, currentPlanBilling, onPlanClick }: PricingCardsGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map(plan => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            description={plan.description}
            monthlyPrice={plan.monthlyPrice}
            annualPrice={plan.annualPrice}
            billingCycle={billingCycle}
            sections={plan.sections}
            highlighted={plan.highlighted}
            previousPlanName={plan.previousPlanName}
            onButtonClick={() => onPlanClick(plan.id)}
            buttonState={getPlanButtonState(plan.id, currentPlanTier, currentPlanBilling, billingCycle, plans)}
            planId={plan.id}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-brand-neutral-500">
          By selecting a plan, you agree to our{" "}
          <a href="#" className="text-brand-accent hover:text-brand-highlight underline transition-colors">
            Terms and Conditions
          </a>
        </p>
      </div>
    </>
  );
}
