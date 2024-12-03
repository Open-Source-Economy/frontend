import axios from "axios";
import { StatusResponse } from "src/dtos/auth/Status.dto";
import {
  GetCompanyUserInviteInfoQuery,
  GetCompanyUserInviteInfoResponse,
  LoginBody,
  LoginQuery,
  LoginResponse,
  RegisterBody,
  RegisterQuery,
  RegisterResponse,
} from "src/dtos/auth";
import { AuthBackendAPIMock } from "src/__mocks__";
import { GetRepositoryUserInviteInfoQuery, GetRepositoryUserInviteInfoResponse } from "src/dtos/auth/GetRepositoryUserInviteInfo.dto";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { handleError } from "src/services/index";

export function getAuthBackendAPI(): AuthBackendAPI {
  if (config.api.useMock) {
    return new AuthBackendAPIMock();
  } else {
    return new AuthBackendAPIImpl();
  }
}

// TODO: change to not return an ApiError
export interface AuthBackendAPI {
  checkUserStatus(): Promise<StatusResponse | ApiError>;

  login(body: LoginBody, query: LoginQuery): Promise<LoginResponse | ApiError>;

  register(body: RegisterBody, query: RegisterQuery): Promise<RegisterResponse | ApiError>;

  loginWithGitHub(success?: string, failure?: string): Promise<void | ApiError>;

  deleteSession(): Promise<void | ApiError>;

  getCompanyUserInviteInfo(query: GetCompanyUserInviteInfoQuery): Promise<GetCompanyUserInviteInfoResponse | ApiError>;

  getRepositoryUserInviteInfo(query: GetRepositoryUserInviteInfoQuery): Promise<GetRepositoryUserInviteInfoResponse | ApiError>;
}

class AuthBackendAPIImpl implements AuthBackendAPI {
  async checkUserStatus(): Promise<StatusResponse | ApiError> {
    console.log(config.api.url);
    console.log("config.api.url");
    return handleError<StatusResponse>(() => axios.get(`${config.api.url}/auth/status`, { withCredentials: true }), "checkUserStatus");
  }

  async login(body: LoginBody, query: LoginQuery): Promise<LoginResponse | ApiError> {
    return handleError(() => axios.post(`${config.api.url}/auth/login`, body, { withCredentials: true }), "login");
  }

  async register(body: RegisterBody, query: RegisterQuery): Promise<RegisterResponse | ApiError> {
    if (query.companyToken) {
      const queryParams = `companyToken=${encodeURIComponent(query.companyToken)}`;
      return handleError(() => axios.post(`${config.api.url}/auth/register-as-company?${queryParams}`, body, { withCredentials: true }), "register-as-company");
    } else if (query.repositoryToken) {
      const queryParams = `repositoryToken=${encodeURIComponent(query.repositoryToken)}`;
      return handleError(
        () => axios.post(`${config.api.url}/auth/register-as-maintainer?${queryParams}`, body, { withCredentials: true }),
        "register-as-maintainer",
      );
    } else {
      return handleError(() => axios.post(`${config.api.url}/auth/register`, body, { withCredentials: true }), "register");
    }
  }

  async loginWithGitHub(): Promise<void | ApiError> {
    window.location.href = `${config.api.url}/auth/github`;
  }

  async deleteSession(): Promise<void | ApiError> {
    return handleError(() => axios.post(`${config.api.url}/auth/logout`, {}, { withCredentials: true }), "deleteSession");
  }

  async getCompanyUserInviteInfo(query: GetCompanyUserInviteInfoQuery): Promise<GetCompanyUserInviteInfoResponse | ApiError> {
    // TODO: make that generic for all the params
    const queryParams = `token=${encodeURIComponent(query.token)}`;
    return handleError<GetCompanyUserInviteInfoResponse>(
      () => axios.get(`${config.api.url}/auth/company-user-invite-info?${queryParams}`, { withCredentials: true }),
      "getCompanyUserInviteInfo",
    );
  }

  async getRepositoryUserInviteInfo(query: GetRepositoryUserInviteInfoQuery): Promise<GetRepositoryUserInviteInfoResponse | ApiError> {
    const queryParams = `token=${encodeURIComponent(query.token)}`;
    return handleError<GetRepositoryUserInviteInfoResponse>(
      () => axios.get(`${config.api.url}/auth/repository-user-invite-info?${queryParams}`, { withCredentials: true }),
      "getRepositoryUserInviteInfo",
    );
  }
}
