import React from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Textarea } from "../textarea";
import { RhfFormField } from "./form-field";
import { ValidationError } from "../validation-requirements";

interface RhfFormTextareaProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  transformError?: (value: unknown, errorMessage: string | undefined) => ValidationError | undefined;
}

export function RhfFormTextarea<T extends FieldValues>({
  name,
  label,
  required,
  hint,
  className,
  placeholder,
  rows = 6,
  disabled,
  transformError,
}: RhfFormTextareaProps<T>) {
  const { getFieldState, formState } = useFormContext<T>();
  const fieldState = getFieldState(name, formState);
  const hasError = !!fieldState.error;

  return (
    <RhfFormField<T> name={name} label={label} required={required} hint={hint} className={className} transformError={transformError}>
      {field => <Textarea {...field} id={name} placeholder={placeholder} rows={rows} variant={hasError ? "error" : "default"} disabled={disabled} />}
    </RhfFormField>
  );
}
