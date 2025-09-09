import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "../GenericInput";

const validate = (value: string): string | undefined => {
  if (value && isNaN(Number(value))) {
    return "Please enter a valid number.";
  }
  return undefined;
};

export interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const NumberInput = forwardRef(function NumberInput(props: NumberInputProps, ref: Ref<GenericInputRef>) {
  const { ...rest } = props;
  return <GenericInput type="email" inputMode="numeric" validator={validate} ref={ref} {...rest} />;
});
