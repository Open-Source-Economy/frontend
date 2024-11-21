import { DowCurrency, RepositoryId, RepositoryUserRole } from "../model";

// TODO: should be renamed to SendRepositoryRoleInviteBody
export interface SendRepositoryAdminInviteBody {
  userName: string | null;
  userEmail: string;
  userGithubOwnerLogin: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  dowRate: number;
  dowCurrency: DowCurrency;
}

export interface SendRepositoryAdminInviteQuery {}

export interface SendRepositoryAdminInviteResponse {}
