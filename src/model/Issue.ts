import { User } from "./Owner";

// impossible to query GitHub api by issue id
// only by repository id and issue number
export class IssueId {
  id: number;
  number: number;
  // TODO: for the DB we need to store the repository id as well

  private constructor(id: number, number: number) {
    this.id = id;
    this.number = number;
  }

  static fromJson(json: any): IssueId | Error {
    if (!json.id || typeof json.id !== "number") {
      return new Error("Invalid JSON: id is missing or not a string");
    }
    if (!json.number || typeof json.number !== "number") {
      return new Error("Invalid JSON: number is missing or not a string");
    }

    return new IssueId(json.id, json.number);
  }
}

export class Issue {
  id: IssueId;
  title: string;
  htmlUrl: string;
  createdAt: Date;
  closedAt: Date | null;
  openBy: User;

  body: string;

  private constructor(id: IssueId, title: string, htmlUrl: string, createdAt: Date, closedAt: Date | null, openBy: User, body: string) {
    this.id = id;
    this.title = title;
    this.htmlUrl = htmlUrl;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.openBy = openBy;
    this.body = body;
  }

  // GitHub API: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#get-an-issue
  // Example: https://api.github.com/repos/scala/scala/issues/1
  //
  // NOTE: Issue can be queried by owner id and repository id.
  // This does not work: https://api.github.com/repos/795990/2888818/issues/1
  // But that works: https://api.github.com/repositories/2888818/issues/1
  // See discussion: https://github.com/octokit/octokit.rb/issues/483
  static fromGitHubApi(json: any): Issue | Error {
    const issueId = IssueId.fromJson(json);
    if (issueId instanceof Error) {
      return issueId;
    }
    if (!json.title || typeof json.title !== "string") {
      return new Error("Invalid JSON: title is missing or not a string");
    }
    if (!json.html_url || typeof json.html_url !== "string") {
      return new Error("Invalid JSON: html_url is missing or not a string");
    }
    if (!json.created_at || typeof json.created_at !== "string") {
      return new Error("Invalid JSON: created_at is missing or not a string");
    }
    if (json.closed_at && typeof json.closed_at !== "string") {
      // optional
      return new Error("Invalid JSON: closed_at is not a string");
    }
    if (!json.user || typeof json.user !== "object") {
      return new Error("Invalid JSON: user is missing or not an object");
    }
    if (!json.body || typeof json.body !== "string") {
      return new Error("Invalid JSON: body is missing or not a string");
    }
    const user: User | Error = User.fromGitHubApi(json.user);
    if (user instanceof Error) {
      return user;
    }

    return new Issue(
      issueId,
      json.title,
      json.html_url,
      new Date(json.created_at), // TODO: can throw an error?
      json.closed_at ? new Date(json.closed_at) : null, // TODO: can throw an error?
      user,
      json.body,
    );
  }
}
