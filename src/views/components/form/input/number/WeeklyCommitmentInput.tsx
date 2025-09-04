import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { BaseProps, BaseRef } from "../../Base";
import { GenericInputRef } from "../GenericInput";
import { IntegerInput } from "./IntegerInput";

export interface WeeklyCommitmentInputRef extends BaseRef {}

interface WeeklyCommitmentInputProps extends BaseProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export const WeeklyCommitmentInput = forwardRef(function WeeklyCommitmentInput(props: WeeklyCommitmentInputProps, ref: Ref<WeeklyCommitmentInputRef>) {
  const { value, onChange } = props;
  const integerInputRef = React.useRef<GenericInputRef>(null);
  const [error, setError] = useState<string | null>(null);

  // The min and max values for weekly commitment in hours
  const MIN_HOURS = 0;
  const MAX_HOURS = 168;

  const runValidation = (currentValue: number | null | undefined, showInputError: boolean): boolean => {
    let errorMessage: string | null = null;
    const numValue = Number(currentValue);

    // If the value is a number, validate its range.
    if (!isNaN(numValue) && (numValue < MIN_HOURS || numValue > MAX_HOURS)) {
      errorMessage = `Please enter a value between ${MIN_HOURS} and ${MAX_HOURS}`;
    }

    // Set the internal error state to show the message on the UI
    if (showInputError) {
      setError(errorMessage);
    }

    return !errorMessage;
  };

  useImperativeHandle(
    ref,
    () => ({
      validate: (showInputError: boolean) => {
        const integerInputValid = integerInputRef.current?.validate(showInputError) ?? false;
        const weeklyCommitmentValid = runValidation(value, showInputError);
        return integerInputValid && weeklyCommitmentValid;
      },
    }),
    [value],
  );

  const handleInputChange = (inputValue: string | null) => {
    if (inputValue === "") {
      // Change to null to align with the new interface
      onChange(null);
    } else {
      const numericValue = Number(inputValue);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 pl-3 items-center gap-3 rounded-md bg-[#202F45]">
          <IntegerInput
            value={value === null ? "" : value}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="eg. 30"
            className="bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none placeholder:text-white placeholder:opacity-60 w-20 text-left"
            ref={integerInputRef}
          />
          <div className="flex px-3 py-3 items-center gap-3 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">
            <span className="text-white font-montserrat text-base font-normal leading-[150%]">h/w</span>
          </div>
        </div>
      </div>
      {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
    </>
  );
});
