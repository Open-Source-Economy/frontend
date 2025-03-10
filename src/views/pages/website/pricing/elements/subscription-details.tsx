import { Check, X } from "lucide-react";
import { InfoTooltip } from "./tooltip";
import type { PlanDescription } from "./data/data";
import { PlanPriceType } from "../../../../../api/model";

interface SubscriptionDetailsProps {
  plan: PlanDescription;
  planPriceType: PlanPriceType;
  prices: Record<PlanPriceType, number>;
}

export function SubscriptionDetails(props: SubscriptionDetailsProps) {
  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-semibold -mt-0.5">{props.plan.name}</h3>
        <span className="text-gray-400 text-sm">
          {/*TODO: NumberFormat*/}$
          {Intl.NumberFormat("en-US").format(props.prices[props.planPriceType] * (props.planPriceType === PlanPriceType.ANNUALLY ? 12 : 1))} /{" "}
          {props.planPriceType === PlanPriceType.ANNUALLY ? "year" : "month"}
        </span>
        <InfoTooltip content={props.plan.description} />
      </div>

      <div className="space-y-2.5">
        {props.plan.features.map((feature, index) => (
          <div key={feature.name} className={`flex items-center gap-2 ${!feature.included && "opacity-30"}`}>
            {feature.included ? <Check className="h-5 w-5 text-theme-pink shrink-0" /> : <X className="h-4 w-4 text-theme-pink shrink-0" />}
            <p className="text-sm">
              <span className="text-white font-semibold">{feature.name}</span>{" "}
              {feature.detailsDescription && <span className="text-gray-400">{feature.detailsDescription}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
