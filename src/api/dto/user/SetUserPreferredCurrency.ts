import { Currency } from "../../model";

export interface SetUserPreferredCurrencyParams {
  currency: Currency;
}

export interface SetUserPreferredCurrencyResponse {}

export interface SetUserPreferredCurrencyBody {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface SetUserPreferredCurrencyQuery {}
