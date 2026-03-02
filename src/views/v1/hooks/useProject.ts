import { useState } from "react";
import { projectService } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/utils/error/ApiError";
import { type ProjectId, getOwnerFromProjectId, getRepoFromProjectId } from "src/utils/local-types";

export function useProject(projectId: ProjectId) {
  const [project, setProject] = useState<dto.Project | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProject = async () => {
    try {
      const params: dto.GetProjectParams = {
        owner: getOwnerFromProjectId(projectId),
        repo: getRepoFromProjectId(projectId),
      };
      const query: dto.GetProjectQuery = {};
      const response = await projectService.getProject(params, query);

      if (response instanceof ApiError) {
        setError(response);
        return;
      } else {
        setProject(response.project);
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError(ApiError.from(err));
    }
  };

  return {
    project,
    error,
    reloadProject: fetchProject,
  };
}
