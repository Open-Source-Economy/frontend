import React from "react";
import { BenefitItem } from "./benefit-item";

interface BenefitsSectionProps {
  title: string;
  benefits: string[];
  iconColor?: "accent" | "bronze" | "silver" | "gold";
}

export function BenefitsSection({ title, benefits, iconColor = "accent" }: BenefitsSectionProps) {
  return (
    <div className="space-y-3">
      <p className="text-brand-neutral-500 text-xs uppercase tracking-wide mb-2">{title}</p>
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit} iconColor={iconColor} />
      ))}
    </div>
  );
}
