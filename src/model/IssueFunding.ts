import { ValidationError, Validator } from "./error";
import { IssueId } from "./github";
import { UserId } from "./user";

export class IssueFundingId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  toString(): string {
    return this.uuid;
  }
}

export class IssueFunding {
  id: IssueFundingId;
  githubIssueId: IssueId;
  userId: UserId;
  dowAmount: number;

  constructor(id: IssueFundingId, githubIssueId: IssueId, userId: UserId, amount: number) {
    this.id = id;
    this.githubIssueId = githubIssueId;
    this.userId = userId;
    this.dowAmount = amount;
  }

  static fromBackend(row: any): IssueFunding | ValidationError {
    const githubIssueId = IssueId.fromBackendForeignKey(row);
    if (githubIssueId instanceof ValidationError) {
      return githubIssueId;
    }

    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const userId = validator.requiredString("user_id");
    const amount = validator.requiredNumber("dow_amount");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new IssueFunding(new IssueFundingId(id), githubIssueId, new UserId(userId), amount);
  }
}
