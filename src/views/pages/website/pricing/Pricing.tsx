import { PageWrapper } from "../../PageWrapper";
import { PricingTable } from "./elements/pricing-table";
import { CustomPlanBanner } from "./elements/custom-plan-banner";
import { CurrentSubscription } from "./elements/current-subscription";
import { useState } from "react";
import { useAuth } from "../../app";
import { plans, type Plan } from "./data";
import backdropSVG from "src/assets/backdrop.svg";

interface PricingProps {}

export function Pricing(props: PricingProps) {
  const [paymentInfo, setPaymentInfo] = useState({
    cardType: "Visa",
    lastFourDigits: "9097",
    expiryDate: "01/29",
    lastPayment: "11/29/2025",
    nextPayment: "11/29/2025",
  });
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [activeBillingPeriod, setActiveBillingPeriod] = useState<"annual" | "monthly">("annual");
  const auth = useAuth();

  return (
    <PageWrapper>
      <div className="flex w-full flex-col items-center justify-center gap-12 md:gap-24 py-12 md:py-24">
        <div data-aos="fade-up" className="relative flex flex-col items-center max-md:gap-4 md:gap-8 max-lg:px-4 mt-8 text-center">
          <img
            src={backdropSVG}
            className="pointer-events-none absolute max-md:top-0 md:-top-40 z-0 left-1/2 -translate-x-1/2 scale-75 origin-top"
            alt="backdrop"
          />
          <h1 className="relative font-mich text-3xl md:text-5xl lg:text-[64px] bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 bg-clip-text text-transparent">
            Enterprise Open Source <br className="" />
            <span className="text-white md:mt-3 inline-block">Solutions</span>
          </h1>
          <div className="relative w-10/12 md:w-[516px] h-1 md:h-2 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 max-w-xl rounded-full" />
          <p className="md:text-xl lg:text-[24px] text-white/70">Access expert support. Fund critical dependencies. Build with confidence.</p>
        </div>

        <div className="relative flex w-full max-w-[1444px] flex-col gap-10 md:gap-20 max-lg:px-4">
          <PricingTable
            activePlan={activePlan}
            onUpgradePlan={(plan: Plan, billingPeriod: "annual" | "monthly") => {
              setActivePlan(plan);
              setActiveBillingPeriod(billingPeriod);
            }}
          />
          <CustomPlanBanner />
          <hr className="border-white/30" />
          {auth.authInfo?.user && activePlan && (
            <CurrentSubscription
              plan={activePlan}
              billingPeriod={activeBillingPeriod}
              payment={{
                cardType: "Visa",
                lastFourDigits: "9097",
                expiryDate: "01/29",
              }}
              schedule={{
                lastPayment: "11/29/2025",
                nextPayment: "11/29/2025",
              }}
              onCancelSubscription={() => {
                setActivePlan(null);
              }}
              onEditPayment={() => {}}
              onViewInvoices={() => {}}
            />
          )}
        </div>
        <div className="max-lg:px-4 flex flex-col items-center text-center text-white">
          <p>
            <a href="/terms" className="text-pink-500 hover:underline font-bold">
              Terms
            </a>{" "}
            and{" "}
            <a href="/conditions" className="text-pink-500 hover:underline font-bold">
              conditions
            </a>{" "}
            apply.
          </p>
          <p>Subject to maintainer availability. Unused credits automatically recredited if service cannot be provided.</p>
        </div>
      </div>
    </PageWrapper>
  );
}
