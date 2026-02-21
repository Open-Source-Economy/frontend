import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import * as model from "@open-source-economy/api-types";
import { GetProjectServicesParams, GetProjectServicesQuery, GetProjectServicesResponse, ServiceType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

const DEFAULT_SERVICES: GetProjectServicesResponse = {
  services: [ServiceType.DEVELOPMENT],
  comingSoonServices: [ServiceType.SUPPORT, ServiceType.SECURITY_AND_COMPLIANCE, ServiceType.ADVISORY],
};

export function useProjectServices(projectId?: model.ProjectId) {
  const backendAPI = getBackendAPI();
  const [projectServices, setProjectServices] = React.useState<GetProjectServicesResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getProjectServices = async () => {
    if (!projectId) {
      setProjectServices(DEFAULT_SERVICES);
      setError(null);
      return;
    }
    try {
      const params: GetProjectServicesParams = {
        owner: projectId instanceof model.OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof model.RepositoryId ? projectId.name : undefined,
      };
      const query: GetProjectServicesQuery = {};

      const response = await backendAPI.getProjectServices(params, query);
      setProjectServices(response);
    } catch (error) {
      setError(error instanceof ApiError ? error : ApiError.from(error));
    }
  };

  React.useEffect(() => {
    getProjectServices();
  }, [projectId]); // Run when projectId changes

  return {
    projectServices: projectServices || DEFAULT_SERVICES,
    error,
    reloadProjectServices: getProjectServices,
  };
}
