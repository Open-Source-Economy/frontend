import React from "react";
import { FeatureList } from "./FeatureList";
import { FeatureItem } from "./FeatureItem";
import { Feature } from "./types";
import { SectionHeader } from "./SectionHeader";

interface PlanAccessSectionProps {
  features: Feature[];
  previousPlanName?: string;
}

export function PlanAccessSection({ features, previousPlanName }: PlanAccessSectionProps) {
  return (
    <div className="pt-4 border-t border-brand-neutral-300 mt-2">
      <SectionHeader
        title="Your Plan Access"
        subtitle="Credits vary by tier"
        titleClassName="text-brand-neutral-900 mb-2"
      />

      {/* Show "Everything in previous plan +" for upgrade tiers */}
      {previousPlanName && (
        <FeatureItem
          text={
            <>
              Everything in <span className="text-brand-neutral-900">{previousPlanName}</span> +
            </>
          }
          included={true}
        />
      )}

      <FeatureList features={features} />
    </div>
  );
}
