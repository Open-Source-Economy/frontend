import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetProjectServicesParams, GetProjectServicesQuery, GetProjectServicesResponse } from "src/dtos";
import * as model from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";

export function useProjectServices(projectId: model.ProjectId) {
  const backendAPI = getBackendAPI();

  const [projectServices, setProjectServices] = React.useState<GetProjectServicesResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getProjectServices = async () => {
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

  return { projectServices, error, reloadProjectServices: getProjectServices };
}
