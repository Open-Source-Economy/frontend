import { IssueId, UserId } from "../model";

export interface CreateIssueFundingBody {
  githubIssueId: IssueId;
  userId: UserId;
  downAmount: number;
}
