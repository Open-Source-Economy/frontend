import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { DevControls } from "./components/DevControls";
import { PricingCardsGrid } from "./components/PricingCardsGrid";
import { PricingSectionHeader } from "./components/PricingSectionHeader";
import { CustomPlanCTA } from "./components/CustomPlanCTA";
import { HowCreditsWorkSection } from "./components/HowCreditsWorkSection";
import { SubscriptionManagement } from "./components/SubscriptionManagement";
import { plans as mockPlans, SAVINGS_PERCENTAGE } from "./components/plans-data";
import { usePlans, useUserPlan } from "../../v1/hooks";
import { PlanPriceType, PlanProductType } from "@open-source-economy/api-types";

interface PricingPageProps { }

// Helper: Check if a plan ID maps to a real product type
const getRealProductType = (id: any): PlanProductType | undefined => {
  if (Object.values(PlanProductType).includes(id as PlanProductType)) {
    return id as PlanProductType;
  }
  return undefined;
};

export function PricingPage(props: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<PlanPriceType>(PlanPriceType.ANNUALLY);

  // TODO: Fetch current user plan state properly
  const [currentPlanTier, setCurrentPlanTier] = useState<PlanProductType | null>(null);
  const [currentPlanBilling, setCurrentPlanBilling] = useState<PlanPriceType>(PlanPriceType.MONTHLY);

  // Real Data Hooks
  const { plans: realPlansData, reloadPlans } = usePlans();
  const { userPlan, reloadUserPlan } = useUserPlan();

  useEffect(() => {
    reloadPlans();
    reloadUserPlan();
  }, []);

  useEffect(() => {
    if (userPlan) {
      // Map user plan to UI Tier if possible
      // Assuming userPlan has a productType that matches PlanProductType
      // setCurrentPlanTier(userPlan.productType);
    }
  }, [userPlan]);

  const handlePlanClick = (planId: PlanProductType) => {
    console.log("Plan selected:", planId);
    // TODO: Implement checkout redirection logic
  };

  // Merge Mock Data with Real Prices
  const mergedPlans = useMemo(() => {
    if (!realPlansData) return mockPlans;

    return mockPlans.map(plan => {
      const realType = getRealProductType(plan.id);
      if (realType && realPlansData.plans && realPlansData.plans[realType]) {
        const realPrices = realPlansData.plans[realType];

        // Construct real plan data with prices from API if available
        // We use mock prices as fallback if specific price points are missing
        // Note: Divide by 100 if API prices are in cents

        return {
          ...plan,
          monthlyPrice: realPrices["usd"]?.[PlanPriceType.MONTHLY]?.unitAmount ? realPrices["usd"][PlanPriceType.MONTHLY].unitAmount / 100 : plan.monthlyPrice,
          annualPrice: realPrices["usd"]?.[PlanPriceType.ANNUALLY]?.unitAmount ? realPrices["usd"][PlanPriceType.ANNUALLY].unitAmount / 100 : plan.annualPrice,
        };
      }
      return plan;
    });
  }, [realPlansData]);

  return (
    <div className="min-h-screen bg-brand-secondary">
      <Header />

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-brand-neutral-100 via-brand-secondary to-brand-neutral-200">
        <DevControls
          currentPlanTier={currentPlanTier}
          currentPlanBilling={currentPlanBilling}
          plans={mockPlans}
          onPlanTierChange={setCurrentPlanTier}
          onPlanBillingChange={setCurrentPlanBilling}
        />
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <PricingSectionHeader billingCycle={billingCycle} onBillingCycleChange={setBillingCycle} savingsPercentage={SAVINGS_PERCENTAGE} />

          {/* Pricing Cards */}
          <PricingCardsGrid
            plans={mergedPlans}
            billingCycle={billingCycle}
            currentPlanTier={currentPlanTier}
            currentPlanBilling={currentPlanBilling}
            onPlanClick={handlePlanClick}
          />

          <CustomPlanCTA />

          {/* Footer Note */}
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <p className="text-brand-neutral-600 text-sm sm:text-base">100% non profit • 100% Open Source Investment</p>
          </div>
        </div>
      </section>

      {/* Subscription Management - only show when user has a plan */}
      {currentPlanTier && (
        <section className="py-20 bg-gradient-to-b from-brand-neutral-200 via-brand-secondary to-brand-neutral-100">
          <div className="container mx-auto px-6">
            <SubscriptionManagement currentPlanTier={currentPlanTier} currentPlanBilling={currentPlanBilling} />
          </div>
        </section>
      )}

      <HowCreditsWorkSection />

      <Footer />
    </div>
  );
}
