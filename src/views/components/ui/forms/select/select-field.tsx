import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/views/components/ui/forms/select/select";
import { Label } from "src/views/components/ui/forms/label";
import { cn } from "src/views/components/utils";

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
export function SelectField(props: SelectFieldProps) {
  const placeholder = props.placeholder ?? "Select an option";
  const required = props.required ?? false;

  // Normalize options to { value, label } format
  const normalizedOptions: SelectOption[] = props.options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );

  return (
    <div className={cn("space-y-2", props.className)}>
      {props.label && (
        <Label
          className={cn(
            props.error && "text-brand-error",
            required && "after:content-['*'] after:ml-1 after:text-brand-error"
          )}
        >
          {props.label}
        </Label>
      )}
      <Select value={props.value} onValueChange={props.onChange}>
        <SelectTrigger className={cn("w-full", props.error && "border-brand-error")}>
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
      {(props.description || props.hint) && !props.error && (
        <p className="text-xs text-brand-neutral-500">{props.description || props.hint}</p>
      )}
      {props.error && <p className="text-sm text-brand-error">{props.error}</p>}
    </div>
  );
}
