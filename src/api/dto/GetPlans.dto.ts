import { Currency, PlanPriceType, PlanProductType, StripePrice } from "../model";

export interface GetPlansParams {}

export interface GetPlansResponse {
  plans: Record<PlanProductType, Record<Currency, Record<PlanPriceType, StripePrice>>>;
}

export interface GetPlansBody {}

export interface GetPlansQuery {}
