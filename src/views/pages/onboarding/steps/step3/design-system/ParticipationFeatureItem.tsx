import React from "react";
import { LucideIcon } from "lucide-react";

interface ParticipationFeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "compact";
}

export const ParticipationFeatureItem: React.FC<ParticipationFeatureItemProps> = ({ icon: Icon, title, description, variant = "default" }) => {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-brand-primary flex-shrink-0" />
        <span className="text-xs text-brand-neutral-700">{title}</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-brand-primary" />
      </div>
      <div>
        <p className="text-sm text-brand-neutral-800">{title}</p>
        <p className="text-xs text-brand-neutral-600">{description}</p>
      </div>
    </div>
  );
};
