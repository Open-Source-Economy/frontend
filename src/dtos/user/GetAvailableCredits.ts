export interface GetAvailableCreditsParams {}

export interface GetAvailableCreditsResponse {
  creditAmount: number; // integer
}

export interface GetAvailableCreditsBody {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface GetAvailableCreditsQuery {
  companyId?: string;
}
