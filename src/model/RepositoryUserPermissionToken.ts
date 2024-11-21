import { ValidationError, Validator } from "./error";
import { RepositoryId } from "./index";
import Decimal from "decimal.js";

export enum RepositoryUserRole {
  ADMIN = "admin",
  READ = "read",
}

export enum DowCurrency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export class RepositoryUserPermissionTokenId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  toString(): string {
    return this.uuid;
  }
}

export class RepositoryUserPermissionToken {
  id: RepositoryUserPermissionTokenId;
  userName: string | null;
  userEmail: string;
  userGithubOwnerLogin: string;
  token: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  dowRate: Decimal;
  dowCurrency: DowCurrency;
  expiresAt: Date;

  constructor(
    id: RepositoryUserPermissionTokenId,
    userName: string | null,
    userEmail: string,
    userGithubOwnerLogin: string,
    token: string,
    repositoryId: RepositoryId,
    repositoryUserRole: RepositoryUserRole,
    dowRate: Decimal,
    dowCurrency: DowCurrency,
    expiresAt: Date,
  ) {
    this.id = id;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userGithubOwnerLogin = userGithubOwnerLogin;
    this.token = token;
    this.repositoryId = repositoryId;
    this.repositoryUserRole = repositoryUserRole;
    this.dowRate = new Decimal(dowRate);
    this.dowCurrency = dowCurrency;
    this.expiresAt = expiresAt;
  }

  static fromBackend(row: any): RepositoryUserPermissionToken | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const userName = validator.optionalString("user_name");
    const userEmail = validator.requiredString("user_email");
    const userGithubOwnerLogin = validator.requiredString("user_github_owner_login");
    const token = validator.requiredString("token");
    const repositoryId = RepositoryId.fromBackendForeignKey(row);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }
    const repositoryUserRole = validator.requiredEnum("repository_user_role", Object.values(RepositoryUserRole) as RepositoryUserRole[]);
    const dowRate = validator.requiredDecimal("dow_rate");
    const dowCurrency = validator.requiredEnum("dow_currency", Object.values(DowCurrency) as DowCurrency[]);
    const expiresAt = validator.requiredDate("expires_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new RepositoryUserPermissionToken(
      new RepositoryUserPermissionTokenId(id),
      userName ?? null,
      userEmail,
      userGithubOwnerLogin,
      token,
      repositoryId,
      repositoryUserRole,
      dowRate,
      dowCurrency,
      expiresAt,
    );
  }
}
