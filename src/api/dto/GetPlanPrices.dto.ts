import { Currency, PlanPriceType, PlanProductType, StripePrice, StripeProduct } from "../model";

export interface GetPlanPricesParams {}

export interface GetPlanPricesResponse {
  prices: Record<PlanProductType, [StripeProduct, Record<Currency, Record<PlanPriceType, StripePrice>>]>;
}

export interface GetPlanPricesBody {}

export interface GetPlanPricesQuery {}
