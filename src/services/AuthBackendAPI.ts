import { AxiosInstance } from "axios";
import * as dto from "@open-source-economy/api-types";
import { api, handleError } from "./index";
import { AuthBackendAPIMock } from "src/__mocks__/AuthBackendAPI.mock";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";

export function getAuthBackendAPI(): AuthBackendAPI {
  if (config.api.useMock) {
    return new AuthBackendAPIMock();
  }
  return new AuthBackendAPIImpl(api);
}

export interface AuthBackendAPI {
  checkUserStatus(): Promise<dto.StatusResponse | ApiError>;
  login(body: dto.LoginBody, query: dto.LoginQuery): Promise<dto.LoginResponse | ApiError>;
  register(body: dto.RegisterBody, query: dto.RegisterQuery): Promise<dto.RegisterResponse | ApiError>;
  loginWithGitHub(redirectPath?: string): void;
  deleteSession(): Promise<dto.LogoutResponse | ApiError>;
  getCompanyUserInviteInfo(query: dto.GetCompanyUserInviteInfoQuery): Promise<dto.GetCompanyUserInviteInfoResponse | ApiError>;
  getRepositoryUserInviteInfo(query: dto.GetRepositoryUserInviteInfoQuery): Promise<dto.GetRepositoryUserInviteInfoResponse | ApiError>;
  checkEmail(params: dto.CheckEmailParams, body: dto.CheckEmailBody, query: dto.CheckEmailQuery): Promise<dto.CheckEmailResponse | ApiError>;
  forgotPassword(body: dto.ForgotPasswordBody, query: {}, params: {}): Promise<dto.ResponseBody<dto.ForgotPasswordResponse> | ApiError>;
  resetPassword(body: dto.ResetPasswordBody, query: dto.ResetPasswordQuery, params: {}): Promise<dto.ResponseBody<dto.ResetPasswordResponse> | ApiError>;
}

class AuthBackendAPIImpl implements AuthBackendAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async checkUserStatus(): Promise<dto.StatusResponse | ApiError> {
    return handleError<dto.StatusResponse>(() => this.api.get(`${config.api.url}/auth/status`, { withCredentials: true }), "checkUserStatus");
  }

  async login(body: dto.LoginBody, query: dto.LoginQuery): Promise<dto.LoginResponse | ApiError> {
    return handleError<dto.LoginResponse>(() => this.api.post(`${config.api.url}/auth/login`, body, { withCredentials: true, params: query }), "login");
  }

  async register(body: dto.RegisterBody, query: dto.RegisterQuery): Promise<dto.RegisterResponse | ApiError> {
    const { companyToken, repositoryToken } = query;

    if (companyToken) {
      return handleError<dto.RegisterResponse>(
        () => this.api.post(`${config.api.url}/auth/register-as-company`, body, { withCredentials: true, params: { companyToken } }),
        "register-as-company",
      );
    } else if (repositoryToken) {
      return handleError<dto.RegisterResponse>(
        () =>
          this.api.post(`${config.api.url}/auth/register-as-maintainer`, body, {
            withCredentials: true,
            params: { repositoryToken },
          }),
        "register-as-maintainer",
      );
    }
    return handleError<dto.RegisterResponse>(
      () => this.api.post(`${config.api.url}/auth/register`, body, { withCredentials: true, params: query }),
      "register",
    );
  }

  loginWithGitHub(redirectPath?: string): void {
    window.location.href = redirectPath ? `${config.api.url}/auth/github?redirect=${encodeURIComponent(redirectPath)}` : `${config.api.url}/auth/github`;
  }

  async deleteSession(): Promise<dto.LogoutResponse | ApiError> {
    return handleError<dto.LogoutResponse>(() => this.api.post(`${config.api.url}/auth/logout`, {}, { withCredentials: true }), "deleteSession");
  }

  async getCompanyUserInviteInfo(query: dto.GetCompanyUserInviteInfoQuery): Promise<dto.GetCompanyUserInviteInfoResponse | ApiError> {
    return handleError<dto.GetCompanyUserInviteInfoResponse>(
      () => this.api.get(`${config.api.url}/auth/company-user-invite-info`, { withCredentials: true, params: query }),
      "getCompanyUserInviteInfo",
    );
  }

  async getRepositoryUserInviteInfo(query: dto.GetRepositoryUserInviteInfoQuery): Promise<dto.GetRepositoryUserInviteInfoResponse | ApiError> {
    return handleError<dto.GetRepositoryUserInviteInfoResponse>(
      () => this.api.get(`${config.api.url}/auth/repository-user-invite-info`, { withCredentials: true, params: query }),
      "getRepositoryUserInviteInfo",
    );
  }

  async checkEmail(params: dto.CheckEmailParams, body: dto.CheckEmailBody, query: dto.CheckEmailQuery): Promise<dto.CheckEmailResponse | ApiError> {
    return handleError<dto.CheckEmailResponse>(
      () => this.api.get(`${config.api.url}/auth/check-email`, { withCredentials: true, params: query }),
      "checkEmail",
    );
  }

  async forgotPassword(body: dto.ForgotPasswordBody, query: {}, params: {}): Promise<dto.ResponseBody<dto.ForgotPasswordResponse> | ApiError> {
    return handleError<dto.ResponseBody<dto.ForgotPasswordResponse>>(
      () => this.api.post(`${config.api.url}/auth/forgot-password`, body, { withCredentials: true }),
      "forgotPassword",
    );
  }

  async resetPassword(body: dto.ResetPasswordBody, query: dto.ResetPasswordQuery, params: {}): Promise<dto.ResponseBody<dto.ResetPasswordResponse> | ApiError> {
    return handleError<dto.ResponseBody<dto.ResetPasswordResponse>>(
      () => this.api.post(`${config.api.url}/auth/reset-password`, body, { withCredentials: true, params: query }),
      "resetPassword",
    );
  }
}
