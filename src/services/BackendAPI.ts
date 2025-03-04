import { FinancialIssue } from "../api/model";
import { BackendAPIMock } from "src/__mocks__";
import * as dto from "src/api/dto";
import { handleError, projectPath } from "./index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { StatusCodes } from "http-status-codes";
import { getMaintainers } from "./data";
import { pekkoGetProjectServicesResponse } from "./data/getProjectServiceResponses";

export function getBackendAPI(): BackendAPI {
  if (config.api.useMock) {
    return new BackendAPIMock();
  } else {
    return new BackendAPIImpl();
  }
}

export interface BackendAPI {
  /* Getters */

  getFinancialIssue(params: dto.GetIssueParams, query: dto.GetIssueQuery): Promise<FinancialIssue | ApiError>;

  getAllFinancialIssues(params: dto.GetIssuesParams, query: dto.GetIssueQuery): Promise<FinancialIssue[] | ApiError>;

  getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<dto.GetAvailableCreditsResponse | ApiError>;

  /**
   * Funds a specific issue.
   * @returns
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void | ApiError>;

  /**
   * Request or approve funding for an issue.
   *
   * @throws {Error} If the issue is already got requested funding.
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   */
  requestFunding(params: dto.RequestIssueFundingParams, body: dto.RequestIssueFundingBody, query: dto.RequestIssueFundingQuery): Promise<void | ApiError>;

  getOwner(params: dto.GetOwnerParams, query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse | ApiError>;

  getRepository(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery): Promise<dto.GetRepositoryResponse | ApiError>;

  getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse | ApiError>;

  getMaintainers(params: dto.GetMaintainersParams, query: dto.GetMaintainersQuery): Promise<dto.GetMaintainersResponse | ApiError>;

  getPlans(params: dto.GetPlansParams, query: dto.GetPlansQuery): Promise<dto.GetPlansResponse | ApiError>;

  getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse | ApiError>;

  getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse | ApiError>;

  checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, query: dto.CheckoutQuery): Promise<dto.CheckoutResponse | ApiError>;

  setUserPreferredCurrency(
    params: dto.SetUserPreferredCurrencyParams,
    body: dto.SetUserPreferredCurrencyBody,
    query: dto.SetUserPreferredCurrencyQuery,
  ): Promise<dto.SetUserPreferredCurrencyResponse | ApiError>;

  getProjectServices(params: dto.GetProjectServicesParams, query: dto.GetProjectServicesQuery): Promise<dto.GetProjectServicesResponse | ApiError>;

  subscribeToNewsletter(
    params: dto.NewsletterSubscriptionParams,
    body: dto.NewsletterSubscriptionBody,
    query: dto.NewsletterSubscriptionQuery,
  ): Promise<dto.NewsletterSubscriptionResponse | ApiError>;
}

class BackendAPIImpl implements BackendAPI {
  async getFinancialIssue(params: dto.GetIssueParams, query: dto.GetIssueQuery): Promise<FinancialIssue | ApiError> {
    const response = await handleError<dto.GetIssueResponse>(
      () => axios.get(`${config.api.url}/project/repos/${params.owner}/${params.repo}/issues/${params.number}`, { withCredentials: true }),
      "getFinancialIssue",
    );

    if (response instanceof ApiError) return response;
    else return response.issue;
  }

  async getAllFinancialIssues(params: dto.GetIssuesParams, query: dto.GetIssueQuery): Promise<FinancialIssue[] | ApiError> {
    const response = await handleError<dto.GetIssuesResponse>(
      () => axios.get(`${config.api.url}/project/all-financial-issues`, { withCredentials: true }),
      "getAllFinancialIssues",
    );
    if (response instanceof ApiError) return response;
    else return response.issues;
  }

  async getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<dto.GetAvailableCreditsResponse | ApiError> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError<dto.GetAvailableCreditsResponse>(
      () => axios.get(`${config.api.url}/user/available-credit?${queryParams}`, { withCredentials: true }),
      "getAvailableCredits",
    );
  }

  async fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void | ApiError> {
    return handleError(
      () => axios.post(`${config.api.url}/project/repos/${params.owner}/${params.repo}/issues/${params.number}/funding`, body, { withCredentials: true }),
      "fundIssue",
    );
  }

  async requestFunding(
    params: dto.RequestIssueFundingParams,
    body: dto.RequestIssueFundingBody,
    query: dto.RequestIssueFundingQuery,
  ): Promise<void | ApiError> {
    return handleError(
      () =>
        axios.post(`${config.api.url}/project/repos/${params.owner}/${params.repo}/issues/${params.number}/funding/requests`, body, { withCredentials: true }),
      "requestFunding",
    );
  }

  async getOwner(params: dto.GetOwnerParams, query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/project/owners/${params.owner}`, { withCredentials: true }), "getOwner");
  }

  async getRepository(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery): Promise<dto.GetRepositoryResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/project/repos/${params.owner}/${params.repo}`, { withCredentials: true }), "getRepository");
  }

  async getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse | ApiError> {
    // Hacky, change when we will have time
    if (params.repo) {
      const p: dto.GetRepositoryParams = { owner: params.owner, repo: params.repo };
      const response = await this.getRepository(p, query);
      if (response instanceof ApiError) {
        return response;
      }
      return { project: { id: response.repository.id, owner: response.owner, repository: response.repository } };
    } else {
      const response = await this.getOwner(params, query);
      if (response instanceof ApiError) {
        return response;
      }
      return { project: { id: response.owner.id, owner: response.owner } };
    }
  }

  async getMaintainers(params: dto.GetMaintainersParams, query: dto.GetMaintainersQuery): Promise<dto.GetMaintainersResponse | ApiError> {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      return new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  }

  async getPlans(params: dto.GetPlansParams, query: dto.GetPlansQuery): Promise<dto.GetPlansResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/plans`, { withCredentials: true }), "getPlans");
  }

  async getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse | ApiError> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError(() => axios.get(`${config.api.url}/user/plan?${queryParams}`, { withCredentials: true }), "getUserPlan");
  }

  async getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse | ApiError> {
    return handleError(
      () => axios.get(`${config.api.url}/project/${projectPath(params.owner, params.repo)}/campaigns`, { withCredentials: true }),
      "getCampaign",
    );
  }

  async checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, query: dto.CheckoutQuery): Promise<ApiError | dto.CheckoutResponse> {
    return handleError(() => axios.post(`${config.api.url}/stripe/checkout`, body, { withCredentials: true }), "checkout");
  }

  async setUserPreferredCurrency(
    params: dto.SetUserPreferredCurrencyParams,
    body: dto.SetUserPreferredCurrencyBody,
    query: dto.SetUserPreferredCurrencyQuery,
  ): Promise<dto.SetUserPreferredCurrencyResponse | ApiError> {
    return handleError(
      () => axios.post(`${config.api.url}/user/preferred-currency/${params.currency}`, body, { withCredentials: true }),
      "setUserPreferredCurrency",
    );
  }

  async getProjectServices(params: dto.GetProjectServicesParams, query: dto.GetProjectServicesQuery): Promise<ApiError | dto.GetProjectServicesResponse> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async subscribeToNewsletter(
    params: dto.NewsletterSubscriptionParams,
    body: dto.NewsletterSubscriptionBody,
    query: dto.NewsletterSubscriptionQuery,
  ): Promise<dto.NewsletterSubscriptionResponse | ApiError> {
    return handleError(() => axios.post(`${config.api.url}/newsletter`, body, { withCredentials: true }), "subscribeToNewsletter");
  }
}
