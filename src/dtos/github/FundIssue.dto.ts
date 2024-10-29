import { CompanyId } from "../../model";

export interface FundIssueBodyParams {
  companyId?: CompanyId;
  dowAmount: number;
}

export interface FundIssueQueryParams {
  owner: string;
  repo: string;
  number: number;
}

export interface FundIssueResponse {}
