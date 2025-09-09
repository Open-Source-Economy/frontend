import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, ResponseBody } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { config, Env } from "../ultils";

// Helper function to create an Axios instance with interceptors
const createApiInstance = () => {
  const api = axios.create();

  // Add a request interceptor
  api.interceptors.request.use(
    request => {
      if (config.env !== Env.Production) {
        console.log("Sending request:", request.method, request.url);
        if (request.data) {
          console.log("Request body:", request.data);
        }
      }
      return request;
    },
    error => {
      if (config.env !== Env.Production) {
        console.error("Request error:", error);
      }
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      if (config.env !== Env.Production) {
        console.log("Received response from:", response.config.url);
        if (response.data) {
          console.log("Response data:", response.data);
        }
      }
      return response;
    },
    error => {
      if (config.env !== Env.Production) {
        console.error("Response error:", error.response?.status, error.response?.statusText);
        if (error.response?.data) {
          console.error("Error response data:", error.response.data);
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
};

export async function handleError<T>(call: () => Promise<AxiosResponse<ResponseBody<T>, any>>, name: string): Promise<T | ApiError> {
  try {
    const response: AxiosResponse<ResponseBody<T>, any> = await call();
    return response.data.success!;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(`Error on ${name}:`, err);
      const errorResponse = err.response?.data as ErrorResponse | undefined;

      const status: StatusCodes | undefined = err.response ? (err.response?.status as StatusCodes) : undefined;
      const statusText = err.response?.statusText ?? err.code;
      const message = errorResponse?.message ?? err.message;
      return new ApiError(status, statusText, message);
    } else {
      console.error(`Unexpected error during ${name}:`, err);
      throw err; // Re-throw unexpected errors
    }
  }
}

export function projectPath(owner: string, repo?: string): string {
  return repo ? `repos/${owner}/${repo}` : `owners/${owner}`;
}

export const api = createApiInstance();

export * from "./AuthBackendAPI";
export * from "./BackendAPI";
export * from "./OnboardingBackendAPI";
