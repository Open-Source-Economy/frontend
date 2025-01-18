import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetCampaignParams, GetCampaignQuery, GetCampaignResponse } from "src/dtos";
import * as model from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";
import { getCampaignDescription } from "../data";

export function useCampaign(projectId: model.ProjectId) {
  const backendAPI = getBackendAPI();

  const [campaign, setCampaign] = React.useState<GetCampaignResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getCampaign = async () => {
    try {
      const params: GetCampaignParams = {
        owner: projectId instanceof model.OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof model.RepositoryId ? projectId.name : undefined,
      };
      const query: GetCampaignQuery = {};

      const response = await backendAPI.getCampaign(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        response.description = getCampaignDescription(projectId);
        setCampaign(response);
      }
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
      setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching campaign"));
    }
  };

  return { campaign, loadCampaignError: error, reloadCampaign: getCampaign };
}
