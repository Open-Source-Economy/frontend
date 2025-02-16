export interface FundIssueParams {
  owner: string;
  repo: string;
  number: number;
}

export interface FundIssueResponse {}

/**
 * The body of the request to fund an issue.
 * @param companyId If provided, the funds will be taken from the company's account. Otherwise, the funds will be taken from the auth user's account.
 * @param creditAmount The amount to be funded
 */
export interface FundIssueBody {
  companyId?: string;
  creditAmount: number;
}

export interface FundIssueQuery {}
