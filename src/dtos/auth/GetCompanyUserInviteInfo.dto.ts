export interface GetCompanyUserInviteInfoQuery {
  token: string;
}

export interface GetCompanyUserInviteInfoResponse {
  userName: string | null;
  userEmail: string;
}
