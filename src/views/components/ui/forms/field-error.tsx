import React from "react";
import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  error?: string;
  className?: string;
}

export function FieldError({ error, className = "" }: FieldErrorProps) {
  if (!error) return null;

  return (
    <p className={`text-brand-error text-sm flex items-center gap-1.5 ${className}`}>
      <AlertCircle className="w-3.5 h-3.5" />
      {error}
    </p>
  );
}
