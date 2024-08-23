import { Issue, Owner, Repository } from "../../model";
import { GitAPI } from "../GitAPI";

export class GithubAPI implements GitAPI {
  async getIssue(owner: string, repo: string, number: number): Promise<Issue> {
    try {
      const response: Response = await fetch(`https://api.github.com/repos/${owner.trim()}/${repo.trim()}/issues/${number}`, {
        method: "GET",
        headers: {
          Authorization: "Token " + process.env.REACT_APP_GITHUB_TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.ok) {
        const json = await response.json();
        const issue: Issue | Error = Issue.fromGitHubApi(json);
        if (issue instanceof Error) {
          return Promise.reject(issue);
        } else {
          return issue;
        }
      } else {
        return Promise.reject(new Error("No project exist on GitHub.com with this owner and repository ")); // TODO: improve error handling
      }
    } catch (error) {
      return Promise.reject(new Error("Call failed")); // TODO: improve error handling
    }
  }

  async getOwnerAndRepository(owner: string, repo: string): Promise<[Owner, Repository]> {
    try {
      const response: Response = await fetch(`https://api.github.com/repos/${owner.trim()}/${repo.trim()}`, {
        method: "GET",
        headers: {
          Authorization: "Token " + process.env.REACT_APP_GITHUB_TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (!json.owner) {
          return Promise.reject(new Error("Invalid JSON: owner"));
        }

        const owner: Owner | Error = Owner.fromGitHubApi(json.owner);
        const repo: Repository | Error = Repository.fromGitHubApi(json);
        if (repo instanceof Error) {
          return Promise.reject(repo);
        } else if (owner instanceof Error) {
          return Promise.reject(owner);
        } else {
          return [owner, repo];
        }
      } else {
        return Promise.reject(new Error("No project exist on GitHub.com with this owner and repository ")); // TODO: improve error handling
      }
    } catch (error) {
      return Promise.reject(new Error("Call failed")); // TODO: improve error handling
    }
  }
}
