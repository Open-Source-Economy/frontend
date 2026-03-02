import React from "react";
import { FeatureList } from "src/views/pages/pricing/components/FeatureList";
import { FeatureItem } from "src/views/pages/pricing/components/FeatureItem";
import { Feature } from "src/views/pages/pricing/components/types";
import { SectionHeader } from "src/views/pages/pricing/components/SectionHeader";

interface PlanAccessSectionProps {
  features: Feature[];
  previousPlanName?: string;
}

export function PlanAccessSection(props: PlanAccessSectionProps) {
  return (
    <div className="pt-4 border-t border-brand-neutral-300 mt-2">
      <SectionHeader
        title="Your Plan Access"
        subtitle="Credits vary by tier"
        titleClassName="text-brand-neutral-900 mb-2"
      />

      {/* Show "Everything in previous plan +" for upgrade tiers */}
      {props.previousPlanName && (
        <FeatureItem
          text={
            <>
              Everything in <span className="text-brand-neutral-900">{props.previousPlanName}</span> +
            </>
          }
          included={true}
        />
      )}

      <FeatureList features={props.features} />
    </div>
  );
}
