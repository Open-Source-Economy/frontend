import React from "react";
import { Label } from "./label";
import { cn } from "../../utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormFieldProps {
  label: string;
  description?: string;
  hint?: string;
  error?: string;
  success?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  showErrorIcon?: boolean;
  showSuccessIcon?: boolean;
}

export function FormField({
  label,
  description,
  hint,
  error,
  success,
  required = false,
  className,
  children,
  showErrorIcon = true,
  showSuccessIcon = true,
}: FormFieldProps) {
  const hasError = !!error;
  const hasSuccess = !!success;
  const helpText = hint || description;

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(hasError && "text-brand-error", hasSuccess && "text-brand-success")}>
        {label} {required && <span className="text-brand-error">*</span>}
      </Label>
      {children}
      {helpText && !error && !success && <p className="caption text-brand-neutral-600">{helpText}</p>}
      {error && (
        <p className="text-brand-error text-sm mt-2 flex items-center gap-1.5">
          {showErrorIcon && <AlertCircle className="w-3.5 h-3.5" />}
          {error}
        </p>
      )}
      {success && (
        <p className="text-brand-success text-sm mt-2 flex items-center gap-1.5">
          {showSuccessIcon && <CheckCircle2 className="w-3.5 h-3.5" />}
          {success}
        </p>
      )}
    </div>
  );
}
