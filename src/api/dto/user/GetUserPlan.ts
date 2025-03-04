import { PlanPriceType, PlanProductType } from "../../model";

export interface GetUserPlanParams {}

export interface GetUserPlanResponse {
  productType: PlanProductType | null;
  priceType: PlanPriceType | null;
}

export interface GetUserPlanBody {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface GetUserPlanQuery {
  companyId?: string;
}
