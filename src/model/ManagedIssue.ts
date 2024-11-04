import { ValidationError, Validator } from "./error";
import { IssueId, UserId } from "./index";
import Decimal from "decimal.js";

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
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class ManagedIssue {
  id: ManagedIssueId;
  githubIssueId: IssueId;
  requestedDowAmount: Decimal;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;

  constructor(
    id: ManagedIssueId,
    githubIssueId: IssueId,
    requestedDowAmount: Decimal,
    managerId: UserId, // TODO: need to change to User
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
    const id = validator.requiredString("id");
    const requestedDowAmount = validator.requiredDecimal("requested_dow_amount");
    const managerId = validator.requiredString("manager_id");
    const contributorVisibility = validator.requiredEnum("contributor_visibility", Object.values(ContributorVisibility) as ContributorVisibility[]);
    const state = validator.requiredEnum("state", Object.values(ManagedIssueState) as ManagedIssueState[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new ManagedIssue(new ManagedIssueId(id), githubIssueId, requestedDowAmount, new UserId(managerId), contributorVisibility, state);
  }
}
