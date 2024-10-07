import { ValidationError, Validator } from "./utils";
import { IssueId, User } from "./index";

export enum ContributorVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum ManagedIssueState {
  OPEN = "open",
  REJECTED = "rejected",
  SOLVED = "solved",
}

export class ManagedIssueId {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class ManagedIssue {
  id: ManagedIssueId;
  githubIssueId: IssueId;
  requestedDowAmount: number;
  managerId: User;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;

  constructor(
    id: ManagedIssueId,
    githubIssueId: IssueId,
    requestedDowAmount: number,
    managerId: User,
    contributorVisibility: ContributorVisibility,
    state: ManagedIssueState,
  ) {
    this.id = id;
    this.githubIssueId = githubIssueId;
    this.requestedDowAmount = requestedDowAmount;
    this.managerId = managerId;
    this.contributorVisibility = contributorVisibility;
    this.state = state;
  }

  static fromBackend(row: any): ManagedIssue | ValidationError {
    const githubIssueId = IssueId.fromBackendForeignKey(row);
    if (githubIssueId instanceof ValidationError) {
      return githubIssueId;
    }

    const validator = new Validator(row);
    const id = validator.requiredNumber("id");
    const requestedDowAmount = validator.requiredNumber("requested_dow_amount");
    const managerId = validator.requiredNumber("manager_id");
    const contributorVisibility = validator.requiredEnum("contributor_visibility", Object.values(ContributorVisibility) as ContributorVisibility[]);
    const state = validator.requiredEnum("state", Object.values(ManagedIssueState) as ManagedIssueState[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new ManagedIssue(
      new ManagedIssueId(id),
      githubIssueId,
      requestedDowAmount,
      // @ts-ignore
      managerId,
      contributorVisibility,
      state,
    );
  }
}
