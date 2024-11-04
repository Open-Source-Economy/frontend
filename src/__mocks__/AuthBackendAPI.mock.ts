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
import { company, user } from "src/__mocks__/index";

export class AuthBackendAPIMock implements AuthBackendAPI {
  async checkUserStatus(): Promise<StatusResponse> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
    };
  }

  async login(body: LoginBody, query: LoginQuery): Promise<LoginResponse> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
    };
  }

  async register(body: RegisterBody, query: RegisterQuery): Promise<RegisterResponse> {
    return {
      user: user,
      company: company,
      companyRole: CompanyUserRole.ADMIN,
    };
  }

  async loginWithGitHub(success?: string, failure?: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async deleteSession(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getCompanyUserInviteInfo(query: GetCompanyUserInviteInfoQuery): Promise<GetCompanyUserInviteInfoResponse> {
    return {
      userName: "Lauriane",
      userEmail: "email@gmail.com",
    };
  }
}
