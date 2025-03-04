import * as model from "./index";

export class FinancialIssue {
  public owner: model.Owner;
  public repository: model.Repository;
  public issue: model.Issue;
  public issueManager: model.User | null;
  public managedIssue: model.ManagedIssue | null;
  public issueFundings: model.IssueFunding[];

  constructor(
    owner: model.Owner,
    repository: model.Repository,
    issue: model.Issue,
    issueManager: model.User | null,
    managedIssue: model.ManagedIssue | null,
    issueFundings: model.IssueFunding[],
  ) {
    this.owner = owner;
    this.repository = repository;
    this.issue = issue;
    this.issueManager = issueManager;
    this.managedIssue = managedIssue;
    this.issueFundings = issueFundings;
  }
}

export const financialIssueUtils = {
  amountCollected(m: FinancialIssue): number {
    return m.issueFundings?.reduce((acc, funding) => acc + funding.credit, 0) ?? 0;
  },

  amountRequested(m: FinancialIssue): number | undefined {
    if (m.managedIssue?.requestedCreditAmount) {
      return m.managedIssue?.requestedCreditAmount || 0;
    } else {
      return undefined;
    }
  },

  successfullyFunded(m: FinancialIssue): boolean {
    const amountRequested = financialIssueUtils.amountRequested(m);
    if (amountRequested === undefined) return false;

    return financialIssueUtils.amountCollected(m) >= amountRequested;
  },

  isClosed(m: FinancialIssue): boolean {
    return m.managedIssue?.state === model.ManagedIssueState.REJECTED || m.managedIssue?.state === model.ManagedIssueState.SOLVED;
  },

  id(m: FinancialIssue): string {
    return `${m.owner.id}/${m.repository.id}/${m.issue.id.number}`;
  },
};
