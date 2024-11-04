import { ValidationError, Validator } from "../error";
import { OwnerId } from "./Owner";

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
    const id = validator.optionalNumber("id");

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

  static fromBackendPrimaryKey(row: any): RepositoryId | ValidationError {
    return RepositoryId.fromAny(row, "github_name", "github_id");
  }

  static fromBackendForeignKey(row: any): RepositoryId | ValidationError {
    return RepositoryId.fromAny(row, "github_repository_name", "github_repository_id");
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
  htmlUrl: string;
  description?: string;

  constructor(id: RepositoryId, htmlUrl: string, description?: string) {
    this.id = id;
    this.htmlUrl = htmlUrl;
    this.description = description;
  }

  // Github API: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
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
    const htmlUrl = validator.requiredString("html_url");
    const description = validator.optionalString("description");
    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Repository(repositoryId, htmlUrl, description);
  }

  static fromBackend(json: any): Repository | ValidationError {
    const repositoryId = RepositoryId.fromBackendPrimaryKey(json);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }

    const validator = new Validator(json);
    const htmlUrl = validator.requiredString("github_html_url");
    const description = validator.optionalString("github_description");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Repository(repositoryId, htmlUrl, description);
  }
}
