import { CompanyId, CompanyUserRole } from "../model";

export interface CreateCompanyUserPermissionTokenBodyParams {
  userEmail: string;
  token: string;
  companyId: CompanyId;
  companyUserRole: CompanyUserRole;
  expiresAt: Date;
}
