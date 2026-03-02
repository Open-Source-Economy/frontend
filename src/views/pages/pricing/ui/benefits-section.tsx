import React from "react";
import { BenefitItem } from "src/views/pages/pricing/ui/benefit-item";

interface BenefitsSectionProps {
  title: string;
  benefits: string[];
  iconColor?: "accent" | "bronze" | "silver" | "gold";
}

export function BenefitsSection(props: BenefitsSectionProps) {
  const iconColor = props.iconColor ?? "accent";

  return (
    <div className="space-y-3">
      <p className="text-brand-neutral-500 text-xs uppercase tracking-wide mb-2">{props.title}</p>
      {props.benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit} iconColor={iconColor} />
      ))}
    </div>
  );
}
