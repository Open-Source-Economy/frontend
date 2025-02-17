import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetCampaignParams, GetCampaignQuery, GetCampaignResponse } from "src/dtos";
import * as model from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";
import { getCampaignDescription } from "../../services/data";
import { GetAvailableCreditsParams, GetAvailableCreditsQuery, GetAvailableCreditsResponse } from "../../dtos/user/GetAvailableCredits";
import { AuthContextState, useAuth } from "../pages";

export function useAvailableCredits(auth: AuthContextState) {
  const backendAPI = getBackendAPI();

  const [availableCredits, setAvailableCredits] = React.useState<GetAvailableCreditsResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getAvailableCredits = async () => {
    try {
      const params: GetAvailableCreditsParams = {};
      const query: GetAvailableCreditsQuery = {
        companyId: auth.authInfo?.company?.id.uuid,
      };

      const response = await backendAPI.getAvailableCredits(params, query);

      if (response instanceof ApiError) setError(response);
      else setAvailableCredits(response);
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
      setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching campaign"));
    }
  };

  return { availableCredits, loadAvailableCreditsError: error, reloadAvailableCredits: getAvailableCredits };
}
