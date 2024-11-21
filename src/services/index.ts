import { AxiosError, AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, ResponseBody } from "src/dtos/ResponseBody.dto";
import { ApiError } from "src/ultils/error/ApiError";

if (!process.env.REACT_APP_OSE_API_BASE_URL) {
  throw new Error("REACT_APP_OSE_API_BASE_URL is not set");
}

if (!process.env.REACT_APP_OSE_API_API_VERSION) {
  throw new Error("REACT_APP_OSE_API_API_VERSION is not set");
}

export const API_URL = `${process.env.REACT_APP_OSE_API_BASE_URL}/${process.env.REACT_APP_OSE_API_API_VERSION}`;

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

export * from "./AuthBackendAPI";
export * from "./BackendAPI";
