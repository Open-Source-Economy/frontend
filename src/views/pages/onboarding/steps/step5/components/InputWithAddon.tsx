import React from "react";
import { cn } from "src/views/components/utils";
import { LucideIcon } from "lucide-react";

interface InputWithAddonProps {
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  value: string;
  displayMode?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export function InputWithAddon({ prefix, suffix, value, displayMode = false, icon: Icon, className }: InputWithAddonProps) {
  // Display mode: compact read-only display with icon
  if (displayMode) {
    return (
      <div className={cn("flex items-center gap-2 p-3 bg-brand-card-blue/50 border border-brand-neutral-300/30 rounded-lg w-fit", className)}>
        {Icon && <Icon className="w-4 h-4 text-brand-highlight" />}
        <span className="text-sm text-brand-neutral-900">
          {prefix}
          {value}
        </span>
        <span className="text-xs text-brand-neutral-500">{suffix}</span>
      </div>
    );
  }

  return null;
}
