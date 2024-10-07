import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "../ultils/error/ApiError";

if (!process.env.REACT_APP_OSE_API_BASE_URL) {
  throw new Error("REACT_APP_OSE_API_BASE_URL is not set");
}

if (!process.env.REACT_APP_OSE_API_API_VERSION) {
  throw new Error("REACT_APP_OSE_API_API_VERSION is not set");
}

export const API_URL = `${process.env.REACT_APP_OSE_API_BASE_URL}/${process.env.REACT_APP_OSE_API_API_VERSION}`;

export async function handleError<T>(call: () => Promise<AxiosResponse<T, any>>, name: string): Promise<T | ApiError> {
  try {
    const response: AxiosResponse<T, any> = await call();
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(`Error on ${name}:`, err);
      return new ApiError(err.response?.status, err.response?.statusText);
    } else {
      console.error(`Unexpected error during ${name}:`, err);
      throw err; // Re-throw unexpected errors
    }
  }
}

export * from "./AuthBackendAPI";
export * from "./BackendAPI";
