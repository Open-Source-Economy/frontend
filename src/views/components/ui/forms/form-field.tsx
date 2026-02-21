import React from "react";
import { Link } from "@tanstack/react-router";
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

export function FormField(props: FormFieldProps) {
  const required = props.required ?? false;
  const showErrorIcon = props.showErrorIcon ?? true;
  const showSuccessIcon = props.showSuccessIcon ?? true;

  const hasError = !!props.error?.error;
  const hasSuccess = !!props.success;
  const helpText = props.hint || props.description;

  const hasLabelOrLink = !!(props.label || props.link);

  return (
    <div className={cn(hasLabelOrLink ? "space-y-2" : "", props.className)}>
      {(props.label || props.link) && (
        <div className="flex items-center justify-between">
          {props.label && (
            <Label className={cn(hasError && "text-brand-error", hasSuccess && "text-brand-success")}>
              {props.label} {required && <span className="text-brand-error">*</span>}
            </Label>
          )}
          {props.link && (
            <Link to={props.link.href as string} className="text-xs text-brand-accent hover:text-brand-accent-dark transition-colors">
              {props.link.text}
            </Link>
          )}
        </div>
      )}
      {props.children}
      {helpText && !props.error && !props.success && <p className="caption text-brand-neutral-600">{helpText}</p>}
      {props.error?.error && !props.error?.requirements && (
        <p className="text-brand-error text-sm mt-2 flex items-center gap-1.5">
          {showErrorIcon && <AlertCircle className="w-3.5 h-3.5" />}
          {props.error.error}
        </p>
      )}
      {props.error && <RequirementsIndicator validation={props.error} />}
      {props.success && (
        <p className="text-brand-success text-sm mt-2 flex items-center gap-1.5">
          {showSuccessIcon && <CheckCircle2 className="w-3.5 h-3.5" />}
          {props.success}
        </p>
      )}
    </div>
  );
}
