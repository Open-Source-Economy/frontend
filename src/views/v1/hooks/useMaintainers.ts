import { useState } from "react";
import { ApiError } from "src/utils/error/ApiError";
import { projectService } from "src/services";
import {
  type ProjectId,
  getOwnerFromProjectId,
  getRepoFromProjectId,
  GetMaintainersParams,
  GetMaintainersQuery,
  GetMaintainersResponse,
} from "src/utils/local-types";

export function useMaintainers(projectId: ProjectId) {
  const [maintainersRes, setMaintainersRes] = useState<GetMaintainersResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMaintainers = async () => {
    setIsLoading(true);

    try {
      const params: GetMaintainersParams = {
        owner: getOwnerFromProjectId(projectId),
        repo: getRepoFromProjectId(projectId),
      };
      const query: GetMaintainersQuery = {};

      const response = await projectService.getMaintainers(params, query);

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
