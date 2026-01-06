import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Input } from "./input";
import { Textarea } from "../textarea";
import { FormField, FormFieldLink } from "../form-field";
import { ValidationError } from "../validation-requirements";
import { LucideIcon } from "lucide-react";

// Input ref interface for validation
export interface InputRef {
  validate: (showInputError: boolean) => boolean;
  getError: () => string | undefined;
}

interface BaseValidatedFieldProps {
  label?: string;
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

interface ValidatedInputProps extends Omit<BaseValidatedFieldProps, "error"> {
  type?: "text" | "email" | "url" | "tel" | "number" | "password";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  link?: FormFieldLink;
  error?: ValidationError;
}

interface ValidatedTextareaProps extends Omit<BaseValidatedFieldProps, "error"> {
  rows?: number;
  error?: ValidationError;
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
  autoFocus,
  link,
}: ValidatedInputProps) {
  const hasError = !!error?.error;

  return (
    <FormField label={label} required={required} description={hint || description} className={className} link={link} error={error}>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        variant={hasError ? "error" : "default"}
        data-error={hasError}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
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
  const hasError = !!error?.error;

  return (
    <FormField label={label} required={required} description={description} className={className} error={error}>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        variant={hasError ? "error" : "default"}
        data-error={hasError}
      />
    </FormField>
  );
}

/**
 * ValidatedInputWithRef - ValidatedInput with ref-based validation support
 * Allows external control of validation trigger via ref.validate()
 */
interface ValidatedInputWithRefProps extends Omit<BaseValidatedFieldProps, "error"> {
  type?: "text" | "email" | "url" | "tel" | "number" | "password";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  validator: (value: string) => ValidationError | undefined;
  link?: FormFieldLink;
}

export const ValidatedInputWithRef = forwardRef<InputRef, ValidatedInputWithRefProps>(
  ({ name, label, value, onChange, placeholder, type = "text", leftIcon, rightIcon, validator, hint, disabled, autoComplete, autoFocus, link }, ref) => {
    const [validationError, setValidationError] = useState<ValidationError | undefined>(undefined);
    const [hasAttemptedValidation, setHasAttemptedValidation] = useState(false);

    /**
     * Runs validation when called via ref.validate()
     * When showInputError is true (button clicked), it:
     * 1. Validates the current value
     * 2. Sets the validation error state (if any)
     * 3. Marks validation as attempted (so errors will be displayed)
     */
    const runValidation = (showInputError: boolean): boolean => {
      const error = validator(value);
      if (showInputError) {
        setValidationError(error);
        setHasAttemptedValidation(true);
      }
      return !error;
    };

    /**
     * After validation has been attempted (button clicked), update errors in real-time
     * as the user types. This provides immediate feedback while editing.
     */
    React.useEffect(() => {
      if (hasAttemptedValidation) {
        const error = validator(value);
        setValidationError(error);
      }
    }, [value, hasAttemptedValidation, validator]);

    useImperativeHandle(
      ref,
      () => ({
        validate: (showInputError: boolean) => runValidation(showInputError),
        getError: () => validationError?.error,
      }),
      [value, validationError, validator],
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
        hint={hint}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        link={link}
        error={hasAttemptedValidation ? validationError : undefined}
        required
      />
    );
  },
);
ValidatedInputWithRef.displayName = "ValidatedInputWithRef";
