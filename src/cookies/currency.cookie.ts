import { Currency } from "../model";

/**
 * Utilities for handling currency cookies.
 */
export const CurrencyCookie = {
  /**
   * Retrieves the initial currency from cookies or defaults to USD.
   * @returns {Currency} The currency found in cookies or Currency.USD if not set.
   */
  get(): Currency {
    const cookieCurrency = document.cookie
      .split("; ")
      .find(row => row.startsWith("currency="))
      ?.split("=")[1];
    return cookieCurrency ? (cookieCurrency as Currency) : Currency.EUR;
  },

  /**
   * Sets the currency in cookies with a default expiration of 1 year.
   * @param {Currency} currency - The currency to set in the cookie.
   */
  set(currency: Currency): void {
    const oneYearInSeconds = 31536000; // 1 year in seconds
    document.cookie = `currency=${currency}; path=/; max-age=${oneYearInSeconds}`;
  },
};
