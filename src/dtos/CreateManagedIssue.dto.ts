import { ContributorVisibility, IssueId, ManagedIssueState, UserId } from "../model/";

// TODO: put that somewhere else
export interface CreateManagedIssueBody {
  githubIssueId: IssueId;
  requestedCreditAmount: number | null;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;
}
