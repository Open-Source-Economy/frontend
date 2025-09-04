import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Currency } from "@open-source-economy/api-types";
import { displayedCurrencies } from "../../../data";
import { BaseProps, BaseRef } from "../Base";
import { CurrencySelectInput } from "./enum";
import { IntegerInput } from "../input/number/IntegerInput";
import { GenericInputRef } from "../input";

export interface HourlyRateInputRef extends BaseRef {}

interface HourlyRateInputProps extends BaseProps {
  currency: Currency;
  hourlyRate: number | null;
  onCurrencyChange?: (currency: Currency | null) => void;
  onHourlyRateChange: (value: number) => void;
}

export const HourlyRateInput = forwardRef(function HourlyRateInput(props: HourlyRateInputProps, hourlyRateRef: Ref<HourlyRateInputRef>) {
  const integerInputRef = React.useRef<GenericInputRef>(null);
  const currencyInputRef = React.useRef<GenericInputRef>(null);

  const [currency, setCurrency] = useState<Currency>(props.currency);
  const [hourlyRate, setHourlyRate] = useState<number | null>(props.hourlyRate);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useImperativeHandle(
    hourlyRateRef,
    () => ({
      validate: (showInputError: boolean) => {
        const rateValidation = integerInputRef.current?.validate(showInputError) ?? false;
        const currencyValidation = props.onCurrencyChange ? (currencyInputRef.current?.validate(showInputError) ?? false) : true;
        return rateValidation && currencyValidation;
      },
    }),
    [hourlyRate],
  );

  const onHourlyRateChange = (inputValue: string) => {
    const numericValue = Number(inputValue);
    setHourlyRate(numericValue);
    props.onHourlyRateChange(numericValue);
  };

  const handleCurrencySelect = (selectedCurrency: Currency | null) => {
    if (props.onCurrencyChange && selectedCurrency) {
      props.onCurrencyChange(selectedCurrency);
      setCurrency(selectedCurrency);
    }
    setIsDropdownOpen(false);
  };

  const currentCurrency = displayedCurrencies[props.currency];

  return (
    <>
      <div className="flex h-12 items-center gap-2 self-stretch">
        {/* Rate input container */}
        <div className="flex w-40 py-3 pr-3 items-center gap-4 self-stretch rounded-md bg-[#202F45]">
          {/* Currency symbol container */}
          <div className="flex py-3 px-4 items-center gap-3 rounded-md border border-[#202F45] bg-[#0E1F35]">
            <span className="text-white font-montserrat text-base font-normal leading-[150%]">{currentCurrency.symbol}</span>
          </div>

          {/* Input field */}
          <div className="flex-1">
            <input
              type="number"
              value={hourlyRate ?? ""}
              onChange={e => onHourlyRateChange(e.target.value)}
              placeholder="100"
              className="w-full bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none placeholder:text-white"
              aria-label="Hourly Rate"
            />
          </div>
        </div>

        {/* Currency dropdown */}
        {props.onCurrencyChange && (
          <div className="relative flex-1">
            <div
              className="flex py-0 px-3 items-center gap-3 self-stretch rounded-md bg-[#202F45] cursor-pointer h-12"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-white font-montserrat text-base font-normal leading-[150%]">
                {currentCurrency.symbol} ({props.currency})
              </span>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z"
                  fill="white"
                />
              </svg>
            </div>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#202F45] rounded-md border border-[#202F45] z-10 max-h-40 overflow-y-auto">
                {Object.values(Currency).map((currencyOption) => {
                  const currencyData = displayedCurrencies[currencyOption];
                  return (
                    <div
                      key={currencyOption}
                      className="flex py-2 px-3 items-center gap-3 cursor-pointer hover:bg-[#0E1F35] text-white font-montserrat text-base font-normal leading-[150%]"
                      onClick={() => handleCurrencySelect(currencyOption)}
                    >
                      {currencyData.symbol} ({currencyOption})
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
    </>
  );
});
