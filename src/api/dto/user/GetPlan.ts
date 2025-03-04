import { PlanProductType } from "../../model";

export interface GetPlanParams {}

export interface GetPlanResponse {
  productType: PlanProductType | null;
}

export interface GetPlanBody {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface GetPlanQuery {
  companyId?: string;
}
