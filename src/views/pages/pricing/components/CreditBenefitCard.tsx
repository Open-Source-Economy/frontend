import React from "react";
import { LucideIcon } from "lucide-react";

interface CreditBenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CreditBenefitCard({ icon: Icon, title, description }: CreditBenefitCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border border-brand-neutral-300 hover:border-brand-accent/50 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-brand-accent to-brand-highlight flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h4 className="text-brand-neutral-900 mb-2">{title}</h4>
      <p className="text-sm text-brand-neutral-600">{description}</p>
    </div>
  );
}
