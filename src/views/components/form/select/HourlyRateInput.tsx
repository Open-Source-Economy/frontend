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

  useImperativeHandle(
    hourlyRateRef,
    () => ({
      validate: (showInputError: boolean) => {
        const rateValidation = integerInputRef.current?.validate(showInputError) ?? false;
        const currencyValidation = currencyInputRef.current?.validate(showInputError) ?? false;
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
  };

  const currentCurrency = displayedCurrencies[props.currency];

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

          <IntegerInput
            value={hourlyRate ?? ""}
            onChange={e => onHourlyRateChange(e.target.value)}
            placeholder="100"
            className="bg-transparent text-white"
            aria-label="Hourly Rate"
            ref={integerInputRef}
          />

          {props.onCurrencyChange && <CurrencySelectInput onChange={handleCurrencySelect} value={currency} ref={currencyInputRef} />}
        </div>
      </div>

      {/* Error message */}
      {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
    </>
  );
});
