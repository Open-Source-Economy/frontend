import { useState } from "react";
import { ApiError } from "src/ultils/error/ApiError";
import { getBackendAPI } from "../../../services";
import {
  type ProjectId,
  getOwnerFromProjectId,
  getRepoFromProjectId,
  GetMaintainersParams,
  GetMaintainersQuery,
  GetMaintainersResponse,
} from "src/ultils/local-types";

export function useMaintainers(projectId: ProjectId) {
  const backendAPI = getBackendAPI();

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
