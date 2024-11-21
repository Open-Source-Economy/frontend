import { ValidationError, Validator } from "./error";
import { RepositoryId, RepositoryUserRole, UserId } from "./index";
import Decimal from "decimal.js";

export class UserRepository {
  userId: UserId;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  dowRate: Decimal;
  dowCurrency: string;

  constructor(userId: UserId, repositoryId: RepositoryId, repositoryUserRole: RepositoryUserRole, dowRate: Decimal, dowCurrency: string) {
    this.userId = userId;
    this.repositoryId = repositoryId;
    this.repositoryUserRole = repositoryUserRole;
    this.dowRate = dowRate;
    this.dowCurrency = dowCurrency;
  }

  static fromBackend(row: any): UserRepository | ValidationError {
    const validator = new Validator(row);
    const userId = validator.requiredString("user_id");
    const repositoryId = RepositoryId.fromBackendForeignKey(row);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }
    const repositoryUserRole = validator.requiredEnum("repository_user_role", Object.values(RepositoryUserRole) as RepositoryUserRole[]);
    const dowRate = validator.requiredNumber("dow_rate");
    const dowCurrency = validator.requiredString("dow_currency");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new UserRepository(
      new UserId(userId),
      repositoryId,
      repositoryUserRole,
      new Decimal(dowRate), // TODO: improve
      dowCurrency,
    );
  }
}
