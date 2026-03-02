import React from "react";
import { CoreBenefitSection } from "./CoreBenefitSection";
import { OpenSourceImpactSection } from "./OpenSourceImpactSection";
import { RecognitionSection } from "./RecognitionSection";
import { PlanAccessSection } from "./PlanAccessSection";
import { PricingCardHeader } from "./PricingCardHeader";
import { FeatureSection } from "./types";
import { ButtonState } from "./utils";

import * as dto from "@open-source-economy/api-types";

interface PricingCardProps {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  billingCycle: dto.PlanPriceType;
  sections: FeatureSection[];
  highlighted?: boolean;
  previousPlanName?: string;
  onButtonClick: () => void;
  buttonState: ButtonState;
  planId?: dto.PlanProductType;
}

export function PricingCard(props: PricingCardProps) {
  const displayPrice = props.billingCycle === dto.PlanPriceType.ANNUALLY ? props.annualPrice : props.monthlyPrice;
  const originalPrice = props.billingCycle === dto.PlanPriceType.ANNUALLY ? props.monthlyPrice : null;

  // Determine tier-specific border color
  const getTierBorderColor = () => {
    switch (props.planId) {
      case dto.PlanProductType.START_UP_PLAN:
        return "border-brand-tier-bronze/30 hover:border-brand-tier-bronze/60";
      case dto.PlanProductType.SCALE_UP_PLAN:
        return "border-brand-tier-silver/30 hover:border-brand-tier-silver/60";
      case dto.PlanProductType.ENTERPRISE_PLAN:
        return "border-brand-tier-gold/30 hover:border-brand-tier-gold/60";
      default:
        return props.highlighted ? "border-brand-accent" : "border-brand-neutral-300 hover:border-brand-accent/50";
    }
  };

  return (
    <div
      className={`relative rounded-xl border-2 p-6 transition-all duration-300 bg-card flex flex-col ${getTierBorderColor()} ${
        props.highlighted ? "shadow-lg" : "hover:shadow-md"
      }`}
    >
      {/* Plan Header */}
      <PricingCardHeader
        name={props.name}
        description={props.description}
        displayPrice={displayPrice}
        originalPrice={originalPrice}
        billingCycle={props.billingCycle}
        onButtonClick={props.onButtonClick}
        buttonState={props.buttonState}
        planId={props.planId}
      />

      {/* Feature Sections */}
      <div className="flex flex-col flex-1 gap-6">
        {props.sections.map((section, sectionIndex) => {
          const isCoreBenefit = sectionIndex === 0;
          const isOpenSourceImpact = section.title.includes("Open Source Impact");
          const isRecognition = section.title.includes("Recognition");
          const isPlanAccess = section.title.includes("Your Plan Access");

          return (
            <div
              key={sectionIndex}
              className={`${isCoreBenefit ? "flex-1" : ""} ${isOpenSourceImpact ? "mt-6" : ""} ${
                isRecognition || isPlanAccess ? "pt-6 border-t border-brand-neutral-300" : ""
              }`}
            >
              {isOpenSourceImpact ? (
                <OpenSourceImpactSection title={section.title} />
              ) : isCoreBenefit ? (
                <>
                  <CoreBenefitSection title={section.title} subtitle={section.subtitle} />
                  <PlanAccessSection features={section.features} previousPlanName={props.previousPlanName} />
                </>
              ) : isPlanAccess ? (
                <PlanAccessSection features={section.features} previousPlanName={props.previousPlanName} />
              ) : (
                <RecognitionSection
                  title={section.title}
                  subtitle={section.subtitle}
                  features={section.features}
                  tier={props.planId}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
