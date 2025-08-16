import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import * as dto from "@open-source-economy/api-types";
import * as model from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";
import { CampaignDescription } from "src/model";
import { getCampaignDescription } from "../../services/data";

export function useCampaign(projectId: model.ProjectId) {
  const backendAPI = getBackendAPI();

  const [campaign, setCampaign] = React.useState<(dto.GetCampaignResponse & CampaignDescription) | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getCampaign = async () => {
    try {
      const params: dto.GetCampaignParams = {
        owner: projectId instanceof model.OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof model.RepositoryId ? projectId.name : undefined,
      };
      const query: dto.GetCampaignQuery = {};

      const response = await backendAPI.getCampaign(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        const campaignDescription = getCampaignDescription(projectId);
        setCampaign({ ...response, ...campaignDescription });
      }
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
      setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching campaign"));
    }
  };

  return { campaign, loadCampaignError: error, reloadCampaign: getCampaign };
}
