import { useEffect, useState } from "react";
import { Tabs } from "../tabs";
import backdropSVG from "src/assets/backdrop.svg";
import { Currency, PlanPriceType, PlanProductType } from "../../../../../../api/model";
import { planDescriptions } from "../data/data";
import { Pricing, PricingCategory } from "./pricing";
import { usePlans } from "../../../../../hooks";
import { useUserPlan } from "../../../../../hooks/useUserPlan";

interface PricingTableProps {}

export function PricingTable(props: PricingTableProps) {
  const currency = Currency.USD;

  const [priceType, setPriceType] = useState<PlanPriceType>(PlanPriceType.ANNUALLY);

  const [activePlan, setActivePlan] = useState<PlanProductType | null>(null);
  const [activePriceType, setActivePriceType] = useState<PlanPriceType | null>(null);

  const { plans, loadPlansError, reloadPlans } = usePlans();
  const { userPlan, loadUserPlanError, reloadUserPlan } = useUserPlan();

  const pricingCategory = (type: PlanProductType, activePlan: PlanProductType | null, activePriceType: PlanPriceType | null): PricingCategory => {
    const orderMap: Record<PlanProductType, number> = {
      [PlanProductType.INDIVIDUAL_PLAN]: 1,
      [PlanProductType.START_UP_PLAN]: 2,
      [PlanProductType.SCALE_UP_PLAN]: 3,
      [PlanProductType.ENTERPRISE_PLAN]: 4,
    };

    if (activePlan === null || activePriceType === null) return PricingCategory.GET_STARTED;
    else if (orderMap[type] === orderMap[activePlan]) {
      if (priceType === activePriceType) return PricingCategory.SELECTED;
      else if (priceType === PlanPriceType.ANNUALLY) return PricingCategory.UPGRADE;
      else return PricingCategory.DOWNGRADE;
    } else if (orderMap[type] < orderMap[activePlan]) return PricingCategory.DOWNGRADE;
    else return PricingCategory.UPGRADE;
  };

  useEffect(() => {
    reloadPlans();
    reloadUserPlan();
  }, []);

  useEffect(() => {
    setActivePlan(userPlan?.productType ?? null);
    setActivePriceType(userPlan?.priceType ?? null);
  }, [userPlan]);

  return (
    <div className="w-full text-white space-y-8">
      <div className="flex flex-col items-center justify-center gap-4" data-aos="fade-down" data-aos-duration="1000">
        <Tabs value={priceType} values={[PlanPriceType.ANNUALLY, PlanPriceType.MONTHLY]} onValueChange={setPriceType} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 max-w-[1444px] mx-auto">
        <img src={backdropSVG} className="pointer-events-none absolute z-0 -top-8 right-56 scale-50 origin-top-right" alt="backdrop" />
        <img src={backdropSVG} className="pointer-events-none absolute z-0 top-[60rem] left-[36rem] scale-50 origin-top-left" alt="backdrop" />
        {plans &&
          Object.entries(planDescriptions).map(([planProductTypeKey, plan], index) => {
            // @ts-ignore
            const planProductType: PlanProductType = planProductTypeKey as PlanProductType;
            return (
              <Pricing
                key={planProductTypeKey}
                planDescription={plan}
                priceType={priceType}
                prices={plans.plans[planProductType][currency]}
                pricingCategory={pricingCategory(planProductType, activePlan, activePriceType)}
                aosDelay={index * 300}
              />
            );
          })}
      </div>

      <p className="text-[22px] text-center" data-aos="fade" data-aos-duration="1500">
        <span className="text-theme-pink">100% non profit,</span> 100% Open Source Investment
      </p>
    </div>
  );
}
