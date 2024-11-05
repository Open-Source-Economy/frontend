import { IssueId, UserId } from "../model";
import Decimal from "decimal.js";

// TODO: move something else
export interface CreateIssueFundingBody {
  githubIssueId: IssueId;
  userId: UserId;
  downAmount: Decimal;
}
