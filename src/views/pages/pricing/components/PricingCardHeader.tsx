import React from "react";
import { PricingCardButton } from "./PricingCardButton";
import { ButtonState } from "./utils";
import { PlanPriceType, PlanProductType } from "@open-source-economy/api-types";

interface PricingCardHeaderProps {
  name: string;
  description: string;
  displayPrice: number;
  originalPrice: number | null;
  billingCycle: PlanPriceType;
  buttonState: ButtonState;
  onButtonClick: () => void;
  planId?: PlanProductType;
}

export function PricingCardHeader({
  name,
  description,
  displayPrice,
  originalPrice,
  billingCycle,
  buttonState,
  onButtonClick,
  planId,
}: PricingCardHeaderProps) {
  // Get tier badge styling
  const getTierBadge = () => {
    switch (planId) {
      case PlanProductType.START_UP_PLAN:
        return {
          label: "Bronze Tier",
          className: "bg-brand-tier-bronze/10 text-brand-tier-bronze border-brand-tier-bronze/30",
        };
      case PlanProductType.SCALE_UP_PLAN:
        return {
          label: "Silver Tier",
          className: "bg-brand-tier-silver/10 text-brand-tier-silver border-brand-tier-silver/30",
        };
      case PlanProductType.ENTERPRISE_PLAN:
        return {
          label: "Gold Tier",
          className: "bg-brand-tier-gold/10 text-brand-tier-gold border-brand-tier-gold/30",
        };
      case PlanProductType.INDIVIDUAL_PLAN:
        return {
          label: "Essential",
          className: "bg-brand-neutral-200/50 text-brand-neutral-700 border-brand-neutral-300/50",
        };
      default:
        return null;
    }
  };

  const tierBadge = getTierBadge();

  return (
    <div className="mb-6 pb-8 text-center">
      {tierBadge && (
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs border ${tierBadge.className}`}>{tierBadge.label}</span>
        </div>
      )}

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-3">
          {originalPrice && <span className="text-xl text-brand-neutral-500 line-through">${originalPrice}</span>}
          <span className="text-5xl text-brand-neutral-900">${displayPrice}</span>
        </div>
        <div className="text-sm text-brand-neutral-600 mt-2">per month, billed {billingCycle === PlanPriceType.ANNUALLY ? "annually" : "monthly"}</div>
      </div>

      {/* CTA Button */}
      <PricingCardButton state={buttonState} onClick={onButtonClick} />
    </div>
  );
}
