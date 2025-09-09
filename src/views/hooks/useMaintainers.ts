import { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { OwnerId, ProjectId, RepositoryId } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { getBackendAPI } from "../../services";

export function useMaintainers(projectId: ProjectId) {
  const backendAPI = getBackendAPI();

  const [maintainersRes, setMaintainersRes] = useState<dto.GetMaintainersResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMaintainers = async () => {
    setIsLoading(true);

    try {
      const params: dto.GetMaintainersParams = {
        owner: projectId instanceof OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof RepositoryId ? projectId.name : undefined,
      };
      const query: dto.GetMaintainersQuery = {};

      const response = await backendAPI.getMaintainers(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setMaintainersRes(response);
      }
    } catch (err) {
      console.error("Error fetching maintainers:", err);
      setError(ApiError.from(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    maintainersRes,
    isLoading,
    error,
    reloadMaintainers: fetchMaintainers,
  };
}
