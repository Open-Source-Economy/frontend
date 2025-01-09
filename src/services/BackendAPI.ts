import { FinancialIssue, IssueId, UserId } from "../model";
import Decimal from "decimal.js";
import { BackendAPIMock } from "src/__mocks__";
import {
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
  GetRepositoryParams,
  GetRepositoryQuery,
  GetRepositoryResponse,
  RequestIssueFundingBody,
  RequestIssueFundingParams,
  RequestIssueFundingQuery,
} from "src/dtos";
import { handleError } from "./index";
import axios from "axios";
import { GetAvailableDowParams, GetAvailableDowQuery } from "src/dtos/user/GetAvailableDow";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { StatusCodes } from "http-status-codes";
import { pekkoMaintainers } from "./data";

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

  /**
   * Reject funding for an issue.
   * @param userId
   * @param issueId
   */
  rejectFunding(userId: UserId, issueId: IssueId): Promise<void | ApiError>;

  // TODO: define UserId. could be email or id or github profile
  // TODO: dust remaining?
  splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void | ApiError>;

  // TODO: maybe internal to the backend?
  updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void | ApiError>;

  getOwner(params: GetOwnerParams, query: GetOwnerQuery): Promise<GetOwnerResponse | ApiError>;

  getRepository(params: GetRepositoryParams, query: GetRepositoryQuery): Promise<GetRepositoryResponse | ApiError>;

  getMaintainers(params: GetMaintainersParams, query: GetMaintainersQuery): Promise<GetMaintainersResponse | ApiError>;

  getPrices(params: GetPricesParams, query: GetPricesQuery): Promise<GetPricesResponse | ApiError>;

  getCampaign(params: GetCampaignParams, query: GetCampaignQuery): Promise<GetCampaignResponse | ApiError>;
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
      "getAllFinancialIssues"
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

  async rejectFunding(userId: UserId, issueId: IssueId): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void | ApiError> {
    return handleError(
      () => axios.post(`${config.api.url}/github/repos/${params.owner}/${params.repo}/issues/${params.number}/funding/requests`, body, { withCredentials: true }),
      "requestFunding",
    );
  }

  async splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void | ApiError> {
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void | ApiError> {
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async getOwner(params: GetOwnerParams, query: GetOwnerQuery): Promise<GetOwnerResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/github/owners/${params.owner}`, { withCredentials: true }), "getOwner");
  }

  async getRepository(params: GetRepositoryParams, query: GetRepositoryQuery): Promise<GetRepositoryResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}`, { withCredentials: true }), "getRepository");
  }

  async getMaintainers(params: GetMaintainersParams, query: GetMaintainersQuery): Promise<GetMaintainersResponse | ApiError> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return { maintainers: pekkoMaintainers };
    }
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async getPrices(params: GetPricesParams, query: GetPricesQuery): Promise<GetPricesResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}/prices`, { withCredentials: true }), "getPrices");
  }

  async getCampaign(params: GetCampaignParams, query: GetCampaignQuery): Promise<GetCampaignResponse | ApiError> {
    return handleError(() => axios.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}/campaigns`, { withCredentials: true }), "getCampaign");
  }
}
