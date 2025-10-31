import React from "react";
import { LucideIcon } from "lucide-react";

interface NextStepsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  timeline: string;
  brandColor: "accent" | "primary" | "highlight" | "success";
  className?: string;
}

/**
 * NextStepsCard - Displays a card for onboarding success page
 * Shows what happens next in the onboarding process
 */
export const NextStepsCard: React.FC<NextStepsCardProps> = ({ icon: Icon, title, description, timeline, brandColor, className = "" }) => {
  // Map brand colors to actual Tailwind classes
  const colorClasses = {
    accent: {
      border: "hover:border-brand-accent/30",
      iconBg: "bg-gradient-to-br from-brand-accent/10 to-brand-accent/5",
      iconText: "text-brand-accent",
    },
    primary: {
      border: "hover:border-brand-primary/30",
      iconBg: "bg-gradient-to-br from-brand-primary/10 to-brand-primary/5",
      iconText: "text-brand-primary",
    },
    highlight: {
      border: "hover:border-brand-highlight/30",
      iconBg: "bg-gradient-to-br from-brand-highlight/10 to-brand-highlight/5",
      iconText: "text-brand-highlight",
    },
    success: {
      border: "hover:border-brand-success/30",
      iconBg: "bg-gradient-to-br from-brand-success/10 to-brand-success/5",
      iconText: "text-brand-success",
    },
  };

  const colors = colorClasses[brandColor];

  return (
    <div className={`relative p-4 bg-brand-card border border-brand-neutral-300 rounded-xl ${colors.border} transition-colors ${className}`}>
      <div className={`inline-flex items-center justify-center w-10 h-10 ${colors.iconBg} rounded-lg mb-3`}>
        <Icon className={`w-5 h-5 ${colors.iconText}`} />
      </div>
      <h3 className="text-brand-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-brand-neutral-600 mb-2">{description}</p>
      <p className="text-xs text-brand-neutral-500">{timeline}</p>
    </div>
  );
};
