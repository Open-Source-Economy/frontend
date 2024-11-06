import { Company, CompanyUserRole, User } from "src/model";

export interface AuthInfo {
  user: User | null;
  company: Company | null; // if user belongs to a company or not
  companyRole: CompanyUserRole | null; // if user belongs to a company
}
