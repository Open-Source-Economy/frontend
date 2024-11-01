import { CompanyId } from "../../model";

export interface FundIssueBody {
  companyId?: CompanyId;
  dowAmount: number;
}

export interface FundIssueQuery {
  owner: string;
  repo: string;
  number: number;
}

export interface FundIssueResponse {}
