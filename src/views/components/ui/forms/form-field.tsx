import React from "react";
import { Link } from "react-router-dom";
import { Label } from "./label";
import { cn } from "../../utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { RequirementsIndicator, ValidationError } from "./validation-requirements";

export interface FormFieldLink {
  text: string;
  href: string;
}

interface FormFieldProps {
  label?: string;
  description?: string;
  hint?: string;
  error?: ValidationError;
  success?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  showErrorIcon?: boolean;
  showSuccessIcon?: boolean;
  link?: FormFieldLink;
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
  link,
}: FormFieldProps) {
  const hasError = !!error?.error;
  const hasSuccess = !!success;
  const helpText = hint || description;

  const hasLabelOrLink = !!(label || link);

  return (
    <div className={cn(hasLabelOrLink ? "space-y-2" : "", className)}>
      {(label || link) && (
        <div className="flex items-center justify-between">
          {label && (
            <Label className={cn(hasError && "text-brand-error", hasSuccess && "text-brand-success")}>
              {label} {required && <span className="text-brand-error">*</span>}
            </Label>
          )}
          {link && (
            <Link to={link.href} className="text-xs text-brand-accent hover:text-brand-accent-dark transition-colors">
              {link.text}
            </Link>
          )}
        </div>
      )}
      {children}
      {helpText && !error && !success && <p className="caption text-brand-neutral-600">{helpText}</p>}
      {error?.error && !error?.requirements && (
        <p className="text-brand-error text-sm mt-2 flex items-center gap-1.5">
          {showErrorIcon && <AlertCircle className="w-3.5 h-3.5" />}
          {error.error}
        </p>
      )}
      {error && <RequirementsIndicator validation={error} />}
      {success && (
        <p className="text-brand-success text-sm mt-2 flex items-center gap-1.5">
          {showSuccessIcon && <CheckCircle2 className="w-3.5 h-3.5" />}
          {success}
        </p>
      )}
    </div>
  );
}
