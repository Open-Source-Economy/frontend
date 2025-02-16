export interface GetAvailableCreditParams {}

export interface GetAvailableCreditResponse {
  creditAmount: string;
}

export interface GetAvailableCreditBody {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface GetAvailableCreditQuery {
  companyId?: string;
}
