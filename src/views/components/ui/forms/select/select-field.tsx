import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "../label";
import { cn } from "../../../utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[] | string[];
  placeholder?: string;
  required?: boolean;
  description?: string;
  hint?: string;
  error?: string;
  className?: string;
}

/**
 * SelectField - A reusable component combining select dropdown with label
 * Following DRY principles for consistent select field patterns
 * Supports both simple string arrays and { value, label } objects
 */
export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  description,
  hint,
  error,
  className,
}: SelectFieldProps) {
  // Normalize options to { value, label } format
  const normalizedOptions: SelectOption[] = options.map(option => (typeof option === "string" ? { value: option, label: option } : option));

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className={cn(error && "text-brand-error", required && "after:content-['*'] after:ml-1 after:text-brand-error")}>{label}</Label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-full", error && "border-brand-error")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {normalizedOptions.map((option, index) => (
            <SelectItem key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(description || hint) && !error && <p className="text-xs text-brand-neutral-500">{description || hint}</p>}
      {error && <p className="text-sm text-brand-error">{error}</p>}
    </div>
  );
}
