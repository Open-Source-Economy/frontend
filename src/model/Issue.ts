import { OwnerId } from "./Owner";
import { RepositoryId } from "./Repository";
import { ValidationError, Validator } from "./utils";

// impossible to query Github api by issue id
// only by repository id and issue number
export class IssueId {
  id: number;
  number: number;

  // TODO: for the DB we need to store the repository id as well
  constructor(id: number, number: number) {
    this.id = id;
    this.number = number;
  }

  static fromJson(json: any): IssueId | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("id");
    validator.requiredNumber("number");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new IssueId(json.id, json.number);
  }
}

export class Issue {
  id: IssueId;
  repositoryId: RepositoryId;
  title: string;
  htmlUrl: string;
  createdAt: Date;
  closedAt: Date | null;
  openBy: OwnerId;
  body: string;

  constructor(id: IssueId, repositoryId: RepositoryId, title: string, htmlUrl: string, createdAt: Date, closedAt: Date | null, openBy: OwnerId, body: string) {
    this.id = id;
    this.title = title;
    this.repositoryId = repositoryId;
    this.htmlUrl = htmlUrl;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.openBy = openBy;
    this.body = body;
  }

  // Github API: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#get-an-issue
  // Example: https://api.github.com/repos/scala/scala/issues/1
  //
  // NOTE: Issue can be queried by owner id and repository id.
  // This does not work: https://api.github.com/repos/795990/2888818/issues/1
  // But that works: https://api.github.com/repositories/2888818/issues/1
  // See discussion: https://github.com/octokit/octokit.rb/issues/483
  //
  // github api does not return the repository id
  static fromGithubApi(repositoryId: RepositoryId, json: any): Issue | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("id");
    validator.requiredNumber("number");
    validator.requiredString("title");
    validator.requiredString("html_url");
    validator.requiredString("created_at");
    validator.optionalString("closed_at");
    validator.requiredObject("user");
    validator.requiredString("body");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const issueId = IssueId.fromJson(json);
    if (issueId instanceof ValidationError) {
      return issueId;
    }

    const ownerId = OwnerId.fromGithubApi(json.user);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Issue(
      issueId,
      repositoryId,
      json.title,
      json.html_url,
      new Date(json.created_at),
      json.closed_at ? new Date(json.closed_at) : null,
      ownerId as OwnerId,
      json.body,
    );
  }

  static fromBackend(row: any): Issue | ValidationError {
    const validator = new Validator(row);
    validator.requiredNumber("github_id");
    validator.requiredNumber("github_number");
    validator.requiredNumber("github_repository_id");
    validator.requiredString("github_title");
    validator.requiredString("github_html_url");
    validator.requiredString("github_created_at");
    validator.optionalString("github_closed_at");
    validator.requiredNumber("github_open_by_owner_id");
    validator.requiredString("github_body");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const issueId = new IssueId(row.github_id, row.github_number);
    const repositoryId = new RepositoryId(row.github_repository_id);
    const githubOpenByOwnerId = new OwnerId(row.github_open_by_owner_id);

    return new Issue(
      issueId,
      repositoryId,
      row.github_title,
      row.github_html_url,
      new Date(row.github_created_at),
      row.github_closed_at ? new Date(row.github_closed_at) : null,
      githubOpenByOwnerId,
      row.github_body,
    );
  }
}
