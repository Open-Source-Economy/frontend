import React from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Input } from "../inputs/input";
import { FormFieldLink } from "../form-field";
import { ValidationError } from "../validation-requirements";
import { RhfFormField } from "./form-field";
import { LucideIcon } from "lucide-react";

interface RhfFormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  hint?: string;
  link?: FormFieldLink;
  className?: string;
  type?: "text" | "email" | "url" | "tel" | "number" | "password";
  placeholder?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  transformError?: (value: unknown, errorMessage: string | undefined) => ValidationError | undefined;
}

export function RhfFormInput<T extends FieldValues>({
  name,
  label,
  required,
  hint,
  link,
  className,
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
  disabled,
  autoComplete,
  autoFocus,
  transformError,
}: RhfFormInputProps<T>) {
  const { getFieldState, formState } = useFormContext<T>();
  const fieldState = getFieldState(name, formState);
  const hasError = !!fieldState.error;

  return (
    <RhfFormField<T> name={name} label={label} required={required} hint={hint} link={link} className={className} transformError={transformError}>
      {field => (
        <Input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          variant={hasError ? "error" : "default"}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          disabled={disabled}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
        />
      )}
    </RhfFormField>
  );
}
