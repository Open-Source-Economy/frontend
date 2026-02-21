import React from "react";
import { Check } from "lucide-react";

interface BenefitItemProps {
  text: string;
  iconColor?: "accent" | "bronze" | "silver" | "gold";
}

export function BenefitItem({ text, iconColor = "accent" }: BenefitItemProps) {
  const getIconColorClasses = () => {
    switch (iconColor) {
      case "bronze":
        return {
          bg: "bg-brand-tier-bronze/20",
          text: "text-brand-tier-bronze",
        };
      case "silver":
        return {
          bg: "bg-brand-tier-silver/20",
          text: "text-brand-tier-silver",
        };
      case "gold":
        return {
          bg: "bg-brand-tier-gold/20",
          text: "text-brand-tier-gold",
        };
      default:
        return {
          bg: "bg-brand-accent/20",
          text: "text-brand-accent",
        };
    }
  };

  const colors = getIconColorClasses();

  return (
    <div className="flex items-start gap-2">
      <div className={`w-5 h-5 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Check className={`w-3 h-3 ${colors.text}`} />
      </div>
      <span className="text-brand-neutral-400 text-sm leading-relaxed">{text}</span>
    </div>
  );
}
