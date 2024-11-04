import { CompanyId } from "../../model";
import Decimal from "decimal.js";

export interface FundIssueBody {
  companyId?: CompanyId;
  dowAmount: Decimal;
}

export interface FundIssueQuery {
  owner: string;
  repo: string;
  number: number;
}

export interface FundIssueResponse {}
