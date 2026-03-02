import React from "react";
import { SubscriptionCard } from "./SubscriptionCard";
import { getActiveBenefits } from "./data/subscriptionBenefits";
import * as dto from "@open-source-economy/api-types";

interface SubscriptionManagementProps {
  currentPlanTier: dto.PlanProductType | null;
  currentPlanBilling: dto.PlanPriceType | null;
}

export function SubscriptionManagement(props: SubscriptionManagementProps) {
  // Only show if user has an active subscription
  if (!props.currentPlanTier) {
    return null;
  }

  const benefits = getActiveBenefits(props.currentPlanTier);

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
        tier={props.currentPlanTier}
        billing={props.currentPlanBilling}
        commonBenefits={benefits.common}
        tierBenefits={benefits.tier}
        onDownloadInvoices={handleDownloadInvoices}
        onUpdatePayment={handleUpdatePayment}
        onManageSubscription={handleManageSubscription}
      />
    </div>
  );
}
