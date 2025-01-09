import React from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetPricesParams, GetPricesQuery, Price } from "src/dtos";
import * as model from "src/model";
import { Currency, PriceType, ProductType } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";

export function usePrices(repositoryId: model.RepositoryId) {
  const backendAPI = getBackendAPI();

  const [prices, setPrices] = React.useState<Record<PriceType, Record<Currency, Record<ProductType, Price[]>>> | null>(null);
  const [error, setError] = React.useState<ApiError | null>(null);

  const getPrices = async () => {
    try {
      const params: GetPricesParams = {
        owner: repositoryId.ownerId.login,
        repo: repositoryId.name,
      };
      const query: GetPricesQuery = {};

      const response = await backendAPI.getPrices(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setPrices(response.prices);
      }
    } catch (err) {
      console.error("Failed to fetch prices:", err);
      setError(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected error occurred while fetching prices"));
    }
  };

  return { prices, error, reloadPrices: getPrices };
}
