import { ValidationError, Validator } from "./error";
import { Currency, RepositoryId } from "./index";
import Decimal from "decimal.js";

export enum RepositoryUserRole {
  ADMIN = "admin",
  READ = "read",
}

export class RepositoryUserPermissionTokenId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class RepositoryUserPermissionToken {
  id: RepositoryUserPermissionTokenId;
  userName: string | null;
  userEmail: string | null;
  userGithubOwnerLogin: string;
  token: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  dowRate: Decimal | null;
  dowCurrency: Currency | null;
  expiresAt: Date;
  hasBeenUsed: boolean; // TODO: not used for the moment

  constructor(
    id: RepositoryUserPermissionTokenId,
    userName: string | null,
    userEmail: string | null,
    userGithubOwnerLogin: string,
    token: string,
    repositoryId: RepositoryId,
    repositoryUserRole: RepositoryUserRole,
    dowRate: Decimal | null,
    dowCurrency: Currency | null,
    expiresAt: Date,
    hasBeenUsed: boolean,
  ) {
    this.id = id;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userGithubOwnerLogin = userGithubOwnerLogin;
    this.token = token;
    this.repositoryId = repositoryId;
    this.repositoryUserRole = repositoryUserRole;
    this.dowRate = dowRate;
    this.dowCurrency = dowCurrency;
    this.expiresAt = expiresAt;
    this.hasBeenUsed = hasBeenUsed;
  }

  static fromBackend(row: any): RepositoryUserPermissionToken | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const userName = validator.optionalString("user_name");
    const userEmail = validator.optionalString("user_email");
    const userGithubOwnerLogin = validator.requiredString("user_github_owner_login");
    const token = validator.requiredString("token");
    const repositoryId = RepositoryId.fromBackendForeignKey(row);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }
    const repositoryUserRole = validator.requiredEnum("repository_user_role", Object.values(RepositoryUserRole) as RepositoryUserRole[]);
    const dowRate = validator.optionalDecimal("dow_rate");
    const dowCurrency = validator.optionalEnum("dow_currency", Object.values(Currency) as Currency[]);
    const expiresAt = validator.requiredDate("expires_at");
    const hasBeenUsed = validator.requiredBoolean("has_been_used");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new RepositoryUserPermissionToken(
      new RepositoryUserPermissionTokenId(id),
      userName ?? null,
      userEmail ?? null,
      userGithubOwnerLogin,
      token,
      repositoryId,
      repositoryUserRole,
      dowRate ?? null,
      dowCurrency ?? null,
      expiresAt,
      hasBeenUsed,
    );
  }
}
