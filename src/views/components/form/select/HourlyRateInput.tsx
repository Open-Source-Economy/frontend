import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Currency } from "@open-source-economy/api-types";
import { displayedCurrencies } from "../../../data"; // Adjust path as needed
import { CurrencySelectInput } from "./enum/CurrencySelectInput";
import { GenericInputRef } from "../GenericInput"; // Adjust path as needed

// New interface for the HourlyRateInput's ref
export interface HourlyRateInputRef {
  validate: () => boolean;
}

interface HourlyRateState {
  currency: Currency;
  hourlyRate: number | null;
}

interface HourlyRateInputProps {
  state: HourlyRateState;
  handleCurrencyChange: (currency: Currency) => void;
  handleHourlyRateChange: (value: string) => void;
  forceValidate?: boolean;
}

export const HourlyRateInput = forwardRef(function HourlyRateInput(
  props: HourlyRateInputProps,
  ref: Ref<HourlyRateInputRef>, // This component's ref type
) {
  const { state, handleCurrencyChange, handleHourlyRateChange, forceValidate } = props;

  const currencySelectRef = useRef<GenericInputRef>(null);
  const [internalHourlyRateError, setInternalHourlyRateError] = useState<string | undefined>(undefined);

  // Helper to run hourly rate specific validation
  const runHourlyRateValidation = (currentRate: number | null, showImmediately: boolean = false): boolean => {
    let errorMessage: string | undefined = undefined;
    if (currentRate === null || currentRate <= 0) {
      errorMessage = "Please enter a valid positive rate";
    }

    if (showImmediately || forceValidate) {
      setInternalHourlyRateError(errorMessage);
    }
    return !errorMessage;
  };

  // Expose validate method for parent components
  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        // Trigger validation for the currency select
        const isCurrencyValid = currencySelectRef.current?.validate() || false;
        // Trigger validation for the hourly rate input, showing errors immediately
        const isHourlyRateValid = runHourlyRateValidation(state.hourlyRate, true);

        return isCurrencyValid && isHourlyRateValid;
      },
    }),
    [state.currency, state.hourlyRate, forceValidate], // Dependencies for useImperativeHandle
  );

  // Effect to trigger hourly rate validation when forceValidate changes
  useEffect(() => {
    if (forceValidate) {
      runHourlyRateValidation(state.hourlyRate, true);
    }
  }, [forceValidate, state.hourlyRate]);

  // Helper to ensure only valid numeric input for the hourly rate
  const sanitizeHourlyRateInput = (inputValue: string) => {
    const numericValue = inputValue.match(/^\d*\.?\d*$/)?.[0] || "";
    handleHourlyRateChange(numericValue);
    // Clear error immediately on change if it was showing and input is now valid
    if (internalHourlyRateError && runHourlyRateValidation(parseFloat(numericValue), false)) {
      setInternalHourlyRateError(undefined);
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full">
        <CurrencySelectInput
          ref={currencySelectRef}
          value={state.currency}
          onChange={handleCurrencyChange}
          required={true}
          forceValidate={forceValidate}
          name="hourlyRateCurrency"
        />

        <div
          className={`bg-[#202f45] box-border flex flex-row gap-2 items-center justify-between px-4 py-3 relative rounded-md w-full sm:w-[150px]
          ${internalHourlyRateError ? "border border-red-500" : "border border-[#202f45]"}`}
        >
          <span className="font-montserrat font-normal text-[#ffffff] text-[16px] opacity-60">{displayedCurrencies[state.currency]?.symbol || "$"}</span>
          <input
            type="text"
            value={state.hourlyRate === null ? "" : state.hourlyRate}
            onChange={e => sanitizeHourlyRateInput(e.target.value)}
            onBlur={() => runHourlyRateValidation(state.hourlyRate, true)} // Validate on blur
            placeholder="0"
            className="w-full bg-transparent font-montserrat font-normal text-[#ffffff] text-[16px] text-center outline-none placeholder:opacity-60"
            inputMode="numeric"
            pattern="[0-9]*[.]?[0-9]*"
            aria-label="Hourly Rate"
          />
          <span className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-60">/hr</span>
        </div>
      </div>
      {internalHourlyRateError && <div className="text-red-400 text-sm mt-1">{internalHourlyRateError}</div>}
    </div>
  );
});
