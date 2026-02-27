import * as dto from "@open-source-economy/api-types";
import { FundingService } from "src/services/funding.service";
import { issue, issueId, owner, repository, userId } from "./index";

export const fundingServiceMock: FundingService = {
  async getFinancialIssue(_params, _query) {
    const financialIssues = await this.getAllFinancialIssues({}, {});
    return financialIssues[0];
  },

  async getAllFinancialIssues(_params, _query) {
    const financialIssues: dto.FinancialIssue[] = [];

    const requestedCreditAmount = 12;

    for (const managedIssue of allManagedIssues(requestedCreditAmount)) {
      for (let i = 0; i < 4; i++) {
        let financialIssue: dto.FinancialIssue;
        if (i === 0) {
          financialIssue = {
            owner: owner,
            repository: repository(),
            issue: issue,
            managedIssue: managedIssue,
            issueFundings: [],
          };
        } else {
          financialIssue = {
            owner: owner,
            repository: repository(),
            issue: issue,
            managedIssue: managedIssue,
            issueFundings: [issueFunding((requestedCreditAmount / 2) * i)],
          };
        }
        financialIssues.push(financialIssue);
      }
    }
    return financialIssues;
  },

  async getAvailableCredits(_params, _query) {
    return Promise.resolve({ creditAmount: 60 });
  },

  async fundIssue(_params, _body, _query) {
    return Promise.resolve(undefined);
  },

  async requestFunding(_params, _body, _query) {
    return Promise.resolve(undefined);
  },
};

function issueFunding(amount: number): dto.IssueFunding {
  return {
    id: Math.random().toString() as dto.IssueFundingId,
    githubIssueId: issueId,
    userId: userId,
    credit: amount,
  };
}

function allManagedIssues(requestedCreditAmount: number): dto.ManagedIssue[] {
  const allManagedIssues: dto.ManagedIssue[] = [];

  for (const visibility of Object.values(dto.ContributorVisibility)) {
    for (const state of Object.values(dto.ManagedIssueState)) {
      const managedIssue: dto.ManagedIssue = {
        id: Math.random().toString() as dto.ManagedIssueId,
        githubIssueId: issueId,
        requestedCreditAmount: requestedCreditAmount,
        managerId: userId,
        contributorVisibility: visibility,
        state: state,
      };
      allManagedIssues.push(managedIssue);
    }
  }

  return allManagedIssues;
}
