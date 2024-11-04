import { CompanyId, FinancialIssue, IssueId, UserId } from "../model";
import Decimal from "decimal.js";
import { BackendAPIMock } from "src/__mocks__";
import { FundIssueBody, FundIssueQuery, GetIssueQuery, GetIssueResponse } from "src/dtos";
import { API_URL, handleError } from "src/services/index";
import axios from "axios";

export function getBackendAPI(): BackendAPI {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return new BackendAPIMock();
  } else {
    return new BackendAPIImpl();
  }
}

export interface BackendAPI {
  /* Getters */

  getFinancialIssue(query: GetIssueQuery): Promise<FinancialIssue>;

  getFinancialIssues(): Promise<FinancialIssue[]>;

  getAvailableDoWs(userId: UserId, companyId?: CompanyId): Promise<Decimal>;

  /**
   * Funds a specific issue.
   * @returns
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(body: FundIssueBody, query: FundIssueQuery): Promise<void>;

  /**
   * Request or approve funding for an issue.
   * @param userId
   * @param issueId
   * @param amount
   * @returns
   *
   * @throws {Error} If the issue is already got requested funding.
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   */
  requestFunding(userId: UserId, issueId: IssueId, amount: Decimal): Promise<void>;

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
  async getFinancialIssue(query: GetIssueQuery): Promise<FinancialIssue> {
    const response = await handleError<GetIssueResponse>(
      () => axios.get(`${API_URL}/github/${query.owner}/${query.repo}/issues/${query.number}`, { withCredentials: true }),
      "getFinancialIssue",
    );
    return response.issue;
  }

  async getFinancialIssues(): Promise<FinancialIssue[]> {
    return Promise.resolve(undefined as any);
  }

  async getAvailableDoWs(userId: UserId, companyId?: CompanyId): Promise<Decimal> {
    return Promise.resolve(undefined as any);
  }

  async fundIssue(body: FundIssueBody, query: FundIssueQuery): Promise<void> {
    return handleError(
      () => axios.post(`${API_URL}/github/${query.owner}/${query.repo}/issues/${query.number}/fund`, body, { withCredentials: true }),
      "fundIssue",
    );
  }

  async rejectFunding(userId: UserId, issueId: IssueId): Promise<void> {
    return Promise.resolve(undefined);
  }

  async requestFunding(userId: UserId, issueId: IssueId, amount: Decimal): Promise<void> {
    return Promise.resolve(undefined);
  }

  async splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void> {
    return Promise.resolve(undefined);
  }

  async updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
