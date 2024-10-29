import { ContributorVisibility, IssueId, ManagedIssueState, UserId } from "../model/";

export interface CreateManagedIssueBodyParams {
  githubIssueId: IssueId;
  requestedDowAmount: number;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;
}
