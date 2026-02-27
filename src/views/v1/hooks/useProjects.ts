import { useState } from "react";
import { projectService } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { Project } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: dto.GetProjectsParams = {};
      const query: dto.GetProjectsQuery = {};
      const response = await projectService.getProjects(params, query);

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
