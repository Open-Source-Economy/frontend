import { ValidationError, Validator } from "./error";
import { Currency, RepositoryId, RepositoryUserRole, UserId } from "./index";
import Decimal from "decimal.js";

export class UserRepository {
  userId: UserId;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  dowRate: Decimal | null;
  dowCurrency: Currency | null;

  constructor(userId: UserId, repositoryId: RepositoryId, repositoryUserRole: RepositoryUserRole, dowRate: Decimal | null, dowCurrency: Currency | null) {
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
    const dowRate = validator.optionalDecimal("dow_rate");
    const dowCurrency = validator.optionalEnum("dow_currency", Object.values(Currency) as Currency[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new UserRepository(new UserId(userId), repositoryId, repositoryUserRole, dowRate ?? null, dowCurrency ?? null);
  }
}
