interface Repo {
  organization: Organization;
}
interface Organization {
  avatar_url: string;
}

export async function getRepository(owner: string, repository: string): Promise<Repo> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner.trim()}/${repository.trim()}`, {
      method: "GET",
      headers: {
        Authorization: `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`, // TODO: for now is marked as unsecured
      },
    });
    if (response.ok) {
      return (await response.json()) as Repo;
    } else {
      return Promise.reject(new Error(response.status.toString())); // TODO: improve error handling
    }
  } catch (error) {
    return Promise.reject(new Error("Call failed")); // TODO: improve error handling
  }
}
