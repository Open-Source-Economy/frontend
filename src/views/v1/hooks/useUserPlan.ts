import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";

export function useUserPlan() {
  const backendAPI = getBackendAPI();

  const [userPlan, setUserPlan] = React.useState<dto.GetUserPlanResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getUserPlan = async () => {
    try {
      const params: dto.GetUserPlanParams = {};
      const query: dto.GetUserPlanQuery = {};

      const response = await backendAPI.getUserPlan(params, query);
      setUserPlan(response);
    } catch (error) {
      setError(error instanceof ApiError ? error : ApiError.from(error));
    }
  };

  return { userPlan, loadUserPlanError: error, reloadUserPlan: getUserPlan };
}
