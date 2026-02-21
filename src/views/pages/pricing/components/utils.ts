import { PlanPriceType, PlanProductType } from "@open-source-economy/api-types";
import { PlanOption } from "./types";

export type ButtonState = "current" | "upgrade" | "downgrade" | "select";

export function getPlanButtonState(
  planId: PlanProductType,
  currentPlanTier: PlanProductType | null,
  currentPlanBilling: PlanPriceType,
  billingCycle: PlanPriceType,
  plans: PlanOption[],
): ButtonState {
  if (!currentPlanTier) return "select";
  if (currentPlanTier === planId && currentPlanBilling === billingCycle) return "current";

  const planIndex = plans.findIndex(p => p.id === planId);
  const currentIndex = plans.findIndex(p => p.id === currentPlanTier);

  // Check if it's an upgrade
  if (planIndex > currentIndex) return "upgrade";
  if (planIndex < currentIndex) return "downgrade";

  // Same tier, different billing
  if (billingCycle === PlanPriceType.ANNUALLY && currentPlanBilling === PlanPriceType.MONTHLY) return "upgrade";
  if (billingCycle === PlanPriceType.MONTHLY && currentPlanBilling === PlanPriceType.ANNUALLY) return "downgrade";

  return "select";
}
