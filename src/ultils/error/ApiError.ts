import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  statusCode?: StatusCodes;
  statusText?: string;
  message: string;
  stack = "";

  constructor(statusCode?: StatusCodes, statusText?: string, message?: string) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.message = message ?? "";
    this.name = "ApiError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  toSting(): string {
    return `${this.statusCode ? `Error ${this.statusCode}` : ""} ${this.statusText ? `${this.statusText}` : ""}: ${this.message}`;
  }

  static from(error: unknown): ApiError {
    if (error instanceof Error) return new ApiError(undefined, undefined, error.message);
    else return new ApiError(undefined, undefined, "An unknown error occurred");
  }
}
