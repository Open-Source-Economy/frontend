import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import {
  GetRepositoryParams,
  GetRepositoryQuery,
  Owner,
  Repository,
  RepositoryId
} from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

export function useRepository(repositoryId: RepositoryId) {
  const backendAPI = getBackendAPI();

  const [ownerAndRepository, setOwnerAndRepository] = useState<[Owner, Repository] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchRepository = async () => {
    try {
      const params: GetRepositoryParams = { owner: repositoryId.ownerId.login, repo: repositoryId.name };
      const query: GetRepositoryQuery = {};
      const response = await backendAPI.getRepository(params, query);

      if (response instanceof ApiError) {
        setError(response);
        return;
      } else {
        setOwnerAndRepository([response.owner, response.repository]);
      }
    } catch (err) {
      console.error("Error fetching repository:", err);
      setError(ApiError.from(err));
    }
  };

  return {
    owner: ownerAndRepository ? ownerAndRepository[0] : null,
    repository: ownerAndRepository ? ownerAndRepository[1] : null,
    error,
    reloadRepository: fetchRepository,
  };
}
