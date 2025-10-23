import React from "react";

interface FeatureBadgeProps {
  label: string;
  className?: string;
}

export function FeatureBadge({ label, className = "" }: FeatureBadgeProps) {
  return (
    <div className={`px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-highlight/10 to-brand-accent/10 border border-brand-highlight/20 ${className}`}>
      <span className="text-brand-highlight">{label}</span>
    </div>
  );
}
