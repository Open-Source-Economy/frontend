import { AxiosInstance } from "axios";
import {
  GetCompanyUserInviteInfoQuery,
  GetCompanyUserInviteInfoResponse,
  GetRepositoryUserInviteInfoQuery,
  GetRepositoryUserInviteInfoResponse,
  LoginBody,
  LoginQuery,
  LoginResponse,
  RegisterBody,
  RegisterQuery,
  RegisterResponse,
  StatusResponse,
} from "@open-source-economy/api-types";
import { AuthBackendAPIMock } from "src/__mocks__";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { handleError, api } from "./index";

export function getAuthBackendAPI(): AuthBackendAPI {
  if (config.api.useMock) {
    return new AuthBackendAPIMock();
  } else {
    return new AuthBackendAPIImpl(api);
  }
}

export interface AuthBackendAPI {
  checkUserStatus(): Promise<StatusResponse | ApiError>;

  login(body: LoginBody, query: LoginQuery): Promise<LoginResponse | ApiError>;

  register(body: RegisterBody, query: RegisterQuery): Promise<RegisterResponse | ApiError>;

  loginWithGitHub(redirectPath?: string): void;

  deleteSession(): Promise<void | ApiError>;

  getCompanyUserInviteInfo(query: GetCompanyUserInviteInfoQuery): Promise<GetCompanyUserInviteInfoResponse | ApiError>;

  getRepositoryUserInviteInfo(query: GetRepositoryUserInviteInfoQuery): Promise<GetRepositoryUserInviteInfoResponse | ApiError>;
}

class AuthBackendAPIImpl implements AuthBackendAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async checkUserStatus(): Promise<StatusResponse | ApiError> {
    return handleError<StatusResponse>(() => this.api.get(`${config.api.url}/auth/status`, { withCredentials: true }), "checkUserStatus");
  }

  async login(body: LoginBody, query: LoginQuery): Promise<LoginResponse | ApiError> {
    return handleError(() => this.api.post(`${config.api.url}/auth/login`, body, { withCredentials: true }), "login");
  }

  async register(body: RegisterBody, query: RegisterQuery): Promise<RegisterResponse | ApiError> {
    if (query.companyToken) {
      const queryParams = `companyToken=${encodeURIComponent(query.companyToken)}`;
      return handleError(
        () => this.api.post(`${config.api.url}/auth/register-as-company?${queryParams}`, body, { withCredentials: true }),
        "register-as-company",
      );
    } else if (query.repositoryToken) {
      const queryParams = `repositoryToken=${encodeURIComponent(query.repositoryToken)}`;
      return handleError(
        () => this.api.post(`${config.api.url}/auth/register-as-maintainer?${queryParams}`, body, { withCredentials: true }),
        "register-as-maintainer",
      );
    } else {
      return handleError(() => this.api.post(`${config.api.url}/auth/register`, body, { withCredentials: true }), "register");
    }
  }

  loginWithGitHub(redirectPath?: string): void {
    window.location.href = redirectPath ? `${config.api.url}/auth/github?redirect=${encodeURIComponent(redirectPath)}` : `${config.api.url}/auth/github`;
  }

  async deleteSession(): Promise<void | ApiError> {
    return handleError(() => this.api.post(`${config.api.url}/auth/logout`, {}, { withCredentials: true }), "deleteSession");
  }

  async getCompanyUserInviteInfo(query: GetCompanyUserInviteInfoQuery): Promise<GetCompanyUserInviteInfoResponse | ApiError> {
    // TODO: make that generic for all the params
    const queryParams = `token=${encodeURIComponent(query.token)}`;
    return handleError<GetCompanyUserInviteInfoResponse>(
      () => this.api.get(`${config.api.url}/auth/company-user-invite-info?${queryParams}`, { withCredentials: true }),
      "getCompanyUserInviteInfo",
    );
  }

  async getRepositoryUserInviteInfo(query: GetRepositoryUserInviteInfoQuery): Promise<GetRepositoryUserInviteInfoResponse | ApiError> {
    const queryParams = `token=${encodeURIComponent(query.token)}`;
    return handleError<GetRepositoryUserInviteInfoResponse>(
      () => this.api.get(`${config.api.url}/auth/repository-user-invite-info?${queryParams}`, { withCredentials: true }),
      "getRepositoryUserInviteInfo",
    );
  }
}
