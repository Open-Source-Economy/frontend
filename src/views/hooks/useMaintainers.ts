import { useState } from "react";
import { GetMaintainersParams, GetMaintainersQuery, Maintainer } from "src/dtos";
import { OwnerId, ProjectId, RepositoryId } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { getBackendAPI } from "../../services";

export function useMaintainers(projectId: ProjectId) {
  const backendAPI = getBackendAPI();

  const [maintainers, setMaintainers] = useState<Maintainer[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMaintainers = async () => {
    setIsLoading(true);

    try {
      const params: GetMaintainersParams = {
        owner: projectId instanceof OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof RepositoryId ? projectId.name : undefined,
      };
      const query: GetMaintainersQuery = {};

      const response = await backendAPI.getMaintainers(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setMaintainers(response.maintainers);
      }
    } catch (err) {
      console.error("Error fetching maintainers:", err);
      setError(ApiError.from(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    maintainers,
    isLoading,
    error,
    reloadMaintainers: fetchMaintainers,
  };
}
