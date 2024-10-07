import { FinancialIssue, IssueId, UserId } from "../model";
import Decimal from "decimal.js";
import { BackendAPIMock } from "src/__tests__/__mocks__";

export function getBackendAPI(): BackendAPI {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return new BackendAPIMock();
  } else {
    return new BackendAPIImpl();
  }
}

export interface BackendAPI {
  /**
   * Funds a specific issue.
   *
   * @param userId The id of the user who wants to fund the issue.
   * @param issueId The id of the issue to be funded.
   * @param amount The amount to be funded, unit: DoW.
   * @returns
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(userId: UserId, issueId: IssueId, amount: Decimal): Promise<void>;

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

  login(): Promise<void>;

  // TODO: maybe internal to the backend?
  updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void>;

  // TODO: can we store data from GitHub API?

  /* Getters */

  getIssueFundingAmount(issueId: IssueId): Promise<number>;

  getFinancialIssue(ownerParam: string, repoParam: string, number: number): Promise<FinancialIssue>;

  getFinancialIssues(): Promise<FinancialIssue[]>;
}

class BackendAPIImpl implements BackendAPI {
  async fundIssue(userId: UserId, issueId: IssueId, amount: Decimal): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getIssueFundingAmount(issueId: IssueId): Promise<number> {
    return Promise.resolve(0);
  }

  async login(): Promise<void> {
    return Promise.resolve(undefined);
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

  async getFinancialIssue(ownerParam: string, repoParam: string, number: number): Promise<FinancialIssue> {
    return Promise.resolve(undefined as any);
  }

  async getFinancialIssues(): Promise<FinancialIssue[]> {
    return Promise.resolve(undefined as any);
  }
}
