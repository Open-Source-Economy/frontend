import React from "react";
import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  error?: string;
  className?: string;
}

export function FieldError(props: FieldErrorProps) {
  const className = props.className ?? "";

  if (!props.error) return null;

  return (
    <p className={`text-brand-error text-sm flex items-center gap-1.5 ${className}`}>
      <AlertCircle className="w-3.5 h-3.5" />
      {props.error}
    </p>
  );
}
