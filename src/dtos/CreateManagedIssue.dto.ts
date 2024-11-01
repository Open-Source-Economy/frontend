import { ContributorVisibility, IssueId, ManagedIssueState, UserId } from "../model/";

export interface CreateManagedIssueBody {
  githubIssueId: IssueId;
  requestedDowAmount: number;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;
}
