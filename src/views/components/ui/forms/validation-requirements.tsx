import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Generic validation requirement interface
 */
export interface ValidationRequirement {
  label: string;
  met: boolean;
}

/**
 * Validation error interface
 * Represents validation errors with optional requirement checklists
 */
export interface ValidationError {
  /** Array of validation requirements to display as a checklist */
  requirements?: ValidationRequirement[];
  /** Optional title displayed above the requirements checklist (e.g., "Password must contain:") */
  title?: string;
  /** Error message to display (shown as a simple error text, not as part of requirements) */
  error?: string;
}

interface RequirementsIndicatorProps {
  validation: ValidationError;
  showValidation?: boolean;
  className?: string;
}

/**
 * Generic component for displaying validation requirements
 * Shows a checklist of requirements with visual indicators (checkmarks/X icons)
 */
export function RequirementsIndicator({ validation, showValidation = true, className = "" }: RequirementsIndicatorProps) {
  if (!showValidation) return null;

  // Don't show if no requirements or all requirements are met
  if (!validation.requirements || validation.requirements.length === 0) return null;

  const allMet = validation.requirements.every(req => req.met);
  if (allMet) return null;

  return (
    <div className={`mt-2 space-y-1.5 ${className}`}>
      {validation.title && <p className="text-xs font-medium text-brand-neutral-600 mb-1.5">{validation.title}</p>}
      <div className="space-y-1">
        {validation.requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-success flex-shrink-0" />
            ) : (
              <XCircle className="h-3.5 w-3.5 text-brand-error flex-shrink-0" />
            )}
            <span className={req.met ? "text-brand-success" : "text-brand-error"}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
