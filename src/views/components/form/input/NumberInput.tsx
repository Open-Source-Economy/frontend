import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "./GenericInput";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  minValue?: number;
  maxValue?: number;
  variant?: "default" | "compact";
}

export const NumberInput = forwardRef(function NumberInput(props: NumberInputProps, ref: Ref<GenericInputRef>) {
  const { minValue, maxValue, variant, ...rest } = props;

  const validator = (value: string): string | undefined => {
    if (!value) return undefined;
    const num = Number(value);
    if (isNaN(num)) return "Please enter a valid number.";
    if (minValue !== undefined && num < minValue) return `Must be ≥ ${minValue}.`;
    if (maxValue !== undefined && num > maxValue) return `Must be ≤ ${maxValue}.`;
    return undefined;
  };

  return (
    <GenericInput
      type="number"
      inputMode="numeric"
      pattern="[0-9]*[.]?[0-9]*"
      validator={validator}
      ref={ref}
      variant={variant}
      {...rest}
    />
  );
});


