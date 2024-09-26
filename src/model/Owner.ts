import { ValidationError, Validator } from "./utils";

export class OwnerId {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  static fromGithubApi(json: any): OwnerId | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("id");
    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new OwnerId(json.id);
  }

  static fromBackend(json: any): OwnerId | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("github_id");
    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new OwnerId(json.github_id);
  }
}

export enum OwnerType {
  User = "User",
  Organization = "Organization",
}

export class Owner {
  id: OwnerId;
  type: OwnerType;
  name: string;
  htmlUrl: string;
  avatarUrl: string;

  constructor(id: OwnerId, type: OwnerType, name: string, url: string, avatar_url: string) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.htmlUrl = url;
    this.avatarUrl = avatar_url;
  }

  // For Organization
  // Github API: https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization
  // Example: https://api.github.com/orgs/open-source-economy
  //
  // For User
  // Github API: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
  // Example: https://api.github.com/users/laurianemollier
  static fromGithubApi(json: any): Owner | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("id");
    validator.requiredString("login");
    validator.requiredString("type");
    validator.requiredString("html_url");
    validator.requiredString("avatar_url");
    validator.optionalString("type");
    validator.requiredEnum("type", OwnerType);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const ownerId = OwnerId.fromGithubApi(json);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Owner(ownerId, OwnerType[json.type as keyof typeof OwnerType], json.login, json.html_url, json.avatar_url);
  }

  static fromBackend(json: any): Owner | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("github_id");
    validator.requiredString("github_login");
    validator.requiredString("github_type");
    validator.requiredString("github_html_url");
    validator.requiredString("github_avatar_url");
    validator.optionalString("github_type");
    validator.requiredEnum("github_type", OwnerType);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const ownerId = OwnerId.fromBackend(json);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Owner(ownerId, OwnerType[json.github_type as keyof typeof OwnerType], json.github_login, json.github_html_url, json.github_avatar_url);
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
