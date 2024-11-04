import { ValidationError, Validator } from "../error";

export class OwnerId {
  login: string;
  githubId?: number;

  constructor(login: string, id?: number) {
    this.login = login;
    this.githubId = id;
  }

  static fromGithubApi(json: any): OwnerId | ValidationError {
    return OwnerId.fromAny(json, "login", "id");
  }

  static fromBackendPrimaryKey(row: any): OwnerId | ValidationError {
    return OwnerId.fromAny(row, "github_login", "github_id");
  }

  static fromBackendForeignKey(row: any): OwnerId | ValidationError {
    return OwnerId.fromAny(row, "github_owner_login", "github_owner_id");
  }

  private static fromAny(data: any, loginKey: string, idKey: string): OwnerId | ValidationError {
    let json: any;
    if (typeof data === "object") {
      json = data;
    } else if (typeof data === "string") {
      json = JSON.parse(data);
    }

    const validator = new Validator(json);
    const login = validator.requiredString(loginKey);
    const id = validator.requiredNumber(idKey);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new OwnerId(login, id);
  }
}

export enum OwnerType {
  User = "User",
  Organization = "Organization",
}

export class Owner {
  id: OwnerId;
  type: OwnerType;
  htmlUrl: string;
  avatarUrl?: string;

  constructor(id: OwnerId, type: OwnerType, htmlUrl: string, avatarUrl?: string) {
    this.id = id;
    this.type = type;
    this.htmlUrl = htmlUrl;
    this.avatarUrl = avatarUrl;
  }

  // For Organization
  // Github API: https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization
  // Example: https://api.github.com/orgs/open-source-economy
  //
  // For User
  // Github API: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
  // Example: https://api.github.com/users/laurianemollier
  static fromGithubApi(data: any): Owner | ValidationError {
    let json: any;
    if (typeof data === "object") {
      json = data;
    } else if (typeof data === "string") {
      json = JSON.parse(data);
    }

    const validator = new Validator(json);

    const htmlUrl = validator.requiredString("html_url");
    const avatarUrl = validator.optionalString("avatar_url");
    const type = validator.requiredEnum<OwnerType>("type", Object.values(OwnerType) as OwnerType[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const ownerId = OwnerId.fromGithubApi(json);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Owner(ownerId, type, htmlUrl, avatarUrl);
  }

  static fromBackend(json: any): Owner | ValidationError {
    const validator = new Validator(json);
    // @ts-ignore
    const type: OwnerType = validator.requiredEnum<OwnerType>("github_type", Object.values(OwnerType) as OwnerType[]);
    const htmlUrl = validator.requiredString("github_html_url");
    const avatarUrl = validator.requiredString("github_avatar_url");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const ownerId = OwnerId.fromBackendPrimaryKey(json);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Owner(ownerId, type, htmlUrl, avatarUrl);
  }
}

export class UserOwner extends Owner {
  static fromGithubApi(json: any): UserOwner | ValidationError {
    const owner = Owner.fromGithubApi(json);
    if (owner instanceof ValidationError) {
      return owner;
    }
    if (owner.type !== OwnerType.User) {
      return new ValidationError("Invalid JSON: owner is not a user", json);
    }
    return owner as UserOwner;
  }
}
