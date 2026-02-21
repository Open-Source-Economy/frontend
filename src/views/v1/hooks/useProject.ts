import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetProjectParams, GetProjectQuery, OwnerId, Project, ProjectId, RepositoryId } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

export function useProject(projectId: ProjectId) {
  const backendAPI = getBackendAPI();

  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProject = async () => {
    try {
      const params: GetProjectParams = {
        owner: projectId instanceof OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof RepositoryId ? projectId.name : undefined,
      };
      const query: GetProjectQuery = {};
      const response = await backendAPI.getProject(params, query);
      setProject(response.project);
    } catch (error) {
      setError(error instanceof ApiError ? error : ApiError.from(error));
    }
  };

  return {
    project,
    error,
    reloadProject: fetchProject,
  };
}
