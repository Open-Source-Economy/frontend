import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetProjectParams, GetProjectQuery } from "src/dtos";
import { OwnerId, Project, ProjectId, RepositoryId } from "src/model";
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
