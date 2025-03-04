import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import * as dto from "src/api/dto";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";

export function usePlans() {
  const backendAPI = getBackendAPI();

  const [plans, setPlans] = React.useState<dto.GetPlansResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getPlans = async () => {
    try {
      const params: dto.GetPlansParams = {};
      const query: dto.GetPlansQuery = {};

      const response = await backendAPI.getPlans(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setPlans(response);
      }
    } catch (err) {
      console.error("Failed to fetch plans:", err);
      setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching plans"));
    }
  };

  return { plans, loadPlansError: error, reloadPlans: getPlans };
}
