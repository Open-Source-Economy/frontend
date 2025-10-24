import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../../components/utils";

interface ContactReasonCardProps {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  hasError?: boolean;
  onClick: () => void;
}

export function ContactReasonCard({ id, label, description, icon: Icon, isSelected, hasError = false, onClick }: ContactReasonCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all",
        isSelected
          ? "border-brand-accent bg-brand-card-blue-light"
          : hasError
            ? "border-brand-error hover:border-brand-error bg-brand-card-blue/50"
            : "border-brand-neutral-300 hover:border-brand-neutral-400 bg-brand-card-blue/50",
      )}
      data-error={hasError}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", isSelected ? "text-brand-accent" : "text-brand-neutral-600")} />
        <div className="flex-1 min-w-0">
          <div className={cn("text-base mb-1", isSelected ? "text-brand-neutral-950" : "text-brand-neutral-800")}>{label}</div>
          <p className="text-xs text-brand-neutral-600">{description}</p>
        </div>
      </div>
    </button>
  );
}
