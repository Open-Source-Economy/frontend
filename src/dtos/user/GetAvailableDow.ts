export interface GetAvailableDowParams {}

export interface GetAvailableDowResponse {
  dowAmount: string;
}

export interface GetAvailableDowBody {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface GetAvailableDowQuery {
  companyId?: string;
}
