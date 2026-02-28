import React from "react";
import { PlanOption } from "./types";
import { PlanPriceType, PlanProductType } from "@open-source-economy/api-types";

import { isVisible } from "../../../../utils/featureVisibility";

interface DevControlsProps {
  currentPlanTier: PlanProductType | null;
  currentPlanBilling: PlanPriceType;
  plans: PlanOption[];
  onPlanTierChange: (tier: PlanProductType | null) => void;
  onPlanBillingChange: (billing: PlanPriceType) => void;
}

export function DevControls(props: DevControlsProps) {
  if (!isVisible("devControls")) return null;

  return (
    <div className="bg-yellow-100 border-b-2 border-yellow-400 py-3">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs text-yellow-800 mb-2">🔧 Development Controls (not visible in production)</p>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-yellow-900">Current Plan:</label>
            <select
              value={props.currentPlanTier || "none"}
              onChange={(e) => {
                const val = e.target.value;
                props.onPlanTierChange(val === "none" ? null : (val as PlanProductType));
              }}
              className="px-2 py-1 border border-yellow-400 rounded bg-white text-sm"
            >
              <option value="none">No Plan</option>
              {props.plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          {props.currentPlanTier && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-yellow-900">Current Billing:</label>
              <select
                value={props.currentPlanBilling}
                onChange={(e) => props.onPlanBillingChange(e.target.value as PlanPriceType)}
                className="px-2 py-1 border border-yellow-400 rounded bg-white text-sm"
              >
                <option value={PlanPriceType.MONTHLY}>Monthly</option>
                <option value={PlanPriceType.ANNUALLY}>Annual</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
