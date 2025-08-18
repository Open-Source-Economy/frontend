import {
  CompanyUserRole,
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
  RepositoryInfo,
  RepositoryUserRole,
  StatusResponse
} from "@open-source-economy/api-types";
import { AuthBackendAPI } from "src/services";
import { company, repositoryId, user } from "./index";
import { ApiError } from "src/ultils/error/ApiError";

export class AuthBackendAPIMock implements AuthBackendAPI {
  async checkUserStatus(): Promise<StatusResponse | ApiError> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
      repositories: [[repositoryId, repositoryInfo]],
    };
  }

  async login(body: LoginBody, query: LoginQuery): Promise<LoginResponse | ApiError> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
      repositories: [[repositoryId, repositoryInfo]],
    };
  }

  async register(body: RegisterBody, query: RegisterQuery): Promise<RegisterResponse | ApiError> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
      repositories: [[repositoryId, repositoryInfo]],
    };
  }

  loginWithGitHub(success?: string, failure?: string): void {}

  async deleteSession(): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async getCompanyUserInviteInfo(query: GetCompanyUserInviteInfoQuery): Promise<GetCompanyUserInviteInfoResponse | ApiError> {
    return {
      userName: "Lauriane",
      userEmail: "lauriane@gmail.com",
    };
  }

  async getRepositoryUserInviteInfo(query: GetRepositoryUserInviteInfoQuery): Promise<GetRepositoryUserInviteInfoResponse | ApiError> {
    return {
      userName: "Lauriane",
      userGithubOwnerLogin: "lauriane",
      repositoryId: repositoryId,
    };
  }
}

const repositoryInfo: RepositoryInfo = {
  role: RepositoryUserRole.ADMIN,
  rate: "1000",
  currency: "USD",
};
