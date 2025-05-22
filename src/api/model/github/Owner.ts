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

  static fromBackendPrimaryKey(row: any, table_prefix: string = ""): OwnerId | ValidationError {
    return OwnerId.fromAny(row, `${table_prefix}github_login`, `${table_prefix}github_id`);
  }

  static fromBackendForeignKey(row: any, table_prefix: string = ""): OwnerId | ValidationError {
    return OwnerId.fromAny(row, `${table_prefix}github_owner_login`, `${table_prefix}github_owner_id`);
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
  // GitHub API: https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization
  // Example: https://api.github.com/orgs/open-source-economy
  //
  // For User
  // GitHub API: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
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

  /**
   * Creates an `Owner` instance from a raw backend JSON object, typically retrieved from a SQL query.
   *
   * This method validates the required fields from the JSON and returns either a valid `Owner` instance
   * or a `ValidationError` if validation fails.
   *
   * @param json - The raw backend data object containing owner fields.
   * @param table_prefix - Optional prefix used to avoid column name conflicts when SQL joins are performed.
   *                       For example, if the `github_owner` table is joined with other tables in a query,
   *                       a prefix like `"owner_"` can be used so that columns become
   *                       `"owner_github_html_url"`, `"owner_github_avatar_url"`, etc.
   *                       This prefix is automatically prepended to relevant keys during validation.
   *
   * @returns A new `Owner` instance if validation succeeds, or a `ValidationError` otherwise.
   */
  static fromBackend(json: any, table_prefix: string = ""): Owner | ValidationError {
    const validator = new Validator(json);

    // @ts-ignore
    const type: OwnerType = validator.requiredEnum<OwnerType>(`${table_prefix}github_type`, Object.values(OwnerType) as OwnerType[]);
    const htmlUrl = validator.requiredString(`${table_prefix}github_html_url`);
    const avatarUrl = validator.requiredString(`${table_prefix}github_avatar_url`);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const ownerId = OwnerId.fromBackendPrimaryKey(json, table_prefix);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Owner(ownerId, type, htmlUrl, avatarUrl);
  }
}
