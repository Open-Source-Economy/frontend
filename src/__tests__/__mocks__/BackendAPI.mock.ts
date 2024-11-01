import {
  CompanyId,
  ContributorVisibility,
  Email,
  FinancialIssue,
  GithubData,
  Issue,
  IssueFunding,
  IssueFundingId,
  IssueId,
  ManagedIssue,
  ManagedIssueId,
  ManagedIssueState,
  Owner,
  OwnerId,
  OwnerType,
  Provider,
  Repository,
  RepositoryId,
  ThirdPartyUser,
  ThirdPartyUserId,
  User,
  UserId,
  UserRole,
} from "src/model";
import { BackendAPI } from "src/services";
import Decimal from "decimal.js";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(ownerParam: string, repoParam: string, number: number): Promise<FinancialIssue> {
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
          financialIssue = new FinancialIssue(owner, repository, issue, user, managedIssue);
        } else {
          financialIssue = new FinancialIssue(owner, repository, issue, user, managedIssue, [issueFunding((requestedDowAmount / 2) * i)]);
        }
        financialIssues.push(financialIssue);
      }
    }
    return financialIssues;
  }

  async getAvailableDoWs(userId: UserId, companyId?: CompanyId): Promise<number> {
    return Promise.resolve(2);
  }

  async fundIssue(userId: UserId, issueId: IssueId, amount: Decimal): Promise<void> {
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

const userId = new UserId("141809342");
const ownerId = new OwnerId("Open-Source-Economy", 141809657);
const repositoryId = new RepositoryId(ownerId, "frontend", 701996033);
const issueId = new IssueId(repositoryId, 3, 2538344642);

const owner = new Owner(ownerId, OwnerType.Organization, "https://github.com/Open-Source-Economy", "https://avatars.githubusercontent.com/u/141809657?v=4");

const repository = new Repository(repositoryId, "https://github.com/Open-Source-Economy/frontend", undefined);

const issue = new Issue(
  issueId,
  "Test issue - to be added in our unit tests",
  "https://github.com/Open-Source-Economy/frontend/issues/3",
  new Date("2024-09-20T09:34:07Z"),
  null,
  new OwnerId("LaurianeOSE", 141809342),
  undefined,
);

const thirdPartyUser = new ThirdPartyUser(Provider.Github, new ThirdPartyUserId("141809342"), [new Email("email", null)], new GithubData(owner));

const user = new User(userId, thirdPartyUser, UserRole.USER);

function issueFunding(amount: number): IssueFunding {
  return new IssueFunding(new IssueFundingId(Math.random().toString()), issueId, userId, amount);
}

function allManagedIssues(requestedDowAmount: number): ManagedIssue[] {
  const allManagedIssues: ManagedIssue[] = [];

  for (const visibility of Object.values(ContributorVisibility)) {
    for (const state of Object.values(ManagedIssueState)) {
      const managedIssue: ManagedIssue = {
        id: new ManagedIssueId(Math.random().toString()),
        githubIssueId: issueId,
        requestedDowAmount: requestedDowAmount,
        managerId: userId,
        contributorVisibility: visibility,
        state: state,
      };
      allManagedIssues.push(managedIssue);
    }
  }

  return allManagedIssues;
}
