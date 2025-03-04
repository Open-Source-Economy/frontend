export interface RequestIssueFundingParams {
  owner: string;
  repo: string;
  number: number;
}

export interface RequestIssueFundingResponse {}

export interface RequestIssueFundingBody {
  creditAmount: number | null;
}

export interface RequestIssueFundingQuery {}
