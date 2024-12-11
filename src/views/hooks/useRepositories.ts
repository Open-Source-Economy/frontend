import { useEffect, useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetRepositoryBody, GetRepositoryParams, GetRepositoryQuery } from "src/dtos";
import { Owner, Repository, RepositoryId } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";

export function useRepositories(repositoryIds: RepositoryId[]) {
  const backendAPI = getBackendAPI();

  const [repositories, setRepositories] = useState<[Owner, Repository][]>([]);
  const [error, setError] = useState<ApiError | Error | null>(null); // TODO: display error

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const responses = await Promise.all(
          repositoryIds.map(repositoryId => {
            const params: GetRepositoryParams = { owner: repositoryId.ownerId.login, repo: repositoryId.name };
            const body: GetRepositoryBody = {};
            const query: GetRepositoryQuery = {};
            return backendAPI.getRepository(params, body, query);
          }),
        );

        const validResponses = responses.filter((response): response is { owner: Owner; repository: Repository } => !(response instanceof ApiError));

        setRepositories(validResponses.map(response => [response.owner, response.repository]));

        const errors = responses.filter((response): response is ApiError => response instanceof ApiError);

        if (errors.length > 0) {
          setError(errors[0]); // Handle the first error
        }
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError(err as Error);
      }
    };

    fetchRepositories();
  }, [repositoryIds]);

  return { repositories, error };
}
