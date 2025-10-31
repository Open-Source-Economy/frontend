/**
 * Companion utilities for Currency enum
 * Centralizes all display and formatting logic for currencies
 */

import * as dto from "@open-source-economy/api-types";

export interface CurrencyDisplay {
  symbol: string;
  label: string;
}

const currencyDisplayMap: Record<dto.Currency, CurrencyDisplay> = {
  [dto.Currency.USD]: { symbol: "$", label: "USD ($)" },
  [dto.Currency.EUR]: { symbol: "€", label: "EUR (€)" },
  [dto.Currency.CHF]: { symbol: "Fr", label: "CHF (Fr)" },
  [dto.Currency.GBP]: { symbol: "£", label: "GBP (£)" },
};

export namespace CurrencyCompanion {
  /**
   * Get currency symbol
   */
  export function symbol(currency: dto.Currency): string {
    return currencyDisplayMap[currency]?.symbol || "$";
  }

  /**
   * Get currency label for select options
   */
  export function label(currency: dto.Currency): string {
    return currencyDisplayMap[currency]?.label || "USD ($)";
  }

  /**
   * Get full currency display information
   */
  export function display(currency: dto.Currency): CurrencyDisplay {
    return currencyDisplayMap[currency];
  }

  /**
   * Get all displays (for EnumSelectInput compatibility)
   */
  export function displays(): Record<dto.Currency, CurrencyDisplay> {
    return currencyDisplayMap;
  }

  /**
   * Get all currency options for SelectField
   */
  export function selectOptions() {
    return Object.entries(currencyDisplayMap).map(([value, display]) => ({
      value,
      label: display.label,
    }));
  }
}
