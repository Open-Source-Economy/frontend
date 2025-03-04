import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: StatusCodes, message: string, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    // Ensure prototype chain is correctly set
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
