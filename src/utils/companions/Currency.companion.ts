/**
 * Companion utilities for Currency enum
 * Centralizes all display and formatting logic for currencies
 */

import * as dto from "@open-source-economy/api-types";

export interface CurrencyDisplay {
  symbol: string;
  code: string;
  flag: string;
  name: string;
}

const currencyDisplayMap: Record<dto.Currency, CurrencyDisplay> = {
  [dto.Currency.USD]: { symbol: "$", code: "USD", flag: "🇺🇸", name: "US Dollar" },
  [dto.Currency.EUR]: { symbol: "€", code: "EUR", flag: "🇪🇺", name: "Euro" },
  [dto.Currency.CHF]: { symbol: "Fr", code: "CHF", flag: "🇨🇭", name: "Swiss Franc" },
  [dto.Currency.GBP]: { symbol: "£", code: "GBP", flag: "🇬🇧", name: "British Pound" },
};

export namespace CurrencyCompanion {
  /**
   * Get currency symbol
   */
  export function symbol(currency: dto.Currency): string {
    return currencyDisplayMap[currency]?.symbol;
  }

  /**
   * Get currency label for select options
   */
  export function label(currency: dto.Currency): string {
    return currencyDisplayMap[currency]?.code;
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
      label: display.code,
    }));
  }
}
