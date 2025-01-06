import Stripe from "stripe";

export interface GetDowPricesParams {}

export interface GetDowPricesResponse {
  subscriptionPrices: Stripe.Price[];
  oneTimePrices: Stripe.Price[];
}

export interface GetDowPricesBody {}

export interface GetDowPricesQuery {}
