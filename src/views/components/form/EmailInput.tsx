import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput"; // Import GenericInputRef

// Validator function for email format
const validateEmail = (value: string): string | undefined => {
  if (value && !/\S+@\S+\.\S+/.test(value)) {
    return "Please enter a valid email address.";
  }
  return undefined; // No error
};

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  forceValidate?: boolean; // Prop to pass down to GenericInput
}

// Use forwardRef to allow this component to receive a ref for GenericInputRef
export const EmailInput = forwardRef(function EmailInput(
  props: EmailInputProps,
  ref: Ref<GenericInputRef>, // The ref is typed as Ref<GenericInputRef>
) {
  const { forceValidate, ...rest } = props;
  return (
    <GenericInput
      type="email" // Ensures the browser keyboard is optimized for email input
      validator={validateEmail}
      ref={ref} // Forward the ref to GenericInput
      forceValidate={forceValidate}
      {...rest}
    />
  );
});
