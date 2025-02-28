import { Currency } from "../model";

interface ICurrencyHandler {
  get(): Currency;
  set(currency: Currency): void;
  remove(): void;
}

class CurrencyCookie implements ICurrencyHandler {
  readonly cookieName: string;
  readonly defaultCurrency: Currency;

  constructor() {
    this.cookieName = "ose_currency";
    this.defaultCurrency = Currency.EUR;
  }

  /**
   * Retrieves the currency from cookies or returns the default currency.
   * @returns {Currency} The stored currency or default if not found
   */
  public get(): Currency {
    try {
      const cookies: string[] = document.cookie.split(";").map(cookie => cookie.trim());
      const currencyCookie: string | undefined = cookies.find(cookie => cookie.startsWith(`${this.cookieName}=`));

      if (!currencyCookie) {
        return this.defaultCurrency;
      }

      const [, value] = currencyCookie.split("=");
      const currency = value as Currency;

      return this.isValidCurrency(currency) ? currency : this.defaultCurrency;
    } catch (error) {
      return this.defaultCurrency;
    }
  }

  /**
   * Sets the currency in cookies with a 1-year expiration.
   * @param {Currency} currency - The currency to store
   */
  public set(currency: Currency): void {
    try {
      if (!this.isValidCurrency(currency)) {
        throw new Error(`Invalid currency value: ${currency}`);
      }

      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);

      const cookieOptions: string[] = [
        `${this.cookieName}=${currency}`,
        "path=/",
        `expires=${date.toUTCString()}`,
        "SameSite=Lax",
        "domain=" + window.location.hostname, // Add domain
      ];

      if (window.location.protocol === "https:") {
        cookieOptions.push("Secure");
      }

      const cookieString = cookieOptions.join("; ");
      document.cookie = cookieString;

      // Verify immediately after setting
      const _ = document.cookie.split(";").map(c => c.trim());
    } catch (error) {
      throw error;
    }
  }

  /**
   * Removes the currency cookie.
   */
  public remove(): void {
    try {
      document.cookie = `${this.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validates if a value is a valid Currency enum value.
   * @param {unknown} value - The value to validate
   * @returns {boolean} True if valid Currency enum value
   */
  private isValidCurrency(value: unknown): value is Currency {
    return Object.values(Currency).includes(value as Currency);
  }
}

export const currencyCookie = new CurrencyCookie();

// /**
//  * Retrieves the initial currency from cookies or defaults to USD.
//  * @returns {Currency} The currency found in cookies or Currency.USD if not set.
//  */
// get(): Currency {
//   const cookieCurrency = document.cookie
//     .split("; ")
//     .find(row => row.startsWith("currency="))
//     ?.split("=")[1];
//   return cookieCurrency ? (cookieCurrency as Currency) : Currency.EUR;
// },
//
// /**
//  * Sets the currency in cookies with a default expiration of 1 year.
//  * @param {Currency} currency - The currency to set in the cookie.
//  */
// set(currency: Currency): void {
//   const oneYearInSeconds = 31536000; // 1 year in seconds
//   document.cookie = `currency=${currency}; path=/; max-age=${oneYearInSeconds}`;
// },
