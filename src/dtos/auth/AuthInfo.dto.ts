import { Company, CompanyUserRole, RepositoryId, RepositoryUserRole, User } from "src/model";

export interface AuthInfo {
  user: User | null;
  company: Company | null; // if user belongs to a company
  companyRole: CompanyUserRole | null; // if user belongs to a company
  repositories: [RepositoryId, RepositoryUserRole][]; // if user belongs to a repository
}
