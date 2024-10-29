export interface ResponseBody<T> {
  error?: ErrorResponse;
  success?: T;
}

export interface ErrorResponse {
  code: number;
  message: string;
  stack?: string;
}
