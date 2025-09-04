import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import { GenericInput, GenericInputRef } from "../GenericInput";

const validate =
  (strictlyPositive?: boolean) =>
  (value: string): string | undefined => {
    const numValue = Number(value);

    if (value === "") {
      return undefined; // Allows empty input, which is handled by the 'required' prop if needed.
    }

    if (!Number.isInteger(numValue)) {
      return "Please enter a whole number.";
    }

    // The 'strictlyPositive' validation should check the value itself.
    if (strictlyPositive && numValue <= 0) {
      return "Please enter a valid positive number.";
    }

    // If the input is not strictly positive, we still need to check if it's an integer.
    // The negative check is implicitly handled by the previous condition if `strictlyPositive` is true.
    // We can add a more general positive number check if it's not strictly positive but still a number.
    // This depends on the desired behavior. The current logic handles only strictly positive.

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
