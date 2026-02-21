import React from "react";

interface FundDistributionCardProps {
  percentage: string;
  title: string;
  description: string;
}

export function FundDistributionCard(props: FundDistributionCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 border border-brand-neutral-300">
      <div className="text-2xl text-brand-accent mb-1">{props.percentage}</div>
      <h4 className="text-brand-neutral-900 mb-1">{props.title}</h4>
      <p className="text-xs text-brand-neutral-600">{props.description}</p>
    </div>
  );
}
