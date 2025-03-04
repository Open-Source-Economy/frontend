import { RepositoryId } from "../../model";

export interface GetRepositoryUserInviteInfoParams {}

export interface GetRepositoryUserInviteInfoResponse {
  userName?: string | null;
  userGithubOwnerLogin?: string;
  repositoryId?: RepositoryId;
}

export interface GetRepositoryUserInviteInfoBody {}

export interface GetRepositoryUserInviteInfoQuery {
  token: string;
}
