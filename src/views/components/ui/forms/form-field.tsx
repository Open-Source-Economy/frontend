import React from "react";
import { Label } from "./label";
import { cn } from "../../utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormFieldProps {
  label: string;
  description?: string;
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

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(hasError && "text-brand-error", hasSuccess && "text-brand-success")}>
        {label} {required && <span className="text-brand-error">*</span>}
      </Label>
      {children}
      {description && !error && !success && <p className="text-sm text-brand-neutral-600">{description}</p>}
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
