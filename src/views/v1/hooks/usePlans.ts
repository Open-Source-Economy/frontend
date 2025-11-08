import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";
import { useAuth } from "src/views/auth";

export function usePlans() {
  const auth = useAuth();

  const backendAPI = getBackendAPI();

  const [plans, setPlans] = React.useState<dto.GetPlansResponse | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getPlans = async () => {
    if (!auth.authInfo?.authenticatedUser) {
      setPlans(null);
      return;
    } else {
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
    }
  };

  return { plans, loadPlansError: error, reloadPlans: getPlans };
}
