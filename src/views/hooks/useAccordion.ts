import { useState } from "react";
import * as dto from "src/api/dto";
import { OwnerId, ProjectId, RepositoryId } from "src/api/model";
import { ApiError } from "src/ultils/error/ApiError";
import { getBackendAPI } from "../../services";

export function useAccordion(projectId: ProjectId) {
  const backendAPI = getBackendAPI();

  const [accordionRes, setAccordionRes] = useState<dto.GetProjectAccordionResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAccordion = async () => {
    setIsLoading(true);

    try {
      const params: dto.GetProjectAccordionParams = {
        owner: projectId instanceof OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof RepositoryId ? projectId.name : undefined,
      };
      const query: dto.GetProjectAccordionQuery = {};

      const response = await backendAPI.getProjectAccordion(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setAccordionRes(response);
      }
    } catch (err) {
      console.error("Error fetching accordion:", err);
      setError(ApiError.from(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    accordionRes,
    isLoading,
    error,
    reloadAccordion: fetchAccordion,
  };
}
