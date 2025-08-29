import React, { forwardRef, InputHTMLAttributes, Ref, useEffect, useState } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput";

interface PasswordValidationResult {
  isEmpty: boolean;
  minLength: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
}

const genericPasswordValidator = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Password is required.";
  }
  if (value.length < 6) {
    return "Password too short.";
  }
  return undefined;
};

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  isConfirmation?: boolean;
  passwordToMatch?: string;
  showValidation?: boolean;
}

export const PasswordInput = forwardRef(function PasswordInput(props: PasswordInputProps, ref: Ref<GenericInputRef>) {
  const { label, required, isConfirmation, passwordToMatch, showValidation, value, onChange, ...rest } = props;

  const [validation, setValidation] = useState<PasswordValidationResult>({
    isEmpty: true,
    minLength: false,
    hasNumber: false,
    hasSymbol: false,
    hasLowercase: false,
    hasUppercase: false,
  });

  const [isMatchInvalid, setIsMatchInvalid] = useState(false);

  useEffect(() => {
    const currentValue = String(value || "");

    const isEmpty = !currentValue.trim();
    const minLength = currentValue.length >= 6;
    const hasNumber = /[0-9]/.test(currentValue);
    const hasSymbol = /[^a-zA-Z0-9\s]/.test(currentValue);
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

    if (isConfirmation && passwordToMatch !== undefined) {
      setIsMatchInvalid(currentValue !== passwordToMatch && currentValue.length > 0 && passwordToMatch.length > 0);
    } else {
      setIsMatchInvalid(false);
    }
  }, [value, isConfirmation, passwordToMatch]);

  const hasPolicyError =
    !validation.isEmpty && !(validation.minLength && validation.hasNumber && validation.hasSymbol && validation.hasLowercase && validation.hasUppercase);

  return (
    <GenericInput
      type="password"
      label={label}
      required={required}
      validator={isConfirmation ? val => (val.trim() ? undefined : "Password confirmation is required.") : genericPasswordValidator}
      value={value}
      onChange={onChange}
      ref={ref}
      {...rest}
      renderError={genericErrorFromGenericInput => {
        if (isConfirmation && isMatchInvalid) {
          return <span className="mt-1 text-sm text-red-500">Passwords do not match.</span>;
        }

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

        if (genericErrorFromGenericInput) {
          return <p className="mt-1 text-sm text-red-500">{genericErrorFromGenericInput}</p>;
        }

        return null;
      }}
    />
  );
});
