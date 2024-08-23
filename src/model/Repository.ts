import { OwnerId } from "./Owner";

export class RepositoryId {
  id: number;

  private constructor(id: number) {
    this.id = id;
  }

  static fromJson(json: any): RepositoryId | Error {
    if (!json.id || typeof json.id !== "number") {
      return new Error("Invalid JSON: id is missing or not a string");
    }

    return new RepositoryId(json.id);
  }
}

export class Repository {
  id: RepositoryId;
  ownerId: OwnerId;
  name: string;
  htmlUrl: string;
  description: string;

  private constructor(id: RepositoryId, ownerId: OwnerId, name: string, htmlUrl: string, description: string) {
    this.id = id;
    this.ownerId = ownerId;
    this.name = name;
    this.htmlUrl = htmlUrl;
    this.description = description;
  }

  // GitHub API: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
  // Example:
  // Repo owned by an organization: https://api.github.com/repos/open-source-economy/frontend
  // Repo owned by a user: https://api.github.com/repos/laurianemollier/strongVerbes
  //
  // NOTE: Repo can be queried by owner id and repository id.
  // This does not work: https://api.github.com/repos/141809657/701996033
  // But that works: https://api.github.com/repositories/701996033
  // See discussion: https://github.com/octokit/octokit.rb/issues/483
  static fromGitHubApi(json: any): Repository | Error {
    const repositoryId = RepositoryId.fromJson(json);
    if (repositoryId instanceof Error) {
      return repositoryId;
    }

    if (!json.owner) {
      return new Error("Invalid JSON: owner");
    }
    const ownerId: OwnerId | Error = OwnerId.fromJson(json.owner);
    if (ownerId instanceof Error) {
      return ownerId;
    }

    if (!json.name || typeof json.name !== "string") {
      return new Error("Invalid JSON: name is missing or not a string");
    }
    if (!json.html_url || typeof json.html_url !== "string") {
      return new Error("Invalid JSON: html_url is missing or not a string");
    }
    if (!json.description || typeof json.description !== "string") {
      return new Error("Invalid JSON: description is missing or not a string");
    }
    if (!json.owner || typeof json.owner !== "object") {
      return new Error("Invalid JSON: owner is missing or not an object");
    }
    return new Repository(repositoryId, ownerId, json.name, json.html_url, json.description);
  }
}
