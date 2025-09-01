import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Currency } from "@open-source-economy/api-types";
import { displayedCurrencies } from "../../../data";
import { BaseProps, BaseRef } from "../Base";

export interface HourlyRateInputRef extends BaseRef {}

interface HourlyRateInputProps extends BaseProps {
  currency: Currency;
  hourlyRate: number | null;
  onCurrencyChange: (currency: Currency | null) => void;
  onHourlyRateChange: (value: number) => void;
}

export const HourlyRateInput = forwardRef(function HourlyRateInput(props: HourlyRateInputProps, ref: Ref<HourlyRateInputRef>) {
  const { currency, hourlyRate, onCurrencyChange, onHourlyRateChange } = props;

  const [internalHourlyRateError, setInternalHourlyRateError] = useState<string | undefined>(undefined);

  const runHourlyRateValidation = (currentRate: number | null, showInputError: boolean): boolean => {
    let errorMessage: string | undefined = undefined;
    if (currentRate === null || currentRate <= 0) {
      errorMessage = "Please enter a valid positive rate";
    }

    if (showInputError) {
      setInternalHourlyRateError(errorMessage);
    }
    return !errorMessage;
  };

  useImperativeHandle(
    ref,
    () => ({
      validate: (showInputError: boolean) => {
        const isHourlyRateValid = runHourlyRateValidation(hourlyRate, true);
        return isHourlyRateValid;
      },
    }),
    [hourlyRate],
  );

  const sanitizeHourlyRateInput = (inputValue: string) => {
    const numericValue = inputValue.match(/^\d*\.?\d*$/)?.[0] || "";
    onHourlyRateChange(Number(numericValue));
    if (internalHourlyRateError && runHourlyRateValidation(parseFloat(numericValue), false)) {
      setInternalHourlyRateError(undefined);
    }
  };

  return (
    <div className="flex h-12 items-center gap-2 self-stretch">
      <div className="flex w-40 p-3 items-center gap-4 self-stretch rounded-md bg-[#202F45]">
        <div className="flex px-4 py-3 items-center gap-3 rounded-md border border-[#202F45] bg-[#0E1F35]">
          <span className="text-white font-montserrat text-base font-normal leading-[1.5]">
            {displayedCurrencies[currency]?.symbol || "$"}
          </span>
        </div>
        <input
          type="text"
          value={hourlyRate === null ? "" : hourlyRate}
          onChange={e => sanitizeHourlyRateInput(e.target.value)}
          onBlur={() => runHourlyRateValidation(hourlyRate, true)}
          placeholder="e.g. 100"
          className="bg-transparent text-white font-montserrat text-base font-normal leading-[1.5] outline-none placeholder:text-white placeholder:opacity-60 flex-1"
          inputMode="numeric"
          pattern="[0-9]*[.]?[0-9]*"
          aria-label="Hourly Rate"
        />
      </div>
      <div className="flex p-3 items-center gap-3 self-stretch rounded-md bg-[#202F45]">
        <span className="text-white font-montserrat text-base font-normal leading-[1.5]">€ (EUR)</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.2969 8.29297L12.0039 12.586L7.71087 8.29297L6.29688 9.70697L12.0039 15.414L17.7109 9.70697L16.2969 8.29297Z" fill="white"/>
        </svg>
      </div>
      {internalHourlyRateError && <div className="text-red-400 text-sm mt-1">{internalHourlyRateError}</div>}
    </div>
  );
});
