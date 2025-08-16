import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetProjectServicesParams, GetProjectServicesQuery, GetProjectServicesResponse } from "@open-source-economy/api-types";
import * as model from "@open-source-economy/api-types";
import { ServiceType } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";

const DEFAULT_SERVICES: GetProjectServicesResponse = {
  services: [ServiceType.DEVELOPMENT],
  comingSoonServices: [ServiceType.SUPPORT, ServiceType.OPERATION, ServiceType.ADVISORY],
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

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setProjectServices(response);
      }
    } catch (err) {
      console.error("Failed to fetch ProjectServices:", err);
      setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching ProjectServices"));
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
