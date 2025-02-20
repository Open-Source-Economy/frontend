import { Check, X } from "lucide-react";
import { useState } from "react";
import { Tabs } from "./tabs";
import { InfoTooltip } from "./tooltip";
import backdropSVG from "src/assets/backdrop.svg";
import { PlanPriceType } from "../../../../../model";
import { Plan, plans } from "../data";

interface PricingTableProps {
  activePlan: Plan | null;
  onUpgradePlan: (plan: Plan, planPriceType: PlanPriceType) => void;
}

export function PricingTable({ activePlan, onUpgradePlan }: PricingTableProps) {
  const [priceType, setPriceType] = useState<PlanPriceType>(PlanPriceType.ANNUALLY);

  return (
    <div className="w-full text-white space-y-8">
      <div className="flex flex-col items-center justify-center gap-4" data-aos="fade-down" data-aos-duration="1000">
        <Tabs value={priceType} values={[PlanPriceType.ANNUALLY, PlanPriceType.MONTHLY]} onValueChange={setPriceType} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 max-w-[1444px] mx-auto">
        <img src={backdropSVG} className="pointer-events-none absolute z-0 -top-8 right-56 scale-50 origin-top-right" alt="backdrop" />
        <img src={backdropSVG} className="pointer-events-none absolute z-0 top-[51rem] left-[36rem] scale-50 origin-top-left" alt="backdrop" />
        {Object.values(plans).map((plan, index) => (
          <div
            key={plan.name}
            data-aos="fade-up"
            data-aos-delay={index * 300}
            data-aos-duration="1000"
            className={`group relative p-0.5 rounded-[20px] transition-colors duration-300 ease-in-out bg-gradient-to-r ${
              plan.featured ? "from-gradient-1 to-gradient-1" : "from-theme-blue to-theme-blue hover:from-gradient-1 hover:via-gradient-2 hover:to-gradient-3"
            }`}
          >
            <div
              className={`
              relative h-full rounded-[20px] px-6 py-9 bg-theme-blue
              ${plan.featured ? "shadow-lg shadow-[#FF7E4B]/10" : ""}
            `}
            >
              {plan.featured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF7E4B] text-white text-xs font-semibold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-3">
                <div className="text-center space-y-3">
                  <h3 className="text-2xl md:text-[26px] font-light font-michroma text-theme-pink">{plan.name}</h3>
                  <p className="text-xs text-white min-h-8">{plan.description}</p>
                </div>

                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    {priceType === PlanPriceType.ANNUALLY && (
                      <span className="text-gray-500 line-through text-sm md:text-[22px]">${plan.price[PlanPriceType.MONTHLY]}</span>
                    )}
                    <span className="text-4xl md:text-[38px] font-bold">${plan.price[priceType]}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">per month{priceType === PlanPriceType.ANNUALLY ? ", paid annually" : ""}</div>
                </div>

                {activePlan?.name === plan.name ? (
                  <div className="p-3 text-center text-theme-pink text-sm font-medium">Current Plan</div>
                ) : (
                  <div className="p-0.5 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        onUpgradePlan(plan, priceType);
                      }}
                      className={`
                    w-full p-[14px] rounded-lg bg-opacity-0 bg-theme-blue group-hover:bg-opacity-100 transition-all duration-300 group/btn
                    `}
                    >
                      <span className="group-hover/btn:text-white w-full transition bg-clip-text group-hover:text-transparent font-medium text-sm bg-opacity-0 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3">
                        UPGRADE PLAN
                      </span>
                    </button>
                  </div>
                )}

                <div className="grid gap-3">
                  {plan.features.map(feature => (
                    <>
                      <hr key={feature.name} className="border-white/20 border-2" />
                      {feature.title && <div className="font-semibold text-center text-theme-pink">{feature.title}</div>}
                      <div key={feature.name} className={`flex items-start gap-1.5 ${!feature.included && "opacity-30"}`}>
                        {feature.included ? <Check className="h-6 w-6 text-theme-pink shrink-0" /> : <X className="h-5 w-5 text-theme-pink shrink-0 mt-0.5" />}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{feature.name}</span>
                            {feature.info && <InfoTooltip content={feature.info} />}
                          </div>
                          <p className="text-sm">{feature.description}</p>
                          {feature.extras?.map(extra => (
                            <div key={extra.name} className={`flex items-center gap-2 mt-2 ${!extra.included && "opacity-30"}`}>
                              {extra.included ? <Check className="h-4 w-4 text-theme-pink shrink-0" /> : <X className="h-3.5 w-3.5 text-theme-pink shrink-0" />}
                              <span className="text-xs text-gray-400">{extra.name}</span>
                              {extra.info && <InfoTooltip content={extra.info} />}
                              {extra.soon && (
                                <p className="text-[10px] bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 py-[1px] px-1.5 rounded-full text-white font-semibold">
                                  soon
                                </p>
                              )}
                            </div>
                          ))}
                          {feature.subtext && <p className="text-xs text-gray-400">{feature.subtext}</p>}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[22px] text-center" data-aos="fade" data-aos-duration="1500">
        <span className="text-theme-pink">100% non profit,</span> 100% Open Source Investment
      </p>
    </div>
  );
}
