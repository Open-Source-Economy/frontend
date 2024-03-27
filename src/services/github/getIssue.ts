import { Issue } from "../../model";

export async function getIssue(owner: string, repo: string, number: number): Promise<Issue> {
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
      const issue: Issue | Error = Issue.fromJson(json);
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
