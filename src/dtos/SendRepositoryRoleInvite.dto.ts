import { Currency, RepositoryId, RepositoryUserRole } from "../model";

export interface SendRepositoryRoleInviteParams {}

export interface SendRepositoryRoleInviteBody {
  userName: string | null;
  userEmail?: string;
  sendEmail: boolean;
  userGithubOwnerLogin: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  dowRate?: number;
  dowCurrency?: Currency;
}

export interface SendRepositoryRoleInviteQuery {}

export interface SendRepositoryRoleInviteResponse {}
