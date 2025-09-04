import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "../GenericInput";

const validate =
  (strictlyPositive?: boolean) =>
  (value: string): string | undefined => {
    if (value.trim() === "") {
      return "Please enter a value.";
    }
    const numValue = Number(value);

    // Check if the value is a valid integer.
    if (!Number.isInteger(numValue)) {
      return "Please enter a whole number.";
    }

    // If strictlyPositive is true, check that the number is greater than zero.
    if (strictlyPositive && numValue <= 0) {
      return "Please enter a valid positive number.";
    }

    // All checks passed, return undefined for no error.
    return undefined;
  };

interface IntegerInputProps extends InputHTMLAttributes<HTMLInputElement> {
  strictlyPositive?: boolean;
}

/**
 * @typedef {IntegerInputProps}
 * @property {boolean} [strictlyPositive] - Indicates if the integer must be strictly positive (greater than 0).
 * @augments InputHTMLAttributes<HTMLInputElement>
 */

export const IntegerInput = forwardRef(function IntegerInput(props: IntegerInputProps, ref: Ref<GenericInputRef>) {
  const { strictlyPositive, ...rest } = props;
  return (
    <GenericInput type="number" inputMode="numeric" validator={(value: string) => validate(strictlyPositive)(value)} pattern="[0-9]*" ref={ref} {...rest} />
  );
});
