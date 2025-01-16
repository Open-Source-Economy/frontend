import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetRepositoryParams, GetRepositoryQuery } from "src/dtos";
import { Owner, Repository, RepositoryId } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";

// TODO: optimize this function to fetch all repositories in one request
export function useRepositories(repositoryIds: RepositoryId[]) {
  const backendAPI = getBackendAPI();

  const [repositories, setRepositories] = useState<[Owner, Repository][]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        repositoryIds.map(repositoryId => {
          const params: GetRepositoryParams = { owner: repositoryId.ownerId.login, repo: repositoryId.name };
          const query: GetRepositoryQuery = {};
          return backendAPI.getRepository(params, query);
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
      setError(ApiError.from(err));
    } finally {
      setLoading(false);
    }
  };

  return { repositories, error, loading, reloadRepositories: fetchRepositories };
}
