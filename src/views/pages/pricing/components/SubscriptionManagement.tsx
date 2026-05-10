import React from "react";
import { SubscriptionCard } from "src/views/pages/pricing/components/SubscriptionCard";
import { getActiveBenefits } from "src/views/pages/pricing/components/data/subscriptionBenefits";
import * as dto from "@open-source-economy/api-types";
import { stripeHooks } from "src/api";

interface SubscriptionManagementProps {
  currentPlanTier: dto.PlanProductType | null;
  currentPlanBilling: dto.PlanPriceType | null;
}

export function SubscriptionManagement(props: SubscriptionManagementProps) {
  if (!props.currentPlanTier) {
    return null;
  }

  const benefits = getActiveBenefits(props.currentPlanTier);
  const portalMutation = stripeHooks.useCreatePortalSessionMutation();

  const openPortal = () => {
    const params: dto.CreatePortalSessionParams = {};
    const body: dto.CreatePortalSessionBody = { returnUrl: window.location.href };
    const query: dto.CreatePortalSessionQuery = {};

    portalMutation.mutate(
      { params, body, query },
      {
        onSuccess: (data) => {
          window.open(data.url, "_blank", "noopener,noreferrer");
        },
      }
    );
  };

  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <SubscriptionCard
        tier={props.currentPlanTier}
        billing={props.currentPlanBilling}
        commonBenefits={benefits.common}
        tierBenefits={benefits.tier}
        onDownloadInvoices={openPortal}
        onUpdatePayment={openPortal}
        onManageSubscription={openPortal}
      />
    </div>
  );
}
