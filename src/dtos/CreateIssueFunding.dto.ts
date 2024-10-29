import { IssueId, UserId } from "../model";

export interface CreateIssueFundingBodyParams {
  githubIssueId: IssueId;
  userId: UserId;
  downAmount: number;
}
