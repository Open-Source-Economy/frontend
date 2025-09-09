import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";

export function useUserPlan() {
  const backendAPI = getBackendAPI();

  const [userPlan, setUserPlan] = React.useState<dto.GetUserPlanResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getUserPlan = async () => {
    try {
      const params: dto.GetUserPlanParams = {};
      const query: dto.GetUserPlanQuery = {};

      const response = await backendAPI.getUserPlan(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setUserPlan(response);
      }
    } catch (err) {
      console.error("Failed to fetch plan:", err);
      setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching plan"));
    }
  };

  return { userPlan, loadUserPlanError: error, reloadUserPlan: getUserPlan };
}
