import { FinancialIssue } from "../model";
import Decimal from "decimal.js";
import { BackendAPIMock } from "src/__mocks__";
import {
  CheckoutBody,
  CheckoutParams,
  CheckoutQuery,
  CheckoutResponse,
  FundIssueBody,
  FundIssueParams,
  FundIssueQuery,
  GetAvailableDowResponse,
  GetCampaignParams,
  GetCampaignQuery,
  GetCampaignResponse,
  GetIssueParams,
  GetIssueQuery,
  GetIssueResponse,
  GetIssuesParams,
  GetIssuesResponse,
  GetMaintainersParams,
  GetMaintainersQuery,
  GetMaintainersResponse,
  GetOwnerParams,
  GetOwnerQuery,
  GetOwnerResponse,
  GetPricesParams,
  GetPricesQuery,
  GetPricesResponse,
  GetProjectParams,
  GetProjectQuery,
  GetProjectResponse,
  GetProjectServicesParams,
  GetProjectServicesQuery,
  GetProjectServicesResponse,
  GetRepositoryParams,
  GetRepositoryQuery,
  GetRepositoryResponse,
  RequestIssueFundingBody,
  RequestIssueFundingParams,
  RequestIssueFundingQuery,
  SetUserPreferredCurrencyBody,
  SetUserPreferredCurrencyParams,
  SetUserPreferredCurrencyQuery,
  SetUserPreferredCurrencyResponse,
} from "src/dtos";
import { handleError, projectPath } from "./index";
import axios from "axios";
import { GetAvailableDowParams, GetAvailableDowQuery } from "src/dtos/user/GetAvailableDow";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { StatusCodes } from "http-status-codes";
import { pekkoMaintainers } from "./data";
import { pekkoGetProjectServicesResponse } from "./data/getProjectServiceResponses";
import { oseMaintainers } from "./data/maintainers/oseMaintainers";

export function getBackendAPI(): BackendAPI {
  if (config.api.useMock) {
    return new BackendAPIMock();
  } else {
    return new BackendAPIImpl();
  }
}

export interface BackendAPI {
  /* Getters */

  getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue | ApiError>;

  getAllFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[] | ApiError>;

  getAvailableDow(params: GetAvailableDowParams, query: GetAvailableDowQuery): Promise<Decimal | ApiError>;

  /**
   * Funds a specific issue.
   * @returns
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(params: FundIssueParams, body: FundIssueBody, query: FundIssueQuery): Promise<void | ApiError>;

  /**
   * Request or approve funding for an issue.
   *
   * @throws {Error} If the issue is already got requested funding.
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   */
  requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void | ApiError>;

  getOwner(params: GetOwnerParams, query: GetOwnerQuery): Promise<GetOwnerResponse | ApiError>;

  getRepository(params: GetRepositoryParams, query: GetRepositoryQuery): Promise<GetRepositoryResponse | ApiError>;

  getProject(params: GetProjectParams, query: GetProjectQuery): Promise<GetProjectResponse | ApiError>;

  getMaintainers(params: GetMaintainersParams, query: GetMaintainersQuery): Promise<GetMaintainersResponse | ApiError>;

  getPrices(params: GetPricesParams, query: GetPricesQuery): Promise<GetPricesResponse | ApiError>;

  getCampaign(params: GetCampaignParams, query: GetCampaignQuery): Promise<GetCampaignResponse | ApiError>;

  checkout(params: CheckoutParams, body: CheckoutBody, query: CheckoutQuery): Promise<CheckoutResponse | ApiError>;

  setUserPreferredCurrency(
    params: SetUserPreferredCurrencyParams,
    body: SetUserPreferredCurrencyBody,
    query: SetUserPreferredCurrencyQuery,
  ): Promise<SetUserPreferredCurrencyResponse | ApiError>;

  getProjectServices(params: GetProjectServicesParams, query: GetProjectServicesQuery): Promise<GetProjectServicesResponse | ApiError>;
}

class BackendAPIImpl implements BackendAPI {
  async getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue | ApiError> {
    const response = await handleError<GetIssueResponse>(
      () => axios.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}/issues/${params.number}`, { withCredentials: true }),
      "getFinancialIssue",
    );

    if (response instanceof ApiError) return response;
    else return response.issue;
  }

  async getAllFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[] | ApiError> {
    const response = await handleError<GetIssuesResponse>(
      () => axios.get(`${config.api.url}/github/all-financial-issues`, { withCredentials: true }),
      "getAllFinancialIssues",
    );
    if (response instanceof ApiError) return response;
    else return response.issues;
  }

  async getAvailableDow(params: GetAvailableDowParams, query: GetAvailableDowQuery): Promise<Decimal | ApiError> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    const response = await handleError<GetAvailableDowResponse>(
      () => axios.get(`${config.api.url}/user/available-dow?${queryParams}`, { withCredentials: true }),
      "getAvailableDow",
    );

    if (response instanceof ApiError) return response;
    else return new Decimal(response.dowAmount);
  }

  async fundIssue(params: FundIssueParams, body: FundIssueBody, query: FundIssueQuery): Promise<void | ApiError> {
    return handleError(
      () => axios.post(`${config.api.url}/github/repos/${params.owner}/${params.repo}/issues/${params.number}/funding`, body, { withCredentials: true }),
      "fundIssue",
    );
  }

  async requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void | ApiError> {
    return handleError(
      () =>
        axios.post(`${config.api.url}/github/repos/${params.owner}/${params.repo}/issues/${params.number}/funding/requests`, body, { withCredentials: true }),
      "requestFunding",
    );
  }

  async getOwner(params: GetOwnerParams, query: GetOwnerQuery): Promise<GetOwnerResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/github/owners/${params.owner}`, { withCredentials: true }), "getOwner");
  }

  async getRepository(params: GetRepositoryParams, query: GetRepositoryQuery): Promise<GetRepositoryResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}`, { withCredentials: true }), "getRepository");
  }

  async getProject(params: GetProjectParams, query: GetProjectQuery): Promise<GetProjectResponse | ApiError> {
    // Hacky, change when we will have time
    if (params.repo) {
      const p: GetRepositoryParams = { owner: params.owner, repo: params.repo };
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

  async getMaintainers(params: GetMaintainersParams, query: GetMaintainersQuery): Promise<GetMaintainersResponse | ApiError> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return { maintainers: pekkoMaintainers };
    } else if (params.owner === "open-source-economy") {
      return { maintainers: oseMaintainers };
    } else {
      return new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  }

  async getPrices(params: GetPricesParams, query: GetPricesQuery): Promise<GetPricesResponse | ApiError> {
    // const path = this.projectPath(params.projectId);
    // return handleError(() => axios.get(`${config.api.url}${path}/prices`, { withCredentials: true }), "getPrices");
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async getCampaign(params: GetCampaignParams, query: GetCampaignQuery): Promise<GetCampaignResponse | ApiError> {
    return handleError(
      () => axios.get(`${config.api.url}/github/${projectPath(params.owner, params.repo)}/campaigns`, { withCredentials: true }),
      "getCampaign",
    );
  }

  async checkout(params: CheckoutParams, body: CheckoutBody, query: CheckoutQuery): Promise<ApiError | CheckoutResponse> {
    return handleError(() => axios.post(`${config.api.url}/stripe/checkout`, body, { withCredentials: true }), "checkout");
  }

  async setUserPreferredCurrency(
    params: SetUserPreferredCurrencyParams,
    body: SetUserPreferredCurrencyBody,
    query: SetUserPreferredCurrencyQuery,
  ): Promise<SetUserPreferredCurrencyResponse | ApiError> {
    return handleError(
      () => axios.post(`${config.api.url}/user/preferred-currency/${params.currency}`, body, { withCredentials: true }),
      "getUserPreferredCurrency",
    );
  }

  async getProjectServices(params: GetProjectServicesParams, query: GetProjectServicesQuery): Promise<ApiError | GetProjectServicesResponse> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }
}
