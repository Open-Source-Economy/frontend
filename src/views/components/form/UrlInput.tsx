import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput"; // Import GenericInputRef

const validateUrl = (value: string): string | undefined => {
  // Allow empty string if not required, otherwise validate URL format
  if (!value) {
    return undefined; // Let 'required' prop handle emptiness
  }
  try {
    new URL(value);
  } catch (_) {
    return "Please enter a valid URL.";
  }
  return undefined; // No error
};

interface UrlInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  forceValidate?: boolean; // Prop to pass down to GenericInput
}

// Use forwardRef to allow this component to receive a ref for GenericInputRef
export const UrlInput = forwardRef(function UrlInput(
  props: UrlInputProps,
  ref: Ref<GenericInputRef>, // The ref is typed as Ref<GenericInputRef>
) {
  const { forceValidate, ...rest } = props;
  return (
    <GenericInput
      type="url" // Ensures the browser keyboard is optimized for URL input
      validator={validateUrl}
      ref={ref} // Forward the ref to GenericInput
      forceValidate={forceValidate}
      {...rest}
    />
  );
});
