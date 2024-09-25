import { OwnerId } from "./Owner";
import { ValidationError, Validator } from "./utils";

export class RepositoryId {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  static fromGithubApi(json: any): RepositoryId | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new RepositoryId(json.id);
  }

  static fromBackend(json: any): RepositoryId | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("github_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new RepositoryId(json.github_id);
  }
}

export class Repository {
  id: RepositoryId;
  ownerId: OwnerId;
  name: string;
  htmlUrl: string;
  description: string;

  constructor(id: RepositoryId, ownerId: OwnerId, name: string, htmlUrl: string, description: string) {
    this.id = id;
    this.ownerId = ownerId;
    this.name = name;
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
  static fromGithubApi(json: any): Repository | ValidationError {
    const repositoryId = RepositoryId.fromGithubApi(json);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }

    const validator = new Validator(json);
    validator.requiredObject("owner");
    validator.requiredString("name");
    validator.requiredString("html_url");
    validator.requiredString("description");

    const ownerId: OwnerId | ValidationError = OwnerId.fromGithubApi(json.owner);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Repository(repositoryId, ownerId, json.name, json.html_url, json.description);
  }

  static fromBackend(json: any): Repository | ValidationError {
    const repositoryId = RepositoryId.fromBackend(json);
    if (repositoryId instanceof ValidationError) {
      return repositoryId;
    }

    const validator = new Validator(json);
    validator.requiredNumber("github_owner_id");
    validator.requiredString("github_name");
    validator.requiredString("github_html_url");
    validator.requiredString("github_description");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Repository(repositoryId, new OwnerId(json.github_owner_id), json.github_name, json.github_html_url, json.github_description);
  }
}
