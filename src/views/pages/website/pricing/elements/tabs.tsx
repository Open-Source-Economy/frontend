import React from "react";
import { PlanPriceType } from "../../../../../api/model";

interface TabsProps {
  value: PlanPriceType;
  values: PlanPriceType[];
  onValueChange: (value: PlanPriceType) => void;
}

export function Tabs(props: TabsProps) {
  return (
    <div className="relative">
      <div className="absolute left-1/4 -translate-x-1/2 -top-1 -translate-y-full md:-left-6 md:-translate-x-full md:top-1/2 md:-translate-y-1/2">
        <div className="max-md:scale-75 font-medium bg-theme-pink text-white text-sm md:text-base px-2.5 py-2.5 rounded-lg relative after:absolute after:content-[''] after:border-[12px] after:border-transparent max-md:after:border-t-theme-pink max-md:after:-bottom-5 max-md:after:left-1/2 max-md:after:-translate-x-1/2 md:after:border-l-theme-pink md:after:-right-5 md:after:top-1/2 md:after:-translate-y-1/2">
          Save 20%
        </div>
      </div>
      <div
        className={`relative inline-flex items-center justify-center rounded-[10px] p-[1.5px] bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3`}
      >
        <div className="w-full h-full bg-theme-background rounded-[10px] inline-flex items-center justify-center p-1.5">
          {props.values.map(priceType => (
            <>
              <button
                key={priceType}
                type="button"
                onClick={() => props.onValueChange(priceType as PlanPriceType)}
                className={`relative h-full flex items-center justify-center whitespace-nowrap rounded-md max-md:px-6 md:px-10 max-md:py-2 md:py-3 text-sm md:text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 ${
                  props.value === priceType ? "text-white" : "bg-clip-text text-transparent hover:text-white"
                }`}
              >
                {priceType === PlanPriceType.ANNUALLY ? "Annual" : "Monthly"}
                {" Billing"}
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
