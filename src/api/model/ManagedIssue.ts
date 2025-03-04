import { ValidationError, Validator } from "./error";
import { IssueId, UserId } from "./index";

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
  requestedCreditAmount: number | null;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;

  constructor(
    id: ManagedIssueId,
    githubIssueId: IssueId,
    requestedCreditAmount: number | null,
    managerId: UserId,
    contributorVisibility: ContributorVisibility,
    state: ManagedIssueState,
  ) {
    this.id = id;
    this.githubIssueId = githubIssueId;
    this.requestedCreditAmount = requestedCreditAmount;
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
    const requestedCreditAmount = validator.optionalNumber("requested_credit_amount");
    const managerId = validator.requiredString("manager_id");
    const contributorVisibility = validator.requiredEnum("contributor_visibility", Object.values(ContributorVisibility) as ContributorVisibility[]);
    const state = validator.requiredEnum("state", Object.values(ManagedIssueState) as ManagedIssueState[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new ManagedIssue(new ManagedIssueId(id), githubIssueId, requestedCreditAmount ?? null, new UserId(managerId), contributorVisibility, state);
  }
}
