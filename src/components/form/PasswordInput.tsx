import React from "react";
import { NO_PASSPORT_ERROR, PasswordValidation } from "./hooks/validateForm";
import { BaseInput } from "./frames/BaseInput";
import { FormEntry } from "./frames/FormEntry";

interface PasswordInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  validation: PasswordValidation | boolean;
  placeholder?: string;
  showValidation?: boolean;
  isConfirmation?: boolean;
}

export function PasswordInput(props: PasswordInputProps) {
  const isInvalid = props.validation === NO_PASSPORT_ERROR ? false : props.validation !== true;

  return (
    <FormEntry label={props.label}>
      <BaseInput
        type="password"
        placeholder={props.placeholder || (props.isConfirmation ? "Confirm password" : "Password")}
        value={props.value}
        onChange={props.onChange}
        isValid={!isInvalid}
      />

      {props.isConfirmation && isInvalid && <span className="text-red-500">Passwords do not match.</span>}

      {!props.isConfirmation && props.showValidation && props.validation && typeof props.validation === "object" && (
        <>
          {props.validation.isEmpty ? (
            <span className="text-red-500">Please fill in the password field.</span>
          ) : (
            <span className="text-red-500">
              Your password must
              {!props.validation.minLength && " be at least 6 characters long"}
              {!props.validation.minLength && (!props.validation.hasNumber || !props.validation.hasSymbol) && ","}
              {!props.validation.hasNumber && " contain at least one number"}
              {!props.validation.hasNumber && !props.validation.hasSymbol && ","}
              {!props.validation.hasSymbol && " contain at least one special character"}.
            </span>
          )}
        </>
      )}
    </FormEntry>
  );
}
