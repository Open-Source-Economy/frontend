import * as model from "./index";
import Decimal from "decimal.js";

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

  // TODO: Why static? Because in the frontend the parsing of the object does not work.
  //   async getFinancialIssue(query: GetIssueQuery): Promise<FinancialIssue> {
  //     const response = await handleError<GetIssueResponse>(
  //       () => axios.get(`${API_URL}/github/${query.owner}/${query.repo}/issues/${query.number}`, { withCredentials: true }),
  //       "getFinancialIssue",
  //     );
  //     response.issue.isClosed(); // ERROR
  //     return response.issue;
  //   }

  static amountCollected(m: FinancialIssue): Decimal {
    // @ts-ignore
    return m.issueFundings?.reduce((acc, funding) => acc.plus(funding.dowAmount), new Decimal(0)) ?? new Decimal(0);
  }

  static amountRequested(m: FinancialIssue): Decimal | undefined {
    return m.managedIssue?.requestedDowAmount;
  }

  static successfullyFunded(m: FinancialIssue): boolean {
    const amountRequested = FinancialIssue.amountRequested(m);
    if (amountRequested === undefined) return false;
    else return FinancialIssue.amountCollected(m).greaterThanOrEqualTo(amountRequested);
  }

  static isClosed(m: FinancialIssue): boolean {
    return m.managedIssue?.state === model.ManagedIssueState.REJECTED || m.managedIssue?.state === model.ManagedIssueState.SOLVED;
  }

  static id(m: FinancialIssue): string {
    return `${m.owner.id}/${m.repository.id}/${m.issue.id.number}`;
  }
}
