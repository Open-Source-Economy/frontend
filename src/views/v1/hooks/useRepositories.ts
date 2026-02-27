import { useState } from "react";
import { projectService } from "src/services";
import {
  GetRepositoryParams,
  GetRepositoryQuery,
  Owner,
  Repository,
  RepositoryId,
} from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

// TODO: optimize this function to fetch all repositories in one request
export function useRepositories(repositoryIds: RepositoryId[]) {
  const [repositories, setRepositories] = useState<[Owner, Repository][]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        repositoryIds.map((repositoryId) => {
          const params: GetRepositoryParams = { owner: repositoryId.ownerId.login, repo: repositoryId.name };
          const query: GetRepositoryQuery = {};
          return projectService.getRepository(params, query);
        })
      );

      setRepositories(responses.map((response) => [response.owner, response.repository]));
    } catch (err) {
      console.error("Error fetching repositories:", err);
      setError(ApiError.from(err));
    } finally {
      setLoading(false);
    }
  };

  return { repositories, error, loading, reloadRepositories: fetchRepositories };
}
