import { FinancialIssue, IssueId, UserId } from "../model";
import Decimal from "decimal.js";
import { BackendAPIMock } from "src/__mocks__";
import {
  FundIssueBody,
  FundIssueParams,
  FundIssueQuery,
  GetAvailableDowResponse,
  GetIssueParams,
  GetIssueQuery,
  GetIssueResponse,
  GetIssuesParams,
  GetIssuesResponse,
  RequestIssueFundingBody,
  RequestIssueFundingParams,
  RequestIssueFundingQuery,
} from "src/dtos";
import { handleError } from "src/services/index";
import axios from "axios";
import { GetAvailableDowParams, GetAvailableDowQuery } from "src/dtos/user/GetAvailableDow";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";

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

  getFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[] | ApiError>;

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
}

class BackendAPIImpl implements BackendAPI {
  async getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue | ApiError> {
    const response = await handleError<GetIssueResponse>(
      () => axios.get(`${config.api.url}/github/${params.owner}/${params.repo}/issues/${params.number}`, { withCredentials: true }),
      "getFinancialIssue",
    );

    if (response instanceof ApiError) return response;
    else return response.issue;
  }

  async getFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[] | ApiError> {
    const response = await handleError<GetIssuesResponse>(() => axios.get(`${config.api.url}/github/issues`, { withCredentials: true }), "getFinancialIssues");
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
      () => axios.post(`${config.api.url}/github/${params.owner}/${params.repo}/issues/${params.number}/fund`, body, { withCredentials: true }),
      "fundIssue",
    );
  }

  async rejectFunding(userId: UserId, issueId: IssueId): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void | ApiError> {
    return handleError(
      () => axios.post(`${config.api.url}/github/${params.owner}/${params.repo}/issues/${params.number}/request-funding`, body, { withCredentials: true }),
      "requestFunding",
    );
  }

  async splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }
}
