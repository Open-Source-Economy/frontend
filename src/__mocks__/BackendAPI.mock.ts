import {
  CompanyId,
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
import { FundIssueBody, FundIssueQuery, GetIssueQuery } from "src/dtos";
import { issue, issueId, owner, repository, user, userId } from "src/__mocks__/index";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(query: GetIssueQuery): Promise<FinancialIssue> {
    const financialIssues = await this.getFinancialIssues();
    return financialIssues[0];
  }

  async getFinancialIssues(): Promise<FinancialIssue[]> {
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

  async getAvailableDoWs(userId: UserId, companyId?: CompanyId): Promise<Decimal> {
    return Promise.resolve(new Decimal(2));
  }

  async fundIssue(body: FundIssueBody, query: FundIssueQuery): Promise<void> {
    return Promise.resolve(undefined);
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
