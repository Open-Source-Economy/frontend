import {Organization, Repo} from "../model";

export async function getRepository(owner: string, repository: string): Promise<Repo> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner.trim()}/${repository.trim()}`, {
      method: "GET",
      headers: {
        Authorization: "Token " + process.env.REACT_APP_GITHUB_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.ok) {
      const json = await response.json();

      var organization;
      if (json.organization) {
        organization = new Organization(json.organization.avatar_url ? json.organization.avatar_url : "")
      } else {
        organization = new Organization("")
      }
      return new Repo(
          json.name ? json.name : "",
          json.full_name ? json.full_name : "",
          json.description ? json.description : "",
          organization
      )
    } else {
      return Promise.reject(new Error("No project exist on GitHub.com with this owner and repository ")); // TODO: improve error handling
    }
  } catch (error) {
    return Promise.reject(new Error("Call failed")); // TODO: improve error handling
  }
}
