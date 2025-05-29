import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import * as dto from "src/api/dto";
import { Project } from "src/api/model";
import { ApiError } from "src/ultils/error/ApiError";

export function useProjects() {
  const backendAPI = getBackendAPI();

  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      let params: dto.GetProjectsParams = {};
      const query: dto.GetProjectsQuery = {};
      const response = await backendAPI.getProjects(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setProjects(response.projects);
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
