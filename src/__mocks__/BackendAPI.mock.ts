import {
  ContributorVisibility,
  FinancialIssue,
  IssueFunding,
  IssueFundingId,
  IssueId,
  ManagedIssue,
  ManagedIssueId,
  ManagedIssueState,
  UserId,
} from "src/model";
import { BackendAPI } from "src/services";
import Decimal from "decimal.js";
import {
  FundIssueBody,
  FundIssueParams,
  FundIssueQuery,
  GetIssueParams,
  GetIssueQuery,
  GetIssuesParams,
  RequestIssueFundingBody,
  RequestIssueFundingParams,
  RequestIssueFundingQuery,
} from "src/dtos";
import { issue, issueId, owner, repository, user, userId } from "src/__mocks__/index";
import { GetAvailableDowParams, GetAvailableDowQuery } from "src/dtos/user/GetAvailableDow";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue> {
    const financialIssues = await this.getFinancialIssues({}, {});
    return financialIssues[0];
  }

  async getFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[]> {
    const financialIssues: FinancialIssue[] = [];

    const requestedDowAmount = 12;

    for (const managedIssue of allManagedIssues(requestedDowAmount)) {
      for (let i = 0; i < 4; i++) {
        let financialIssue: FinancialIssue;
        if (i === 0) {
          financialIssue = new FinancialIssue(owner, repository, issue, user, managedIssue, []);
        } else {
          financialIssue = new FinancialIssue(owner, repository, issue, user, managedIssue, [issueFunding((requestedDowAmount / 2) * i)]);
        }
        financialIssues.push(financialIssue);
      }
    }
    return financialIssues;
  }

  async getAvailableDow(params: GetAvailableDowParams, query: GetAvailableDowQuery): Promise<Decimal> {
    return Promise.resolve(new Decimal(2));
  }

  async fundIssue(params: FundIssueParams, body: FundIssueBody, query: FundIssueQuery): Promise<void> {
    return Promise.resolve(undefined);
  }

  async login(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async rejectFunding(userId: UserId, issueId: IssueId): Promise<void> {
    return Promise.resolve(undefined);
  }

  async requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void> {
    return Promise.resolve(undefined);
  }

  async splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void> {
    return Promise.resolve(undefined);
  }

  async updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}

function issueFunding(amount: number): IssueFunding {
  return new IssueFunding(new IssueFundingId(Math.random().toString()), issueId, userId, new Decimal(amount));
}

function allManagedIssues(requestedDowAmount: number): ManagedIssue[] {
  const allManagedIssues: ManagedIssue[] = [];

  for (const visibility of Object.values(ContributorVisibility)) {
    for (const state of Object.values(ManagedIssueState)) {
      const managedIssue: ManagedIssue = {
        id: new ManagedIssueId(Math.random().toString()),
        githubIssueId: issueId,
        requestedDowAmount: new Decimal(requestedDowAmount),
        managerId: userId,
        contributorVisibility: visibility,
        state: state,
      };
      allManagedIssues.push(managedIssue);
    }
  }

  return allManagedIssues;
}
