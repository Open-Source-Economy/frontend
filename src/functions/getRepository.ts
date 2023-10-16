import { Repo } from "../model";

export async function getRepository(owner: string, repository: string): Promise<Repo> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner.trim()}/${repository.trim()}`, {
      method: "GET",
      headers: {
        Authorization: "Token " + `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`, // TODO: yeah I know... for now is marked as unsecured
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.ok) {
      return (await response.json()) as Repo;
    } else {
      return Promise.reject(new Error("No project exist on GitHub.com with this owner and repository ")); // TODO: improve error handling
    }
  } catch (error) {
    return Promise.reject(new Error("Call failed")); // TODO: improve error handling
  }
}
