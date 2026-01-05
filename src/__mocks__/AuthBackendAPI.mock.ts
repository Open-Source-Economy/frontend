import * as dto from "@open-source-economy/api-types";
import { AuthBackendAPI } from "src/services";
import { company, repositoryId, user } from "./index";
import { ApiError } from "src/ultils/error/ApiError";

export class AuthBackendAPIMock implements AuthBackendAPI {
  async checkUserStatus(): Promise<dto.StatusResponse | ApiError> {
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

  async login(body: dto.LoginBody, query: dto.LoginQuery): Promise<dto.LoginResponse | ApiError> {
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

  async register(body: dto.RegisterBody, query: dto.RegisterQuery): Promise<dto.RegisterResponse | ApiError> {
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

  async deleteSession(): Promise<dto.LogoutResponse | ApiError> {
    return Promise.resolve({});
  }

  async getCompanyUserInviteInfo(query: dto.GetCompanyUserInviteInfoQuery): Promise<dto.GetCompanyUserInviteInfoResponse | ApiError> {
    return {
      userName: "Lauriane",
      userEmail: "lauriane@gmail.com",
    };
  }

  async getRepositoryUserInviteInfo(query: dto.GetRepositoryUserInviteInfoQuery): Promise<dto.GetRepositoryUserInviteInfoResponse | ApiError> {
    return {
      userName: "Lauriane",
      userGithubOwnerLogin: "lauriane",
      repositoryId: repositoryId,
    };
  }

  async checkEmail(params: dto.CheckEmailParams, body: dto.CheckEmailBody, query: dto.CheckEmailQuery): Promise<dto.CheckEmailResponse | ApiError> {
    // For testing: users containing 'exists' or 'active' exist, others are new.
    const email = query.email || "";
    const exists = email.includes("exists") || email.includes("active");
    // If provider is not "github", leave undefined (locally registered)
    const provider = email.includes("github") ? dto.Provider.Github : undefined;
    return Promise.resolve({ exists, provider });
  }

  async forgotPassword(body: dto.ForgotPasswordBody, query: {}, params: {}): Promise<dto.ResponseBody<dto.ForgotPasswordResponse> | ApiError> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: {} };
  }

  async resetPassword(body: dto.ResetPasswordBody, query: dto.ResetPasswordQuery, params: {}): Promise<dto.ResponseBody<dto.ResetPasswordResponse> | ApiError> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: {} };
  }
}

const repositoryInfo: dto.RepositoryInfo = {
  role: dto.RepositoryUserRole.ADMIN,
  rate: "1000",
  currency: "USD",
};
