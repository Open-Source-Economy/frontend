import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput"; // Import GenericInputRef

const validateName = (value: string): string | undefined => {
  if (value && !/^[a-zA-Z-' ]+$/.test(value)) {
    return "Name can only contain letters, hyphens, and apostrophes.";
  }
  return undefined; // No error
};

interface NameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  forceValidate?: boolean; // Prop to pass down to GenericInput
}

// Use forwardRef to allow this component to receive a ref for GenericInputRef
export const NameInput = forwardRef(function NameInput(
  props: NameInputProps,
  ref: Ref<GenericInputRef>, // The ref is typed as Ref<GenericInputRef>
) {
  const { forceValidate, ...rest } = props;
  return (
    <GenericInput
      type="text" // Default type for name input
      validator={validateName}
      ref={ref} // Forward the ref to GenericInput
      forceValidate={forceValidate}
      {...rest}
    />
  );
});
