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
  allowCurrencyChange?: boolean;
  showCommentButton?: boolean;
  onCommentClick?: () => void;
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
    props.onCurrencyChange(selectedCurrency);
    setIsDropdownOpen(false);
  };

  const availableCurrencies = Object.keys(displayedCurrencies) as Currency[];
  const currentCurrency = displayedCurrencies[props.currency] || { symbol: "€", code: "EUR" };

  // Fixed currency mode (Design 2)
  if (!props.allowCurrencyChange) {
    return (
      <>
        <div className="flex w-48 h-12 pr-3 items-center gap-4 rounded-md bg-[#202F45]">
          <div className="flex px-3 py-3 items-center gap-3 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">
            <span className="text-white font-montserrat text-base font-normal leading-[150%]">
              {currentCurrency.symbol} ({currentCurrency.code})
            </span>
          </div>
          <div className="text-white font-montserrat text-base font-normal leading-[150%]">{props.hourlyRate || "100"}</div>
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

        {/* Currency dropdown container */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
            className="flex px-3 py-0 items-center gap-3 self-stretch h-12 rounded-md bg-[#202F45] hover:bg-[#2a3a55] transition-colors"
          >
            <span className="text-white font-montserrat text-base font-normal leading-[150%]">
              {currentCurrency.symbol} ({currentCurrency.code})
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="M16.2969 8.29297L12.0039 12.586L7.71087 8.29297L6.29688 9.70697L12.0039 15.414L17.7109 9.70697L16.2969 8.29297Z" fill="white" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-[#202F45] rounded-md border border-[#3a4a65] z-10 shadow-lg">
              {availableCurrencies.map(curr => (
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

        {/* Comment button */}
        {props.showCommentButton && (
          <button
            type="button"
            onClick={props.onCommentClick}
            className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            title="Add comment"
            aria-label="Add comment"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 15.0017V25.0017M15 20.0017H25M20 35C22.9667 35 25.8668 34.1203 28.3336 32.4721C30.8003 30.8238 32.7229 28.4811 33.8582 25.7403C34.9935 22.9994 35.2906 19.9834 34.7118 17.0737C34.133 14.1639 32.7044 11.4912 30.6066 9.3934C28.5088 7.29562 25.8361 5.86701 22.9264 5.28823C20.0166 4.70945 17.0006 5.0065 14.2597 6.14181C11.5189 7.27713 9.17618 9.19972 7.52796 11.6665C5.87973 14.1332 5 17.0333 5 20C5 22.48 5.6 24.8167 6.66667 26.8783L5 35L13.1217 33.3333C15.1817 34.3983 17.5217 35 20 35Z"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Error message */}
      {internalHourlyRateError && <div className="text-red-400 text-sm mt-1">{internalHourlyRateError}</div>}
    </>
  );
});
