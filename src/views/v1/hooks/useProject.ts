import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetProjectParams, GetProjectQuery, Project } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { type ProjectId, getOwnerFromProjectId, getRepoFromProjectId } from "src/ultils/local-types";

export function useProject(projectId: ProjectId) {
  const backendAPI = getBackendAPI();

  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProject = async () => {
    try {
      const params: GetProjectParams = {
        owner: getOwnerFromProjectId(projectId),
        repo: getRepoFromProjectId(projectId),
      };
      const query: GetProjectQuery = {};
      const response = await backendAPI.getProject(params, query);

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
