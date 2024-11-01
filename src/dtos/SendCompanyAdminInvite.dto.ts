import { CompanyId, CompanyUserRole } from "../model";

export interface SendCompanyAdminInviteBody {
  userName: string | null;
  userEmail: string;
  companyId: CompanyId;
  companyUserRole: CompanyUserRole;
}

export interface SendCompanyAdminInviteQuery {}

export interface SendCompanyAdminInviteResponse {}
