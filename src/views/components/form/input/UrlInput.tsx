import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput";

const validateUrl = (value: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  try {
    new URL(value);
  } catch (_) {
    return "Please enter a valid URL.";
  }
  return undefined;
};

interface UrlInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  validator?: (value: string) => string | undefined;
}

export const UrlInput = forwardRef(function UrlInput(props: UrlInputProps, ref: Ref<GenericInputRef>) {
  const { validator, ...rest } = props;

  const combinedValidator = (value: string) => {
    // Run the default URL validation first
    const urlError = validateUrl(value);
    if (urlError) {
      return urlError;
    }

    // If the default validation passes, run the custom validator from props
    // if it exists.
    if (validator) {
      return validator(value);
    }

    return undefined; // No errors
  };

  return <GenericInput type="url" validator={combinedValidator} ref={ref} {...rest} />;
});
