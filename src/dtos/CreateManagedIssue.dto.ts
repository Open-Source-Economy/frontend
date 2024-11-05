import { ContributorVisibility, IssueId, ManagedIssueState, UserId } from "../model/";
import Decimal from "decimal.js";

export interface CreateManagedIssueBody {
  githubIssueId: IssueId;
  requestedDowAmount: Decimal;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;
}
