import React from "react";
import { SubscriptionCard } from "./SubscriptionCard";
import { getActiveBenefits } from "./data/subscriptionBenefits";
import { PlanPriceType, PlanProductType } from "@open-source-economy/api-types";

interface SubscriptionManagementProps {
  currentPlanTier: PlanProductType | null;
  currentPlanBilling: PlanPriceType | null;
}

export function SubscriptionManagement({ currentPlanTier, currentPlanBilling }: SubscriptionManagementProps) {
  // Only show if user has an active subscription
  if (!currentPlanTier) {
    return null;
  }

  const benefits = getActiveBenefits(currentPlanTier);

  const handleDownloadInvoices = () => {
    console.log("Download invoices");
  };

  const handleUpdatePayment = () => {
    console.log("Update payment method");
  };

  const handleManageSubscription = () => {
    console.log("Open customer portal");
  };

  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <SubscriptionCard
        tier={currentPlanTier}
        billing={currentPlanBilling}
        commonBenefits={benefits.common}
        tierBenefits={benefits.tier}
        onDownloadInvoices={handleDownloadInvoices}
        onUpdatePayment={handleUpdatePayment}
        onManageSubscription={handleManageSubscription}
      />
    </div>
  );
}
