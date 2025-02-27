import React from "react";
import { Check, X } from "lucide-react";
import { InfoTooltip } from "../tooltip";
import { PlanFeatureDetails } from "../data/data";

interface PlanFeatureProps {
  description: string;
  details?: PlanFeatureDetails[];
}

export function PricingDetails(props: PlanFeatureProps) {
  return (
    // style alternative
    // <>
    //   <p className="text-sm">{props.description}</p>
    //   {props.details?.map(detail => (
    //     <div key={detail.name} className={`flex gap-2 mt-2 ${!detail.included && "opacity-30"}`}>
    //       {detail.included ? <Check className="h-4 w-4 text-theme-pink shrink-0 mt-1" /> : <X className="h-3.5 w-3.5 text-theme-pink shrink-0 mt-1" />}
    //       <div className="inline-block space-x-2 relative">
    //         <span className="text-sm text-gray-400">{detail.name}</span>
    //         {detail.info && detail.included && <InfoTooltip content={detail.info} />}
    //         {detail.soon && (
    //           <p className="absolute -right-2 translate-x-full top-1/2 -translate-y-1/2 text-xs bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 py-[1px] px-1.5 rounded-full text-white font-semibold inline-block">
    //             soon
    //           </p>
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </>

    <>
      <p className="text-sm">{props.description}</p>
      {props.details?.map(detail => (
        <div key={detail.name} className={`flex items-center gap-2 mt-2 ${!detail.included && "opacity-30"}`}>
          {detail.included ? <Check className="h-4 w-4 text-theme-pink shrink-0" /> : <X className="h-3.5 w-3.5 text-theme-pink shrink-0" />}
          <span className="text-xs text-gray-400">{detail.name}</span>
          {detail.info && detail.included && <InfoTooltip content={detail.info} />}
          {detail.soon && detail.included && (
            <p className="text-[10px] bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 py-[1px] px-1.5 rounded-full text-white font-semibold">
              soon
            </p>
          )}
        </div>
      ))}
    </>
  );
}
