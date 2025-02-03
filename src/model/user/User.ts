import { LocalUser } from "./LocalUser";
import { GithubData, ThirdPartyUser } from "./ThirdPartyUser";
import { Owner } from "../github";
import { ValidationError, Validator } from "../error";
import { Currency } from "../stripe";

export class UserId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  USER = "user",
}

export const userUtils = {
  githubData(user: User): GithubData | null {
    if ("providerData" in user.data) {
      return user.data.providerData;
    } else {
      return null;
    }
  },
};

export class User implements Express.User {
  id: UserId;
  name: string | null;
  data: LocalUser | ThirdPartyUser;
  role: UserRole;
  preferredCurrency?: Currency;

  constructor(id: UserId, name: string | null, data: LocalUser | ThirdPartyUser, role: UserRole, preferredCurrency?: Currency) {
    this.id = id;
    this.name = name;
    this.data = data;
    this.role = role;
    this.preferredCurrency = preferredCurrency;
  }

  static fromRaw(row: any, owner: Owner | null = null): User | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const name = validator.optionalString("name");
    const role = validator.requiredEnum("role", Object.values(UserRole) as UserRole[]);
    const preferredCurrency = validator.optionalEnum("preferred_currency", Object.values(Currency) as Currency[]);

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

    return new User(new UserId(id), name ?? null, user, role, preferredCurrency);
  }
}
