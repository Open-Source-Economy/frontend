import React from "react";

interface FundDistributionCardProps {
  percentage: string;
  title: string;
  description: string;
}

export function FundDistributionCard({ percentage, title, description }: FundDistributionCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 border border-brand-neutral-300">
      <div className="text-2xl text-brand-accent mb-1">{percentage}</div>
      <h4 className="text-brand-neutral-900 mb-1">{title}</h4>
      <p className="text-xs text-brand-neutral-600">{description}</p>
    </div>
  );
}
