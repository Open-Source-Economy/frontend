import { ValidationError, Validator } from "./error";
import { Currency, RepositoryId, RepositoryUserRole, UserId } from "./index";
import Decimal from "decimal.js";

export class UserRepository {
  userId: UserId;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  rate: Decimal | null;
  currency: Currency | null;

  constructor(userId: UserId, repositoryId: RepositoryId, repositoryUserRole: RepositoryUserRole, rate: Decimal | null, currency: Currency | null) {
    this.userId = userId;
    this.repositoryId = repositoryId;
    this.repositoryUserRole = repositoryUserRole;
    this.rate = rate;
    this.currency = currency;
  }

  static fromBackend(row: any): UserRepository | ValidationError {
    const validator = new Validator(row);
    const userId = validator.requiredString("user_id");
    const repositoryId = RepositoryId.fromBackendForeignKey(row);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }
    const repositoryUserRole = validator.requiredEnum("repository_user_role", Object.values(RepositoryUserRole) as RepositoryUserRole[]);
    const rate = validator.optionalDecimal("rate");
    const currency = validator.optionalEnum("currency", Object.values(Currency) as Currency[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new UserRepository(new UserId(userId), repositoryId, repositoryUserRole, rate ?? null, currency ?? null);
  }
}
