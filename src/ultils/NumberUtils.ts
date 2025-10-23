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

  /**
   * Format large numbers in a compact way (e.g., 10000 -> "10k", 1000000 -> "1M")
   * @param count - The number to format
   * @returns Formatted string representation
   */
  formatCompactNumber: (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${Math.round(count / 1000)}k`;
    }
    return count.toString();
  },
};
