import { useState } from "react";
import { ApiError } from "src/ultils/error/ApiError";
import { projectService } from "src/services";
import {
  type ProjectId,
  getOwnerFromProjectId,
  getRepoFromProjectId,
  GetProjectAccordionParams,
  GetProjectAccordionQuery,
  GetProjectAccordionResponse,
} from "src/ultils/local-types";

export function useAccordion(projectId: ProjectId) {
  const [accordionRes, setAccordionRes] = useState<GetProjectAccordionResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAccordion = async () => {
    setIsLoading(true);

    try {
      const params: GetProjectAccordionParams = {
        owner: getOwnerFromProjectId(projectId),
        repo: getRepoFromProjectId(projectId),
      };
      const query: GetProjectAccordionQuery = {};

      const response = await projectService.getProjectAccordion(params, query);

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
