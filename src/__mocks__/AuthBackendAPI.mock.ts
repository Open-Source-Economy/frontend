import {
  GetCompanyUserInviteInfoQuery,
  GetCompanyUserInviteInfoResponse,
  LoginBody,
  LoginQuery,
  LoginResponse,
  RegisterBody,
  RegisterQuery,
  RegisterResponse,
  StatusResponse,
} from "src/dtos/auth";
import { AuthBackendAPI } from "src/services";
import { CompanyUserRole } from "src/model";
import { company, repositoryId, user } from "src/__mocks__/index";
import { GetRepositoryUserInviteInfoQuery, GetRepositoryUserInviteInfoResponse } from "src/dtos/auth/GetRepositoryUserInviteInfo.dto";
import { ApiError } from "src/ultils/error/ApiError";

export class AuthBackendAPIMock implements AuthBackendAPI {
  async checkUserStatus(): Promise<StatusResponse | ApiError> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
    };
  }

  async login(body: LoginBody, query: LoginQuery): Promise<LoginResponse | ApiError> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
    };
  }

  async register(body: RegisterBody, query: RegisterQuery): Promise<RegisterResponse | ApiError> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
    };
  }

  async loginWithGitHub(success?: string, failure?: string): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

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
