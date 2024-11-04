import { ValidationError, Validator } from "./error";
import { CompanyId } from "./index";

export enum CompanyUserRole {
  ADMIN = "admin",
  SUGGEST = "suggest",
  READ = "read",
}

export class CompanyUserPermissionTokenId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  toString(): string {
    return this.uuid;
  }
}

export class CompanyUserPermissionToken {
  id: CompanyUserPermissionTokenId;
  userName: string | null;
  userEmail: string;
  token: string;
  companyId: CompanyId;
  companyUserRole: CompanyUserRole;
  expiresAt: Date;

  constructor(
    id: CompanyUserPermissionTokenId,
    userName: string | null,
    userEmail: string,
    token: string,
    companyId: CompanyId,
    companyUserRole: CompanyUserRole,
    expiresAt: Date,
  ) {
    this.id = id;
    this.userName = userName;
    this.userEmail = userEmail;
    this.token = token;
    this.companyId = companyId;
    this.companyUserRole = companyUserRole;
    this.expiresAt = expiresAt;
  }

  static fromBackend(row: any): CompanyUserPermissionToken | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const userName = validator.optionalString("user_name");
    const userEmail = validator.requiredString("user_email");
    const token = validator.requiredString("token");
    const companyId = validator.requiredString("company_id");
    const companyUserRole = validator.requiredEnum("company_user_role", Object.values(CompanyUserRole) as CompanyUserRole[]);
    const expiresAt = validator.requiredDate("expires_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new CompanyUserPermissionToken(
      new CompanyUserPermissionTokenId(id),
      userName ?? null,
      userEmail,
      token,
      new CompanyId(companyId),
      companyUserRole,
      expiresAt,
    );
  }
}
