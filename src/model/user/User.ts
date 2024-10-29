import { LocalUser } from "./LocalUser";
import { GithubData, ThirdPartyUser } from "./ThirdPartyUser";
import { Owner } from "../github";
import { ValidationError, Validator } from "../error";

export class UserId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  toString(): string {
    return this.uuid;
  }
}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  USER = "user",
}

export class User implements Express.User {
  id: UserId;
  data: LocalUser | ThirdPartyUser;
  role: UserRole;

  constructor(id: UserId, data: LocalUser | ThirdPartyUser, role: UserRole) {
    this.id = id;
    this.data = data;
    this.role = role;
  }

  email(): string | null {
    if (this.data instanceof LocalUser) {
      return this.data.email;
    } else {
      return this.data.email() ?? null;
    }
  }

  githubData(): GithubData | null {
    if (this.data instanceof ThirdPartyUser) {
      return this.data.providerData;
    } else {
      return null;
    }
  }

  static fromRaw(row: any, owner: Owner | null = null): User | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const role = validator.requiredEnum("role", Object.values(UserRole) as UserRole[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    let user: LocalUser | ThirdPartyUser | ValidationError;

    if (row.hashed_password) {
      user = LocalUser.fromRaw(row);
    } else if (row.provider) {
      user = ThirdPartyUser.fromRaw(row, owner);
    } else {
      return new ValidationError("Unable to determine user type", row);
    }

    if (user instanceof ValidationError) {
      return user;
    }

    const enumError = validator.getFirstError();
    if (enumError) {
      return enumError;
    }

    return new User(new UserId(id), user, role);
  }
}
