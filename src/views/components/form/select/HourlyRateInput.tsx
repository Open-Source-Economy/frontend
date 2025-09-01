import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { Currency } from "@open-source-economy/api-types";
import { displayedCurrencies } from "../../../data";
import { CurrencySelectInput, CurrencySelectInputRef } from "./enum/CurrencySelectInput";
import { BaseProps, BaseRef } from "../Base";

export interface HourlyRateInputRef extends BaseRef {}

interface HourlyRateState {}

interface HourlyRateInputProps extends BaseProps {
  currency: Currency;
  hourlyRate: number | null;
  onCurrencyChange: (currency: Currency | null) => void;
  onHourlyRateChange: (value: number) => void;
}

export const HourlyRateInput = forwardRef(function HourlyRateInput(props: HourlyRateInputProps, ref: Ref<HourlyRateInputRef>) {
  const { currency, hourlyRate, onCurrencyChange, onHourlyRateChange, ...rest } = props;

  const currencySelectRef = useRef<CurrencySelectInputRef>(null);
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
        const isCurrencyValid = currencySelectRef.current?.validate(showInputError) || false;
        const isHourlyRateValid = runHourlyRateValidation(hourlyRate, true);

        return isCurrencyValid && isHourlyRateValid;
      },
    }),
    [currency, hourlyRate, props.required, props.label],
  );

  const sanitizeHourlyRateInput = (inputValue: string) => {
    const numericValue = inputValue.match(/^\d*\.?\d*$/)?.[0] || "";
    onHourlyRateChange(Number(numericValue));
    if (internalHourlyRateError && runHourlyRateValidation(parseFloat(numericValue), false)) {
      setInternalHourlyRateError(undefined);
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 ">
      <div className="box-border content-stretch flex flex-row gap-2 items-end justify-start p-0 relative shrink-0 w-full">
        <CurrencySelectInput ref={currencySelectRef} value={currency} onChange={onCurrencyChange} {...rest} />

        <div
          className={`bg-[#202f45] box-border flex flex-row gap-2 items-center justify-between px-4 py-2.5 min-h-[50px] relative rounded-md
          ${internalHourlyRateError ? "border border-red-500" : "border border-[#202f45]"}`}
        >
          <span className="font-montserrat font-normal text-[#ffffff] text-[16px] opacity-60">{displayedCurrencies[currency]?.symbol || "$"}</span>
          <input
            type="text"
            value={hourlyRate === null ? "" : hourlyRate}
            onChange={e => sanitizeHourlyRateInput(e.target.value)}
            onBlur={() => runHourlyRateValidation(hourlyRate, true)}
            placeholder="0"
            className="bg-transparent font-montserrat font-normal text-[#ffffff] text-[16px]  text-center outline-none placeholder:opacity-60 w-[4ch]"
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
