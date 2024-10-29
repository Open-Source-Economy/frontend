import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  statusCode: StatusCodes;
  message: string;
  stack = "";

  constructor(statusCode: StatusCodes, message?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message ?? "";
  }
}
