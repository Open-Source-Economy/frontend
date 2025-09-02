import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Currency } from "@open-source-economy/api-types";
import { displayedCurrencies } from "../../../data";
import { BaseProps, BaseRef } from "../Base";

export interface HourlyRateInputRef extends BaseRef {}

interface HourlyRateInputProps extends BaseProps {
  currency: Currency;
  hourlyRate: number | null;
  onCurrencyChange?: (currency: Currency | null) => void;
  onHourlyRateChange: (value: number) => void;
}

export const HourlyRateInput = forwardRef(function HourlyRateInput(props: HourlyRateInputProps, ref: Ref<HourlyRateInputRef>) {
  const [internalHourlyRateError, setInternalHourlyRateError] = useState<string | undefined>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        const isHourlyRateValid = runHourlyRateValidation(props.hourlyRate, true);
        return isHourlyRateValid;
      },
    }),
    [props.hourlyRate],
  );

  const sanitizeHourlyRateInput = (inputValue: string) => {
    const numericValue = inputValue.match(/^\d*\.?\d*$/)?.[0] || "";
    props.onHourlyRateChange(Number(numericValue));
    if (internalHourlyRateError && runHourlyRateValidation(parseFloat(numericValue), false)) {
      setInternalHourlyRateError(undefined);
    }
  };

  const handleCurrencySelect = (selectedCurrency: Currency) => {
    if (props.onCurrencyChange) {
      props.onCurrencyChange(selectedCurrency);
      setIsDropdownOpen(false);
    }
  };

  const currentCurrency = displayedCurrencies[props.currency];

  // Fixed currency mode (Design 2)
  if (!props.onCurrencyChange) {
    return (
      <>
        <div className="flex w-48 h-12 pr-3 items-center gap-4 rounded-md bg-[#202F45]">
          <div className="flex px-3 py-3 items-center gap-3 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">
            <span className="text-white font-montserrat text-base font-normal leading-[150%]">
              {currentCurrency.symbol} ({currentCurrency.code})
            </span>
          </div>
          <input
            type="text"
            value={props.hourlyRate === null || props.hourlyRate === 0 ? "" : props.hourlyRate}
            onChange={e => sanitizeHourlyRateInput(e.target.value)}
            onBlur={() => runHourlyRateValidation(props.hourlyRate, true)}
            placeholder="100"
            className="bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none placeholder:text-white placeholder:opacity-60 flex-1"
            inputMode="numeric"
            pattern="[0-9]*[.]?[0-9]*"
            aria-label="Hourly Rate"
          />
        </div>
        {internalHourlyRateError && <div className="text-red-400 text-sm mt-1">{internalHourlyRateError}</div>}
      </>
    );
  }

  // Editable currency mode (Design 1)
  return (
    <>
      <div className="flex h-12 items-center gap-2 self-stretch">
        {/* Rate input container */}
        <div className="flex w-40 pr-3 items-center gap-4 self-stretch rounded-md bg-[#202F45]">
          {/* Currency symbol container */}
          <div className="flex px-4 py-3 items-center gap-3 rounded-md border border-[#202F45] bg-[#0E1F35]">
            <span className="text-white font-montserrat text-base font-normal leading-[150%]">{currentCurrency.symbol}</span>
          </div>
          {/* Input field */}
          <input
            type="text"
            value={props.hourlyRate === null || props.hourlyRate === 0 ? "" : props.hourlyRate}
            onChange={e => sanitizeHourlyRateInput(e.target.value)}
            onBlur={() => runHourlyRateValidation(props.hourlyRate, true)}
            placeholder="e.g. 100"
            className="bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none placeholder:text-white placeholder:opacity-60 flex-1"
            inputMode="numeric"
            pattern="[0-9]*[.]?[0-9]*"
            aria-label="Hourly Rate"
          />
        </div>
      </div>

      {/* Error message */}
      {internalHourlyRateError && <div className="text-red-400 text-sm mt-1">{internalHourlyRateError}</div>}
    </>
  );
});
