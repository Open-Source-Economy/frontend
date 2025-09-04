import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput";

const validate = (value: string): string | undefined => {
  if (value && !/\S+@\S+\.\S+/.test(value)) {
    return "Please enter a valid email address.";
  }
  return undefined;
};

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const EmailInput = forwardRef(function EmailInput(props: EmailInputProps, ref: Ref<GenericInputRef>) {
  const { ...rest } = props;
  return <GenericInput type="email" validator={validate} ref={ref} {...rest} />;
});
