import * as dto from "@open-source-economy/api-types";
import { PlanOption } from "src/views/pages/pricing/components/types";

export type ButtonState = "current" | "upgrade" | "downgrade" | "select";

export function getPlanButtonState(
  planId: dto.PlanProductType,
  currentPlanTier: dto.PlanProductType | null,
  currentPlanBilling: dto.PlanPriceType,
  billingCycle: dto.PlanPriceType,
  plans: PlanOption[]
): ButtonState {
  if (!currentPlanTier) return "select";
  if (currentPlanTier === planId && currentPlanBilling === billingCycle) return "current";

  const planIndex = plans.findIndex((p) => p.id === planId);
  const currentIndex = plans.findIndex((p) => p.id === currentPlanTier);

  // Check if it's an upgrade
  if (planIndex > currentIndex) return "upgrade";
  if (planIndex < currentIndex) return "downgrade";

  // Same tier, different billing
  if (billingCycle === dto.PlanPriceType.ANNUALLY && currentPlanBilling === dto.PlanPriceType.MONTHLY) return "upgrade";
  if (billingCycle === dto.PlanPriceType.MONTHLY && currentPlanBilling === dto.PlanPriceType.ANNUALLY)
    return "downgrade";

  return "select";
}
