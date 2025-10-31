import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { FormField } from "./form-field";
import { LucideIcon } from "lucide-react";

// Input ref interface for validation
export interface InputRef {
  validate: (showInputError: boolean) => boolean;
  getError: () => string | undefined;
}

interface BaseValidatedFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  hint?: string;
  className?: string;
}

interface ValidatedInputProps extends BaseValidatedFieldProps {
  type?: "text" | "email" | "url" | "tel" | "number";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  disabled?: boolean;
  autoComplete?: string;
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
  hint,
  type = "text",
  className,
  leftIcon,
  rightIcon,
  disabled,
  autoComplete,
}: ValidatedInputProps) {
  return (
    <FormField label={label} error={error} required={required} description={hint || description} className={className}>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        variant={error ? "error" : "default"}
        data-error={!!error}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
        autoComplete={autoComplete}
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

/**
 * ValidatedInputWithRef - ValidatedInput with ref-based validation support
 * Allows external control of validation trigger via ref.validate()
 */
interface ValidatedInputWithRefProps extends Omit<BaseValidatedFieldProps, "error"> {
  type?: "text" | "email" | "url" | "tel" | "number";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  disabled?: boolean;
  autoComplete?: string;
  validator: (value: string) => string | undefined;
}

export const ValidatedInputWithRef = forwardRef<InputRef, ValidatedInputWithRefProps>(
  ({ name, label, value, onChange, placeholder, type = "text", leftIcon, rightIcon, validator, hint, disabled, autoComplete }, ref) => {
    const [internalError, setInternalError] = useState<string | undefined>(undefined);

    const runValidation = (showInputError: boolean): boolean => {
      const errorMessage = validator(value);
      if (showInputError) {
        setInternalError(errorMessage);
      }
      return !errorMessage;
    };

    useImperativeHandle(
      ref,
      () => ({
        validate: (showInputError: boolean) => runValidation(showInputError),
        getError: () => internalError,
      }),
      [value, internalError, validator],
    );

    return (
      <ValidatedInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        error={internalError}
        hint={hint}
        disabled={disabled}
        autoComplete={autoComplete}
        required
      />
    );
  },
);
ValidatedInputWithRef.displayName = "ValidatedInputWithRef";
