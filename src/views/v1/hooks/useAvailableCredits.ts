import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";
import { GetAvailableCreditsParams, GetAvailableCreditsQuery } from "@open-source-economy/api-types";
import { AuthContextState } from "src/views/auth";
import { Credit, CreditUnit } from "src/model";
import Decimal from "decimal.js";

export function useAvailableCredits(auth: AuthContextState) {
  const backendAPI = getBackendAPI();

  const [availableCredits, setAvailableCredits] = React.useState<Credit | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getAvailableCredits = async () => {
    // don't fetch if not authenticated
    if (auth.authInfo?.authenticatedUser) {
      try {
        const authenticatedUser = auth.authInfo?.authenticatedUser;
        const params: GetAvailableCreditsParams = {};
        const query: GetAvailableCreditsQuery = {
          companyId: authenticatedUser?.company?.id.uuid,
        };

        const response = await backendAPI.getAvailableCredits(params, query);

        if (response instanceof ApiError) {
          if (response.statusCode === StatusCodes.UNAUTHORIZED) setAvailableCredits(null);
          else setError(response);
        } else {
          setAvailableCredits({
            amount: new Decimal(response.creditAmount),
            unit: CreditUnit.MINUTE,
          });
        }
      } catch (err) {
        console.error("Failed to fetch campaign:", err);
        setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching campaign"));
      }
    }
  };

  return { availableCredits, loadAvailableCreditsError: error, reloadAvailableCredits: getAvailableCredits };
}
