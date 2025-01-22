import { DowCurrency, RepositoryId, RepositoryUserRole } from "../model";

export interface SendRepositoryRoleInviteParams {}

export interface SendRepositoryRoleInviteBody {
  userName: string | null;
  userEmail: string;
  userGithubOwnerLogin: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  dowRate: number;
  dowCurrency: DowCurrency;
}

export interface SendRepositoryRoleInviteQuery {}

export interface SendRepositoryRoleInviteResponse {}
