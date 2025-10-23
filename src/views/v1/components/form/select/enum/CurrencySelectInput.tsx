import React, { forwardRef, Ref } from "react";
import { Currency } from "@open-source-economy/api-types";
import { displayedCurrencies } from "../../../../data";
import { DisplayedEnum, EnumSelectInput, EnumSelectInputChildrenProps } from "./EnumSelectInput";
import { BaseRef } from "../../Base";

const currencyDisplayedEnums: Record<Currency, DisplayedEnum> = Object.values(Currency).reduce(
  (acc, currency) => {
    const symbol = displayedCurrencies[currency]?.symbol;
    acc[currency] = { name: `${currency}${symbol ? ` - ${symbol}` : ""}` };
    return acc;
  },
  {} as Record<Currency, DisplayedEnum>,
);

export interface CurrencySelectInputRef extends BaseRef {}

export interface CurrencySelectInputProps extends EnumSelectInputChildrenProps<Currency> {}

export const CurrencySelectInput = forwardRef(function CurrencySelectInput(props: CurrencySelectInputProps, ref: Ref<CurrencySelectInputRef>) {
  return (
    // @ts-ignore
    <EnumSelectInput<Currency> enumObject={Currency} displayedEnums={currencyDisplayedEnums} {...props} ref={ref} />
  );
});
