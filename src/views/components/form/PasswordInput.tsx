import React, { forwardRef, InputHTMLAttributes, Ref, useEffect, useState } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput"; // Import GenericInput and GenericInputRef

// Interface for detailed password validation results
interface PasswordValidationResult {
  isEmpty: boolean;
  minLength: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
}

// A simple validator for GenericInput's internal 'error' state.
// This is used to trigger the visual error state (e.g., red border) in GenericInput.
// Detailed error messages are handled by PasswordInput's custom renderError prop.
const genericPasswordValidator = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Password is required.";
  }
  // A basic length check for generic error, complements the detailed policy below.
  if (value.length < 6) {
    return "Password too short.";
  }
  return undefined; // No generic error if basic criteria are met
};

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  isConfirmation?: boolean; // If this input is for confirming a password
  passwordToMatch?: string; // The password to compare against in confirmation mode
  showValidation?: boolean; // Controls whether detailed validation criteria are displayed
  forceValidate?: boolean; // Prop to pass down to GenericInput for submission validation
}

export const PasswordInput = forwardRef(function PasswordInput(
  props: PasswordInputProps,
  ref: Ref<GenericInputRef>, // The ref is typed as Ref<GenericInputRef>
) {
  const {
    label,
    required,
    isConfirmation,
    passwordToMatch,
    showValidation,
    value, // Controlled value from the parent component
    onChange, // Change handler passed from the parent
    forceValidate, // Destructure forceValidate
    ...rest
  } = props;

  // State to hold the detailed results of password policy validation.
  const [validation, setValidation] = useState<PasswordValidationResult>({
    isEmpty: true,
    minLength: false,
    hasNumber: false,
    hasSymbol: false,
    hasLowercase: false,
    hasUppercase: false,
  });

  // State to track if the confirmation password matches the primary password.
  const [isMatchInvalid, setIsMatchInvalid] = useState(false);

  // Effect to recalculate validation and match status whenever input value or relevant props change.
  useEffect(() => {
    const currentValue = String(value || ""); // Ensure value is a string for checks

    // Detailed password policy checks
    const isEmpty = !currentValue.trim();
    const minLength = currentValue.length >= 6;
    const hasNumber = /[0-9]/.test(currentValue);
    const hasSymbol = /[^a-zA-Z0-9\s]/.test(currentValue); // Non-alphanumeric, non-whitespace
    const hasLowercase = /[a-z]/.test(currentValue);
    const hasUppercase = /[A-Z]/.test(currentValue);

    setValidation({
      isEmpty,
      minLength,
      hasNumber,
      hasSymbol,
      hasLowercase,
      hasUppercase,
    });

    // Check for password confirmation mismatch
    if (isConfirmation && passwordToMatch !== undefined) {
      // Only show mismatch if both fields have some input and don't match
      setIsMatchInvalid(currentValue !== passwordToMatch && currentValue.length > 0 && passwordToMatch.length > 0);
    } else {
      setIsMatchInvalid(false);
    }
  }, [value, isConfirmation, passwordToMatch]); // Dependencies for useEffect

  // Determine if there's any policy error to display detailed messages.
  const hasPolicyError =
    !validation.isEmpty && !(validation.minLength && validation.hasNumber && validation.hasSymbol && validation.hasLowercase && validation.hasUppercase);

  return (
    <GenericInput
      type="password"
      label={label}
      required={required}
      // Pass the appropriate generic validator to GenericInput.
      // If it's a confirmation field, only check for emptiness (match handled by renderError).
      // Otherwise, use the standard genericPasswordValidator for basic checks.
      validator={isConfirmation ? val => (val.trim() ? undefined : "Password confirmation is required.") : genericPasswordValidator}
      value={value}
      onChange={onChange}
      forceValidate={forceValidate} // Pass forceValidate down to GenericInput
      ref={ref} // Forward the ref to GenericInput
      {...rest}
      // This is where PasswordInput takes control of error rendering.
      renderError={genericErrorFromGenericInput => {
        // --- Custom Error Rendering Logic ---

        // 1. Prioritize displaying a "Passwords do not match" message for confirmation fields.
        if (isConfirmation && isMatchInvalid) {
          return <span className="mt-1 text-sm text-red-500">Passwords do not match.</span>;
        }

        // 2. For regular password fields, display detailed policy requirements if there are errors and showValidation is true.
        if (!isConfirmation && showValidation && hasPolicyError) {
          return (
            <span className="mt-1 text-sm text-red-500">
              Your password must
              {!validation.minLength && " be at least 6 characters long"}
              {!validation.minLength && (!validation.hasLowercase || !validation.hasUppercase || !validation.hasNumber || !validation.hasSymbol) && ","}
              {!validation.hasLowercase && " contain at least one lowercase letter"}
              {!validation.hasLowercase && (!validation.hasUppercase || !validation.hasNumber || !validation.hasSymbol) && ","}
              {!validation.hasUppercase && " contain at least one uppercase letter"}
              {!validation.hasUppercase && (!validation.hasNumber || !validation.hasSymbol) && ","}
              {!validation.hasNumber && " contain at least one number"}
              {!validation.hasNumber && !validation.hasSymbol && ","}
              {!validation.hasSymbol && " contain at least one special character"}.
            </span>
          );
        }

        // 3. As a fallback, display the simple error message provided by GenericInput if no custom errors apply.
        // This will typically show required field errors or basic length errors from genericPasswordValidator.
        if (genericErrorFromGenericInput) {
          return <p className="mt-1 text-sm text-red-500">{genericErrorFromGenericInput}</p>;
        }

        return null; // No error to display
      }}
    />
  );
});
