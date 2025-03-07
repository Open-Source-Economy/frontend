// TODO: to implement

import { CompanyId } from "../../model";

export interface GetSponsorsParams {
  owner: string;
  repo?: string;
}

export type CardSize = "xlarge" | "large" | "small" | "xsmall";

export interface Sponsor {
  companyId: CompanyId;
  size?: CardSize;
}

export interface GetSponsorsResponse {
  sponsors: Sponsor[];
}

export interface GetSponsorsBody {}

export interface GetSponsorsQuery {}
