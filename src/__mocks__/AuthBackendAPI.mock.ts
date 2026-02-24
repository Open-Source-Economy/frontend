import * as dto from "@open-source-economy/api-types";
import { AuthBackendAPI } from "src/services";
import { company, repositoryId, user } from "./index";

export class AuthBackendAPIMock implements AuthBackendAPI {
  async checkUserStatus(): Promise<dto.StatusResponse> {
    return {
      authenticatedUser: {
        user: user,
        company: company,
        companyRole: dto.CompanyUserRole.ADMIN,
        repositories: [[repositoryId, repositoryInfo]],
        serviceTokens: 0,
      },
    };
  }

  async login(_body: dto.LoginBody, _query: dto.LoginQuery): Promise<dto.LoginResponse> {
    return {
      authenticatedUser: {
        user: user,
        company: company,
        companyRole: dto.CompanyUserRole.ADMIN,
        repositories: [[repositoryId, repositoryInfo]],
        serviceTokens: 0,
      },
    };
  }

  async register(_body: dto.RegisterBody, _query: dto.RegisterQuery): Promise<dto.RegisterResponse> {
    return {
      authenticatedUser: {
        user: user,
        company: company,
        companyRole: dto.CompanyUserRole.ADMIN,
        repositories: [[repositoryId, repositoryInfo]],
        serviceTokens: 0,
      },
    };
  }

  loginWithGitHub(): void {
    // Simulate successful GitHub login noop
  }

  async deleteSession(): Promise<dto.LogoutResponse> {
    return Promise.resolve({});
  }

  async getCompanyUserInviteInfo(
    _query: dto.GetCompanyUserInviteInfoQuery
  ): Promise<dto.GetCompanyUserInviteInfoResponse> {
    return {
      userName: "Lauriane",
      userEmail: "lauriane@gmail.com",
    };
  }

  async getRepositoryUserInviteInfo(
    _query: dto.GetRepositoryUserInviteInfoQuery
  ): Promise<dto.GetRepositoryUserInviteInfoResponse> {
    return {
      userName: "Lauriane",
      userGithubOwnerLogin: "lauriane",
      repositoryId: repositoryId,
    };
  }

  async checkEmail(
    params: dto.CheckEmailParams,
    body: dto.CheckEmailBody,
    query: dto.CheckEmailQuery
  ): Promise<dto.CheckEmailResponse> {
    // For testing: users containing 'exists' or 'active' exist, others are new.
    const email = query.email || "";
    const exists = email.includes("exists") || email.includes("active");
    // If provider is not "github", leave undefined (locally registered)
    const provider = email.includes("github") ? dto.Provider.Github : undefined;
    return Promise.resolve({ exists, provider });
  }

  async forgotPassword(
    _body: dto.ForgotPasswordBody,
    _query: {},
    _params: {}
  ): Promise<dto.ResponseBody<dto.ForgotPasswordResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: {} };
  }

  async resetPassword(
    _body: dto.ResetPasswordBody,
    _query: dto.ResetPasswordQuery,
    _params: {}
  ): Promise<dto.ResponseBody<dto.ResetPasswordResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: {} };
  }
}

const repositoryInfo: dto.RepositoryInfo = {
  role: dto.RepositoryUserRole.ADMIN,
  rate: "1000",
  currency: "USD",
};
