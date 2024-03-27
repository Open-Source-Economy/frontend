import { Repository } from "../../model";

export async function getRepository(owner: string, repo: string): Promise<Repository> {
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
      const repo: Repository | Error = Repository.fromJson(json);
      if (repo instanceof Error) {
        return Promise.reject(repo);
      } else {
        return repo;
      }
    } else {
      return Promise.reject(new Error("No project exist on GitHub.com with this owner and repository ")); // TODO: improve error handling
    }
  } catch (error) {
    return Promise.reject(new Error("Call failed")); // TODO: improve error handling
  }
}
