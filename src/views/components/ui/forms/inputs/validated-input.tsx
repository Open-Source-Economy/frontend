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

export function ValidatedInput(props: ValidatedInputProps) {
  const required = props.required ?? false;
  const type = props.type ?? "text";

  const hasError = !!props.error?.error;

  return (
    <FormField
      label={props.label}
      required={required}
      description={props.hint || props.description}
      className={props.className}
      link={props.link}
      error={props.error}
    >
      <Input
        id={props.name}
        name={props.name}
        type={type}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        variant={hasError ? "error" : "default"}
        data-error={hasError}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
      />
    </FormField>
  );
}

export function ValidatedTextarea(props: ValidatedTextareaProps) {
  const required = props.required ?? false;
  const rows = props.rows ?? 6;

  const hasError = !!props.error?.error;

  return (
    <FormField label={props.label} required={required} description={props.description} className={props.className} error={props.error}>
      <Textarea
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        placeholder={props.placeholder}
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
