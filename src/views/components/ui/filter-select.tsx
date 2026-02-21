import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/views/components/ui/forms/select/select";
import { LucideIcon } from "lucide-react";
import { cn } from "src/views/components/utils";

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  width?: string;
  options: Array<{ value: string; label: string }>;
  className?: string;
  variant?: "default" | "outline" | "filled" | "ghost" | "success" | "error" | "warning";
  size?: "sm" | "default" | "lg";
}

export function FilterSelect(props: FilterSelectProps) {
  const Icon = props.icon;
  const width = props.width ?? "w-[180px]";
  const className = props.className ?? "";
  const variant = props.variant ?? "default";
  const size = props.size ?? "default";

  return (
    <Select value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger className={cn(width, className)} variant={variant} size={size}>
        <div className="flex items-center gap-3 w-full">
          <Icon size={16} className="text-[color:var(--form-text-placeholder)] flex-shrink-0" />
          <SelectValue placeholder={props.placeholder} className="flex-1 text-left" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {props.options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
