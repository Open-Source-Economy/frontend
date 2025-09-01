import React, { forwardRef, Ref, useImperativeHandle, useState, useEffect, useRef } from "react";
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
  const { currency, hourlyRate, onHourlyRateChange, onCurrencyChange } = props;

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

  const handleCurrencySelect = (selectedCurrency: Currency) => {
    onCurrencyChange(selectedCurrency);
    setIsDropdownOpen(false);
  };

  const availableCurrencies = Object.keys(displayedCurrencies) as Currency[];

  return (
    <div className="flex h-12 items-center gap-2 self-stretch">
      {/* Text input container */}
      <div className="flex w-40 pr-3 pl-0 py-3 items-center gap-4 self-stretch rounded-md bg-[#202F45]">
        {/* Currency symbol container */}
        <div className="flex px-4 py-3 items-center gap-3 rounded-md border border-[#202F45] bg-[#0E1F35]">
          <span className="text-white font-montserrat text-base font-normal leading-[150%]">
            {displayedCurrencies[currency]?.symbol || "€"}
          </span>
        </div>
        {/* Input field */}
        <input
          type="text"
          value={hourlyRate === null ? "" : hourlyRate}
          onChange={e => sanitizeHourlyRateInput(e.target.value)}
          onBlur={() => runHourlyRateValidation(hourlyRate, true)}
          placeholder="e.g. 100"
          className="bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none placeholder:text-white placeholder:opacity-60 flex-1"
          inputMode="numeric"
          pattern="[0-9]*[.]?[0-9]*"
          aria-label="Hourly Rate"
        />
      </div>

      {/* Currency dropdown container */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex px-3 py-0 items-center gap-3 h-12 rounded-md bg-[#202F45] hover:bg-[#2a3a55] transition-colors"
        >
          <span className="text-white font-montserrat text-base font-normal leading-[150%]">
            {displayedCurrencies[currency]?.symbol} ({displayedCurrencies[currency]?.code})
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          >
            <path d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z" fill="white"/>
          </svg>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-[#202F45] rounded-md border border-[#3a4a65] z-10 shadow-lg">
            {availableCurrencies.map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => handleCurrencySelect(curr)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[#2a3a55] transition-colors first:rounded-t-md last:rounded-b-md"
              >
                <span className="text-white font-montserrat text-base font-normal leading-[150%]">
                  {displayedCurrencies[curr].symbol} ({displayedCurrencies[curr].code})
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error message */}
      {internalHourlyRateError && <div className="text-red-400 text-sm mt-1">{internalHourlyRateError}</div>}
    </div>
  );
});
