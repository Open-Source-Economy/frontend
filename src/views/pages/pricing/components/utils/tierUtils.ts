import { PlanProductType, PlanPriceType } from "@open-source-economy/api-types";

export type TierType = PlanProductType | null;

export const getTierColor = (tier: TierType): string => {
  switch (tier) {
    case PlanProductType.START_UP_PLAN:
      return "bg-brand-tier-bronze";
    case PlanProductType.SCALE_UP_PLAN:
      return "bg-brand-tier-silver";
    case PlanProductType.ENTERPRISE_PLAN:
      return "bg-brand-tier-gold";
    default:
      return "bg-brand-accent";
  }
};

export const getTierBorderColor = (tier: TierType): string => {
  switch (tier) {
    case PlanProductType.START_UP_PLAN:
      return "border-brand-tier-bronze/30";
    case PlanProductType.SCALE_UP_PLAN:
      return "border-brand-tier-silver/30";
    case PlanProductType.ENTERPRISE_PLAN:
      return "border-brand-tier-gold/30";
    default:
      return "border-brand-accent/30";
  }
};

export const getTierTextColor = (tier: TierType): string => {
  switch (tier) {
    case PlanProductType.START_UP_PLAN:
      return "text-brand-tier-bronze";
    case PlanProductType.SCALE_UP_PLAN:
      return "text-brand-tier-silver";
    case PlanProductType.ENTERPRISE_PLAN:
      return "text-brand-tier-gold";
    default:
      return "text-brand-accent";
  }
};

export const getPlanName = (tier: TierType): string => {
  if (!tier) return "";
  switch (tier) {
    case PlanProductType.INDIVIDUAL_PLAN:
      return "Basic Membership";
    case PlanProductType.START_UP_PLAN:
      return "Bronze Membership";
    case PlanProductType.SCALE_UP_PLAN:
      return "Silver Membership";
    case PlanProductType.ENTERPRISE_PLAN:
      return "Gold Membership";
    default:
      return "";
  }
};

export const getBillingDisplay = (billing: PlanPriceType | null): string => {
  return billing === PlanPriceType.ANNUALLY ? "annually" : "monthly";
};
