import React from "react";
import { type LucideIcon } from "lucide-react";

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  className?: string;
}

export function StepCard(props: StepCardProps) {
  const Icon = props.icon;
  const className = props.className ?? "";

  return (
    <div className={`relative flex flex-col items-center text-center ${className}`}>
      {/* Gradient circle icon */}
      <div className="relative z-10 w-[104px] h-[104px] rounded-full bg-gradient-to-br from-brand-accent to-brand-highlight p-[3px] mb-6 shadow-lg shadow-brand-accent/20">
        <div className="w-full h-full rounded-full bg-brand-card-blue flex items-center justify-center">
          <Icon className="w-10 h-10 text-brand-neutral-900" strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-brand-neutral-900 mb-3">{props.title}</h3>

      {/* Description */}
      <p className="text-brand-neutral-600 max-w-xs mx-auto">{props.description}</p>
    </div>
  );
}
