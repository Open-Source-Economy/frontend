import { Currency } from "@open-source-economy/api-types";
import { displayedCurrencies } from "../views";

export const NumberUtils = {
  toLocaleStringPrice: (num: number, currency: Currency): string => {
    const displayedCurrency = displayedCurrencies[currency];
    return `${(num / 100).toLocaleString("en-US", {
      style: "currency",
      currency: displayedCurrency.code,
      maximumFractionDigits: 0,
    })}`;
  },
};
