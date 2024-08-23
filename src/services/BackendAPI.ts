import { Funder, IssueId } from "../model";

interface BackendAPI {
  fundIssue(issueId: IssueId, funder: Funder, amount: number): Promise<void>;

  // Maintainer

  getIssueFundingAmount(issueId: IssueId): Promise<number>;
}
