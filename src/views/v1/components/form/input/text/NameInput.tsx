import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "../GenericInput";

const validateName = (value: string): string | undefined => {
  if (value && !/^[a-zA-Z-' ]+$/.test(value)) {
    return "Name can only contain letters, hyphens, and apostrophes.";
  }
  return undefined;
};

interface NameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const NameInput = forwardRef(function NameInput(props: NameInputProps, ref: Ref<GenericInputRef>) {
  return <GenericInput type="text" validator={validateName} ref={ref} {...props} />;
});
