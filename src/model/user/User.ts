import { LocalUser } from "./LocalUser";
import { ThirdPartyUser } from "./ThirdPartyUser";
import { Owner } from "../Owner";
import { ValidationError, Validator } from "../utils";

export class UserId {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  toString(): string {
    return this.id.toString();
  }
}

export enum UserRole {
  user = "user",
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

  static fromRaw(row: any, owner: Owner | null = null): User | ValidationError {
    const validator = new Validator(row);
    validator.requiredNumber("id");
    validator.requiredString("role");

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

    validator.requiredEnum("role", UserRole);

    const enumError = validator.getFirstError();
    if (enumError) {
      return enumError;
    }

    return new User(new UserId(row.id), user, row.role as UserRole);
  }
}
