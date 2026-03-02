import React from "react";
import { FeatureList } from "src/views/pages/pricing/components/FeatureList";
import { Feature } from "src/views/pages/pricing/components/types";
import { MembershipTierBadge } from "src/views/pages/pricing/components/MembershipTierBadge";
import { SectionSubtitle } from "src/views/pages/pricing/components/SectionSubtitle";

import * as dto from "@open-source-economy/api-types";

interface RecognitionSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  tier?: dto.PlanProductType;
}

export function RecognitionSection(props: RecognitionSectionProps) {
  return (
    <>
      <div className="mb-3">
        <h4 className="text-brand-neutral-900 mb-1.5">{props.title}</h4>
        {props.tier && (
          <div className="mb-2">
            <MembershipTierBadge tier={props.tier} compact />
          </div>
        )}
        {props.subtitle && <SectionSubtitle text={props.subtitle} />}
      </div>

      <FeatureList features={props.features} gap="compact" />
    </>
  );
}
