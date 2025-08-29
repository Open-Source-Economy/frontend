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
}

export const UrlInput = forwardRef(function UrlInput(props: UrlInputProps, ref: Ref<GenericInputRef>) {
  const { ...rest } = props;
  return <GenericInput type="url" validator={validateUrl} ref={ref} {...rest} />;
});
