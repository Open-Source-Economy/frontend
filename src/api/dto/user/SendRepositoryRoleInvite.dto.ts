import { Currency, RepositoryId, RepositoryUserRole } from "../../model";

export interface SendRepositoryRoleInviteParams {}

export interface SendRepositoryRoleInviteBody {
  userName: string | null;
  userEmail?: string;
  sendEmail: boolean;
  userGithubOwnerLogin: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  rate?: number;
  currency?: Currency;
}

export interface SendRepositoryRoleInviteQuery {}

export interface SendRepositoryRoleInviteResponse {}
