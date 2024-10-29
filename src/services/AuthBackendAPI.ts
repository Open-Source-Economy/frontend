import axios from "axios";
import { API_URL, handleError } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { StatusResponse } from "src/dtos/auth/Status.dto";
import { LoginBodyParams, LoginQueryParams, LoginResponse, RegisterBodyParams, RegisterQueryParams, RegisterResponse } from "src/dtos/auth";

export function getAuthBackendAPI(): AuthBackendAPI {
  return new AuthBackendAPIImpl();
}

interface AuthBackendAPI {
  checkUserStatus(): Promise<StatusResponse | ApiError>;

  login(body: LoginBodyParams, query: LoginQueryParams): Promise<LoginResponse | ApiError>;

  register(body: RegisterBodyParams, query: RegisterQueryParams): Promise<RegisterResponse | ApiError>;

  loginWithGitHub(success?: string, failure?: string): Promise<void>;

  deleteSession(): Promise<void | ApiError>;
}

class AuthBackendAPIImpl implements AuthBackendAPI {
  async checkUserStatus(): Promise<StatusResponse | ApiError> {
    return handleError<StatusResponse>(() => axios.get(`${API_URL}/auth/status`, { withCredentials: true }), "checkUserStatus");
  }

  async login(body: LoginBodyParams, query: LoginQueryParams): Promise<LoginResponse | ApiError> {
    return await handleError(() => axios.post(`${API_URL}/auth/login`, body, { withCredentials: true }), "login");
  }

  async register(body: RegisterBodyParams, query: RegisterQueryParams): Promise<RegisterResponse | ApiError> {
    return await handleError(() => axios.post(`${API_URL}/auth/register`, body, { withCredentials: true }), "register");
  }

  async loginWithGitHub(): Promise<void> {
    window.location.href = `${API_URL}/auth/github`;
  }

  async deleteSession(): Promise<void | ApiError> {
    return await handleError(() => axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true }), "deleteSession");
  }
}
