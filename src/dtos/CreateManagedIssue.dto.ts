import { ContributorVisibility, IssueId, ManagedIssueState, UserId } from "../model/";
import Decimal from "decimal.js";

// TODO: put that somewhere else
export interface CreateManagedIssueBody {
  githubIssueId: IssueId;
  requestedDowAmount: Decimal;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;
}
