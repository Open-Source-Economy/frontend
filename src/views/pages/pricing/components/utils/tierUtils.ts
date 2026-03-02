import * as dto from "@open-source-economy/api-types";

export type TierType = dto.PlanProductType | null;

export const getTierColor = (tier: TierType): string => {
  switch (tier) {
    case dto.PlanProductType.START_UP_PLAN:
      return "bg-brand-tier-bronze";
    case dto.PlanProductType.SCALE_UP_PLAN:
      return "bg-brand-tier-silver";
    case dto.PlanProductType.ENTERPRISE_PLAN:
      return "bg-brand-tier-gold";
    default:
      return "bg-brand-accent";
  }
};

export const getTierBorderColor = (tier: TierType): string => {
  switch (tier) {
    case dto.PlanProductType.START_UP_PLAN:
      return "border-brand-tier-bronze/30";
    case dto.PlanProductType.SCALE_UP_PLAN:
      return "border-brand-tier-silver/30";
    case dto.PlanProductType.ENTERPRISE_PLAN:
      return "border-brand-tier-gold/30";
    default:
      return "border-brand-accent/30";
  }
};

export const getTierTextColor = (tier: TierType): string => {
  switch (tier) {
    case dto.PlanProductType.START_UP_PLAN:
      return "text-brand-tier-bronze";
    case dto.PlanProductType.SCALE_UP_PLAN:
      return "text-brand-tier-silver";
    case dto.PlanProductType.ENTERPRISE_PLAN:
      return "text-brand-tier-gold";
    default:
      return "text-brand-accent";
  }
};

export const getPlanName = (tier: TierType): string => {
  if (!tier) return "";
  switch (tier) {
    case dto.PlanProductType.INDIVIDUAL_PLAN:
      return "Basic Membership";
    case dto.PlanProductType.START_UP_PLAN:
      return "Bronze Membership";
    case dto.PlanProductType.SCALE_UP_PLAN:
      return "Silver Membership";
    case dto.PlanProductType.ENTERPRISE_PLAN:
      return "Gold Membership";
    default:
      return "";
  }
};

export const getTierIconColor = (tier: TierType): "accent" | "bronze" | "silver" | "gold" => {
  switch (tier) {
    case dto.PlanProductType.START_UP_PLAN:
      return "bronze";
    case dto.PlanProductType.SCALE_UP_PLAN:
      return "silver";
    case dto.PlanProductType.ENTERPRISE_PLAN:
      return "gold";
    default:
      return "accent";
  }
};

export const getBillingDisplay = (billing: dto.PlanPriceType | null): string => {
  return billing === dto.PlanPriceType.ANNUALLY ? "annually" : "monthly";
};
