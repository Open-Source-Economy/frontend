import { CompanyId, CompanyUserRole } from "../model";

export interface SendCompanyRoleInviteParams {}

export interface SendCompanyRoleInviteBody {
  userName: string | null;
  userEmail: string;
  companyId: CompanyId;
  companyUserRole: CompanyUserRole;
}

export interface SendCompanyRoleInviteQuery {}

export interface SendCompanyRoleInviteResponse {}
