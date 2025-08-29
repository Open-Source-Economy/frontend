import { ValidationError, Validator } from "./error";
import { OwnerId, OwnerIdCompanion } from "./Owner";
import Joi from "joi";

export class RepositoryId {
  ownerId: OwnerId;
  name: string;
  githubId?: number;

  constructor(ownerId: OwnerId, name: string, githubId?: number) {
    this.ownerId = ownerId;
    this.name = name;
    this.githubId = githubId;
  }

  ownerLogin(): string {
    return this.ownerId.login;
  }

  static fromGithubApi(data: any): RepositoryId | ValidationError {
    let json: any;
    if (typeof data === "object") {
      json = data;
    } else if (typeof data === "string") {
      json = JSON.parse(data);
    }

    const validator = new Validator(json);
    const name = validator.requiredString("name");
    const id = validator.requiredNumber("id");

    if (!json.owner) {
      return new ValidationError("Owner field is missing in the JSON response.", json);
    }
    const ownerId = OwnerId.fromGithubApi(json.owner);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new RepositoryId(ownerId, name, id);
  }

  static fromBackendPrimaryKey(row: any, table_prefix: string = ""): RepositoryId | ValidationError {
    return RepositoryId.fromAny(row, `${table_prefix}github_name`, `${table_prefix}github_id`);
  }

  static fromBackendForeignKey(row: any, table_prefix: string = ""): RepositoryId | ValidationError {
    return RepositoryId.fromAny(row, `${table_prefix}github_repository_name`, `${table_prefix}github_repository_id`);
  }

  private static fromAny(data: any, nameKey: string, idKey: string): RepositoryId | ValidationError {
    const ownerId = OwnerId.fromBackendForeignKey(data);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    const validator = new Validator(data);
    const name = validator.requiredString(nameKey);
    const id = validator.requiredNumber(idKey);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new RepositoryId(ownerId, name, id);
  }
}

export class Repository {
  id: RepositoryId;
  htmlUrl: string | null;
  description?: string;

  constructor(id: RepositoryId, htmlUrl: string | null, description?: string) {
    this.id = id;
    this.htmlUrl = htmlUrl;
    this.description = description;
  }

  // Gitub API: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
  // Example:
  // Repo owned by an organization: https://api.github.com/repos/open-source-economy/frontend
  // Repo owned by a user: https://api.github.com/repos/laurianemollier/strongVerbes
  //
  // NOTE: Repo can be queried by owner id and repository id.
  // This does not work: https://api.github.com/repos/141809657/701996033
  // But that works: https://api.github.com/repositories/701996033
  // See discussion: https://github.com/octokit/octokit.rb/issues/483
  static fromGithubApi(data: any): Repository | ValidationError {
    let json: any;
    if (typeof data === "object") {
      json = data;
    } else if (typeof data === "string") {
      json = JSON.parse(data);
    }

    const repositoryId = RepositoryId.fromGithubApi(json);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }

    const validator = new Validator(json);
    const htmlUrl = validator.optionalString("html_url");
    const description = validator.optionalString("description");
    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Repository(repositoryId, htmlUrl ?? null, description);
  }

  /**
   * Creates a `Repository` instance from a raw backend JSON object, typically retrieved from a SQL query.
   *
   * This method extracts and validates the required and optional fields from the JSON input and returns
   * a `Repository` instance if all validations succeed. If validation fails, a `ValidationError` is returned.
   *
   * @param json - The raw backend data object containing repository fields.
   * @param table_prefix - Optional prefix used to avoid column name conflicts when SQL joins are performed.
   *                       For example, if the `repository` table is joined with others in a query, a prefix
   *                       like `"repo_"` can be used so that columns become `"repo_github_html_url"`,
   *                       `"repo_github_description"`, etc. This prefix is automatically prepended to
   *                       relevant keys during validation.
   *
   * @returns A new `Repository` instance if validation succeeds, or a `ValidationError` otherwise.
   */
  static fromBackend(json: any, table_prefix: string = ""): Repository | ValidationError {
    const validator = new Validator(json);

    const repositoryId = RepositoryId.fromBackendPrimaryKey(json, table_prefix);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }

    const htmlUrl = validator.requiredString(`${table_prefix}github_html_url`);
    const description = validator.optionalString(`${table_prefix}github_description`);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Repository(repositoryId, htmlUrl, description);
  }
}

export namespace RepositoryIdCompanion {
  export const schema: Joi.ObjectSchema<RepositoryId> = Joi.object({
    ownerId: OwnerIdCompanion.schema.required().messages({
      "any.required": "Owner ID is required for a repository",
      "object.base": "Owner ID must be an object",
    }),
    name: Joi.string().trim().min(1).required().messages({
      "string.empty": "Repository name cannot be empty",
      "string.min": "Repository name must contain at least one character",
      "string.trim": "Repository name cannot consist only of spaces",
      "any.required": "Repository name is required",
    }),
    githubId: Joi.number().integer().min(1).optional().messages({
      "number.base": "GitHub ID must be a number",
      "number.integer": "GitHub ID must be an integer",
      "number.min": "GitHub ID cannot be less than {{#limit}}",
    }),
  });
}
