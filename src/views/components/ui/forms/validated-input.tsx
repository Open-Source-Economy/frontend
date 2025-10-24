import React from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { FormField } from "./form-field";
import { cn } from "../../utils";

interface BaseValidatedFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  className?: string;
}

interface ValidatedInputProps extends BaseValidatedFieldProps {
  type?: "text" | "email" | "url" | "tel" | "number";
}

interface ValidatedTextareaProps extends BaseValidatedFieldProps {
  rows?: number;
}

export function ValidatedInput({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  description,
  type = "text",
  className,
}: ValidatedInputProps) {
  return (
    <FormField label={label} error={error} required={required} description={description} className={className}>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        variant={error ? "error" : "default"}
        data-error={!!error}
      />
    </FormField>
  );
}

export function ValidatedTextarea({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  description,
  rows = 6,
  className,
}: ValidatedTextareaProps) {
  return (
    <FormField label={label} error={error} required={required} description={description} className={className}>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        variant={error ? "error" : "default"}
        data-error={!!error}
      />
    </FormField>
  );
}
