import { Company, CompanyUserRole, User } from "../../model";

export interface AuthInfo {
  user: User | null;
  company: Company | null; // if user belongs to a company or not
  companyRole: CompanyUserRole | null; // if user belongs to a company
}
