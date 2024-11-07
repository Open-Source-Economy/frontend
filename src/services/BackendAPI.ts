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
import { API_URL, handleError } from "src/services/index";
import axios from "axios";
import { GetAvailableDowParams, GetAvailableDowQuery } from "src/dtos/user/GetAvailableDow";

export function getBackendAPI(): BackendAPI {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return new BackendAPIMock();
  } else {
    return new BackendAPIImpl();
  }
}

export interface BackendAPI {
  /* Getters */

  getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue>;

  getFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[]>;

  getAvailableDow(params: GetAvailableDowParams, query: GetAvailableDowQuery): Promise<Decimal>;

  /**
   * Funds a specific issue.
   * @returns
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(params: FundIssueParams, body: FundIssueBody, query: FundIssueQuery): Promise<void>;

  /**
   * Request or approve funding for an issue.
   *
   * @throws {Error} If the issue is already got requested funding.
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   */
  requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void>;

  /**
   * Reject funding for an issue.
   * @param userId
   * @param issueId
   */
  rejectFunding(userId: UserId, issueId: IssueId): Promise<void>;

  // TODO: define UserId. could be email or id or github profile
  // TODO: dust remaining?
  splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void>;

  // TODO: maybe internal to the backend?
  updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void>;
}

class BackendAPIImpl implements BackendAPI {
  async getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue> {
    const response = await handleError<GetIssueResponse>(
      () => axios.get(`${API_URL}/github/${params.owner}/${params.repo}/issues/${params.number}`, { withCredentials: true }),
      "getFinancialIssue",
    );
    return response.issue;
  }

  async getFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[]> {
    const response = await handleError<GetIssuesResponse>(() => axios.get(`${API_URL}/github/issues`, { withCredentials: true }), "getFinancialIssues");
    return response.issues;
  }

  async getAvailableDow(params: GetAvailableDowParams, query: GetAvailableDowQuery): Promise<Decimal> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    const response = await handleError<GetAvailableDowResponse>(
      () => axios.get(`${API_URL}/user/available-dow?${queryParams}`, { withCredentials: true }),
      "getAvailableDow",
    );

    return new Decimal(response.dowAmount);
  }

  async fundIssue(params: FundIssueParams, body: FundIssueBody, query: FundIssueQuery): Promise<void> {
    return handleError(
      () => axios.post(`${API_URL}/github/${params.owner}/${params.repo}/issues/${params.number}/fund`, body, { withCredentials: true }),
      "fundIssue",
    );
  }

  async rejectFunding(userId: UserId, issueId: IssueId): Promise<void> {
    return Promise.resolve(undefined);
  }

  async requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void> {
    return handleError(
      () => axios.post(`${API_URL}/github/${params.owner}/${params.repo}/issues/${params.number}/request-funding`, body, { withCredentials: true }),
      "requestFunding",
    );
  }

  async splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void> {
    return Promise.resolve(undefined);
  }

  async updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
