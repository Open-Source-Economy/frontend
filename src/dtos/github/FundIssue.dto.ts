export interface FundIssueParams {
  owner: string;
  repo: string;
  number: number;
}

export interface FundIssueResponse {}

/**
 * The body of the request to fund an issue.
 * @param companyId If provided, the funds will be taken from the company's account. Otherwise, the funds will be taken from the auth user's account.
 * @param dowAmount The amount to be funded, unit: DoW.
 */
export interface FundIssueBody {
  companyId?: string;
  milliDowAmount: number;
}

export interface FundIssueQuery {}
