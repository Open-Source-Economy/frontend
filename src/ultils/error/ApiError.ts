import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  statusCode: StatusCodes;
  statusText: string;
  message: string;
  stack = "";

  constructor(statusCode: StatusCodes, statusText: string, message?: string) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.message = message ?? "";
  }
}
