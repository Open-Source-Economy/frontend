export class OwnerId {
  id: number;

  private constructor(id: number) {
    this.id = id;
  }

  static fromJson(json: any): OwnerId | Error {
    if (!json.id || typeof json.id !== "number") {
      return new Error("Invalid JSON: id is missing or not a string");
    }

    return new OwnerId(json.id);
  }
}

enum OwnerType {
  User = "User",
  Organization = "Organization",
}

export class Owner {
  id: OwnerId;
  type: OwnerType;
  name: string;
  htmlUrl: string;
  avatarUrl: string;

  protected constructor(id: OwnerId, type: OwnerType, name: string, url: string, avatar_url: string) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.htmlUrl = url;
    this.avatarUrl = avatar_url;
  }

  // For Organization
  // GitHub API: https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization
  // Example: https://api.github.com/orgs/open-source-economy
  //
  // For User
  // GitHub API: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
  // Example: https://api.github.com/users/laurianemollier
  static fromGitHubApi(json: any): Owner | Error {
    const owner = OwnerId.fromJson(json);
    if (owner instanceof Error) {
      return owner;
    }
    if (!json.login || typeof json.login !== "string") {
      return new Error("Invalid JSON: login is missing or not a string");
    }
    if (!json.type || typeof json.type !== "string" || !Object.values(OwnerType).includes(json.type)) {
      return new Error("Invalid JSON: type is missing; or not a string; or is not the correct type");
    }
    if (!json.html_url || typeof json.html_url !== "string") {
      return new Error("Invalid JSON: html_url is missing or not a string");
    }
    if (!json.avatar_url || typeof json.avatar_url !== "string") {
      return new Error("Invalid JSON: avatar_url is missing or not a string");
    }

    return new Owner(owner, OwnerType[json.type as keyof typeof OwnerType], json.login, json.html_url, json.avatar_url);
  }
}

export class User extends Owner {
  static fromGitHubApi(json: any): User | Error {
    const owner = Owner.fromGitHubApi(json);
    if (owner instanceof Error) {
      return owner;
    }
    if (owner.type !== OwnerType.User) {
      return new Error("Invalid JSON: owner is not a user");
    }
    return Owner.fromGitHubApi(json) as User;
  }
}
