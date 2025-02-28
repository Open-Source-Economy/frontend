import { IssueId, UserId } from "../model";

// TODO: move something else
export interface CreateIssueFundingBody {
  githubIssueId: IssueId;
  userId: UserId;
  creditAmount: number;
}
