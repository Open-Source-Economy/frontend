import { Company, CompanyUserRole, RepositoryId, RepositoryUserRole, User } from "../../model";

export interface RepositoryInfo {
  role: RepositoryUserRole;
  rate: string | null; // currency / credit
  currency: string | null;
}

export interface AuthInfo {
  user: User | null;
  company: Company | null; // if user belongs to a company or not
  companyRole: CompanyUserRole | null; // if user belongs to a company
  repositories: [RepositoryId, RepositoryInfo][]; // if user belongs to a repository
}
