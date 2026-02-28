import * as dto from "@open-source-economy/api-types";
import { api, handleError } from "./apiClient";
import { config } from "src/utils";

export interface CreatePortalSessionBody {
  returnUrl: string;
}
export interface CreatePortalSessionResponse {
  url: string;
}

export interface StripeService {
  getPlans(params: dto.GetPlansParams, query: dto.GetPlansQuery): Promise<dto.GetPlansResponse>;

  getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse>;

  checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, query: dto.CheckoutQuery): Promise<dto.CheckoutResponse>;

  setUserPreferredCurrency(
    params: dto.SetPreferredCurrencyParams,
    body: dto.SetPreferredCurrencyBody,
    query: dto.SetPreferredCurrencyQuery
  ): Promise<dto.SetPreferredCurrencyResponse>;

  createPortalSession(body: CreatePortalSessionBody): Promise<CreatePortalSessionResponse>;
}

export const stripeServiceImpl: StripeService = {
  async getPlans(_params, _query) {
    return handleError(() => api.get(`${config.api.url}/plans`, { withCredentials: true }), "getPlans");
  },

  async getUserPlan(_params, query) {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError(
      () => api.get(`${config.api.url}/user/plan?${queryParams}`, { withCredentials: true }),
      "getUserPlan"
    );
  },

  async checkout(_params, body, _query) {
    return handleError(
      () => api.post(`${config.api.url}/stripe/checkout`, body, { withCredentials: true }),
      "checkout"
    );
  },

  async setUserPreferredCurrency(params, body, _query) {
    return handleError(
      () => api.post(`${config.api.url}/user/preferred-currency/${params.currency}`, body, { withCredentials: true }),
      "setUserPreferredCurrency"
    );
  },

  async createPortalSession(body) {
    return handleError(
      () => api.post(`${config.api.url}/stripe/portal`, body, { withCredentials: true }),
      "createPortalSession"
    );
  },
};
