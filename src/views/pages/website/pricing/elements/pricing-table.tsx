import { Check, X } from "lucide-react";
import { useState } from "react";
import { Tabs } from "./tabs";
import { InfoTooltip } from "./tooltip";
import { billingOptions, type Plan, plans } from "../data";
import backdropSVG from "src/assets/backdrop.svg";
import { useAuth } from "src/views/pages/app";

interface PricingTableProps {
  activePlan: Plan | null;
  activeBillingPeriod: "annual" | "monthly";
  onUpgradePlan: (plan: Plan, billingPeriod: "annual" | "monthly") => void;
}

export function PricingTable({ activePlan, activeBillingPeriod, onUpgradePlan }: PricingTableProps) {
  const [billingPeriod, setBillingPeriod] = useState<"annual" | "monthly">("annual");
  const [auth, setAuth] = useState({
    authInfo: {
      user: false,
    },
  });

  return (
    <div className="w-full text-white space-y-8">
      <div className="flex flex-col items-center justify-center gap-4" data-aos="fade-down" data-aos-duration="1000">
        <Tabs items={billingOptions} value={billingPeriod} onValueChange={value => setBillingPeriod(value as "monthly" | "annual")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 max-w-[1444px] mx-auto">
        <img src={backdropSVG} className="pointer-events-none absolute z-0 -top-8 right-56 scale-50 origin-top-right" alt="backdrop" />
        <img src={backdropSVG} className="pointer-events-none absolute z-0 top-[51rem] left-[36rem] scale-50 origin-top-left" alt="backdrop" />
        {plans.map((plan, index) => (
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
                  <p className="text-sm text-white md:min-h-10">{plan.description}</p>
                </div>

                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice[billingPeriod] !== 0 && (
                      <span className="text-gray-500 line-through text-sm md:text-[22px]">${plan.originalPrice[billingPeriod]}</span>
                    )}
                    <span className="text-4xl md:text-[38px] font-bold">${plan.price[billingPeriod]}</span>
                  </div>
                  <div className="text-xs text-gray-400">per month, {billingPeriod === "annual" ? "paid annually" : "billed monthly"}</div>
                </div>

                {activeBillingPeriod && activePlan?.price[activeBillingPeriod] !== plan.price[billingPeriod] ? (
                  <div className="p-0.5 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        auth.authInfo.user ? onUpgradePlan(plan, billingPeriod) : setAuth(prev => ({ ...prev, authInfo: { user: true } }));
                      }}
                      className={`
                    w-full p-[14px] rounded-lg bg-theme-blue hover:bg-opacity-80 transition-all duration-300 group/btn ${
                      activePlan && auth.authInfo.user
                        ? (activePlan.name === plan.name && activePlan.price[activeBillingPeriod] > activePlan.price[billingPeriod]) ||
                          (activePlan.name !== plan.name && activePlan.price[activeBillingPeriod] < plan.price[billingPeriod])
                          ? "bg-opacity-0"
                          : "bg-opacity-100"
                        : "bg-opacity-0"
                    }`}
                    >
                      <span
                        className={`group-hover/btn:text-white w-full transition font-semibold text-sm bg-clip-text bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 ${
                          activePlan && auth.authInfo.user
                            ? (activePlan.name === plan.name && activePlan.price[activeBillingPeriod] > activePlan.price[billingPeriod]) ||
                              (activePlan.name !== plan.name && activePlan.price[activeBillingPeriod] < plan.price[billingPeriod])
                              ? "text-white"
                              : "text-transparent"
                            : "text-white"
                        }`}
                      >
                        {activePlan && auth.authInfo.user
                          ? (activePlan.name === plan.name && activePlan.price[activeBillingPeriod] > activePlan.price[billingPeriod]) ||
                            (activePlan.name !== plan.name && activePlan.price[activeBillingPeriod] < plan.price[billingPeriod])
                            ? "UPGRADE PLAN"
                            : "SELECT PLAN"
                          : "GET STARTED"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="p-[18px] text-center text-theme-pink text-sm font-medium">Current Plan</div>
                )}

                <div className="grid gap-3">
                  {plan.features.map((feature, i) => (
                    <>
                      <hr key={feature.name} className="border-white/20 border-2" />
                      {feature.title && <div className="font-semibold text-center text-theme-pink">{feature.title}</div>}
                      <div
                        key={feature.name}
                        className={`flex items-start gap-1.5 ${!feature.included && "opacity-30"} ${
                          i === 1 ? "md:min-h-[68px]" : i === 2 ? "md:min-h-[172px]" : ""
                        }`}
                      >
                        {feature.included ? <Check className="h-6 w-6 text-theme-pink shrink-0" /> : <X className="h-5 w-5 text-theme-pink shrink-0 mt-0.5" />}
                        <div className="space-y-1">
                          <div className="inline-block space-x-2">
                            <span className="font-semibold">{feature.name}</span>
                            {feature.info && <InfoTooltip content={feature.info} />}
                          </div>
                          <p className="text-sm">{feature.description}</p>
                          {feature.extras?.map(extra => (
                            <div key={extra.name} className={`flex gap-2 mt-2 ${!extra.included && "opacity-30"}`}>
                              {extra.included ? (
                                <Check className="h-4 w-4 text-theme-pink shrink-0 mt-1" />
                              ) : (
                                <X className="h-3.5 w-3.5 text-theme-pink shrink-0 mt-1" />
                              )}
                              <div className="inline-block space-x-2 relative">
                                <span className="text-sm text-gray-400">{extra.name}</span>
                                {extra.info && <InfoTooltip content={extra.info} />}
                                {extra.soon && (
                                  <p className="absolute -right-2 translate-x-full top-1/2 -translate-y-1/2 text-xs bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 py-[1px] px-1.5 rounded-full text-white font-semibold inline-block">
                                    soon
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                          {feature.subtext && <p className="text-sm text-gray-400">{feature.subtext}</p>}
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
