import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";
import { GetAvailableCreditsParams, GetAvailableCreditsQuery } from "../../api/dto";
import { AuthContextState } from "../pages";
import { Credit, CreditUnit } from "src/model";
import Decimal from "decimal.js";

export function useAvailableCredits(auth: AuthContextState) {
  const backendAPI = getBackendAPI();

  const [availableCredits, setAvailableCredits] = React.useState<Credit | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getAvailableCredits = async () => {
    try {
      const params: GetAvailableCreditsParams = {};
      const query: GetAvailableCreditsQuery = {
        companyId: auth.authInfo?.company?.id.uuid,
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
  };

  return { availableCredits, loadAvailableCreditsError: error, reloadAvailableCredits: getAvailableCredits };
}
