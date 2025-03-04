import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetProjectParams, GetProjectQuery, GetProjectResponse } from "src/api/dto";
import { OwnerId, Project, ProjectId } from "src/api/model";
import { ApiError } from "src/ultils/error/ApiError";

// TODO: optimize this function to fetch all projects in one request
export function useProjects(projectIds: ProjectId[]) {
  const backendAPI = getBackendAPI();

  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        projectIds.map(projectId => {
          let params: GetProjectParams;
          if (projectId instanceof OwnerId) {
            params = {
              owner: projectId.login,
            };
          } else {
            params = {
              owner: projectId.ownerId.login,
              repo: projectId.name,
            };
          }

          const query: GetProjectQuery = {};
          return backendAPI.getProject(params, query);
        }),
      );

      const validResponses: GetProjectResponse[] = responses
        .filter(response => !(response instanceof ApiError))
        .map(response => response as GetProjectResponse);

      setProjects(validResponses.map(response => response.project));

      const errors = responses.filter((response): response is ApiError => response instanceof ApiError);

      if (errors.length > 0) {
        setError(errors[0]); // Handle the first error
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError(ApiError.from(err));
    } finally {
      setLoading(false);
    }
  };

  return { projects, error, loading, reloadProjects: fetchProjects };
}
