import { ValidationError, Validator } from "./error";
import { IssueId } from "./github";
import { UserId } from "./user";

export class IssueFundingId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class IssueFunding {
  id: IssueFundingId;
  githubIssueId: IssueId;
  userId: UserId;
  credit: number;

  constructor(id: IssueFundingId, githubIssueId: IssueId, userId: UserId, creditAmount: number) {
    this.id = id;
    this.githubIssueId = githubIssueId;
    this.userId = userId;
    this.credit = creditAmount;
  }

  static fromBackend(row: any): IssueFunding | ValidationError {
    const githubIssueId = IssueId.fromBackendForeignKey(row);
    if (githubIssueId instanceof ValidationError) {
      return githubIssueId;
    }

    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const userId = validator.requiredString("user_id");
    const amount = validator.requiredNumber("credit_amount");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new IssueFunding(new IssueFundingId(id), githubIssueId, new UserId(userId), amount);
  }
}
