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

export function FilterSelect({
  value,
  onValueChange,
  placeholder,
  icon: Icon,
  width = "w-[180px]",
  options,
  className = "",
  variant = "default",
  size = "default",
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn(width, className)} variant={variant} size={size}>
        <div className="flex items-center gap-3 w-full">
          <Icon size={16} className="text-[color:var(--form-text-placeholder)] flex-shrink-0" />
          <SelectValue placeholder={placeholder} className="flex-1 text-left" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
